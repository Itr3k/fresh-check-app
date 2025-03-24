
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Thermometer, AlertCircle, Utensils, Users, Cake, BookOpen, AlertTriangle, Tag } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const educationPages = [
  {
    id: 'temperature-danger-zone',
    title: 'Temperature Danger Zone',
    description: 'Learn about safe food temperatures and avoiding the 40°F-140°F danger zone',
    icon: Thermometer,
    url: '/food-safety/temperature-danger-zone',
    color: 'bg-red-100'
  },
  {
    id: 'foodborne-illness-prevention',
    title: 'Foodborne Illness Prevention',
    description: 'Recognize and prevent common foodborne illnesses like Salmonella and E. coli',
    icon: AlertCircle,
    url: '/food-safety/foodborne-illness-prevention',
    color: 'bg-blue-100'
  },
  {
    id: 'cross-contamination',
    title: 'Cross-Contamination',
    description: 'Essential practices to avoid spreading bacteria between foods in your kitchen',
    icon: Utensils,
    url: '/food-safety/cross-contamination',
    color: 'bg-green-100'
  },
  {
    id: 'understanding-food-labels',
    title: 'Understanding Food Labels',
    description: 'Learn the differences between "Best By," "Use By," and "Sell By" dates on packaging',
    icon: Tag,
    url: '/food-safety/understanding-food-labels',
    color: 'bg-purple-100'
  },
  {
    id: 'vulnerable-groups',
    title: 'Food Safety for Vulnerable Groups',
    description: 'Special precautions for pregnant women, elderly, children & immunocompromised',
    icon: Users,
    url: '/food-safety/vulnerable-groups',
    color: 'bg-purple-100'
  },
  {
    id: 'holiday-events',
    title: 'Holiday & Event Food Safety',
    description: 'Safe food handling for holidays, parties, picnics and outdoor gatherings',
    icon: Cake,
    url: '/food-safety/holiday-events',
    color: 'bg-yellow-100'
  },
  {
    id: 'science-of-spoilage',
    title: 'Science of Food Spoilage',
    description: 'Understanding bacteria, mold, and chemical changes that cause food to spoil',
    icon: BookOpen,
    url: '/food-safety/science-of-spoilage',
    color: 'bg-teal-100'
  },
  {
    id: 'emergency',
    title: 'Emergency Food Safety',
    description: 'Keeping food safe during power outages, floods, fires and natural disasters',
    icon: AlertTriangle,
    url: '/food-safety/emergency',
    color: 'bg-orange-100'
  }
];

const FoodSafetyEducation = () => {
  const isMobile = useIsMobile();
  
  // Reduce motion complexity on mobile
  const initialAnimation = isMobile ? 
    { opacity: 0 } : 
    { opacity: 0, y: 20 };
  
  const animation = isMobile ? 
    { opacity: 1 } : 
    { opacity: 1, y: 0 };
  
  const transitionDuration = isMobile ? 0.3 : 0.4;
  
  // Pre-calculate icon dimensions for layout stability
  const iconSize = isMobile ? 20 : 24;
  
  return (
    <div className="mt-8" id="food-safety-education">
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-xl font-semibold mb-4"
      >
        Food Safety Education
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {educationPages.map((page, index) => {
          const Icon = page.icon;
          
          // Stagger the animations less aggressively on mobile
          const delay = isMobile ? Math.min(index * 0.05, 0.3) : index * 0.1;
          
          return (
            <motion.div
              key={page.id}
              initial={initialAnimation}
              animate={animation}
              transition={{ duration: transitionDuration, delay }}
              style={{ display: 'flex', height: '100%' }} // Pre-allocate space
            >
              <Link
                to={page.url}
                className="flex items-center p-4 rounded-lg shadow-sm hover:shadow-md transition-all bg-white border border-border h-full"
                aria-label={`Learn about ${page.title}`}
              >
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${page.color}`}
                  style={{ minWidth: '3rem' }} // Prevent shrinking on mobile
                >
                  <Icon size={iconSize} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{page.title}</h3>
                  <p className="text-sm text-muted-foreground">{page.description}</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default FoodSafetyEducation;
