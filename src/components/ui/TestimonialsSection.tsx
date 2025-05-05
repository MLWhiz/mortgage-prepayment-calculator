import React from 'react';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: "The mortgage calculator helped me decide whether to pay extra on my mortgage or invest. I saved thousands by making the right choice!",
      author: "Sarah Johnson",
      role: "Homeowner"
    },
    {
      quote: "I've tried many financial calculators online, but this one provides the clearest comparison between different financial strategies.",
      author: "Michael Chen",
      role: "Financial Advisor"
    },
    {
      quote: "As someone new to investing, these calculators helped me understand the impact of compound interest and regular contributions.",
      author: "Emma Davies",
      role: "Young Investor"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-lg text-gray-600">
            Thousands of people use our calculators to make better financial decisions every day.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow relative">
              {/* Quote mark decoration */}
              <div className="absolute -top-4 left-6 text-6xl text-blue-200">"</div>
              
              <div className="relative">
                <p className="text-gray-700 mb-6 relative z-10">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;