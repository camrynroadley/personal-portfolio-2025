import React from "react";

const LoadingSpinner = ({ size = "8", color = "gray-500" }: { size?: string; color?: string }) => {
  return (
    <div className={`w-${size} h-${size} border-4 border-${color} border-t-transparent rounded-full animate-spin`} />
  );
};

export default LoadingSpinner;
