
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Info, Calendar, ShoppingBag, Clock } from 'lucide-react';
import FoodSafetyLayout from '@/components/FoodSafetyLayout';
import { Button } from '@/components/ui/button';

const UnderstandingFoodLabels = () => {
  return (
    <>
      <FoodSafetyLayout
        title="Understanding Food Labels"
        description="Learn the differences between 'Best By,' 'Use By,' and 'Sell By' dates on food packaging to make informed decisions about food safety and quality."
        icon={<Info className="w-4 h-4" />}
        iconBgColor="bg-blue-100"
        iconTextColor="text-blue-700"
        keywords="food date labels, best by date, use by date, sell by date, food expiration labels, food package dates, food quality dates"
      >
        <div className="prose prose-sm sm:prose max-w-none text-foreground">
          <h2 className="text-xl font-semibold mb-4">What Do Food Date Labels Really Mean?</h2>
          
          <p>
            Food date labels can be confusing and often lead to unnecessary food waste. Understanding 
            what these dates actually mean can help you make safer food choices and reduce waste.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            {/* Best By Card */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <div className="flex items-center mb-3">
                <Calendar className="text-blue-600 mr-2 h-5 w-5" />
                <h3 className="text-lg font-medium text-blue-800">Best By / Best Before</h3>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                Indicates when a product will have the best flavor or quality. It is not a purchase or safety date.
              </p>
              <div className="text-xs text-gray-600 bg-blue-100 p-2 rounded">
                <strong>Example:</strong> "Best if Used By 12/15/2023"
              </div>
            </div>
            
            {/* Use By Card */}
            <div className="bg-red-50 p-6 rounded-lg border border-red-100">
              <div className="flex items-center mb-3">
                <Clock className="text-red-600 mr-2 h-5 w-5" />
                <h3 className="text-lg font-medium text-red-800">Use By</h3>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                The last date recommended for using the product while at peak quality. Only a safety date for infant formula.
              </p>
              <div className="text-xs text-gray-600 bg-red-100 p-2 rounded">
                <strong>Example:</strong> "Use By 10/31/2023"
              </div>
            </div>
            
            {/* Sell By Card */}
            <div className="bg-green-50 p-6 rounded-lg border border-green-100">
              <div className="flex items-center mb-3">
                <ShoppingBag className="text-green-600 mr-2 h-5 w-5" />
                <h3 className="text-lg font-medium text-green-800">Sell By</h3>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                Tells the store how long to display the product for sale. It's for inventory management, not a safety date.
              </p>
              <div className="text-xs text-gray-600 bg-green-100 p-2 rounded">
                <strong>Example:</strong> "Sell By 09/18/2023"
              </div>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold mb-4 mt-8">Quick Reference Guide</h2>
          
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="p-3 text-left text-sm font-medium border border-border">Label Type</th>
                  <th className="p-3 text-left text-sm font-medium border border-border">What It Means</th>
                  <th className="p-3 text-left text-sm font-medium border border-border">Safety Implication</th>
                  <th className="p-3 text-left text-sm font-medium border border-border">Consumer Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 text-sm border border-border font-medium">Best By / Best Before</td>
                  <td className="p-3 text-sm border border-border">Peak quality date</td>
                  <td className="p-3 text-sm border border-border">Not safety-related</td>
                  <td className="p-3 text-sm border border-border">Food is generally safe to consume after this date, but quality may decline</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="p-3 text-sm border border-border font-medium">Use By</td>
                  <td className="p-3 text-sm border border-border">Last recommended date for peak quality</td>
                  <td className="p-3 text-sm border border-border">Safety date only for infant formula</td>
                  <td className="p-3 text-sm border border-border">Use or freeze by this date for best quality</td>
                </tr>
                <tr>
                  <td className="p-3 text-sm border border-border font-medium">Sell By</td>
                  <td className="p-3 text-sm border border-border">Inventory management for retailers</td>
                  <td className="p-3 text-sm border border-border">Not safety-related</td>
                  <td className="p-3 text-sm border border-border">Product should remain good quality for some time after this date</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="p-3 text-sm border border-border font-medium">Packed On / Manufactured On</td>
                  <td className="p-3 text-sm border border-border">Production date</td>
                  <td className="p-3 text-sm border border-border">Not safety-related</td>
                  <td className="p-3 text-sm border border-border">Use storage guidelines to determine freshness</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <h2 className="text-xl font-semibold mb-4">Visual Guide to Food Date Labels</h2>
          
          <div className="bg-muted/30 p-6 rounded-lg mb-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <img 
                  src="/lovable-uploads/60ba4433-ac0b-400f-8dcd-ee43d80883df.png" 
                  alt="Example of food packaging with various date labels" 
                  className="rounded-md shadow-sm max-w-full h-auto"
                  width="400"
                  height="300"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-3">How to Find Date Labels</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Check the bottom of containers or packages</li>
                  <li>Look for stamped dates on the sides of cans</li>
                  <li>Examine the neck of bottles or jars</li>
                  <li>Inspect the sides or ends of boxed products</li>
                  <li>Look for a "closed code" (manufacturing date) on some products</li>
                </ul>
              </div>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold mb-4">Tips to Reduce Food Waste</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="p-4 border border-border rounded-md">
              <h3 className="text-base font-medium mb-2">Trust Your Senses</h3>
              <p className="text-sm">Look, smell, and taste (if safe) to determine if food is good to eat, regardless of dates.</p>
            </div>
            <div className="p-4 border border-border rounded-md">
              <h3 className="text-base font-medium mb-2">Proper Storage</h3>
              <p className="text-sm">Store foods properly to maintain freshness and extend shelf life beyond printed dates.</p>
            </div>
            <div className="p-4 border border-border rounded-md">
              <h3 className="text-base font-medium mb-2">Understand the Labels</h3>
              <p className="text-sm">Know that most dates are quality indicators, not safety cut-offs.</p>
            </div>
            <div className="p-4 border border-border rounded-md">
              <h3 className="text-base font-medium mb-2">Freeze Before Dates</h3>
              <p className="text-sm">Freeze foods before their quality dates to extend their useful life.</p>
            </div>
          </div>
          
          <div className="bg-primary/10 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-medium mb-3">Important Note on Safety</h3>
            <p className="text-sm">
              While most date labels aren't about safety, proper food handling remains crucial. Always follow the "when in doubt, throw it out" rule if food shows signs of spoilage, regardless of the date.
            </p>
            <div className="mt-4">
              <Button variant="outline" asChild>
                <a href="/food-safety/foodborne-illness-prevention">Learn About Foodborne Illness Prevention</a>
              </Button>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold mb-4">Regulatory Information</h2>
          <p>
            In the United States, the FDA and USDA oversee food dating. With the exception of infant formula, 
            date labeling is generally not required by federal regulations. Many states have their own regulations 
            regarding date labeling, making the system inconsistent nationwide. 
          </p>
          <p>
            There is an industry-led initiative to standardize date labels to just two types: "Best If Used By" 
            for quality and "Use By" for safety, which aims to reduce consumer confusion.
          </p>
        </div>
      </FoodSafetyLayout>
    </>
  );
};

export default UnderstandingFoodLabels;
