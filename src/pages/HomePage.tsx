import React from "react";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

const HomePage: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-cyan-700 to-sky-800 text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center p-16">
        <div className="md:w-1/2">
          <h1 className="text-5xl font-bold text-white mb-6 animate-fadeIn">
            Discover and Join Amazing Events
          </h1>
          <p className="text-xl text-gray-100 mb-8 animate-fadeIn delay-200">
            Explore a wide range of events happening around you. Connect with
            people who share your interests.
          </p>
          <Link
            to="/events"
            className="inline-flex items-center px-6 py-3 bg-accent text-white font-bold rounded-lg shadow-lg hover:bg-pink-600 transition-all duration-200 animate-bounce"
          >
            Explore Events
            <ChevronRightIcon className="w-5 h-5 ml-2" />
          </Link>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 relative">
          <img
            src="https://picsum.photos/600/400?random"
            alt="Events"
            className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
