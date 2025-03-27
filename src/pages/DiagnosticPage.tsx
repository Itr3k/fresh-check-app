
import React, { useEffect } from 'react';
import { useImages } from '../contexts/ImagesContext';
import { useRecalls } from '../contexts/RecallsContext';
import { Link } from 'react-router-dom';

const DiagnosticPage: React.FC = () => {
  useEffect(() => {
    console.log('DiagnosticPage mounted - checking context providers');
  }, []);

  // Try to use contexts to verify they work
  let imagesContextWorking = true;
  let recallsContextWorking = true;
  let errorMessage = '';

  try {
    // Test ImagesContext
    const { getImageUrl } = useImages();
    const testUrl = getImageUrl('test');
    console.log('ImagesContext test URL:', testUrl);
  } catch (error) {
    imagesContextWorking = false;
    errorMessage += `ImagesContext error: ${error instanceof Error ? error.message : String(error)}\n`;
    console.error('ImagesContext error:', error);
  }

  try {
    // Test RecallsContext
    const { recalls } = useRecalls();
    console.log('RecallsContext test - recalls count:', recalls.length);
  } catch (error) {
    recallsContextWorking = false;
    errorMessage += `RecallsContext error: ${error instanceof Error ? error.message : String(error)}\n`;
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
          </div>
          
          <div className={`p-4 rounded-lg ${recallsContextWorking ? 'bg-green-100' : 'bg-red-100'}`}>
            <h3 className="font-medium">RecallsContext</h3>
            <p>{recallsContextWorking ? '✅ Working correctly' : '❌ Not working'}</p>
          </div>
        </div>
      </div>
      
      {errorMessage && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Error Details</h2>
          <pre className="p-4 bg-gray-100 rounded-lg overflow-auto text-sm whitespace-pre-wrap">
            {errorMessage}
          </pre>
        </div>
      )}
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Environment Info</h2>
        <div className="grid gap-2">
          <p><strong>Node Environment:</strong> {process.env.NODE_ENV}</p>
          <p><strong>React Version:</strong> {React.version}</p>
          <p><strong>User Agent:</strong> {navigator.userAgent}</p>
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
