// src/app/page.tsx
'use client';

import React, { useState } from 'react';
import AmortizationCalculator from '@/components/AmortizationCalculator';
import CalculatorCard from '@/components/ui/CalculatorCard';
import HeroSection from '@/components/ui/HeroSection';
import FeaturesSection from '@/components/ui/FeaturesSection';
import TestimonialsSection from '@/components/ui/TestimonialsSection';
import NewsletterSignup from '@/components/ui/NewsletterSignup';
import FaqSection from '@/components/ui/FaqSection';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import { ArrowLeft } from 'lucide-react';

// Calculator type definition
type Calculator = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  component: React.ReactNode;
  comingSoon?: boolean;
};

export default function FinanceCalculators() {
  const [activeCalculator, setActiveCalculator] = useState<string | null>(null);

  // List of available calculators
  const calculators: Calculator[] = [
    {
      id: 'mortgage-prepayment',
      title: 'Mortgage Prepayment Calculator',
      description: 'Compare paying down your mortgage early vs investing the extra money.',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      ),
      component: <AmortizationCalculator />
    },
    {
      id: 'investment-returns',
      title: 'Investment Returns Calculator',
      description: 'Calculate potential returns from different investment strategies.',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="20" x2="12" y2="10"></line>
          <line x1="18" y1="20" x2="18" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="16"></line>
        </svg>
      ),
      component: <div className="p-6 text-center">Investment Returns Calculator coming soon</div>,
      comingSoon: true
    },
    {
      id: 'retirement-planner',
      title: 'Retirement Planning Calculator',
      description: 'Plan your retirement savings and estimate your future income.',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      ),
      component: <div className="p-6 text-center">Retirement Planning Calculator coming soon</div>,
      comingSoon: true
    },
    {
      id: 'debt-payoff',
      title: 'Debt Payoff Calculator',
      description: 'Create a plan to pay off your debts using snowball or avalanche methods.',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      ),
      component: <div className="p-6 text-center">Debt Payoff Calculator coming soon</div>,
      comingSoon: true
    }
  ];

  // Get the active calculator or default to the mortgage calculator
  const getActiveCalculator = () => {
    if (!activeCalculator) return calculators[0];
    return calculators.find(calc => calc.id === activeCalculator) || calculators[0];
  };

  const handleNavigate = (calculatorId: string | null) => {
    setActiveCalculator(calculatorId);
  };

  const handleGetStarted = () => {
    setActiveCalculator('mortgage-prepayment');
  };

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Custom Header and Footer with navigation */}
      <Header onNavigate={handleNavigate} />
      
      {!activeCalculator ? (
        // Landing page with calculator selection
        <>
          <HeroSection onGetStarted={handleGetStarted} />
          
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">Our Financial Calculators</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {calculators.map((calculator) => (
                  <CalculatorCard
                    key={calculator.id}
                    title={calculator.title}
                    description={calculator.description}
                    icon={calculator.icon}
                    onClick={() => setActiveCalculator(calculator.id)}
                    comingSoon={calculator.comingSoon}
                  />
                ))}
              </div>
            </div>
          </section>
          
          <FeaturesSection />
          
          <TestimonialsSection />
          
          <FaqSection />
          
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">Ready to Make Smarter Financial Decisions?</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Start with our most popular calculator and see how small changes can make a big impact on your financial future.
                </p>
                <button 
                  onClick={handleGetStarted}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-md shadow-sm transition-colors text-lg"
                >
                  Try The Mortgage Calculator
                </button>
              </div>
            </div>
          </section>
          
          <NewsletterSignup />
        </>
      ) : (
        // Active calculator view
        <div className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="mb-6 flex items-center">
                <button
                  onClick={() => setActiveCalculator(null)}
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Calculators
                </button>
                <h2 className="text-xl font-semibold ml-4">{getActiveCalculator().title}</h2>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {getActiveCalculator().component}
              </div>
              
              <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">About this Calculator</h3>
                <p className="text-gray-700 mb-4">
                  This calculator helps you compare two financial strategies: paying extra on your mortgage versus investing that money. 
                  It shows you the total interest paid, payoff timeline, and the total value of each approach over time.
                </p>
                <h4 className="font-medium mb-2">How to use it:</h4>
                <ol className="list-decimal pl-5 space-y-1 text-gray-700">
                  <li>Enter your loan details (amount, interest rate, term)</li>
                  <li>Specify how much extra you could pay each period</li>
                  <li>Set your expected investment return rate</li>
                  <li>Review the comparison results to see which strategy works better for your situation</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer onNavigate={handleNavigate} />
    </main>
  );
}