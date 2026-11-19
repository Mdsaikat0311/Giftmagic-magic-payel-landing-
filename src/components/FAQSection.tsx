import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { PRODUCT_FAQS } from '../data/productData';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-6 px-3 sm:px-4 max-w-3xl mx-auto w-full font-bengali space-y-4">
      <h2 className="text-center font-bold text-lg sm:text-xl text-[#1c1917]">
        সচরাচর জিজ্ঞাসিত প্রশ্ন (FAQ)
      </h2>

      <div className="space-y-2.5">
        {PRODUCT_FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-xl border border-[#eddce0] overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-3 font-bold text-xs sm:text-sm text-[#1c1917] hover:bg-[#fff9fa] transition-colors cursor-pointer"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#c91d42] transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 text-xs sm:text-sm text-[#44403c] leading-relaxed border-t border-[#f5ebed] pt-2.5">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
