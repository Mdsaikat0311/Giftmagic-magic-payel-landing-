import React from 'react';
import { ShoppingBag, X, Trash2, ArrowRight, ShieldCheck, Gift } from 'lucide-react';
import { ProductPackage } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: ProductPackage;
  quantity: number;
  onQuantityChange: (q: number) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  selectedPackage,
  quantity,
  onQuantityChange,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = selectedPackage.salePrice * quantity;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col font-bengali animate-slideLeft">
        {/* Header */}
        <div className="p-5 border-b border-[#eddce0] bg-[#fff5f6] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#e11d48]" />
            <h3 className="font-bold text-base text-[#1c1917]">শপিং কার্ট (Shopping Bag)</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-black rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div className="p-4 rounded-xl border border-[#eddce0] bg-[#fffbfa] flex gap-3.5">
            <img
              src="/assets/aistudio/18K-Premium-Gold-Finishing-Stainles-5_8cf9a3fb.jpg"
              alt="Snake Payel"
              referrerPolicy="no-referrer"
              className="w-18 h-18 rounded-lg object-cover border border-[#eddce0] shrink-0"
            />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-sm text-[#1c1917]">
                  {selectedPackage.bengaliName}
                </h4>
                <p className="text-xs text-stone-500">{selectedPackage.badge || '১৮K গোল্ড ফিনিশ'}</p>
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2 bg-white border border-[#d6d3d1] px-2 py-0.5 rounded-lg text-xs">
                  <button
                    type="button"
                    onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                    className="font-bold text-stone-600 hover:text-black cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-mono font-bold text-[#e11d48]">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => onQuantityChange(quantity + 1)}
                    className="font-bold text-stone-600 hover:text-black cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <span className="font-mono font-bold text-base text-[#e11d48] tabular-nums">
                  ৳{subtotal}
                </span>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#f0f9f2] border border-[#cbe6d2] text-xs text-[#255e34] space-y-1">
            <div className="font-bold">সারা বাংলাদেশে ক্যাশ অন ডেলিভারি</div>
            <p className="text-[11px] text-stone-600">
              ঢাকার ভেতর হোম ডেলিভারি ৳৭০ · ঢাকার বাইরে ৳১১০ (পণ্য হাতে পেয়ে টাকা পরিশোধ করবেন)।
            </p>
          </div>
        </div>

        {/* Footer Checkout Trigger */}
        <div className="p-5 border-t border-[#eddce0] bg-white space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="font-bold text-[#1c1917]">সাবটোটাল (পণ্য মূল্য):</span>
            <span className="font-mono text-xl font-bold text-[#e11d48] tabular-nums">৳{subtotal}</span>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onProceedToCheckout();
            }}
            className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-[#e11d48] hover:bg-[#c8163d] active:scale-[0.99] transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>চেকআউট ও অর্ডার কনফার্ম করুন</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[11px] text-center text-stone-500 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#16a34a]" /> ১০০% নিরাপদ চেকআউট
          </p>
        </div>
      </div>
    </div>
  );
};
