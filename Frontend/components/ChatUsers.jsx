import React, { useContext } from "react";
import { UserContext } from "../src/Context/UserContex";

const ChatUsers = () => {
  const { User, loading, selectUser, selectedUser } = useContext(UserContext);

  const handleLogout = () => {
    console.log("User logged out");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.href = "/login";
  };

  const loggedInEmail = localStorage.getItem("email");
  const filteredUsers = User?.filter((user) => user.email !== loggedInEmail);

  if (loading)
    return (
      <p className="text-center mt-5 text-gray-800 dark:text-white">
        Loading users...
      </p>
    );

  return (
    <div className="flex flex-col h-screen w-full  bg-gray-100 dark:bg-gray-900 border-r border-gray-300">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-300">
        <h2 className="text-xl font-bold text-white">Users</h2>
        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm md:text-base"
        >
          Logout
        </button>
      </div>

      {/* Users list */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {filteredUsers?.map((user, index) => (
          <div
            key={user.id || index}
            onClick={() => selectUser(user)}
            className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-blue-100 transition
              ${selectedUser?.id === user.id ? "bg-blue-200" : "bg-white dark:bg-gray-800"}`}
          >
            {/* Avatar */}
            <img
              src="https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover mr-3 flex-shrink-0"
            />

            {/* User info */}
            <div className="flex-1 min-w-0">
              <h5 className="text-gray-900 dark:text-white font-semibold text-sm md:text-lg truncate">
                {user.name}
              </h5>
              <p className="text-gray-500 dark:text-gray-300 text-xs md:text-sm truncate">
                {user.email || "No email"}
              </p>
            </div>

            {/* Chat button */}
            <button
              onClick={() => selectUser(user)}
              className="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs md:text-sm"
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
