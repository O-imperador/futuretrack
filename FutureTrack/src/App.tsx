import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Quiz from "./pages/Quiz";
import Roadmap from "./pages/Roadmap";
import UserDash from "./pages/UserDash";
import AdminDash from "./pages/AdminDash";
import NotFound from "./pages/NotFound";
import EditAccount from "./pages/account/edit";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/user" element={<UserDash />} />
              <Route path="/admin" element={<AdminDash />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/account/edit" element={<EditAccount />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
