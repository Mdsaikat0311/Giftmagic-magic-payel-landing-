import React from 'react';

interface FooterProps {
  onOpenTracking: () => void;
  onOpenAdmin: () => void;
  onScrollToOrder: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenTracking,
  onOpenAdmin,
  onScrollToOrder,
}) => {
  return (
    <footer className="bg-[#fff0f3] border-t border-[#f0d8de] font-bengali py-6 pb-20 md:pb-8 px-4 text-center text-xs text-[#44403c] w-full">
      <div className="max-w-3xl mx-auto space-y-2">
        <p className="font-medium">
          © ২০২৬ Jhilmill (ঝিলমিল ডট কম). সর্বস্বত্ব সংরক্ষিত।
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-[#c91d42] font-medium">
          <button
            type="button"
            onClick={onScrollToOrder}
            className="hover:underline cursor-pointer"
          >
            এখনই অর্ডার করুন
          </button>
          <span className="text-stone-400">·</span>
          <button
            type="button"
            onClick={onOpenTracking}
            className="hover:underline cursor-pointer"
          >
            অর্ডার ট্র্যাক করুন
          </button>
          <span className="text-stone-400">·</span>
          <button
            type="button"
            onClick={onOpenAdmin}
            className="text-stone-500 hover:text-stone-800 hover:underline cursor-pointer"
          >
            অ্যাডমিন অর্ডার লিস্ট
          </button>
        </div>
      </div>
    </footer>
  );
};
