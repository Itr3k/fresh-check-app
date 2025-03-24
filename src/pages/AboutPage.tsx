
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertCircle, Mail, ExternalLink } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import PageTransition from '@/components/PageTransition';
import AdUnit from '@/components/AdUnit';

const AboutPage = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>About FreshCheck | Food Shelf Life Guide</title>
        <meta
          name="description"
          content="Learn about FreshCheck, a comprehensive guide to food shelf life, storage tips, and food safety."
        />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">About FreshCheck</h1>
        
        <div className="prose prose-sm sm:prose max-w-none text-foreground">
          <p>
            FreshCheck is your comprehensive guide to food shelf life, proper storage, and food safety. 
            Our mission is to help you reduce food waste, save money, and protect your health by providing 
            accurate, reliable information on how long foods stay fresh and how to store them properly.
          </p>
          
          {/* First ad placement - top of content */}
          <div className="my-6">
            <AdUnit slotId="about-top" format="leaderboard" />
          </div>
          
          <h2>Our Mission</h2>
          <p>
            Every year, approximately one-third of all food produced globally is wasted. At the same time, 
            foodborne illnesses affect millions of people. At FreshCheck, we believe many of these issues 
            could be prevented with better information and awareness.
          </p>
          <p>
            We aim to empower consumers with the knowledge they need to make informed decisions about food 
            purchasing, storage, and consumption. By understanding how long foods last and how to store them 
            properly, you can reduce waste, save money, and keep your family safe from foodborne illnesses.
          </p>
          
          <h2>Our Information</h2>
          <p>
            FreshCheck provides shelf life information, storage tips, and signs of spoilage for a wide variety 
            of foods. Our data is compiled from reliable sources, including food safety agencies, academic 
            research, and culinary experts.
          </p>
          
          <Alert className="my-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Important Disclaimer</AlertTitle>
            <AlertDescription>
              While we strive for accuracy, food safety involves many variables including storage conditions, 
              handling practices, and individual product variations. Always use your judgment and follow proper 
              food safety practices. When in doubt, throw it out.
            </AlertDescription>
          </Alert>
          
          {/* Second ad placement - middle of content */}
          <div className="my-6">
            <AdUnit slotId="about-middle" format="rectangle" />
          </div>
          
          <h2>Food Safety Education</h2>
          <p>
            Beyond shelf life information, FreshCheck provides comprehensive educational resources on food 
            safety topics, including:
          </p>
          <ul>
            <li>Understanding the temperature danger zone</li>
            <li>Preventing cross-contamination</li>
            <li>Food safety for vulnerable populations</li>
            <li>Safe food handling during emergencies</li>
            <li>Holiday and event food safety</li>
            <li>And much more</li>
          </ul>
          <p>
            We believe education is key to preventing foodborne illness and making informed food handling decisions.
          </p>
          
          <h2>Contact Us</h2>
          <p>
            Have suggestions, questions, or feedback? We'd love to hear from you! Contact us at:
          </p>
          <p className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <a href="mailto:info@freshcheck.app" className="text-primary hover:underline">info@freshcheck.app</a>
          </p>
          
          {/* Third ad placement - bottom of content */}
          <div className="my-6">
            <AdUnit slotId="about-bottom" format="leaderboard" lazyLoad={true} />
          </div>
          
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-lg font-medium mb-4">Explore FreshCheck</h3>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/">Home</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/search">Search Foods</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/food-safety/temperature-danger-zone">Food Safety</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AboutPage;
