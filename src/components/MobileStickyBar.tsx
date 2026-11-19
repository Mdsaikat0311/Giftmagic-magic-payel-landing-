import React from 'react';
import { Gift } from 'lucide-react';
import { ProductPackage } from '../types';

interface MobileStickyBarProps {
  selectedPackage: ProductPackage;
  onScrollToOrder: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  selectedPackage,
  onScrollToOrder,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#eddce0] px-4 py-2 shadow-md">
      <div className="flex items-center justify-between gap-3 font-bengali">
        <div className="flex items-baseline gap-1.5">
          <span className="font-mono font-bold text-lg text-[#e11d48] tabular-nums">
            ৳{selectedPackage.salePrice}
          </span>
          <span className="text-xs text-stone-400 line-through tabular-nums">
            ৳{selectedPackage.regularPrice}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onScrollToOrder}
            className="px-4 py-2 rounded-lg font-bold text-xs text-white bg-[#e11d48] hover:bg-[#c8163d] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <Gift className="w-3.5 h-3.5" />
            <span>অর্ডার করুন</span>
          </button>
        </div>
      </div>
    </div>
  );
};
