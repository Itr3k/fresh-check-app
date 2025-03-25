
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface SpoilageInfoProps {
  spoilageText: string;
}

const SpoilageInfo: React.FC<SpoilageInfoProps> = ({ spoilageText }) => {
  return (
    <div>
      <div className="flex items-center mb-4">
        <AlertCircle size={20} className="mr-2 text-primary" />
        <h2 className="text-xl font-semibold">Signs of Spoilage</h2>
      </div>
      <p className="text-gray-600 mb-6">
        {spoilageText || 'Look for mold, discoloration, sour smell, or slimy texture.'}
      </p>
    </div>
  );
};

export default SpoilageInfo;
