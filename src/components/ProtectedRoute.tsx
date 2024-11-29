import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const ProtectedRoute = ({ children }: any) => {
  const router = useRouter();
  // const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/auth/check",
        {
          withCredentials: true,
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      console.log("Authenticated:", response.data);
    } catch (error) {
      if (error.response?.status === 403) {
        console.log("User not authenticated. Redirecting...");
        router.push("/login");
      } else {
        console.error("Error during auth check:", error);
      }
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // if (loading) return <div>Loading...</div>;

  return <>{children}</>;
};

export default ProtectedRoute;
