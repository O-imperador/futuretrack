
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-future-600 to-future-800 bg-clip-text text-transparent">
              FutureTrack
            </h3>
            <p className="text-gray-600 text-sm">
              Helping teenagers navigate their career paths with AI-powered guidance and personalized roadmaps.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-future-600 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="text-gray-600 hover:text-future-600 text-sm">
                  Take the Quiz
                </Link>
              </li>
              <li>
                <Link to="/roadmap" className="text-gray-600 hover:text-future-600 text-sm">
                  View Roadmap
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-future-600 text-sm">
                  Career Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-future-600 text-sm">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-future-600 text-sm">
                  Career Library
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-future-600 text-sm">
                  Support
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-future-600 text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-future-600 text-sm">
                  Contact
                </a>
              </li>
              <li>
                <a href="https://github.com" className="text-gray-600 hover:text-future-600 text-sm">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} FutureTrack. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
