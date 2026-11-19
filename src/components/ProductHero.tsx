import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Gift,
} from 'lucide-react';
import { PRODUCT_IMAGES } from '../data/productData';
import { ProductPackage } from '../types';

interface ProductHeroProps {
  selectedPackage: ProductPackage;
  quantity: number;
  onScrollToCheckout: () => void;
}

export const ProductHero: React.FC<ProductHeroProps> = ({
  selectedPackage,
  quantity,
  onScrollToCheckout,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const activeImg = PRODUCT_IMAGES[activeImageIndex];

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % PRODUCT_IMAGES.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + PRODUCT_IMAGES.length) % PRODUCT_IMAGES.length);
  };

  void selectedPackage;
  void quantity;

  return (
    <section className="pt-4 pb-6 px-3 sm:px-4 max-w-3xl mx-auto w-full font-bengali">
      <div className="space-y-4 sm:space-y-5">
        {/* Top Headline Banner (Screenshot-inspired simple crimson header) */}
        <div className="bg-[#b81632] text-white rounded-2xl px-4 py-3.5 sm:py-4 text-center shadow-sm">
          <h1 className="text-base sm:text-xl font-bold leading-snug text-balance">
            প্রিয় মানুষের মুখে হাসি ফোটাতে উপহার দিন ১৮ ক্যারেট গোল্ড প্লেটেড লাক্সারি স্নেক পায়েল · সম্পর্ক হোক আরও সুন্দর ও মধুর
          </h1>
        </div>

        {/* Main Hero Product Image Frame */}
        <div className="bg-white rounded-2xl border border-[#eddce0] p-2 sm:p-3 shadow-xs space-y-2.5">
          <div className="relative rounded-xl overflow-hidden bg-[#faf6f7] aspect-square sm:aspect-4/3 max-h-[460px] w-full flex items-center justify-center group">
            <img
              src={activeImg.url}
              alt={activeImg.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />

            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              aria-label="ছবি বড় করে দেখুন"
              className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-[#1c1917] rounded-full shadow-sm transition-transform hover:scale-105 cursor-pointer"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handlePrevImage}
              aria-label="Previous image"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 bg-white/85 hover:bg-white text-[#1c1917] rounded-full shadow-sm cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleNextImage}
              aria-label="Next image"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 bg-white/85 hover:bg-white text-[#1c1917] rounded-full shadow-sm cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* All 7 Product Photo Thumbnails */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {PRODUCT_IMAGES.map((img, idx) => (
              <button
                type="button"
                key={img.id}
                onClick={() => setActiveImageIndex(idx)}
                className={`shrink-0 w-13 h-13 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  activeImageIndex === idx
                    ? 'border-[#c91d42] ring-2 ring-[#c91d42]/20'
                    : 'border-[#efe3e6] opacity-75 hover:opacity-100'
                }`}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Highlight Offer Strip */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={onScrollToCheckout}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#e11d48] hover:bg-[#c8163d] text-white font-bold text-sm sm:text-base shadow-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Gift className="w-4 h-4 shrink-0" />
            <span>বিশেষ অফার: ১ জোড়া পায়েল মাত্র ৪৯৯ টাকা (রেগুলার ৯৯০ টাকা)</span>
          </button>
        </div>

        {/* Simple Package Summary Card (Like Screenshot Dashed/Soft Box) */}
        <div className="bg-[#fff5f6] border-2 border-dashed border-[#e8a4b2] rounded-2xl p-4 sm:p-6 text-center space-y-2.5">
          <h2 className="text-base sm:text-lg font-bold text-[#b81632]">
            এই লাক্সারি পায়েল প্যাকেজে যা যা পাচ্ছেন:
          </h2>
          <p className="text-sm sm:text-base text-[#292524] leading-relaxed font-medium">
            ১. খাঁটি ১৮ ক্যারেট গোল্ড প্লেটেড ফ্ল্যাট স্নেক পায়েল (হার্ট লকেট চার্ম ও ২ ইঞ্চি অ্যাডজাস্টেবল চেইনসহ) ·
            ২. পায়েল রাখার প্রিমিয়াম জুয়েলারি বক্স ·
            ৩. ১০০% ওয়াটারপ্রুফ ও নন-অ্যালার্জিক স্টেইনলেস স্টিল ·
            ৪. হাতে পেয়ে খুলে চেক করে মূল্য পরিশোধের সুবিধা।
          </p>
          <div className="pt-1 text-xs sm:text-sm font-bold text-[#9f1239]">
            ১ জোড়া ৪৯৯৳ · ২ জোড়া ৮৯৯৳ · ৩ জোড়া ১১৯৯৳ · বাচ্চা মেয়েদের ১ জোড়া ৪৯৯৳
          </div>
        </div>

        {/* Simple Direct Action Buttons */}
        <div className="flex flex-col items-center gap-2.5 pt-1">
          <button
            type="button"
            onClick={onScrollToCheckout}
            className="w-full sm:w-80 py-3 px-6 rounded-full bg-[#e11d48] hover:bg-[#c8163d] active:scale-[0.99] text-white font-bold text-base shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Gift className="w-4 h-4 shrink-0" />
            <span>অর্ডার করুন</span>
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-3xl bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImg.url}
              alt={activeImg.title}
              referrerPolicy="no-referrer"
              className="max-h-[75vh] w-auto mx-auto object-contain"
            />
            <div className="p-3.5 sm:p-4 bg-stone-950 text-white flex items-center justify-between font-bengali">
              <div>
                <h3 className="font-bold text-[#fda4af] text-xs sm:text-base">
                  {activeImg.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-stone-400">{activeImg.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="px-3.5 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs rounded-lg transition-colors cursor-pointer"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
