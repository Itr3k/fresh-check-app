
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar, Utensils, Clock } from 'lucide-react';
import FoodSafetyLayout from '@/components/FoodSafetyLayout';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AdUnit from '@/components/AdUnit';

const HolidayEvents = () => {
  return (
    <>
      <FoodSafetyLayout
        title="Holiday & Event Food Safety"
        description="Ensure food safety during holidays and special events with these guidelines for safe food preparation, handling, and storage."
        icon={<Calendar className="w-4 h-4" />}
        iconBgColor="bg-orange-100"
        iconTextColor="text-orange-700"
        keywords="holiday food safety, event food safety, party food safety, safe food handling, holiday cooking, buffet safety"
      >
        <div className="prose prose-sm sm:prose max-w-none text-foreground">
          <h2 className="text-xl font-semibold mb-4">Holiday Food Safety Challenges</h2>
          
          <p>
            Holidays and special events often involve preparing larger quantities of food, 
            cooking unfamiliar dishes, and managing complex timing with multiple dishes. 
            These factors can increase food safety risks if proper precautions aren't taken.
          </p>
          
          {/* First ad placement - top of content */}
          <div className="my-6">
            <AdUnit slotId="holiday-top" format="leaderboard" mobileFormat="rectangle" />
          </div>
          
          <Alert variant="destructive">
            <AlertTitle>Increased Risk During Holidays</AlertTitle>
            <AlertDescription>
              During holidays, the risk of foodborne illness increases due to large-scale cooking and serving.
            </AlertDescription>
          </Alert>
          
          <h2 className="text-xl font-semibold mb-4 mt-8">Planning Ahead for Food Safety</h2>
          
          <p>
            Proper planning is essential for ensuring food safety during holidays and events. 
            Consider these steps:
          </p>
          
          <ul className="list-disc pl-5 mb-6">
            <li><strong>Menu Planning:</strong> Choose dishes that can be safely prepared and held at proper temperatures.</li>
            <li><strong>Shopping:</strong> Buy perishable foods last and refrigerate them promptly.</li>
            <li><strong>Preparation Timeline:</strong> Plan your cooking schedule to avoid cross-contamination and ensure foods are cooked to safe internal temperatures.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mb-4 mt-8">Safe Food Handling for Large Gatherings</h2>
          
          <p>
            When preparing food for a large group, follow these guidelines to minimize the risk of foodborne illness:
          </p>
          
          <ul className="list-decimal pl-5 mb-6">
            <li><strong>Wash Hands:</strong> Wash hands thoroughly with soap and water before and after handling food.</li>
            <li><strong>Prevent Cross-Contamination:</strong> Use separate cutting boards and utensils for raw and cooked foods.</li>
            <li><strong>Cook to Safe Temperatures:</strong> Use a food thermometer to ensure foods reach safe internal temperatures.</li>
            <li><strong>Keep Hot Foods Hot:</strong> Hold hot foods at 140°F (60°C) or higher.</li>
            <li><strong>Keep Cold Foods Cold:</strong> Hold cold foods at 40°F (4°C) or lower.</li>
          </ul>
          
          <h3 className="text-lg font-semibold mb-3">Buffet Table Safety</h3>
          
          <p>
            Buffet tables can be a breeding ground for bacteria if not managed properly. Follow these tips:
          </p>
          
          <ul className="list-disc pl-5 mb-6">
            <li><strong>Use Chafing Dishes and Ice Baths:</strong> Keep hot foods hot with chafing dishes and cold foods cold with ice baths.</li>
            <li><strong>Small Portions:</strong> Serve food in small portions and replenish frequently to ensure freshness.</li>
            <li><strong>Time Limit:</strong> Don't leave food at room temperature for more than 2 hours (1 hour if the temperature is above 90°F/32°C).</li>
            <li><strong>Label Foods:</strong> Clearly label each dish to avoid confusion and prevent allergic reactions.</li>
          </ul>
          
          {/* Second ad placement - middle of content */}
          <div className="my-6">
            <AdUnit slotId="holiday-middle" format="leaderboard" mobileFormat="rectangle" />
          </div>
          
          <h2 className="text-xl font-semibold mb-4 mt-8">Specific Holiday Food Safety Tips</h2>
          
          <h3 className="text-lg font-semibold mb-3">Thanksgiving</h3>
          
          <ul className="list-disc pl-5 mb-6">
            <li><strong>Thawing Turkey:</strong> Thaw turkey safely in the refrigerator, in cold water (changing every 30 minutes), or in the microwave. Never thaw at room temperature.</li>
            <li><strong>Stuffing:</strong> Cook stuffing separately or ensure it reaches 165°F (74°C) inside the turkey.</li>
            <li><strong>Turkey Cooking:</strong> Cook turkey to an internal temperature of 165°F (74°C) in the thickest part of the thigh.</li>
          </ul>
          
          <h3 className="text-lg font-semibold mb-3">Christmas / Hanukkah</h3>
          
          <ul className="list-disc pl-5 mb-6">
            <li><strong>Ham and Roasts:</strong> Cook ham and roasts to safe internal temperatures.</li>
            <li><strong>Potluck Dishes:</strong> Ensure potluck dishes are transported and held at safe temperatures.</li>
            <li><strong>Eggnog:</strong> Use pasteurized eggs for homemade eggnog to avoid Salmonella.</li>
          </ul>
          
          <h3 className="text-lg font-semibold mb-3">Summer BBQs</h3>
          
          <ul className="list-disc pl-5 mb-6">
            <li><strong>Marinating:</strong> Marinate foods in the refrigerator, not at room temperature.</li>
            <li><strong>Grilling:</strong> Use a food thermometer to ensure meats are cooked to safe internal temperatures.</li>
            <li><strong>Picnic Safety:</strong> Keep cold foods cold in insulated coolers with ice packs.</li>
          </ul>
          
          {/* Third ad placement - bottom of content */}
          <div className="my-6">
            <AdUnit slotId="holiday-bottom" format="leaderboard" mobileFormat="rectangle" lazyLoad={true} />
          </div>
          
          <h2 className="text-xl font-semibold mb-4 mt-8">Safely Handling Leftovers</h2>
          
          <p>
            Leftovers can be a delicious reminder of a great meal, but they must be handled properly to prevent foodborne illness:
          </p>
          
          <ul className="list-disc pl-5 mb-6">
            <li><strong>Cool Quickly:</strong> Cool leftovers quickly by dividing them into shallow containers.</li>
            <li><strong>Refrigerate Promptly:</strong> Refrigerate leftovers within 2 hours of cooking.</li>
            <li><strong>Use Within 3-4 Days:</strong> Use leftovers within 3-4 days or freeze them for longer storage.</li>
            <li><strong>Reheat Thoroughly:</strong> Reheat leftovers to 165°F (74°C) before serving.</li>
          </ul>
          
          <p>
            By following these food safety guidelines, you can help ensure that your holidays and special events are remembered for the right reasons – good food and good company, not foodborne illness.
          </p>
        </div>
      </FoodSafetyLayout>
    </>
  );
};

export default HolidayEvents;
