
import React, { useState, useRef, useEffect } from 'react';
import { toast } from '../hooks/use-toast';
import { X } from 'lucide-react';

interface CameraCaptureProps {
  onCapture: (imageSrc: string) => void;
  onClose: () => void;
}

const CameraCapture = ({ onCapture, onClose }: CameraCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
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
    }
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageSrc = canvas.toDataURL('image/png');
        onCapture(imageSrc);
        
        // Stop camera after capture
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <div className="relative max-w-lg w-full mx-auto">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full"
        >
          <X size={24} />
        </button>
        
        {error ? (
          <div className="bg-white p-6 rounded-lg text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={onClose}
              className="bg-primary text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="bg-black rounded-lg overflow-hidden">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="mt-4 flex justify-center">
              <button 
                onClick={handleCapture}
                className="bg-primary text-white px-6 py-3 rounded-full shadow-lg"
              >
                Capture
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
