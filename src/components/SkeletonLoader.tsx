import React from "react";

const SkeletonLoader: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-300 h-48 w-full mb-4"></div>
      <div className="space-y-4">
        <div className="bg-gray-300 h-6 w-3/4"></div>
        <div className="bg-gray-300 h-6 w-1/2"></div>
        <div className="bg-gray-300 h-6 w-1/4"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
