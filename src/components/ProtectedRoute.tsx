import { useEffect } from "react";
import { useRouter } from "next/router";
import api from "../services/api";

const ProtectedRoute = ({ children }: any) => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/auth/check");
      } catch {
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;
