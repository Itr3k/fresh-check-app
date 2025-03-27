
import React, { useEffect, useState } from 'react';

const Debug: React.FC = () => {
  const [renderTime, setRenderTime] = useState<string>('');
  
  useEffect(() => {
    const timestamp = new Date().toISOString();
    setRenderTime(timestamp);
    
    console.log('Debug component mounted at:', timestamp);
    
    // Log basic environment information
    console.log('Environment:', {
      isDev: process.env.NODE_ENV === 'development',
      isProduction: process.env.NODE_ENV === 'production',
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });
    
    return () => {
      console.log('Debug component unmounted');
    };
  }, []);
  
  return (
    <div className="fixed top-0 left-0 z-50 bg-red-500 text-white p-2 text-sm flex flex-col">
      <div>Debug: Application is rendering</div>
      <div className="text-xs">Render time: {renderTime}</div>
      <div className="text-xs">Env: {process.env.NODE_ENV}</div>
    </div>
  );
};

export default Debug;
