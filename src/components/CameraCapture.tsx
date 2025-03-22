
import React, { useState, useRef, useEffect } from 'react';
import { toast } from '../hooks/use-toast';
import { X, Camera, RefreshCw } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

interface CameraCaptureProps {
  onCapture: (imageSrc: string) => void;
  onClose: () => void;
}

const CameraCapture = ({ onCapture, onClose }: CameraCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const isMobile = useIsMobile();

  useEffect(() => {
    startCamera();
    
    // Ensure the body doesn't scroll while camera is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      stopCamera();
      document.body.style.overflow = '';
    };
  }, [facingMode]);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const startCamera = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Stop any existing stream before requesting a new one
      stopCamera();
      
      console.log(`Requesting camera access with facingMode: ${facingMode}`);
      
      // Try to get the camera with the specified facing mode
      const constraints = {
        video: { 
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };
      
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log('Camera access granted!', mediaStream);
      
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        // Ensure the video is visible and able to play
        videoRef.current.style.display = 'block';
        videoRef.current.play().catch(err => {
          console.error('Error playing video:', err);
        });
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Could not access your camera. Please allow camera access or try a different device.');
      toast({
        title: 'Camera Access Error',
        description: 'Could not access your camera. Please check permissions.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const switchCamera = () => {
    setFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
  };

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
    } else {
      console.error('Video or canvas reference not available');
      toast({
        title: 'Capture Failed',
        description: 'Could not capture image. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleClose = () => {
    console.log('Camera closing...');
    // Make sure to stop camera before closing
    stopCamera();
    // Call the onClose callback
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
      <div className="relative w-full h-full max-h-screen overflow-hidden">
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg text-center mx-4">
              <p className="text-red-500 mb-4">{error}</p>
              <div className="flex justify-center space-x-4">
                <button 
                  onClick={() => startCamera()}
                  className="bg-primary text-white px-4 py-2 rounded-lg"
                >
                  Try Again
                </button>
                <button 
                  onClick={handleClose}
                  className="bg-secondary text-foreground px-4 py-2 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              {isLoading ? (
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              ) : (
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  className="h-full w-full object-cover"
                  onLoadedData={() => {
                    setIsLoading(false);
                    console.log("Video loaded and ready to display");
                  }}
                />
              )}
            </div>
            
            {/* Camera Controls - Fixed positioning for better mobile support */}
            <div className="fixed bottom-20 left-0 right-0 flex justify-center items-center z-10">
              <button 
                onClick={handleCapture}
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
              {isMobile && (
                <button 
                  onClick={switchCamera} 
                  className="bg-black/70 text-white p-3 rounded-full shadow-lg"
                  aria-label="Switch camera"
                >
                  <RefreshCw size={24} />
                </button>
              )}
              <div className="flex-grow"></div>
              <button 
                onClick={handleClose} 
                className="bg-black/70 text-white p-3 rounded-full shadow-lg"
                aria-label="Close camera"
              >
                <X size={24} />
              </button>
            </div>
            
            <canvas ref={canvasRef} className="hidden" />
          </>
        )}
      </div>
    </div>
  );
};

export default CameraCapture;
