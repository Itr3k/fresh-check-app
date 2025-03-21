
import React from "react";
import { motion } from "framer-motion";

interface AdUnitProps {
  slotId: string;
  className?: string;
  format?: "rectangle" | "leaderboard" | "skyscraper";
}

const AdUnit: React.FC<AdUnitProps> = ({ 
  slotId, 
  className = "",
  format = "rectangle"
}) => {
  // Size based on format
  let sizeClass = "h-[250px] w-full"; // default rectangle

  if (format === "leaderboard") {
    sizeClass = "h-[90px] w-full";
  } else if (format === "skyscraper") {
    sizeClass = "h-[600px] w-[160px] md:w-[300px]";
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className={`bg-secondary/30 border border-border rounded-lg overflow-hidden flex items-center justify-center ${sizeClass} ${className}`}
      id={`ad-slot-${slotId}`}
    >
      <div className="text-center p-4">
        <p className="text-xs text-muted-foreground">Advertisement</p>
        <p className="text-sm text-muted-foreground opacity-70">Ad ID: {slotId}</p>
      </div>
    </motion.div>
  );
};

export default AdUnit;
