import React from 'react';

interface FooterProps {
  onOpenTracking: () => void;
  onOpenAdmin: () => void;
  onScrollToOrder: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-[#fff0f3] border-t border-[#f0d8de] font-bengali py-6 pb-20 md:pb-8 px-4 text-center text-xs text-[#44403c] w-full">
      <div className="max-w-3xl mx-auto">
        <p className="font-medium">
          © ২০২৬ GiftMagic. সর্বস্বত্ব সংরক্ষিত।
        </p>
      </div>
    </footer>
  );
};
