
import React from 'react';

interface CameraViewProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isLoading: boolean;
  onVideoLoaded: () => void;
}

const CameraView = ({ videoRef, isLoading, onVideoLoaded }: CameraViewProps) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      {isLoading && (
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary z-10"></div>
      )}
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover z-0"
        onLoadedData={onVideoLoaded}
      />
    </div>
  );
};

export default CameraView;
