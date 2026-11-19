import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Gift,
  CheckCircle2,
  Heart,
  ShieldCheck,
  Sparkles,
  Truck,
} from 'lucide-react';
import { PRODUCT_IMAGES } from '../data/productData';

interface CraftsmanshipFeaturesProps {
  onScrollToOrder?: () => void;
}

export const CraftsmanshipFeatures: React.FC<CraftsmanshipFeaturesProps> = ({
  onScrollToOrder,
}) => {
  const [slideIndex, setSlideIndex] = useState(1);

  const scrollOrder = () => {
    if (onScrollToOrder) {
      onScrollToOrder();
    } else {
      const el = document.getElementById('order-form');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const benefits = [
    {
      icon: Sparkles,
      text: 'খাঁটি ১৮ ক্যারেট গোল্ড প্লেটিং — আসল সোনার মতো চমৎকার উজ্জ্বল ফিনিশিং।',
    },
    {
      icon: Heart,
      text: 'অ্যাডজাস্টেবল ফ্রি সাইজ — সাথে এক্সটেনশন চেইন থাকায় যেকোনো পায়ে সহজেই মানিয়ে যায়।',
    },
    {
      icon: ShieldCheck,
      text: '১০০% ওয়াটারপ্রুফ ও নন-অ্যালার্জিক — পানি বা ঘামে রঙ কালো বা নষ্ট হয় না।',
    },
    {
      icon: CheckCircle2,
      text: 'মসৃণ স্নেক চেইন ও রোমান্টিক হার্ট চার্ম — বর্তমান মেয়েদের সবচেয়ে পছন্দের ডিজাইন।',
    },
    {
      icon: Gift,
      text: 'প্রিয় মানুষকে জন্মদিন, বিবাহবার্ষিকী বা স্পেশাল দিনে উপহার দেওয়ার জন্য সেরা পছন্দ।',
    },
    {
      icon: Truck,
      text: 'সারা বাংলাদেশে ক্যাশ অন ডেলিভারি — পণ্য হাতে পেয়ে দেখে মূল্য পরিশোধের সুযোগ।',
    },
  ];

  return (
    <section id="details" className="py-6 px-3 sm:px-4 max-w-3xl mx-auto w-full font-bengali space-y-6">
      {/* Simple Photo Slider (like screenshot middle slider) */}
      <div className="bg-white rounded-2xl border border-[#eddce0] p-2.5 sm:p-3 shadow-xs space-y-3">
        <div className="relative rounded-xl overflow-hidden bg-[#faf6f7] aspect-4/3 max-h-[420px] w-full">
          <img
            src={PRODUCT_IMAGES[slideIndex].url}
            alt={PRODUCT_IMAGES[slideIndex].title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />

          <button
            type="button"
            onClick={() =>
              setSlideIndex((prev) => (prev - 1 + PRODUCT_IMAGES.length) % PRODUCT_IMAGES.length)
            }
            aria-label="Previous slide"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 bg-white/85 hover:bg-white text-[#1c1917] rounded-full shadow-sm cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setSlideIndex((prev) => (prev + 1) % PRODUCT_IMAGES.length)}
            aria-label="Next slide"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 bg-white/85 hover:bg-white text-[#1c1917] rounded-full shadow-sm cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-1.5">
          {PRODUCT_IMAGES.map((img, i) => (
            <button
              type="button"
              key={img.id}
              onClick={() => setSlideIndex(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                slideIndex === i ? 'w-5 bg-[#c91d42]' : 'w-2 bg-[#e5d0d5]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={scrollOrder}
          className="px-10 py-2.5 rounded-full bg-[#e11d48] hover:bg-[#c8163d] text-white font-bold text-sm sm:text-base shadow-sm flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Gift className="w-4 h-4" />
          <span>অর্ডার করুন</span>
        </button>
      </div>

      {/* Why Choose Section (Simple Vertical List like Screenshot) */}
      <div className="bg-white rounded-2xl border border-[#eddce0] p-5 sm:p-7 space-y-5 shadow-xs">
        <div className="flex justify-center">
          <h2 className="inline-block bg-[#e11d48] text-white font-bold text-sm sm:text-base px-6 py-2 rounded-full text-center">
            কেন নিবেন এই গিফট বক্স ও পায়েলটি?
          </h2>
        </div>

        <ul className="space-y-3.5 text-sm sm:text-[15px] text-[#292524]">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <li key={idx} className="flex items-start gap-3 leading-relaxed">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#e11d48] shrink-0 mt-1" />
                <span>{item.text}</span>
              </li>
            );
          })}
        </ul>

        <div className="flex justify-center pt-1">
          <button
            type="button"
            onClick={scrollOrder}
            className="px-10 py-2.5 rounded-full bg-[#e11d48] hover:bg-[#c8163d] text-white font-bold text-sm sm:text-base shadow-sm flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Gift className="w-4 h-4" />
            <span>অর্ডার করুন</span>
          </button>
        </div>
      </div>

      {/* Emotional Gift Message Highlights (Simple Dashed Frame like Screenshot) */}
      <div className="bg-white border-2 border-dashed border-[#44403c]/40 rounded-2xl p-4 sm:p-5 space-y-3 text-center">
        <div className="bg-[#fff5f6] border border-[#f2d0d7] rounded-xl p-3.5 text-sm sm:text-base font-medium text-[#292524]">
          ছোট্ট এই আকর্ষণীয় উপহার ভালোবাসার মানুষের সাথে আপনার বন্ধনকে আরও মধুর করবে।
        </div>
        <div className="bg-[#fff5f6] border border-[#f2d0d7] rounded-xl p-3.5 text-sm sm:text-base font-medium text-[#292524] leading-relaxed">
          "আপনি যেখানে থাকুন, আমার মনের মাঝে আপনি সবসময় থাকুন।" প্রিয়জনকে এমন অনুভূতি উপহার দিতে আজই অর্ডার করুন।
        </div>
      </div>
    </section>
  );
};
