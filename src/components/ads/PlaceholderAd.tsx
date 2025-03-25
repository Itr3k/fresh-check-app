
import React from "react";
import { Square } from "lucide-react";

interface PlaceholderAdProps {
  adName: string;
  width: number;
  height: number;
}

const PlaceholderAd: React.FC<PlaceholderAdProps> = ({ adName, width, height }) => {
  return (
    <div className="text-center p-3 h-full w-full flex flex-col items-center justify-center bg-secondary/20 rounded-lg border border-border/40">
      <p className="text-xs text-muted-foreground mb-1 font-medium">
        Advertisement
      </p>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex items-center justify-center w-[90%] h-[70%] bg-secondary/30 rounded-md border border-dashed border-border/50">
          <Square className="w-6 h-6 text-muted-foreground/60" />
        </div>
        <p className="text-xs text-muted-foreground mt-2 italic">
          {adName} ({width}×{height})
        </p>
      </div>
    </div>
  );
};

export default PlaceholderAd;
