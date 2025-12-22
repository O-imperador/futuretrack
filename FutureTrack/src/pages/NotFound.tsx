
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Footer from "../components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center px-4 py-16 max-w-md">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-future-600 to-future-800 bg-clip-text text-transparent">404</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-future-600 to-future-800 mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 mb-8">Oops! It seems you've ventured off the career path.</p>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved to a new location.
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-future-600 to-future-700 hover:from-future-700 hover:to-future-800">
            <Link to="/">
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
