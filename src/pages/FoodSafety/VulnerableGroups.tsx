import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Baby, UserCheck } from 'lucide-react';
import FoodSafetyLayout from '@/components/FoodSafetyLayout';
import AdUnit from '@/components/AdUnit';

const VulnerableGroups = () => {
  return (
    <>
      <FoodSafetyLayout
        title="Food Safety for Vulnerable Groups"
        description="Learn about food safety guidelines for vulnerable populations, including pregnant women, young children, older adults, and individuals with compromised immune systems."
        icon={<Shield className="w-4 h-4" />}
        iconBgColor="bg-orange-100"
        iconTextColor="text-orange-700"
        keywords="food safety, vulnerable groups, pregnancy, children, elderly, immunocompromised, foodborne illness prevention"
      >
        <div className="prose prose-sm sm:prose max-w-none text-foreground">
          <h2 className="text-xl font-semibold mb-4">Who is at Higher Risk?</h2>
          
          <p>
            While foodborne illness can affect anyone, certain groups face higher risks of severe 
            complications, hospitalization, and potentially life-threatening conditions. Understanding 
            these risks can help vulnerable individuals take appropriate precautions.
          </p>
          
          {/* First ad placement - top of content */}
          <div className="my-6">
            <AdUnit slotId="vulnerable-top" format="leaderboard" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Pregnant Women */}
            <div className="bg-pink-50 p-6 rounded-lg border border-pink-100">
              <div className="flex items-center mb-3">
                <Baby className="text-pink-600 mr-2 h-5 w-5" />
                <h3 className="text-lg font-medium text-pink-800">Pregnant Women</h3>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                Pregnant women are more susceptible to certain foodborne illnesses, such as listeriosis, 
                which can cause miscarriage, stillbirth, or severe illness in newborns.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>Avoid unpasteurized dairy products</li>
                <li>Avoid raw or undercooked meat, poultry, and seafood</li>
                <li>Avoid deli meats and hot dogs unless reheated until steaming hot</li>
              </ul>
            </div>
            
            {/* Young Children */}
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <div className="flex items-center mb-3">
                <Baby className="text-blue-600 mr-2 h-5 w-5" />
                <h3 className="text-lg font-medium text-blue-800">Young Children</h3>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                Children under the age of 5 have developing immune systems, making them more vulnerable 
                to foodborne illnesses. They are also more likely to develop severe symptoms.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>Ensure all foods are thoroughly cooked</li>
                <li>Avoid raw milk and products made from it</li>
                <li>Wash fruits and vegetables carefully</li>
              </ul>
            </div>
            
            {/* Older Adults */}
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
              <div className="flex items-center mb-3">
                <UserCheck className="text-purple-600 mr-2 h-5 w-5" />
                <h3 className="text-lg font-medium text-purple-800">Older Adults</h3>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                As people age, their immune systems may weaken, making them more susceptible to foodborne 
                illnesses. They may also have underlying health conditions that increase their risk.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>Cook foods to safe internal temperatures</li>
                <li>Avoid raw or partially cooked eggs</li>
                <li>Refrigerate leftovers promptly</li>
              </ul>
            </div>
            
            {/* Immunocompromised Individuals */}
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-100">
              <div className="flex items-center mb-3">
                <Shield className="text-yellow-600 mr-2 h-5 w-5" />
                <h3 className="text-lg font-medium text-yellow-800">Immunocompromised Individuals</h3>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                People with weakened immune systems due to conditions like HIV/AIDS, cancer treatment, 
                or organ transplantation are at higher risk of severe foodborne illnesses.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>Follow strict food safety practices</li>
                <li>Avoid high-risk foods like raw sprouts</li>
                <li>Consult with a healthcare provider for specific dietary recommendations</li>
              </ul>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold mb-4 mt-8">Special Food Safety Guidelines for Vulnerable Groups</h2>
          
          <ul className="list-disc pl-5 space-y-3 text-foreground">
            <li>
              <strong>Wash Hands Thoroughly:</strong> Always wash hands with soap and water for at least 20 seconds 
              before and after handling food.
            </li>
            <li>
              <strong>Cook Foods to Safe Temperatures:</strong> Use a food thermometer to ensure that meat, poultry, 
              seafood, and eggs are cooked to the recommended internal temperatures.
            </li>
            <li>
              <strong>Avoid Raw or Undercooked Foods:</strong> Vulnerable groups should avoid consuming raw or 
              undercooked meat, poultry, seafood, eggs, and sprouts.
            </li>
            <li>
              <strong>Prevent Cross-Contamination:</strong> Use separate cutting boards and utensils for raw and 
              cooked foods. Store raw meat, poultry, and seafood separately from other foods in the refrigerator.
            </li>
            <li>
              <strong>Refrigerate Foods Promptly:</strong> Refrigerate perishable foods within two hours (or one hour 
              if the ambient temperature is above 90°F/32°C).
            </li>
            <li>
              <strong>Avoid Unpasteurized Dairy Products and Juices:</strong> These products may contain harmful bacteria.
            </li>
          </ul>
          
          {/* Second ad placement - middle of content */}
          <div className="my-6">
            <AdUnit slotId="vulnerable-middle" format="rectangle" />
          </div>
          
          <h2 className="text-xl font-semibold mb-4">Foods to Avoid for High-Risk Individuals</h2>
          
          <ul className="list-disc pl-5 space-y-3 text-foreground">
            <li>
              <strong>Raw or Undercooked Meats and Poultry:</strong> These can harbor harmful bacteria like Salmonella and E. coli.
            </li>
            <li>
              <strong>Raw Seafood:</strong> Includes sushi, sashimi, and raw oysters, which may contain Vibrio bacteria or parasites.
            </li>
            <li>
              <strong>Raw or Undercooked Eggs:</strong> Can contain Salmonella. Avoid homemade mayonnaise, Caesar salad dressing, and other foods made with raw eggs.
            </li>
            <li>
              <strong>Unpasteurized Dairy Products:</strong> May contain Listeria, E. coli, or Salmonella.
            </li>
            <li>
              <strong>Soft Cheeses:</strong> Such as Brie, feta, and Camembert, which may contain Listeria.
            </li>
            <li>
              <strong>Deli Meats and Hot Dogs:</strong> These can be contaminated with Listeria. Reheat until steaming hot before consuming.
            </li>
            <li>
              <strong>Raw Sprouts:</strong> Such as alfalfa, clover, and radish sprouts, which can harbor bacteria.
            </li>
            <li>
              <strong>Unwashed Fruits and Vegetables:</strong> Always wash produce thoroughly to remove dirt and bacteria.
            </li>
          </ul>
          
          {/* Third ad placement - bottom of content */}
          <div className="my-6">
            <AdUnit slotId="vulnerable-bottom" format="leaderboard" lazyLoad={true} />
          </div>
          
          <h2 className="text-xl font-semibold mb-4 mt-8">Creating a Food Safety Plan</h2>
          
          <p>
            For vulnerable individuals, creating a personalized food safety plan can help minimize risks. 
            Consider the following steps:
          </p>
          
          <ol className="list-decimal pl-5 space-y-3 text-foreground">
            <li>
              <strong>Consult with a Healthcare Provider:</strong> Discuss any specific dietary restrictions or 
              recommendations based on your health condition.
            </li>
            <li>
              <strong>Educate Yourself:</strong> Learn about food safety risks and best practices for vulnerable groups.
            </li>
            <li>
              <strong>Implement Strict Food Safety Practices:</strong> Follow the guidelines outlined above, including 
              thorough handwashing, cooking foods to safe temperatures, and avoiding high-risk foods.
            </li>
            <li>
              <strong>Monitor for Symptoms:</strong> Be aware of the symptoms of foodborne illness and seek medical 
              attention promptly if you experience any concerns.
            </li>
          </ol>
          
          <h2 className="text-xl font-semibold mb-4 mt-8">Additional Resources</h2>
          
          <ul className="list-disc pl-5 space-y-3 text-foreground">
            <li>
              <a href="https://www.foodsafety.gov/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                FoodSafety.gov
              </a> - Provides comprehensive information on food safety for consumers.
            </li>
            <li>
              <a href="https://www.cdc.gov/foodsafety/index.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                CDC Food Safety
              </a> - Offers resources on preventing foodborne illnesses.
            </li>
            <li>
              <a href="https://www.fda.gov/food/resourcesforyou/ucm078750.htm" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                FDA Food Safety for Vulnerable Populations
              </a> - Provides specific guidance for pregnant women, children, and older adults.
            </li>
          </ul>
        </div>
      </FoodSafetyLayout>
    </>
  );
};

export default VulnerableGroups;
