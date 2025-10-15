import React, { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import { UserContext } from "../src/Context/UserContex";

const ChatContenar = () => {
  const { loading, selectedUser, selectedDoctor } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Logged-in user's email
  const userEmail = localStorage.getItem("email");
  // Receiver (depends on your app – doctor or user)
  const receiverEmail = selectedDoctor?.email || selectedUser?.email;

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch chat messages between two emails
  useEffect(() => {
    if (!userEmail || !receiverEmail) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/getmessages/${userEmail}/${receiverEmail}`
        );
        setMessages(res.data);
      } catch (error) {
        console.error("❌ Error fetching messages:", error);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 2000); // auto-refresh
    return () => clearInterval(interval);
  }, [userEmail, receiverEmail]);

  // Send a message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    if (!userEmail || !receiverEmail) {
      return alert("Select a user to chat with.");
    }

    try {
      const res = await axios.post("http://localhost:4000/sendmessage", {
        sender_email: userEmail,
        receiver_email: receiverEmail,
        message_text: newMessage,
      });

      setMessages((prev) => [...prev, res.data.messageData]);
      setNewMessage("");
    } catch (error) {
      console.error("❌ Error sending message:", error);
    }
  };

  if (loading) return <p className="text-center mt-5">Loading chat...</p>;

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center justify-center shadow">
        <h1 className="text-2xl font-bold">
          {selectedDoctor?.name || selectedUser?.name || "No user selected"}
        </h1>
      </div>


      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg) => (
          <div
            key={msg.message_id || Math.random()}
            className={`flex ${msg.sender_email === userEmail ? "justify-end" : "justify-start"
              } mb-3`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl shadow ${msg.sender_email === userEmail
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800"
                }`}
            >
              {msg.message_text || msg.message}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input area */}
      <div className="p-4 bg-white flex items-center shadow">
        <input
          type="text"
          className="flex-1 border rounded-full px-4 py-2 mr-3 outline-none"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatContenar;
