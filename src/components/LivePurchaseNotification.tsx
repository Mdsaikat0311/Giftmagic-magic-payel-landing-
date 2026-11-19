import React, { useState, useEffect } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { LIVE_PURCHASE_NOTIFICATIONS } from '../data/productData';

export const LivePurchaseNotification: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    let switchTimer: ReturnType<typeof setTimeout> | undefined;

    // Show initial after 3 seconds
    const initialTimer = setTimeout(() => {
      setVisible(true);
    }, 3000);

    // Interval to cycle through
    const interval = setInterval(() => {
      setVisible(false);
      switchTimer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % LIVE_PURCHASE_NOTIFICATIONS.length);
        setVisible(true);
      }, 4000);
    }, 14000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
      if (switchTimer) clearTimeout(switchTimer);
    };
  }, [dismissed]);

  if (dismissed || !visible) return null;

  const current = LIVE_PURCHASE_NOTIFICATIONS[currentIndex];

  return (
    <div className="fixed bottom-3 sm:bottom-5 left-2.5 sm:left-4 z-40 max-w-[230px] sm:max-w-[260px] bg-white/95 backdrop-blur-md border border-[#d8be8d] rounded-xl p-2 sm:p-2.5 shadow-md font-bengali transition-all duration-300">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg overflow-hidden border border-[#e0d3be] shrink-0">
          <img
            src="/assets/aistudio/18K-Premium-Gold-Finishing-Stainles-5_8cf9a3fb.jpg"
            alt="Payel ordered"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 text-[10px] text-[#2d7a46] font-semibold">
            <CheckCircle className="w-2.5 h-2.5 shrink-0" />
            <span className="truncate">সদ্য অর্ডার কনফার্ম করেছেন</span>
          </div>
          <p className="text-[11px] font-bold text-[#211c19] truncate">
            {current.name} · <span className="text-stone-500 font-normal">{current.city}</span>
          </p>
          <p className="text-[10px] text-[#9e2a2b] font-medium truncate">
            {current.item}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="বন্ধ করুন"
          className="text-stone-300 hover:text-stone-600 p-0.5 cursor-pointer shrink-0 self-start"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
