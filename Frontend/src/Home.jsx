import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatUsers from "../components/ChatUsers";
import ChatContenar from "../components/ChatContenar";
import { HiMenu } from "react-icons/hi";

const HomePage = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 800);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative min-h-screen bg-[url('/Login_image.png')] bg-cover bg-center flex">
      {/* Sidebar for desktop or mobile toggle */}
      {(sidebarOpen || !isMobile) && (
        <div className="absolute md:relative z-20 w-4/5 md:w-1/5 h-full bg-gray-100 shadow-lg">
          <ChatUsers />
        </div>
      )}

      {/* Mobile hamburger button */}
      {isMobile && (
        <button
          className="absolute top-4 left-4 z-30 p-2 bg-white rounded-md shadow-md md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <HiMenu className="w-6 h-6 text-gray-800" />
        </button>
      )}

      {/* Chat container */}
      <div className={`flex-1 h-screen ${isMobile ? "ml-0" : "ml-1/5"}`}>
        <ChatContenar />
      </div>
    </div>
  );
};

export default HomePage;
