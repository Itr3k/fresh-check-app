import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FlaskConical, Droplets, Bacteria } from 'lucide-react';
import FoodSafetyLayout from '@/components/FoodSafetyLayout';
import AdUnit from '@/components/AdUnit';

const ScienceOfSpoilage = () => {
  return (
    <>
      <FoodSafetyLayout
        title="Science of Food Spoilage"
        description="Explore the science behind food spoilage, including the causes, signs, and methods of preservation to ensure food safety."
        icon={<FlaskConical className="w-4 h-4" />}
        iconBgColor="bg-orange-100"
        iconTextColor="text-orange-700"
        keywords="food spoilage, food preservation, bacteria, mold, enzymes, oxidation, rancidity, food safety"
      >
        <div className="prose prose-sm sm:prose max-w-none text-foreground">
          <h2 className="text-xl font-semibold mb-4">Understanding Food Spoilage</h2>
          
          <p>
            Food spoilage is the process by which food deteriorates to the point where it becomes unappetizing, 
            unsafe to eat, or both. Understanding the science behind spoilage can help you better preserve food 
            and recognize when it's no longer safe to consume.
          </p>
          
          {/* First ad placement - top of content */}
          <div className="my-6">
            <AdUnit slotId="spoilage-top" format="leaderboard" />
          </div>
          
          <h2 className="text-xl font-semibold mb-4 mt-8">Causes of Food Spoilage</h2>
          
          <p>
            Food spoilage can occur due to a variety of factors, including:
          </p>
          
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Microorganisms:</strong> Bacteria, mold, and yeast can grow on food and cause it to spoil. 
              These microorganisms break down food components, producing undesirable odors, flavors, and textures.
            </li>
            <li>
              <strong>Enzymes:</strong> Naturally present in food, enzymes can cause spoilage by catalyzing chemical reactions. 
              For example, enzymes can cause fruits to ripen and then over-ripen, leading to softening and browning.
            </li>
            <li>
              <strong>Oxidation:</strong> Exposure to oxygen can cause oxidation reactions, leading to changes in color, flavor, and texture. 
              Fats can become rancid through oxidation, and cut fruits and vegetables can brown.
            </li>
            <li>
              <strong>Physical Damage:</strong> Bruising, crushing, or other physical damage can break down cell structures and release enzymes, 
              accelerating spoilage.
            </li>
            <li>
              <strong>Infestation:</strong> Insects and rodents can infest food products, causing direct damage and introducing microorganisms.
            </li>
          </ul>
          
          <h2 className="text-xl font-semibold mb-4 mt-8">Signs of Spoilage by Food Type</h2>
          
          <p>
            The signs of spoilage vary depending on the type of food:
          </p>
          
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Meat and Poultry:</strong> Slimy or sticky texture, foul odor, discoloration (graying or browning).
            </li>
            <li>
              <strong>Fish and Seafood:</strong> Fishy or ammonia-like odor, slimy texture, sunken eyes (in whole fish).
            </li>
            <li>
              <strong>Dairy Products:</strong> Sour odor, curdling (milk), mold growth (cheese).
            </li>
            <li>
              <strong>Fruits and Vegetables:</strong> Soft spots, mold growth, discoloration, unpleasant odor.
            </li>
            <li>
              <strong>Bread and Baked Goods:</strong> Mold growth, stale texture, off-flavor.
            </li>
          </ul>
          
          {/* Second ad placement - middle of content */}
          <div className="my-6">
            <AdUnit slotId="spoilage-middle" format="rectangle" />
          </div>
          
          <h2 className="text-xl font-semibold mb-4 mt-8">The Science of Food Preservation</h2>
          
          <p>
            Food preservation techniques aim to slow down or prevent spoilage by inhibiting the growth of microorganisms, 
            inactivating enzymes, and preventing oxidation. Common methods include:
          </p>
          
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Refrigeration:</strong> Slows down microbial growth and enzymatic activity.
            </li>
            <li>
              <strong>Freezing:</strong> Stops microbial growth and greatly reduces enzymatic activity.
            </li>
            <li>
              <strong>Heating:</strong> Kills microorganisms and inactivates enzymes (e.g., pasteurization, canning).
            </li>
            <li>
              <strong>Drying:</strong> Removes moisture, inhibiting microbial growth.
            </li>
            <li>
              <strong>Salting and Sugaring:</strong> Reduces water activity, inhibiting microbial growth.
            </li>
            <li>
              <strong>Pickling:</strong> Uses acid to inhibit microbial growth.
            </li>
            <li>
              <strong>Vacuum Packing:</strong> Removes oxygen, preventing oxidation and inhibiting the growth of aerobic microorganisms.
            </li>
            <li>
              <strong>Modified Atmosphere Packaging (MAP):</strong> Alters the composition of gases surrounding the food to extend shelf life.
            </li>
          </ul>
          
          {/* Third ad placement - bottom of content */}
          <div className="my-6">
            <AdUnit slotId="spoilage-bottom" format="leaderboard" lazyLoad={true} />
          </div>
          
          <h2 className="text-xl font-semibold mb-4 mt-8">Common Misconceptions About Food Spoilage</h2>
          
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>"If it smells okay, it's safe to eat."</strong> Some spoilage microorganisms don't produce noticeable odors, 
              and some toxins are odorless.
            </li>
            <li>
              <strong>"Mold on cheese is always safe to cut off."</strong> While this is true for hard cheeses, soft cheeses 
              can be contaminated throughout.
            </li>
            <li>
              <strong>"The 'sell by' date is an expiration date."</strong> "Sell by" dates are for inventory management and don't indicate safety.
            </li>
          </ul>
          
          <p>
            Understanding the science of food spoilage empowers you to make informed decisions about food storage, 
            preservation, and consumption, ultimately reducing waste and ensuring food safety.
          </p>
        </div>
      </FoodSafetyLayout>
    </>
  );
};

export default ScienceOfSpoilage;
