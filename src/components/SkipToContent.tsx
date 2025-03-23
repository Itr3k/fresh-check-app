
import React from 'react';

const SkipToContent = () => {
  return (
    <a 
      href="#main-content" 
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/80 focus:ring-offset-2"
    >
      Skip to content
    </a>
  );
};

export default SkipToContent;
