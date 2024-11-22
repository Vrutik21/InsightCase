import "@/styles/globals.css";
// pages/_app.js
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch the authenticated user's information
    const fetchUser = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/user", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
          console.log(data, "data");
        }
      } catch (err) {
        console.error("User fetch error:", err);
      }
    };

    fetchUser();
  }, []);

  return <Component {...pageProps} user={user} />;
}

export default MyApp;
