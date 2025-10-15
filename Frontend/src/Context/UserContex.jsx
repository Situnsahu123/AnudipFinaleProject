import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create Context
export const UserContext = createContext();

// Create Provider
export const UserProvider = ({ children }) => {
  const [User, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:4000/users");
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const selectUser = (user) => {
    setSelectedUser(user);
  };

  // Context value (available globally)
  return (
    <UserContext.Provider value={{ User, loading, selectedUser , selectUser}}>
      {children}
    </UserContext.Provider>
  );
};
