import React, { useState } from 'react';
import { Gift } from 'lucide-react';
import { PRODUCT_IMAGES } from '../data/productData';

interface PhotoLookbookProps {
  onScrollToOrder?: () => void;
}

export const PhotoLookbook: React.FC<PhotoLookbookProps> = ({ onScrollToOrder }) => {
  const [selectedImg, setSelectedImg] = useState<(typeof PRODUCT_IMAGES)[0] | null>(null);

  const scrollOrder = () => {
    if (onScrollToOrder) {
      onScrollToOrder();
    } else {
      const el = document.getElementById('order-form');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="lookbook" className="py-5 px-3 sm:px-4 max-w-3xl mx-auto w-full font-bengali space-y-5">
      <div className="text-center">
        <span className="inline-block bg-[#b81632] text-white font-bold text-sm sm:text-base px-6 py-2 rounded-full">
          আসল পণ্যের সবগুলো ছবি
        </span>
        <p className="text-xs sm:text-sm text-[#57534e] mt-2">
          ছবির সাথে হুবহু মিল রেখে পণ্য পাবেন · ছবি বড় করে দেখতে যেকোনো ছবিতে ক্লিক করুন
        </p>
      </div>

      {/* Clean Uniform Photo Grid (All 7 Real Product Images) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {PRODUCT_IMAGES.map((img, idx) => (
          <button
            type="button"
            key={img.id}
            onClick={() => setSelectedImg(img)}
            className={`group rounded-xl overflow-hidden border border-[#eddce0] bg-white shadow-2xs hover:shadow-sm transition-all cursor-pointer text-left ${
              idx === 0 ? 'col-span-2 sm:col-span-1' : ''
            }`}
          >
            <div className="aspect-square w-full overflow-hidden bg-[#faf6f7]">
              <img
                src={img.url}
                alt={img.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-2 text-[11px] sm:text-xs font-medium text-[#292524] truncate text-center">
              {img.title}
            </div>
          </button>
        ))}
      </div>

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

      {/* Enlarged Modal */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedImg(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-stone-900 rounded-2xl overflow-hidden border border-stone-800"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImg.url}
              alt={selectedImg.title}
              referrerPolicy="no-referrer"
              className="max-h-[75vh] w-auto mx-auto object-contain"
            />
            <div className="p-4 bg-stone-950 text-white flex items-center justify-between font-bengali">
              <div>
                <h4 className="font-bold text-[#fda4af] text-sm sm:text-base">
                  {selectedImg.title}
                </h4>
                <p className="text-xs text-stone-400">{selectedImg.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedImg(null)}
                className="px-4 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs rounded-lg transition-colors cursor-pointer"
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
