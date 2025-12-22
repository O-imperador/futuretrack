import { useEffect, useState } from "react";
import axios from "axios";
type User = {
  username: string;
  role: string;
};
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/auth/me", { withCredentials: true })
      .then((res) => {
        setUser(res.data); // { username: '...', role: '...' }
      })
      .catch(() => {
        setUser(null); // Not logged in
      })
      .finally(() => setLoading(false));
  }, []);

  return { user, loading, isLoggedIn: !!user };
};