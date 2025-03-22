
import React from 'react';

interface CameraErrorProps {
  error: string;
  onRetry: () => void;
  onClose: () => void;
}

const CameraError = ({ error, onRetry, onClose }: CameraErrorProps) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg text-center mx-4">
        <p className="text-red-500 mb-4">{error}</p>
        <div className="flex justify-center space-x-4">
          <button 
            onClick={onRetry}
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
          <button 
            onClick={onClose}
            className="bg-secondary text-foreground px-4 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraError;
