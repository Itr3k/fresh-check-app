
import React from "react";
import AdUnit from "@/components/AdUnit";

interface AdBannerProps {
  id: string;
  className?: string;
  label?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ id, className, label }) => {
  return (
    <div className={`text-center my-6 ${className || ""}`}>
      {label && (
        <p className="text-xs text-muted-foreground mb-2">{label}</p>
      )}
      <div className="bg-[#f8f9fa] rounded-md p-2 flex justify-center items-center">
        <AdUnit
          slotId={id}
          format="leaderboard"
          mobileFormat="rectangle"
        />
      </div>
      <div className="flex justify-center mt-2">
        <span className="text-xs text-muted-foreground px-2 py-0.5 bg-[#ebf7ed] text-[#16a34a] rounded-full">
          LoadSeconds: 0.4 (73ms/94%)
        </span>
      </div>
    </div>
  );
};

export default AdBanner;
