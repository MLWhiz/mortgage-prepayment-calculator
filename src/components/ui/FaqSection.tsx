import React, { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const faqItems: FaqItem[] = [
    {
      question: "How accurate are these calculators?",
      answer: "Our calculators use standard financial formulas and provide accurate projections based on the information you enter. However, actual results may vary due to market fluctuations, changes in interest rates, or other factors not accounted for in the calculations."
    },
    {
      question: "Is my data secure when using these calculators?",
      answer: "Yes. All calculations are performed directly in your browser. We don't store or transmit any of your financial information to our servers. Your sensitive data never leaves your device."
    },
    {
      question: "Should I pay off my mortgage early or invest?",
      answer: "This depends on many factors including your interest rate, potential investment returns, risk tolerance, and tax situation. Our Mortgage Prepayment Calculator helps you compare both scenarios with your specific numbers so you can make an informed decision."
    },
    {
      question: "How often are the calculators updated?",
      answer: "We regularly update our calculators to ensure they reflect current financial practices and regulations. The last update date is shown at the bottom of each calculator page."
    },
    {
      question: "Can I save or print my calculation results?",
      answer: "Yes, each calculator has options to save your results as a PDF or print them directly from your browser. This feature allows you to keep records or share the information with financial advisors."
    },
    {
      question: "Are these calculators suitable for all countries?",
      answer: "While the underlying financial principles are universal, some calculators may use conventions specific to the UK financial system. Always consider local tax laws, interest rates, and other region-specific factors when interpreting results."
    },
  ];

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <button
                  className="flex justify-between items-center w-full p-5 text-left font-medium"
                  onClick={() => toggleItem(index)}
                >
                  {item.question}
                  <svg 
                    className={`w-5 h-5 transition-transform ${openIndex === index ? 'transform rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div 
                  className={`transition-all duration-300 ${
                    openIndex === index 
                      ? 'max-h-96 opacity-100 p-5 pt-0' 
                      : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <p className="text-gray-600">
              Still have questions? <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Contact us</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;