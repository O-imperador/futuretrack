import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { RoadmapData } from "@/types/user"; //roadmap type

interface User {
  id: string;
  email: string;
  savedRoadmaps: SavedRoadmap[];
  completedQuizzes: CompletedQuiz[];
  achievements: Achievement[];
}

interface SavedRoadmap {
  id: string;
  title: string;
  description: string;
  date: string;
  roadmapData: RoadmapData;
}

interface CompletedQuiz {
  id: string;
  date: string;
  score?: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  date: string;
}

const AdminDash = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/auth/me", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Please sign in to access your dashboard");
        navigate("/");
      });
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Failed to logout");
    }
  };

  const handleEditAccount = () => {
    navigate("/account/edit"); // Create this route later
  };

  if (loading) {
    return <div className="container mx-auto p-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1">
        <div className="container mx-auto py-8 px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Your Admin 😎 Dashboard</h1>
            <div className="space-x-2">
              <Button variant="outline" onClick={handleEditAccount}>
                Edit Account
              </Button>
              <Button variant="destructive" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome back, {user?.email}</CardTitle>
                  <CardDescription>
                    Track your progress and explore new career paths
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={() => navigate("/Quiz")}>
                      Take Career Quiz
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => navigate("/Roadmap")}
                    >
                      Explore Career Roadmaps
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Saved Career Roadmaps</CardTitle>
                  <CardDescription>Career paths you've saved</CardDescription>
                </CardHeader>
                <CardContent>
                  {!user?.savedRoadmaps?.length ? (
                    <div className="text-center py-6 text-gray-500">
                      <p>You haven't saved any roadmaps yet.</p>
                      <p className="mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate("/Roadmap")}
                        >
                          Explore Roadmaps
                        </Button>
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {user.savedRoadmaps.map((roadmap) => (
                        <div
                          key={roadmap.id}
                          className="p-4 border rounded-lg flex justify-between items-center"
                        >
                          <div>
                            <h3 className="font-medium">{roadmap.title}</h3>
                            <p className="text-sm text-gray-500">
                              Saved on {roadmap.date}
                            </p>
                          </div>
                          <Button
                            onClick={() => {
                              localStorage.setItem(
                                "currentRoadmap",
                                JSON.stringify(roadmap.roadmapData)
                              );
                              navigate("/pages/roadmap");
                            }}
                          >
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {user?.savedRoadmaps?.length ? (
                      <div>
                        {user.savedRoadmaps.slice(0, 3).map((roadmap) => (
                          <div key={roadmap.id} className="py-2 border-b">
                            <p className="text-sm">
                              <span className="font-medium">
                                Roadmap saved:
                              </span>{" "}
                              {roadmap.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              {roadmap.date}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center py-4 text-gray-500">
                        No recent activity
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDash;
