
import React, { useState } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ErrorBoundaryImageProps {
  src: string;
  alt: string;
  aspectRatio?: number;
  className?: string;
  fallbackText?: string;
}

const ErrorBoundaryImage: React.FC<ErrorBoundaryImageProps> = ({
  src,
  alt,
  aspectRatio = 16 / 9,
  className = '',
  fallbackText
}) => {
  const [hasError, setHasError] = useState(false);
  
  const handleError = () => {
    console.log(`Image failed to load: ${src}`);
    setHasError(true);
  };

  const renderFallback = () => (
    <div className="w-full h-full flex items-center justify-center bg-muted/30 text-muted-foreground">
      <div className="text-center p-4">
        <span className="text-sm font-medium">{fallbackText || alt || 'Image unavailable'}</span>
      </div>
    </div>
  );

  return (
    <AspectRatio ratio={aspectRatio} className={className}>
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          className="object-cover w-full h-full rounded-t-lg"
          onError={handleError}
          loading="lazy"
        />
      ) : renderFallback()}
    </AspectRatio>
  );
};

export default ErrorBoundaryImage;
