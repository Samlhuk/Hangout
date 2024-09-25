import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-cyan-900 to-sky-900 py-6 text-white">
      <div className="max-w-7xl mx-auto text-center space-y-4">
        <p className="text-lg font-semibold">
          {new Date().getFullYear()} This is a demo site and for deomstration
          purposes only.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
