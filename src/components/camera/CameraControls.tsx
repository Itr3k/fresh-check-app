
import React from 'react';
import { X, RefreshCw } from 'lucide-react';

interface CameraControlsProps {
  onCapture: () => void;
  onClose: () => void;
  onSwitchCamera: () => void;
  isLoading: boolean;
  showSwitchButton: boolean;
}

const CameraControls = ({ 
  onCapture, 
  onClose, 
  onSwitchCamera, 
  isLoading, 
  showSwitchButton 
}: CameraControlsProps) => {
  return (
    <>
      {/* Camera Controls - Fixed positioning for better mobile support */}
      <div className="fixed bottom-20 left-0 right-0 flex justify-center items-center z-10">
        <button 
          onClick={onCapture}
          disabled={isLoading}
          className={`w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          aria-label="Capture photo"
        >
          <div className="w-16 h-16 bg-primary rounded-full"></div>
        </button>
      </div>
      
      {/* Top Controls - Fixed positioning */}
      <div className="fixed top-4 right-4 left-4 flex justify-between z-10">
        {showSwitchButton && (
          <button 
            onClick={onSwitchCamera} 
            className="bg-black/70 text-white p-3 rounded-full shadow-lg"
            aria-label="Switch camera"
          >
            <RefreshCw size={24} />
          </button>
        )}
        <div className="flex-grow"></div>
        <button 
          onClick={onClose} 
          className="bg-black/70 text-white p-3 rounded-full shadow-lg"
          aria-label="Close camera"
        >
          <X size={24} />
        </button>
      </div>
    </>
  );
};

export default CameraControls;
