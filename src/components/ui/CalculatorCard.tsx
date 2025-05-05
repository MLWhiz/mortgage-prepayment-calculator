import React, { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

interface CalculatorCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  onClick: () => void;
  comingSoon?: boolean;
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({
  title,
  description,
  icon,
  onClick,
  comingSoon = false
}) => {
  return (
    <div 
      className={`relative bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg ${
        comingSoon ? 'opacity-75' : 'cursor-pointer'
      }`}
      onClick={() => !comingSoon && onClick()}
    >
      <div className="p-6">
        <div className="text-blue-600 mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="flex items-center text-blue-600">
          {comingSoon ? (
            <span className="text-sm font-medium bg-blue-100 text-blue-800 py-1 px-2 rounded">Coming Soon</span>
          ) : (
            <>
              <span className="font-medium">Launch Calculator</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalculatorCard;