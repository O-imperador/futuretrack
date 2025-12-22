import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AuthDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function AuthDialog({ open, setOpen }: AuthDialogProps) {
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const username = formData.get("username") as string;
    const role = formData.get("role") as string;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }
    if (mode === "signUp") {
      if (!username || username.length < 3) {
        setError("Username must be at least 3 characters long.");
        setLoading(false);
        return;
      }
      if (!["admin", "user"].includes(role)) {
        setError("Invalid role selected.");
        setLoading(false);
        return;
      }
    }

    try {
      if (mode === "signUp") {
        await axios.post(
          "/api/auth/signup",
          { email, username, password, role },
          { withCredentials: true }
        );
        toast.success("Account created successfully. Please sign in.");
        setMode("signIn");
      } else {
        await axios.post(
          "/api/auth/signin",
          { email, password },
          { withCredentials: true }
        );
        // Verify session
        await axios.get("/api/auth/me", { withCredentials: true });
        toast.success("Signed in successfully");
        setOpen(false);
        const { data: user } = await axios.get("/api/auth/me", {
          withCredentials: true,
        });
        if (user.role === "admin") {
          navigate("/admin");
        } else if (user.role === "user") {
          navigate("/user");
        }
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      setError(
        err.response?.data?.error || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "signIn" ? "Sign In" : "Sign Up"}</DialogTitle>
          <DialogDescription>
            {mode === "signIn"
              ? "Enter your credentials to sign in."
              : "Create a new account."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          {mode === "signUp" && (
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" name="username" required />
            </div>
          )}
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          {mode === "signUp" && (
            <div>
              <Label htmlFor="role">Role</Label>
              <Select name="role" defaultValue="user">
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading
                ? "Loading..."
                : mode === "signIn"
                ? "Sign In"
                : "Sign Up"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setMode(mode === "signIn" ? "signUp" : "signIn")}
            >
              {mode === "signIn"
                ? "Need an account? Sign Up"
                : "Have an account? Sign In"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AuthDialog;
