
import { motion } from "framer-motion";
import { Check, Clock, X } from "lucide-react";

type Status = "fresh" | "use-soon" | "expired";

interface StatusIndicatorProps {
  status: Status;
  daysText: string;
}

const StatusIndicator = ({ status, daysText }: StatusIndicatorProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case "fresh":
        return {
          label: "Fresh",
          color: "bg-status-fresh",
          icon: <Check className="text-white" size={18} />,
          textColor: "text-status-fresh"
        };
      case "use-soon":
        return {
          label: "Use Soon",
          color: "bg-status-soon",
          icon: <Clock className="text-white" size={18} />,
          textColor: "text-status-soon"
        };
      case "expired":
        return {
          label: "Expired",
          color: "bg-status-expired",
          icon: <X className="text-white" size={18} />,
          textColor: "text-status-expired"
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

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center space-y-2"
    >
      <div className={`${config.color} w-16 h-16 rounded-full flex items-center justify-center shadow-md`}>
        <div className="bg-white/20 w-14 h-14 rounded-full flex items-center justify-center">
          {config.icon}
        </div>
      </div>
      <div className="text-center">
        <div className={`font-semibold text-lg ${config.textColor}`}>{config.label}</div>
        <div className="text-sm text-muted-foreground">{daysText}</div>
      </div>
    </motion.div>
  );
};

export default StatusIndicator;
