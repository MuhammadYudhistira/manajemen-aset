import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const useSession = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setSession(decodedToken);
      } catch (error) {
        console.error("Failed to decode token:", error);
        setSession(null);
      }
    } else {
      setSession(null);
    }
    setLoading(false);
  }, []);

  return { session, loading };
};

export default useSession;
