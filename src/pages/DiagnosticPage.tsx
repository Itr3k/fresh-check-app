
import React, { useEffect, useState } from 'react';
import { useImages } from '../contexts/ImagesContext';
import { useRecalls } from '../contexts/RecallsContext';
import { Link } from 'react-router-dom';

const DiagnosticPage: React.FC = () => {
  const [diagnosticInfo, setDiagnosticInfo] = useState<Record<string, any>>({});
  
  useEffect(() => {
    // Collect diagnostic information on mount
    const info: Record<string, any> = {
      timestamp: new Date().toISOString(),
      reactVersion: React.version,
      environment: process.env.NODE_ENV,
      userAgent: navigator.userAgent,
      screen: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };
    
    setDiagnosticInfo(info);
    console.log('DiagnosticPage mounted - collecting system info', info);
  }, []);

  // Try to use contexts to verify they work
  let imagesContextWorking = true;
  let imagesContextError = '';
  let recallsContextWorking = true;
  let recallsContextError = '';

  try {
    // Test ImagesContext
    const { getImageUrl } = useImages();
    const testUrl = getImageUrl('test');
    console.log('ImagesContext test URL:', testUrl);
  } catch (error) {
    imagesContextWorking = false;
    imagesContextError = error instanceof Error ? error.message : String(error);
    console.error('ImagesContext error:', error);
  }

  try {
    // Test RecallsContext
    const { recalls } = useRecalls();
    console.log('RecallsContext test - recalls count:', recalls.length);
  } catch (error) {
    recallsContextWorking = false;
    recallsContextError = error instanceof Error ? error.message : String(error);
    console.error('RecallsContext error:', error);
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">React Diagnostic Page</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Context API Status</h2>
        <div className="grid gap-4">
          <div className={`p-4 rounded-lg ${imagesContextWorking ? 'bg-green-100' : 'bg-red-100'}`}>
            <h3 className="font-medium">ImagesContext</h3>
            <p>{imagesContextWorking ? '✅ Working correctly' : '❌ Not working'}</p>
            {!imagesContextWorking && <p className="text-red-600 mt-2">{imagesContextError}</p>}
          </div>
          
          <div className={`p-4 rounded-lg ${recallsContextWorking ? 'bg-green-100' : 'bg-red-100'}`}>
            <h3 className="font-medium">RecallsContext</h3>
            <p>{recallsContextWorking ? '✅ Working correctly' : '❌ Not working'}</p>
            {!recallsContextWorking && <p className="text-red-600 mt-2">{recallsContextError}</p>}
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Environment Info</h2>
        <div className="grid gap-2">
          <p><strong>Node Environment:</strong> {process.env.NODE_ENV}</p>
          <p><strong>React Version:</strong> {React.version}</p>
          <p><strong>User Agent:</strong> {navigator.userAgent}</p>
          <p><strong>Window Size:</strong> {diagnosticInfo.screen?.width}x{diagnosticInfo.screen?.height}</p>
          <p><strong>Timestamp:</strong> {diagnosticInfo.timestamp}</p>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">React Rendering Test</h2>
        <div className="p-4 bg-green-100 rounded-lg">
          <p>If you can see this text, React is rendering correctly! ✅</p>
        </div>
      </div>
      
      <div className="flex justify-between">
        <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default DiagnosticPage;
