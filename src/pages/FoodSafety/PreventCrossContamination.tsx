import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Scissors, Check, X } from 'lucide-react';
import FoodSafetyLayout from '@/components/FoodSafetyLayout';
import AdUnit from '@/components/AdUnit';

const PreventCrossContamination = () => {
  return (
    <>
      <FoodSafetyLayout
        title="Prevent Cross-Contamination"
        description="Learn how to prevent cross-contamination in your kitchen to avoid foodborne illnesses. Follow our tips for safe food handling."
        icon={<Scissors className="w-4 h-4" />}
        iconBgColor="bg-orange-100"
        iconTextColor="text-orange-700"
        keywords="cross-contamination, food safety, kitchen safety, foodborne illness, safe food handling, food preparation"
      >
        <div className="prose prose-sm sm:prose max-w-none text-foreground">
          <h2 className="text-xl font-semibold mb-4">What is Cross-Contamination?</h2>
          
          <p>
            Cross-contamination occurs when bacteria or other microorganisms are unintentionally transferred from one substance or object to another, 
            with harmful effect. In the kitchen, this primarily happens when bacteria from raw foods (especially meat, poultry, seafood, and eggs) 
            spread to ready-to-eat foods, utensils, or surfaces.
          </p>
          
          {/* First ad placement - top of content */}
          <div className="my-6">
            <AdUnit slotId="cross-contam-top" format="leaderboard" />
          </div>
          
          <h2 className="text-xl font-semibold mb-4 mt-8">Common Sources of Cross-Contamination</h2>
          
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Cutting boards:</strong> Using the same cutting board for raw meat and vegetables without proper cleaning.</li>
            <li><strong>Utensils:</strong> Knives, tongs, and other utensils that touch raw food can transfer bacteria.</li>
            <li><strong>Hands:</strong> Unwashed hands are a major source of contamination.</li>
            <li><strong>Countertops and surfaces:</strong> Bacteria can survive on surfaces and spread to other foods.</li>
            <li><strong>Sponges and cloths:</strong> These can harbor bacteria and spread them around the kitchen.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mb-4 mt-8">How to Prevent Cross-Contamination</h2>
          
          <ul className="list-decimal pl-5 space-y-2">
            <li><strong>Wash your hands:</strong> Wash thoroughly with soap and water for at least 20 seconds before and after handling food.</li>
            <li><strong>Use separate cutting boards:</strong> Designate one cutting board for raw meat, poultry, and seafood, and another for fruits, vegetables, and cooked foods.</li>
            <li><strong>Clean and sanitize:</strong> Wash cutting boards, utensils, countertops, and sinks with hot, soapy water after each use. Sanitize with a bleach solution (1 teaspoon of bleach per 1 quart of water).</li>
            <li><strong>Use separate utensils:</strong> Use different utensils for raw and cooked foods.</li>
            <li><strong>Store food properly:</strong> Keep raw meat, poultry, and seafood separate from other foods in the refrigerator. Store them in sealed containers or bags to prevent drips.</li>
            <li><strong>Wash fruits and vegetables:</strong> Rinse fresh produce under running water before using.</li>
            <li><strong>Replace sponges and cloths:</strong> Replace sponges and cloths frequently, or sanitize them daily in the dishwasher or microwave.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mb-4 mt-8">Color-Coding System for Safer Food Handling</h2>
          
          <p>
            Implementing a color-coding system in your kitchen can help prevent cross-contamination by visually distinguishing utensils and cutting boards 
            used for different types of food. Here's a common color-coding scheme:
          </p>
          
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Red:</strong> Raw meat</li>
            <li><strong>Yellow:</strong> Raw poultry</li>
            <li><strong>Blue:</strong> Raw seafood</li>
            <li><strong>Green:</strong> Fruits and vegetables</li>
            <li><strong>White:</strong> Cooked and ready-to-eat foods</li>
          </ul>
          
          {/* Second ad placement - middle of content */}
          <div className="my-6">
            <AdUnit slotId="cross-contam-middle" format="rectangle" />
          </div>
          
          <h2 className="text-xl font-semibold mb-4 mt-8">Cross-Contamination Checklist</h2>
          
          <ul className="list-none pl-0 space-y-4">
            <li className="flex items-start">
              <Check className="text-green-500 mr-2 h-5 w-5" />
              <span>I wash my hands thoroughly before and after handling food.</span>
            </li>
            <li className="flex items-start">
              <Check className="text-green-500 mr-2 h-5 w-5" />
              <span>I use separate cutting boards for raw meat and produce.</span>
            </li>
            <li className="flex items-start">
              <Check className="text-green-500 mr-2 h-5 w-5" />
              <span>I clean and sanitize all surfaces and utensils after each use.</span>
            </li>
            <li className="flex items-start">
              <Check className="text-green-500 mr-2 h-5 w-5" />
              <span>I store raw meat separately from other foods in the refrigerator.</span>
            </li>
          </ul>
          
          <h2 className="text-xl font-semibold mb-4 mt-8">Scenario: Preventing Cross-Contamination</h2>
          
          <p>
            <strong>Scenario:</strong> You're preparing a meal that includes raw chicken and a salad.
          </p>
          
          <p>
            <strong>Steps to prevent cross-contamination:</strong>
          </p>
          
          <ul className="list-decimal pl-5 space-y-2">
            <li>Wash your hands before starting.</li>
            <li>Use a designated cutting board (e.g., red) for the raw chicken.</li>
            <li>After cutting the chicken, thoroughly wash the cutting board, knife, and any other utensils that came into contact with the chicken. Sanitize them with a bleach solution.</li>
            <li>Wash your hands again.</li>
            <li>Use a separate cutting board (e.g., green) for the salad vegetables.</li>
            <li>Prepare the salad.</li>
            <li>Ensure the cooked chicken does not come into contact with the salad or any utensils used to prepare the salad.</li>
          </ul>
          
          {/* Third ad placement - bottom of content */}
          <div className="my-6">
            <AdUnit slotId="cross-contam-bottom" format="leaderboard" lazyLoad={true} />
          </div>
          
          <h2 className="text-xl font-semibold mb-4 mt-8">Shopping and Food Storage Tips</h2>
          
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>At the grocery store:</strong> Keep raw meat, poultry, and seafood separate from other groceries in your cart and bags.</li>
            <li><strong>In the refrigerator:</strong> Store raw meat, poultry, and seafood on the bottom shelf in sealed containers to prevent drips onto other foods.</li>
            <li><strong>In the freezer:</strong> Wrap raw meat, poultry, and seafood tightly to prevent freezer burn and contamination.</li>
          </ul>
          
          <h2 className="text-xl font-semibold mb-4 mt-8">Conclusion</h2>
          
          <p>
            Preventing cross-contamination is essential for maintaining food safety in your kitchen. By following these guidelines, 
            you can significantly reduce the risk of foodborne illnesses and ensure that your meals are safe and healthy.
          </p>
        </div>
      </FoodSafetyLayout>
    </>
  );
};

export default PreventCrossContamination;
