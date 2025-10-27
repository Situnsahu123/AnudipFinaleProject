import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../src/Context/UserContex";
import { MoreVertical, LogOut, UserX, ShieldBan } from "lucide-react";

const ChatUsers = () => {
  const { User, loading, selectUser, selectedUser } = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [blockedList, setBlockedList] = useState([]);
  const navigate = useNavigate();

  const loggedInEmail = sessionStorage.getItem("email");

  useEffect(() => {
    const fetchBlocked = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/block/blocked/${loggedInEmail}`
        );
        setBlockedList(res.data.map((item) => item.blocked_email));
      } catch (error) {
        console.error("Error fetching blocked users:", error);
      }
    };

    if (loggedInEmail) fetchBlocked();
  }, [loggedInEmail]);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.href = "/login";
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your account?");
    if (!confirmed) return;
    try {
      await axios.delete(`http://localhost:4000/deleteAccount/${loggedInEmail}`);
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      window.location.href = "/login";
    } catch (error) {
      console.error("❌ Error deleting account:", error);
    }
  };

  const handleBlockUserPage = () => navigate("/block");

  // 📌 Filter out logged-in user and blocked users
  const filteredUsers = User?.filter(
    (user) => user.email !== loggedInEmail && !blockedList.includes(user.email)
  );

  if (loading)
    return <p className="text-center mt-5 text-gray-800 dark:text-white">Loading users...</p>;

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100 dark:bg-gray-900 border-r border-gray-300">
      <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-blue-600 text-white relative">
        <h2 className="text-xl font-bold">Chat Users</h2>

        <div className="relative">
          <button onClick={toggleDropdown} className="p-2 rounded-full hover:bg-blue-700 transition">
            <MoreVertical size={22} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-10">
              <button
                onClick={handleBlockUserPage}
                className="w-full flex items-center gap-2 px-4 py-2 text-black dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <ShieldBan size={18} /> Blocked Users
              </button>
              <button
                onClick={handleDeleteAccount}
                className="w-full flex items-center gap-2 px-4 py-2 text-black dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <UserX size={18} /> Delete Account
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 transition"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {filteredUsers?.map((user, index) => (
          <div
            key={user.id || index}
            onClick={() => selectUser(user)}
            className={`flex items-center p-3 rounded-lg cursor-pointer border hover:bg-blue-50 hover:text-white dark:hover:bg-gray-800 transition-all shadow-sm
              ${
                selectedUser?.id === user.id
                  ? "bg-blue-100 border-blue-400"
                  : "bg-white dark:bg-gray-900 border-gray-200"
              }`}
          >
            <img
              src="https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover mr-3 flex-shrink-0 border"
            />
            <div className="flex-1 min-w-0">
              <h5 className="text-gray-900 dark:text-white font-semibold text-sm md:text-base truncate">
                {user.name}
              </h5>
              <p className="text-black dark:text-gray-300 text-xs truncate">
                {user.email || "No email"}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                selectUser(user);
              }}
              className="ml-3 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs md:text-sm transition"
            >
              Chat
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatUsers;
