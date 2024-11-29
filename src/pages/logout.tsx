// components/LogoutButton.jsx
import axios from "axios";
import React from "react";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await axios.get(process.env.NEXT_PUBLIC_API_URL + "/auth/logout", {
        withCredentials: true,
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });

      sessionStorage.clear();
      window.location.href = "/";
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
