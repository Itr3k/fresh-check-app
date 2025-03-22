
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
    
    return () => {
      stopCamera();
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
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center">
      <div className="relative max-w-lg w-full mx-auto">
        <div className="absolute top-4 right-4 z-10 flex space-x-2">
          {isMobile && (
            <button 
              onClick={switchCamera} 
              className="bg-black/50 text-white p-2 rounded-full"
              aria-label="Switch camera"
            >
              <RefreshCw size={24} />
            </button>
          )}
          <button 
            onClick={onClose} 
            className="bg-black/50 text-white p-2 rounded-full"
            aria-label="Close camera"
          >
            <X size={24} />
          </button>
        </div>
        
        {error ? (
          <div className="bg-white p-6 rounded-lg text-center">
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
        ) : (
          <>
            <div className="bg-black rounded-lg overflow-hidden relative">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              )}
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover"
                onLoadedData={() => setIsLoading(false)}
              />
            </div>
            
            <div className="mt-4 flex justify-center">
              <button 
                onClick={handleCapture}
                disabled={isLoading}
                className={`bg-primary text-white px-6 py-3 rounded-full shadow-lg flex items-center justify-center ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90'
                }`}
              >
                <Camera className="mr-2" size={20} />
                Capture Photo
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
