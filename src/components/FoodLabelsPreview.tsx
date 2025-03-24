
import React from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tag, Calendar, Clock, AlertTriangle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const FoodLabelsPreview = () => {
  const isMobile = useIsMobile();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const labelTypes = [
    {
      id: "best-by",
      name: "Best By",
      icon: <Calendar className="h-6 w-6 text-blue-500" />,
      color: "bg-blue-50 border-blue-200",
      description: "Indicates peak quality, not safety",
      example: "Best if used by 05/15/2023"
    },
    {
      id: "use-by",
      name: "Use By",
      icon: <Clock className="h-6 w-6 text-amber-500" />,
      color: "bg-amber-50 border-amber-200",
      description: "Last date for peak quality",
      example: "Use by 05/15/2023"
    },
    {
      id: "sell-by",
      name: "Sell By",
      icon: <Tag className="h-6 w-6 text-green-500" />,
      color: "bg-green-50 border-green-200",
      description: "For store inventory management",
      example: "Sell by 05/15/2023"
    }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mb-12 rounded-xl overflow-hidden border border-primary/10 bg-gradient-to-r from-primary/5 to-secondary/5"
    >
      <div className="p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Tag className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">Understanding Food Labels</h2>
          </div>
          <Link 
            to="/food-safety/understanding-food-labels" 
            className="text-primary hover:text-primary/80 flex items-center gap-1 text-sm font-medium"
          >
            Learn more <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <p className="text-muted-foreground mb-6 max-w-3xl">
          Do you know the difference between "Best By," "Use By," and "Sell By" dates? 
          Understanding these labels can help you make informed decisions about food safety and reduce waste.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {labelTypes.map((label) => (
            <motion.div key={label.id} variants={itemVariants}>
              <Card className={`border ${label.color} h-full`}>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    {label.icon}
                    <h3 className="text-lg font-semibold">{label.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{label.description}</p>
                  <div className="bg-background/80 p-2 rounded-md text-xs font-mono">
                    {label.example}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <p>Food can be safe to eat even after the "Best By" or "Sell By" date has passed.</p>
        </div>
        
        <div className="mt-6">
          <Link 
            to="/food-safety/understanding-food-labels" 
            className="inline-flex items-center justify-center h-10 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Detailed Food Label Guide
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodLabelsPreview;
