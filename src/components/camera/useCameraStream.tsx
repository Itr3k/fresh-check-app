
import { useState, useEffect, useCallback } from 'react';
import { toast } from '../../hooks/use-toast';

type FacingMode = 'user' | 'environment';

export const useCameraStream = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [facingMode, setFacingMode] = useState<FacingMode>('environment');

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  const startCamera = useCallback(async (videoRef: React.RefObject<HTMLVideoElement>) => {
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
        const videoElement = videoRef.current;
        videoElement.srcObject = mediaStream;
        
        // Clear any previous style settings and set new ones
        videoElement.style.display = 'block';
        videoElement.style.width = '100%';
        videoElement.style.height = '100%';
        videoElement.style.objectFit = 'cover';
        videoElement.style.position = 'absolute';
        videoElement.style.top = '0';
        videoElement.style.left = '0';
        videoElement.style.zIndex = '1'; // Ensure video appears above background
        
        console.log("Starting video playback");
        
        // Handle play() with a proper Promise catch
        videoElement.play().catch((playErr) => {
          console.error('Error playing video:', playErr);
          setError('Could not start video feed. Please try again or check permissions.');
        });
      } else {
        console.error('Video element reference not available');
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
      // We'll let the onLoadedData event set isLoading to false
      // rather than setting it here, to ensure the video is actually visible
    }
  }, [facingMode, stopCamera]);

  const switchCamera = useCallback(() => {
    setFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
  }, []);

  // Clean up camera stream when component unmounts
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return {
    stream,
    error,
    isLoading,
    facingMode,
    startCamera,
    stopCamera,
    switchCamera,
    setError,
    setIsLoading // Export this so it can be used by the video's onLoadedData event
  };
};
