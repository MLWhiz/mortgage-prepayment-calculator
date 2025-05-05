import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  title?: string;
  onNavigate?: (calculator: string | null) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  title = "FinCalc",
  onNavigate 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigation = (target: string | null) => {
    if (onNavigate) {
      onNavigate(target);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div 
          className="flex items-center cursor-pointer" 
          onClick={() => handleNavigation(null)}
        >
          <div className="mr-2">
            <svg 
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-blue-600"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-xl text-gray-900">{title}</h1>
            <p className="text-xs text-gray-500">Smart tools for financial planning</p>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <button 
            onClick={() => handleNavigation(null)} 
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Home
          </button>
          <button 
            onClick={() => handleNavigation('mortgage-prepayment')} 
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Mortgage Calculator
          </button>
          <button 
            onClick={() => handleNavigation('investment-returns')} 
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Investment Calculator
          </button>
          <button 
            onClick={() => handleNavigation('retirement-planner')} 
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Retirement Planner
          </button>
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            className="text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <button 
              onClick={() => handleNavigation(null)} 
              className="text-gray-700 hover:text-blue-600 transition-colors py-2"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigation('mortgage-prepayment')} 
              className="text-gray-700 hover:text-blue-600 transition-colors py-2"
            >
              Mortgage Calculator
            </button>
            <button 
              onClick={() => handleNavigation('investment-returns')} 
              className="text-gray-700 hover:text-blue-600 transition-colors py-2"
            >
              Investment Calculator
            </button>
            <button 
              onClick={() => handleNavigation('retirement-planner')} 
              className="text-gray-700 hover:text-blue-600 transition-colors py-2"
            >
              Retirement Planner
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;