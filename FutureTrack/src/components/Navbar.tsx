import { Link } from "react-router-dom";
import { useState } from "react";
import AuthDialog from "./AuthDialog";

const Navbar = () => {
  const [openAuth, setOpenAuth] = useState(false);

  return (
    <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-future-100 shadow-sm">
      <div className="container flex justify-between items-center py-3 px-4">
        <div className="flex items-center gap-4">
          <a href="/" className="text-2xl font-extrabold bg-gradient-to-r from-future-600 to-future-700 bg-clip-text text-transparent">
            FutureTrack
          </a>
        </div>
        <div className="flex gap-4 items-center">
          <a href="/quiz" className="hover:text-future-700 font-medium">Quiz</a>
          <a href="/roadmap" className="hover:text-future-700 font-medium">Roadmap</a>
          <button
            className="rounded-lg px-4 py-2 bg-gradient-to-r from-future-600 to-future-700 text-white font-semibold shadow hover:from-future-700 hover:to-future-800 transition-colors"
            onClick={() => setOpenAuth(true)}
          >
            Sign In / Up
          </button>
        </div>
      </div>
      <AuthDialog open={openAuth} setOpen={setOpenAuth} />
    </nav>
  );
};

export default Navbar;
