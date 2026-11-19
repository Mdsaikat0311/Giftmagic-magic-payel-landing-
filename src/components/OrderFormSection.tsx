import React, { useState } from 'react';
import {
  Lock,
  Check,
  AlertTriangle,
} from 'lucide-react';
import { ProductPackage, CustomerOrder } from '../types';
import { PRODUCT_PACKAGES, PRODUCT_IMAGES } from '../data/productData';

interface OrderFormSectionProps {
  selectedPackage: ProductPackage;
  onSelectPackage: (pkg: ProductPackage) => void;
  quantity: number;
  onQuantityChange: (q: number) => void;
  onOrderSuccess: (order: CustomerOrder) => void;
}

export const OrderFormSection: React.FC<OrderFormSectionProps> = ({
  selectedPackage,
  onSelectPackage,
  quantity,
  onQuantityChange,
  onOrderSuccess,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryArea, setDeliveryArea] = useState<'inside_dhaka' | 'outside_dhaka'>('inside_dhaka');
  const [includeKidsPayel, setIncludeKidsPayel] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const KIDS_PAYEL_PRICE = 399;
  const kidsAddonPrice = includeKidsPayel ? KIDS_PAYEL_PRICE : 0;
  const deliveryFee = deliveryArea === 'inside_dhaka' ? 70 : 110;
  const packageTotal = selectedPackage.salePrice * quantity;
  const subtotal = packageTotal + kidsAddonPrice;
  const total = subtotal + deliveryFee;

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!customerName.trim()) {
      errs.customerName = 'অনুগ্রহ করে আপনার পুরো নামটি লিখুন';
    }
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (!cleanPhone) {
      errs.phone = 'আপনার ১১ ডিজিটের মোবাইল নম্বরটি লিখুন';
    } else if (cleanPhone.length < 11) {
      errs.phone = 'সঠিক ১১ ডিজিটের মোবাইল নম্বর লিখুন (উদা: 017XXXXXXXX)';
    }
    if (!address.trim()) {
      errs.address = 'আপনার সম্পূর্ণ ঠিকানা (বাসা/রোড, থানা, জেলা) লিখুন';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `JS-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder: CustomerOrder = {
        id: orderId,
        createdAt: new Date().toLocaleString('bn-BD', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
        customerName: customerName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        deliveryArea,
        deliveryFee,
        packageId: selectedPackage.id,
        packageName: selectedPackage.bengaliName,
        quantity,
        unitPrice: selectedPackage.salePrice,
        subtotal,
        total,
        includeKidsPayel,
        kidsPayelPrice: kidsAddonPrice,
        status: 'Pending',
        paymentMethod: 'Cash on Delivery',
      };

      try {
        const stored = localStorage.getItem('jhilmill_orders');
        const orders: CustomerOrder[] = stored ? JSON.parse(stored) : [];
        orders.unshift(newOrder);
        localStorage.setItem('jhilmill_orders', JSON.stringify(orders));
      } catch (err) {
        console.error('Failed to save order to localStorage', err);
      }

      setIsSubmitting(false);
      onOrderSuccess(newOrder);
    }, 600);
  };

  return (
    <section id="order-form" className="py-6 sm:py-10 px-3 sm:px-4 max-w-3xl mx-auto w-full font-bengali space-y-4">
      {/* Offer Callout */}
      <div className="bg-[#e11d48] text-white rounded-full py-2.5 px-5 text-center font-bold text-sm sm:text-base shadow-xs">
        বিশেষ অফার: ১ জোড়া পায়েল মাত্র ৪৯৯ টাকা (রেগুলার ৯৯০ টাকা)
      </div>

      {/* Assurance Notice Box (Matching Screenshot Yellow Notice Style) */}
      <div className="bg-[#fefce8] border border-[#fde047] rounded-xl p-3.5 sm:p-4 text-xs sm:text-sm text-[#422006] leading-relaxed">
        <div className="flex items-center gap-1.5 font-bold text-[#b45309] mb-1">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>বিঃদ্রঃ</span>
        </div>
        <p>
          দয়া করে ১০০% নিশ্চিত হয়ে অর্ডার করবেন। ছবি ও বর্ণনার সাথে হুবহু মিল রেখে প্রিমিয়াম ১৮ ক্যারেট গোল্ড প্লেটেড পায়েল পাঠানো হবে। ডেলিভারি ম্যানের সামনে পণ্য খুলে দেখে তারপর মূল্য পরিশোধ করতে পারবেন।
        </p>
      </div>

      {/* Checkout Container */}
      <div className="bg-white rounded-2xl border border-[#e7d6da] shadow-sm overflow-hidden">
        {/* Top Crimson Checkout Header */}
        <div className="bg-[#e11d48] text-white text-center py-3 px-4 font-bold text-base sm:text-lg">
          অর্ডার করতে নিচের ফর্মটি পূরণ করুন
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
          {/* 1. Your Products */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm sm:text-base text-[#1c1917]">
              প্যাকেজ নির্বাচন করুন (Your Products)
            </h3>

            <div className="space-y-2.5">
              {PRODUCT_PACKAGES.map((pkg, idx) => {
                const isSelected = selectedPackage.id === pkg.id;
                const thumb = PRODUCT_IMAGES[idx % PRODUCT_IMAGES.length]?.url;
                return (
                  <div
                    key={pkg.id}
                    onClick={() => onSelectPackage(pkg)}
                    className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-[#16a34a] bg-[#f0fdf4]'
                        : 'border-[#e7e5e4] bg-white hover:border-[#d6d3d1]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-[#16a34a] bg-[#16a34a]' : 'border-stone-400'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>

                      {thumb && (
                        <img
                          src={thumb}
                          alt={pkg.bengaliName}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded-lg object-cover border border-stone-200 shrink-0"
                        />
                      )}

                      <div className="min-w-0">
                        <div className="font-bold text-xs sm:text-sm text-[#1c1917] truncate">
                          {pkg.bengaliName}
                        </div>
                        <div className="text-[11px] sm:text-xs text-[#57534e] truncate">
                          {pkg.badge ? `${pkg.badge} · ` : ''}৳{pkg.salePrice}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-mono font-bold text-sm sm:text-base text-[#1c1917] tabular-nums">
                        {pkg.salePrice}.00৳
                      </div>
                      <div className="font-mono text-[11px] text-stone-400 line-through tabular-nums">
                        {pkg.regularPrice}.00৳
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center justify-between p-3 bg-[#fafaf9] rounded-xl border border-[#e7e5e4]">
              <span className="font-bold text-xs sm:text-sm text-[#292524]">
                পরিমাণ (Quantity):
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                  className="w-8 h-8 rounded-lg bg-white border border-[#d6d3d1] hover:bg-stone-100 text-[#1c1917] font-bold flex items-center justify-center cursor-pointer"
                >
                  -
                </button>
                <span className="font-mono font-bold text-sm text-[#1c1917] tabular-nums w-6 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => onQuantityChange(quantity + 1)}
                  aria-label="Increase quantity"
                  className="w-8 h-8 rounded-lg bg-white border border-[#d6d3d1] hover:bg-stone-100 text-[#1c1917] font-bold flex items-center justify-center cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Extra Selectable Option: বাচ্চা মেয়েদের ১ জোড়া পায়েল */}
            <div
              onClick={() => setIncludeKidsPayel(!includeKidsPayel)}
              className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between gap-3 ${
                includeKidsPayel
                  ? 'border-[#16a34a] bg-[#f0fdf4]'
                  : 'border-[#e7e5e4] bg-[#fafaf9] hover:border-[#d6d3d1]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${
                    includeKidsPayel
                      ? 'border-[#16a34a] bg-[#16a34a] text-white'
                      : 'border-stone-400 bg-white'
                  }`}
                >
                  {includeKidsPayel && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm text-[#1c1917]">
                    বাচ্চা মেয়েদের ১ জোড়া পায়েল (কিডস সাইজ)
                  </div>
                  <div className="text-[11px] sm:text-xs text-[#57534e]">
                    বড়দের পাশাপাশি বাচ্চাদের পায়েলও একসাথে নিতে টিক দিন
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="font-mono font-bold text-sm text-[#e11d48] tabular-nums">
                  +399.00৳
                </div>
                <div className="font-mono text-[11px] text-stone-400 line-through tabular-nums">
                  799.00৳
                </div>
              </div>
            </div>
          </div>

          {/* 2. Billing details */}
          <div className="space-y-3.5">
            <h3 className="font-bold text-sm sm:text-base text-[#1c1917] pb-1.5 border-b border-[#f0eceb]">
              Billing details (আপনার নাম ও ঠিকানা)
            </h3>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-[#292524]">
                আপনার নাম <span className="text-[#e11d48]">*</span>
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="আপনার পুরো নাম লিখুন"
                className={`w-full p-2.5 sm:p-3 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-[#e11d48]/40 ${
                  errors.customerName ? 'border-[#e11d48]' : 'border-[#d6d3d1]'
                }`}
              />
              {errors.customerName && (
                <p className="text-xs text-[#e11d48]">{errors.customerName}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-[#292524]">
                আপনার এড্রেস (সম্পূর্ণ ঠিকানা) <span className="text-[#e11d48]">*</span>
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="বাসা/রোড নং, এলাকা, থানা, জেলা"
                className={`w-full p-2.5 sm:p-3 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-[#e11d48]/40 ${
                  errors.address ? 'border-[#e11d48]' : 'border-[#d6d3d1]'
                }`}
              />
              {errors.address && (
                <p className="text-xs text-[#e11d48]">{errors.address}</p>
              )}
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-[#292524]">
                মোবাইল নাম্বার <span className="text-[#e11d48]">*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="017XXXXXXXX"
                className={`w-full p-2.5 sm:p-3 text-sm rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-[#e11d48]/40 ${
                  errors.phone ? 'border-[#e11d48]' : 'border-[#d6d3d1]'
                }`}
              />
              {errors.phone && (
                <p className="text-xs text-[#e11d48]">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* 3. Shipping */}
          <div className="space-y-2.5">
            <h3 className="font-bold text-sm sm:text-base text-[#1c1917]">
              Shipping (ডেলিভারি এলাকা)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <label
                onClick={() => setDeliveryArea('inside_dhaka')}
                className={`p-3 rounded-lg border cursor-pointer flex items-center justify-between text-xs sm:text-sm ${
                  deliveryArea === 'inside_dhaka'
                    ? 'border-[#16a34a] bg-[#f0fdf4] font-semibold'
                    : 'border-[#d6d3d1] bg-white'
                }`}
              >
                <span>ঢাকার ভেতরে (২৪-৪৮ ঘণ্টা)</span>
                <span className="font-mono font-bold tabular-nums">70.00৳</span>
              </label>

              <label
                onClick={() => setDeliveryArea('outside_dhaka')}
                className={`p-3 rounded-lg border cursor-pointer flex items-center justify-between text-xs sm:text-sm ${
                  deliveryArea === 'outside_dhaka'
                    ? 'border-[#16a34a] bg-[#f0fdf4] font-semibold'
                    : 'border-[#d6d3d1] bg-white'
                }`}
              >
                <span>ঢাকার বাইরে (২-৩ দিন)</span>
                <span className="font-mono font-bold tabular-nums">110.00৳</span>
              </label>
            </div>
          </div>

          {/* 4. Your Order Summary */}
          <div className="space-y-2.5">
            <h3 className="font-bold text-sm sm:text-base text-[#1c1917]">
              Your order
            </h3>

            <div className="rounded-xl border border-[#e7e5e4] bg-[#fafaf9] p-3.5 space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between font-bold text-[#57534e] pb-2 border-b border-[#e7e5e4]">
                <span>Product</span>
                <span>Subtotal</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-[#1c1917] font-medium">
                  {selectedPackage.bengaliName} × {quantity}
                </span>
                <span className="font-mono font-bold tabular-nums">{packageTotal}.00৳</span>
              </div>

              {includeKidsPayel && (
                <div className="flex justify-between items-center py-1 text-[#1c1917]">
                  <span>+ বাচ্চা মেয়েদের ১ জোড়া পায়েল × ১</span>
                  <span className="font-mono font-bold tabular-nums">{kidsAddonPrice}.00৳</span>
                </div>
              )}

              <div className="flex justify-between items-center py-1 text-[#57534e] border-t border-[#e7e5e4] pt-2">
                <span>ডেলিভারি চার্জ</span>
                <span className="font-mono font-bold tabular-nums">{deliveryFee}.00৳</span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-[#d6d3d1] font-bold text-base text-[#1c1917]">
                <span>Total</span>
                <span className="font-mono text-lg text-[#e11d48] tabular-nums">{total}.00৳</span>
              </div>
            </div>
          </div>

          {/* Cash on Delivery Banner + Place Order Button */}
          <div className="space-y-3">
            <div className="bg-[#0d7a6c] text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-lg text-center">
              Cash on delivery · পণ্য হাতে পেয়ে দেখে মূল্য পরিশোধ করুন
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-base sm:text-lg text-white bg-[#e11d48] hover:bg-[#c8163d] active:scale-[0.99] transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
            >
              <Lock className="w-4 h-4 shrink-0" />
              <span>
                {isSubmitting
                  ? 'অর্ডার প্রসেস হচ্ছে...'
                  : `অর্ডার কনফার্ম করতে ক্লিক করুন (${total}.00৳)`}
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
