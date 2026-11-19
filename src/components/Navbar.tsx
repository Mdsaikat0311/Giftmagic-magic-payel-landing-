import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface NavbarProps {
  onOpenCart: () => void;
  onOpenTracking: () => void;
  cartCount: number;
  onScrollToOrder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCart,
  onOpenTracking,
  cartCount,
  onScrollToOrder,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#efe3e6]">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4 sm:gap-8 px-4 py-3 w-full">
        {/* Zone 1: Single Brand Wordmark */}
        <a
          href="#"
          className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-wider text-[#c91d42] whitespace-nowrap shrink-0"
        >
          JHILMILL
        </a>

        {/* Zone 2: Clean Single-Line Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-bengali font-medium text-[#44403c]">
          <a
            href="#details"
            className="hover:text-[#c91d42] transition-colors whitespace-nowrap shrink-0"
          >
            বিস্তারিত
          </a>
          <a
            href="#lookbook"
            className="hover:text-[#c91d42] transition-colors whitespace-nowrap shrink-0"
          >
            পণ্যের ছবি
          </a>
          <a
            href="#reviews"
            className="hover:text-[#c91d42] transition-colors whitespace-nowrap shrink-0"
          >
            রিভিউ
          </a>
          <button
            type="button"
            onClick={onOpenTracking}
            className="hover:text-[#c91d42] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            অর্ডার ট্র্যাক
          </button>
        </nav>

        {/* Zone 3: Cart & Primary CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label="Shopping Cart"
            className="relative p-2 text-[#44403c] hover:text-[#c91d42] transition-colors rounded-lg hover:bg-[#fff4f6] cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#c91d42] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onScrollToOrder}
            className="px-4 py-2 text-xs sm:text-sm font-bengali font-bold text-white bg-[#c91d42] hover:bg-[#ad1636] active:scale-95 transition-all rounded-lg whitespace-nowrap shrink-0 cursor-pointer"
          >
            অর্ডার করুন
          </button>
        </div>
      </div>
    </header>
  );
};
