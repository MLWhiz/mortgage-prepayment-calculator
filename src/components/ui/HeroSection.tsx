import React from 'react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-16 md:py-24">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-0 bottom-0 w-full h-64 bg-white opacity-10 transform -skew-y-6"></div>
        <div className="absolute right-0 top-0 w-full h-64 bg-white opacity-10 transform skew-y-6"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Your <span className="text-yellow-300">FIRE</span> Journey Starts Here
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Our suite of financial calculators helps you plan for Financial Independence and Retire Early with confidence.
              Compare scenarios, visualize outcomes, and make informed choices.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={onGetStarted}
                className="bg-white text-blue-700 hover:bg-yellow-300 hover:text-blue-800 transition-colors font-medium py-3 px-6 rounded-md shadow-md"
              >
                Get Started
              </button>
              <button className="border border-white hover:bg-white/10 transition-colors font-medium py-3 px-6 rounded-md">
                Learn More
              </button>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="relative">
              {/* Calculator illustration */}
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <div className="text-2xl font-bold mb-1">FIRE Summary</div>
                    <div className="text-sm opacity-80">Compare investment strategies</div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-white/40"></div>
                    <div className="w-3 h-3 rounded-full bg-white/40"></div>
                    <div className="w-3 h-3 rounded-full bg-white/40"></div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white/10 rounded p-3">
                    <div className="text-sm opacity-70 mb-1">Mortgage Prepayment</div>
                    <div className="text-xl font-semibold">£45,670 saved</div>
                  </div>
                  
                  <div className="bg-white/10 rounded p-3">
                    <div className="text-sm opacity-70 mb-1">Investment Returns</div>
                    <div className="text-xl font-semibold">£63,420 earned</div>
                  </div>
                  
                  <div className="bg-white/10 rounded p-3">
                    <div className="text-sm opacity-70 mb-1">Better Option</div>
                    <div className="text-xl font-semibold text-yellow-300">Investment by 38.9%</div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <div className="inline-block bg-blue-700 px-4 py-2 rounded text-sm font-medium opacity-90">
                    View Detailed Comparison
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-300/30 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-blue-300/30 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;