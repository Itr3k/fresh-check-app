
import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const FoodDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Create a formatted name from the ID
  const foodInfo = {
    name: id ? id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Food Item',
    category: 'General',
    image: '/placeholder.svg',
    description: 'Information about food storage and shelf life.'
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>{foodInfo.name} | Food Storage & Shelf Life</title>
        <meta name="description" content={`Learn about ${foodInfo.name} storage, shelf life, and food safety information.`} />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{foodInfo.name}</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <img 
                src={foodInfo.image} 
                alt={foodInfo.name} 
                className="rounded-md w-full object-cover"
                width={300}
                height={300}
              />
            </div>
            <div className="md:w-2/3">
              <div className="mb-4">
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {foodInfo.category}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {foodInfo.description}
              </p>
              
              <div className="border-t pt-4 mt-4">
                <h2 className="text-xl font-semibold mb-2">Storage Tips</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  This content is still being developed. Please check back later for detailed information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;
