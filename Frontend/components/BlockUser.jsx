import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, UserMinus, UserX } from "lucide-react";

const BlockUser = () => {
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [blockedEmail, setBlockedEmail] = useState("");
  const navigate = useNavigate();
  const blocker_email = sessionStorage.getItem("email"); // logged-in user email

  // ✅ Fetch blocked users
  const fetchBlockedUsers = async () => {
    if (!blocker_email) return;
    try {
      const encodedEmail = encodeURIComponent(blocker_email);
      const res = await axios.get(
        `http://localhost:4000/block/blocked/${encodedEmail}`
      );

      // Backend may send either array or object with key
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.blockedUsers || [];

      setBlockedUsers(data);
    } catch (err) {
      console.error("Error fetching blocked users:", err);
      alert("Error fetching blocked users");
    }
  };

  useEffect(() => {
    fetchBlockedUsers();
  }, []);

  // ✅ Block user
  const handleBlock = async () => {
    if (!blockedEmail.trim()) return alert("Please enter an email to block");

    try {
      const res = await axios.post("http://localhost:4000/block/block", {
        blocker_email,
        blocked_email: blockedEmail.trim(),
      });
      alert(res.data.message || "User blocked successfully");
      setBlockedEmail("");
      fetchBlockedUsers();
    } catch (err) {
      console.error("Error blocking user:", err);
      alert(err.response?.data?.message || "Error blocking user");
    }
  };

  // ✅ Unblock user
  const handleUnblock = async (blocked_email) => {
    try {
      const res = await axios.delete("http://localhost:4000/block/unblock", {
        data: { blocker_email, blocked_email },
      });
      alert(res.data.message || "User unblocked successfully");
      fetchBlockedUsers();
    } catch (err) {
      console.error("Error unblocking user:", err);
      alert(err.response?.data?.message || "Error unblocking user");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-50 to-blue-100 py-10 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-blue-700 flex items-center gap-2">
            <UserX className="text-blue-600" size={26} />
            Blocked Users
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
          >
            <ArrowLeft size={18} /> Back
          </button>
        </div>

        {/* Block user input */}
        <div className="flex gap-3 mb-8">
          <input
            type="email"
            placeholder="Enter user email to block"
            value={blockedEmail}
            onChange={(e) => setBlockedEmail(e.target.value)}
            className="flex-1 border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
          <button
            onClick={handleBlock}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl shadow transition"
          >
            Block
          </button>
        </div>

        {/* Blocked Users List */}
        {blockedUsers.length > 0 ? (
          <ul className="space-y-4">
            {blockedUsers.map((user, i) => (
              <li
                key={i}
                className="flex justify-between items-center bg-gray-50 border border-gray-200 p-4 rounded-xl hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
                    alt="blocked"
                    className="w-10 h-10 rounded-full border"
                  />
                  <span className="text-gray-800 font-medium">
                    {user.blocked_email}
                  </span>
                </div>
                <button
                  onClick={() => handleUnblock(user.blocked_email)}
                  className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm shadow transition"
                >
                  <UserMinus size={16} /> Unblock
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center text-sm mt-6">
            You haven’t blocked anyone yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default BlockUser;
