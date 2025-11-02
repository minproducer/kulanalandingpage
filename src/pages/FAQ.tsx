import { useState } from 'react';
import { faqs } from '../data/faqData';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const categories = ['All', ...Array.from(new Set(faqs.map(faq => faq.category)))];
  
  const filteredFAQs = selectedCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-navy text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="font-sans text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to know about partnering with Kulana Development
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-ivory border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-8 py-6">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-accent text-sm font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gold text-white shadow-md'
                    : 'bg-white text-text-secondary hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-ivory">
        <div className="max-w-5xl mx-auto px-8">
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 text-left flex justify-between items-start hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex-1 pr-8">
                    <div className="inline-block mb-2">
                      <span className="text-xs font-accent font-semibold text-gold uppercase tracking-wider">
                        {faq.category}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-text-primary">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0">
                    <svg
                      className={`w-6 h-6 text-gold transform transition-transform duration-300 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>
                {openIndex === index && (
                  <div className="px-8 pb-6">
                    <div className="border-t border-gray-200 pt-4">
                      <p className="font-sans text-base text-text-secondary leading-relaxed-custom">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="font-serif text-4xl font-bold text-text-primary mb-6">
            Still Have Questions?
          </h2>
          <p className="font-sans text-lg text-text-secondary max-w-2xl mx-auto mb-8 leading-relaxed-custom">
            Our team is here to help. Contact us for more information about our services and how we can bring your project to life with precision and excellence.
          </p>
          <button className="bg-gold text-white font-accent font-semibold px-8 py-3 rounded hover:bg-gold-light transition-colors duration-300 shadow-md hover:shadow-lg">
            Contact Us Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
