
import { motion } from "framer-motion";
import { Check, Clock, X } from "lucide-react";

type Status = "fresh" | "use-soon" | "expired";

interface StatusIndicatorProps {
  status?: Status;
  daysText?: string;
  size?: "small" | "medium" | "large";
  daysRemaining?: number;
  maxDays?: number;
}

const StatusIndicator = ({ status: propStatus, daysText, size = "medium", daysRemaining, maxDays }: StatusIndicatorProps) => {
  // Determine status based on daysRemaining if provided
  let status = propStatus;
  let calculatedDaysText = daysText;
  
  if (daysRemaining !== undefined && maxDays !== undefined) {
    if (daysRemaining <= 0) {
      status = "expired";
    } else if (daysRemaining < maxDays * 0.3) {
      status = "use-soon";
    } else {
      status = "fresh";
    }
    
    // Generate days text if not provided
    if (!calculatedDaysText) {
      if (daysRemaining <= 0) {
        calculatedDaysText = "Expired";
      } else if (daysRemaining === 1) {
        calculatedDaysText = "1 day";
      } else {
        calculatedDaysText = `${daysRemaining} days`;
      }
    }
  }
  
  // Default to fresh if no status is determined
  status = status || "fresh";

  const getStatusConfig = () => {
    switch (status) {
      case "fresh":
        return {
          label: "Fresh",
          color: "bg-green-500",
          icon: <Check className="text-white" size={18} />,
          textColor: "text-green-600"
        };
      case "use-soon":
        return {
          label: "Use Soon",
          color: "bg-orange-400",
          icon: <Clock className="text-white" size={18} />,
          textColor: "text-orange-500"
        };
      case "expired":
        return {
          label: "Expired",
          color: "bg-red-500",
          icon: <X className="text-white" size={18} />,
          textColor: "text-red-600"
        };
      default:
        return {
          label: "Unknown",
          color: "bg-gray-400",
          icon: null,
          textColor: "text-gray-400"
        };
    }
  };

  const config = getStatusConfig();
  
  // Size classes
  const sizeClasses = {
    small: {
      container: "w-10 h-10",
      inner: "w-8 h-8",
      icon: "text-sm",
      text: "text-xs"
    },
    medium: {
      container: "w-12 h-12",
      inner: "w-10 h-10",
      icon: "text-base",
      text: "text-sm"
    },
    large: {
      container: "w-16 h-16",
      inner: "w-14 h-14",
      icon: "text-lg",
      text: "text-base"
    }
  };
  
  const sizeClass = sizeClasses[size];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center space-y-2"
    >
      <div className={`${config.color} ${sizeClass.container} rounded-full flex items-center justify-center shadow-md`}>
        <div className={`bg-white/20 ${sizeClass.inner} rounded-full flex items-center justify-center`}>
          {config.icon}
        </div>
      </div>
      {calculatedDaysText && (
        <div className="text-center">
          <div className={`font-semibold ${sizeClass.text} ${config.textColor}`}>{config.label}</div>
          <div className="text-sm text-muted-foreground">{calculatedDaysText}</div>
        </div>
      )}
    </motion.div>
  );
};

export default StatusIndicator;
