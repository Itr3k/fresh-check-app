import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ShieldAlert } from 'lucide-react';
import FoodSafetyLayout from '@/components/FoodSafetyLayout';
import { lazy, Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const AdUnit = lazy(() => import('@/components/AdUnit'));

const AdSkeleton = () => (
  <Skeleton className="w-full h-[90px] md:h-[90px] rounded-lg" />
);

const FoodborneIllnessPrevention = () => {
  useEffect(() => {
    if (typeof window.loadAdSense === 'function' && !window.adsenseLoaded && !window.adsenseLoading) {
      setTimeout(() => window.loadAdSense(), 2000);
    }
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Foodborne Illness Prevention Guide",
    "description": "Learn how to prevent foodborne illnesses (food poisoning) by following safe food handling practices.",
    "publisher": {
      "@type": "Organization",
      "name": "FreshCheck",
      "logo": {
        "@type": "ImageObject",
        "url": "https://freshcheck.app/logo.png"
      }
    },
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What causes foodborne illness?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Foodborne illnesses occur when you consume food contaminated with bacteria, viruses, parasites, or their toxins. Common pathogens include Salmonella, E. coli, Listeria, Norovirus, and Campylobacter."
          }
        },
        {
          "@type": "Question",
          "name": "How can I prevent foodborne illness?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Follow the four steps to food safety: Clean (wash hands and surfaces often), Separate (prevent cross-contamination), Cook (to proper temperatures), and Chill (refrigerate promptly)."
          }
        }
      ]
    }
  };

  return (
    <>
      <Helmet>
        <title>Foodborne Illness Prevention Guide | FreshCheck</title>
        <meta name="description" content="Learn how to prevent foodborne illnesses (food poisoning) by following safe food handling practices." />
        <meta name="keywords" content="foodborne illness, food poisoning, food safety, prevent food poisoning, food handling, safe food practices" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <FoodSafetyLayout
        title="Foodborne Illness Prevention"
        description="Learn how to prevent foodborne illnesses (food poisoning) by following safe food handling practices."
        icon={<ShieldAlert className="w-4 h-4" />}
        iconBgColor="bg-yellow-100"
        iconTextColor="text-yellow-700"
        keywords="foodborne illness, food poisoning, food safety, prevent food poisoning, food handling, safe food practices"
      >
        <div className="prose prose-sm sm:prose max-w-none text-foreground">
          <h2 className="text-xl font-semibold mb-4">Understanding Foodborne Illnesses</h2>
          
          <p>
            Foodborne illnesses, often called food poisoning, affect millions of people each year. 
            These illnesses occur when you consume food contaminated with bacteria, viruses, parasites, 
            or their toxins. Understanding the causes and prevention methods can help keep you and your family safe.
          </p>
          
          {/* First ad placement - top of content - responsive ad unit */}
          <div className="my-6 flex justify-center" aria-label="Advertisement section">
            <Suspense fallback={<AdSkeleton />}>
              <AdUnit 
                slotId="foodborne-top" 
                format="leaderboard" 
                mobileFormat="rectangle" 
                waitForViewport={true}
              />
            </Suspense>
          </div>
          
          <h2 className="text-xl font-semibold mb-4 mt-8">Common Pathogens Causing Foodborne Illness</h2>
          
          <p>
            Several types of pathogens are commonly responsible for foodborne illnesses:
          </p>
          
          <ul>
            <li><strong>Bacteria:</strong> Salmonella, E. coli, Listeria, Campylobacter, Clostridium perfringens, and Staphylococcus aureus.</li>
            <li><strong>Viruses:</strong> Norovirus, Hepatitis A, and Rotavirus.</li>
            <li><strong>Parasites:</strong> Giardia, Cryptosporidium, and Cyclospora.</li>
          </ul>
          
          <p>
            These pathogens can contaminate food at any point during production, processing, or preparation.
          </p>
          
          <h2 className="text-xl font-semibold mb-4 mt-8">The Four Steps to Food Safety</h2>
          
          <p>
            Following these four basic steps can significantly reduce your risk of foodborne illness:
          </p>
          
          <ol>
            <li>
              <strong>Clean:</strong> Wash your hands with soap and water for at least 20 seconds before and after handling food. 
              Rinse fruits and vegetables under running water. Clean and sanitize countertops and cutting boards.
            </li>
            <li>
              <strong>Separate:</strong> Prevent cross-contamination by keeping raw meat, poultry, seafood, and eggs separate from other foods. 
              Use separate cutting boards and utensils for raw and cooked foods.
            </li>
            <li>
              <strong>Cook:</strong> Cook foods to a safe internal temperature to kill harmful bacteria. Use a food thermometer to ensure proper cooking.
            </li>
            <li>
              <strong>Chill:</strong> Refrigerate perishable foods promptly. Bacteria can grow rapidly at room temperature. Refrigerate leftovers within 2 hours.
            </li>
          </ol>
          
          {/* Second ad placement - middle of content - responsive ad unit */}
          <div className="my-6 flex justify-center" aria-label="Advertisement section">
            <Suspense fallback={<AdSkeleton />}>
              <AdUnit 
                slotId="foodborne-middle" 
                format="leaderboard" 
                mobileFormat="rectangle" 
                waitForViewport={true}
              />
            </Suspense>
          </div>
          
          <h2 className="text-xl font-semibold mb-4 mt-8">Recognizing Symptoms of Foodborne Illness</h2>
          
          <p>
            Symptoms of foodborne illness can vary depending on the type of pathogen, but common symptoms include:
          </p>
          
          <ul>
            <li>Nausea</li>
            <li>Vomiting</li>
            <li>Diarrhea</li>
            <li>Stomach cramps</li>
            <li>Fever</li>
            <li>Headache</li>
          </ul>
          
          <p>
            Symptoms can appear within a few hours or several days after consuming contaminated food.
          </p>
          
          <h2 className="text-xl font-semibold mb-4">High-Risk Foods</h2>
          
          <p>
            Certain foods are more likely to cause foodborne illness if not handled properly:
          </p>
          
          <ul>
            <li>Raw or undercooked meat, poultry, and seafood</li>
            <li>Raw eggs</li>
            <li>Unpasteurized milk and dairy products</li>
            <li>Raw sprouts</li>
            <li>Unwashed fruits and vegetables</li>
          </ul>
          
          {/* Third ad placement - bottom of content - lazy loaded ad unit */}
          <div className="my-6 flex justify-center" aria-label="Advertisement section">
            <Suspense fallback={<AdSkeleton />}>
              <AdUnit 
                slotId="foodborne-bottom" 
                format="leaderboard" 
                mobileFormat="rectangle" 
                lazyLoad={true}
                waitForViewport={true}
              />
            </Suspense>
          </div>
          
          <h2 className="text-xl font-semibold mb-4 mt-8">When to Seek Medical Attention</h2>
          
          <p>
            Most cases of foodborne illness are mild and resolve on their own. However, you should seek medical attention if you experience:
          </p>
          
          <ul>
            <li>High fever (over 101.5°F or 38.6°C)</li>
            <li>Bloody stools</li>
            <li>Prolonged vomiting or diarrhea</li>
            <li>Dehydration (decreased urination, dizziness)</li>
            <li>Severe abdominal pain</li>
            <li>Neurological symptoms (blurred vision, muscle weakness)</li>
          </ul>
          
          <p>
            Certain individuals, such as pregnant women, young children, older adults, and people with weakened immune systems, 
            are at higher risk of severe complications and should seek medical attention promptly.
          </p>
          
          <h2 className="text-xl font-semibold mb-4 mt-8">Conclusion</h2>
          
          <p>
            Preventing foodborne illness requires vigilance and adherence to safe food handling practices. 
            By following the four steps to food safety and being aware of high-risk foods and symptoms, 
            you can significantly reduce your risk and protect your health.
          </p>
        </div>
      </FoodSafetyLayout>
    </>
  );
};

export default FoodborneIllnessPrevention;
