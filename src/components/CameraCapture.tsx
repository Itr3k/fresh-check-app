
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
        
        // Send the captured image data back to the parent component
        onCapture(imageSrc);
        
        // Stop camera after capture
        stopCamera();
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

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
      <div className="relative w-full h-full">
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
                  onClick={onClose}
                  className="bg-secondary text-foreground px-4 py-2 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="relative w-full h-full">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              )}
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="absolute inset-0 w-full h-full object-cover"
                onLoadedData={() => setIsLoading(false)}
              />
              
              {/* Camera Controls - Positioned at the bottom of the screen */}
              <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-4 px-4 z-10">
                <button 
                  onClick={handleCapture}
                  disabled={isLoading}
                  className={`w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  aria-label="Capture photo"
                >
                  <div className="w-12 h-12 bg-primary rounded-full"></div>
                </button>
              </div>
              
              {/* Top Controls */}
              <div className="absolute top-4 right-4 left-4 flex justify-between z-10">
                {isMobile && (
                  <button 
                    onClick={switchCamera} 
                    className="bg-black/50 text-white p-3 rounded-full"
                    aria-label="Switch camera"
                  >
                    <RefreshCw size={24} />
                  </button>
                )}
                <div className="flex-grow"></div>
                <button 
                  onClick={onClose} 
                  className="bg-black/50 text-white p-3 rounded-full"
                  aria-label="Close camera"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <canvas ref={canvasRef} className="hidden" />
          </>
        )}
      </div>
    </div>
  );
};

export default CameraCapture;
