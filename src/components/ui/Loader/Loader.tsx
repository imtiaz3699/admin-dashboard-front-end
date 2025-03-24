import React from "react";

interface LoaderProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const Loader: React.FC<LoaderProps> = ({ isLoading, children }) => {
  return (
    <div className="relative">
      {/* Wrapped Component */}
      {children}

      {/* Loader Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center bg-transparent bg-opacity-25 z-50 backdrop-blur-xs">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
        </div>
      )}
    </div>
  );
};

export default Loader;
