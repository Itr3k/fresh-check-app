
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, FileCheck, Scale, Book } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import AdUnit from "@/components/AdUnit";

const AboutPage = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>About FreshCheck - Our Food Storage Methodology | FreshCheck</title>
        <meta 
          name="description" 
          content="Learn about FreshCheck's methodology for determining food storage guidelines. Our information is verified using USDA, FDA, and university extension service resources."
        />
        <link rel="canonical" href="https://freshcheck.app/about" />
      </Helmet>

      <div className="pt-20 pb-12 max-w-3xl mx-auto px-4">
        <div className="mb-4">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={18} className="mr-1" />
            <span>Back</span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-semibold mb-2">About FreshCheck</h1>
          <p className="text-lg text-muted-foreground">Our food storage research methodology</p>
        </motion.div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
          <p className="mb-4">
            FreshCheck was created to help reduce food waste and prevent foodborne illness by providing clear, 
            accurate information about food storage and spoilage. Each year, Americans throw away approximately 
            30-40% of their food supply, while millions of people fall ill from improperly handled food.
          </p>
          <p>
            We believe that by providing easy access to expert food storage guidelines, we can help you keep 
            your food fresh longer, save money, and stay healthy.
          </p>
        </div>

        <AdUnit slotId="about-page-top" className="mb-6" format="leaderboard" />

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Our Research Methodology</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Government Sources</h3>
                <p className="text-sm text-muted-foreground">
                  Our primary sources include USDA (United States Department of Agriculture) and FDA (Food and Drug Administration) 
                  guidelines. These agencies provide science-based recommendations for food safety and storage that form the 
                  foundation of our content.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Book size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Academic Research</h3>
                <p className="text-sm text-muted-foreground">
                  We reference food science research from universities and extension services, which provide detailed studies 
                  on food preservation, spoilage mechanisms, and optimal storage conditions. This helps us provide comprehensive 
                  information beyond basic guidelines.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Scale size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Cross-Verification</h3>
                <p className="text-sm text-muted-foreground">
                  We cross-reference information from multiple reputable sources to ensure accuracy. When sources differ, 
                  we provide ranges (e.g., 3-7 days) and explain the factors that might affect shelf life, allowing you 
                  to make informed decisions based on your specific circumstances.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <FileCheck size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Regular Updates</h3>
                <p className="text-sm text-muted-foreground">
                  Food safety guidelines evolve as new research emerges. We regularly review and update our content to 
                  reflect the latest recommendations from authoritative sources, ensuring you have access to current, 
                  accurate information.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Our Primary Sources</h2>
          
          <ul className="space-y-3">
            <li className="flex items-start space-x-2 text-sm p-3 bg-secondary/20 rounded-lg">
              <span className="font-medium text-primary">•</span>
              <div>
                <a 
                  href="https://www.fsis.usda.gov/" 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="font-medium hover:underline"
                >
                  USDA Food Safety and Inspection Service
                </a>
                <p className="text-muted-foreground">Official food safety information regarding meat, poultry, and egg products</p>
              </div>
            </li>
            
            <li className="flex items-start space-x-2 text-sm p-3 bg-secondary/20 rounded-lg">
              <span className="font-medium text-primary">•</span>
              <div>
                <a 
                  href="https://www.fda.gov/food" 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="font-medium hover:underline"
                >
                  FDA Food Safety
                </a>
                <p className="text-muted-foreground">Guidelines for safe handling and storage of various food products</p>
              </div>
            </li>
            
            <li className="flex items-start space-x-2 text-sm p-3 bg-secondary/20 rounded-lg">
              <span className="font-medium text-primary">•</span>
              <div>
                <a 
                  href="https://www.foodsafety.gov/" 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="font-medium hover:underline"
                >
                  FoodSafety.gov
                </a>
                <p className="text-muted-foreground">Federal resource for consumer food safety information</p>
              </div>
            </li>
            
            <li className="flex items-start space-x-2 text-sm p-3 bg-secondary/20 rounded-lg">
              <span className="font-medium text-primary">•</span>
              <div>
                <a 
                  href="https://extension.psu.edu/food-safety-and-processing" 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="font-medium hover:underline"
                >
                  Penn State Extension Food Safety Program
                </a>
                <p className="text-muted-foreground">Research-based information on food preservation and storage</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Disclaimer</h2>
          <p className="text-sm text-muted-foreground">
            FreshCheck provides general guidelines based on reputable sources, but individual circumstances may vary. 
            Factors such as handling, packaging, temperature fluctuations, and product variations can affect food 
            shelf life. Always use your judgment and discard food that shows signs of spoilage, regardless of date. 
            When in doubt, throw it out.
          </p>
        </div>
        
        <AdUnit slotId="about-page-bottom" className="mb-6" format="leaderboard" lazyLoad={true} />
      </div>
    </PageTransition>
  );
};

export default AboutPage;
