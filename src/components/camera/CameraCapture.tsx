
import React, { useRef, useEffect } from 'react';
import { useIsMobile } from '../../hooks/use-mobile';
import { useCameraStream } from './useCameraStream';
import CameraView from './CameraView';
import CameraControls from './CameraControls';
import CameraError from './CameraError';

interface CameraCaptureProps {
  onCapture: (imageSrc: string) => void;
  onClose: () => void;
}

const CameraCapture = ({ onCapture, onClose }: CameraCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();
  
  const {
    stream,
    error,
    isLoading,
    facingMode,
    startCamera,
    stopCamera,
    switchCamera,
    setError
  } = useCameraStream();

  useEffect(() => {
    if (videoRef.current) {
      startCamera(videoRef);
    }
    
    // Ensure the body doesn't scroll while camera is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      stopCamera();
      document.body.style.overflow = '';
    };
  }, [facingMode, startCamera, stopCamera]);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        // Draw the current video frame to the canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to data URL (PNG format)
        const imageSrc = canvas.toDataURL('image/png');
        console.log('Image captured successfully');
        
        // Ensure camera is stopped before calling onCapture
        stopCamera();
        
        // Send the captured image data back to the parent component
        onCapture(imageSrc);
      }
    }
  };

  const handleClose = () => {
    console.log('Camera closing...');
    // Make sure to stop camera before closing
    stopCamera();
    // Call the onClose callback
    onClose();
  };

  const handleVideoLoaded = () => {
    console.log("Video loaded and ready to display");
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
      <div className="relative w-full h-full max-h-screen overflow-hidden">
        {error ? (
          <CameraError 
            error={error} 
            onRetry={() => startCamera(videoRef)} 
            onClose={handleClose} 
          />
        ) : (
          <>
            <CameraView 
              videoRef={videoRef} 
              isLoading={isLoading} 
              onVideoLoaded={handleVideoLoaded} 
            />
            
            <CameraControls 
              onCapture={handleCapture}
              onClose={handleClose}
              onSwitchCamera={switchCamera}
              isLoading={isLoading}
              showSwitchButton={isMobile}
            />
            
            <canvas ref={canvasRef} className="hidden" />
          </>
        )}
      </div>
    </div>
  );
};

export default CameraCapture;
