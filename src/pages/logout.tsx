// components/LogoutButton.jsx
import React from "react";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
        method: "GET",
        credentials: "include", // Ensure cookies are sent
      });
      window.location.href = "/";
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
