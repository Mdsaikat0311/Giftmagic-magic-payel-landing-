import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ProductHero } from './components/ProductHero';
import { CraftsmanshipFeatures } from './components/CraftsmanshipFeatures';
import { PhotoLookbook } from './components/PhotoLookbook';
import { ReviewsSection } from './components/ReviewsSection';
import { OrderFormSection } from './components/OrderFormSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { AdminOrdersDrawer } from './components/AdminOrdersDrawer';
import { LivePurchaseNotification } from './components/LivePurchaseNotification';
import { PRODUCT_PACKAGES } from './data/productData';
import { ProductPackage, CustomerOrder } from './types';

export default function App() {
  const [selectedPackage, setSelectedPackage] = useState<ProductPackage>(PRODUCT_PACKAGES[0]);
  const [quantity, setQuantity] = useState<number>(1);

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [recentOrder, setRecentOrder] = useState<CustomerOrder | null>(null);

  const scrollToOrderForm = () => {
    const el = document.getElementById('order-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOrderSuccess = (order: CustomerOrder) => {
    setRecentOrder(order);
  };

  return (
    <div className="min-h-screen bg-[#fffbfa] text-[#1c1917] selection:bg-[#ffe4e6] selection:text-[#9f1239] w-full max-w-full overflow-x-hidden">
      <Navbar
        cartCount={quantity}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onScrollToOrder={scrollToOrderForm}
      />

      <main className="pb-6">
        <ProductHero
          selectedPackage={selectedPackage}
          quantity={quantity}
          onScrollToCheckout={scrollToOrderForm}
        />

        <CraftsmanshipFeatures onScrollToOrder={scrollToOrderForm} />

        <PhotoLookbook onScrollToOrder={scrollToOrderForm} />

        <ReviewsSection />

        <OrderFormSection
          selectedPackage={selectedPackage}
          onSelectPackage={setSelectedPackage}
          quantity={quantity}
          onQuantityChange={setQuantity}
          onOrderSuccess={handleOrderSuccess}
        />

        <FAQSection />
      </main>

      <Footer
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onScrollToOrder={scrollToOrderForm}
      />

      <LivePurchaseNotification />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        selectedPackage={selectedPackage}
        quantity={quantity}
        onQuantityChange={setQuantity}
        onProceedToCheckout={scrollToOrderForm}
      />

      {recentOrder && (
        <OrderSuccessModal
          order={recentOrder}
          onClose={() => setRecentOrder(null)}
        />
      )}

      {isTrackingOpen && (
        <OrderTrackerModal
          onClose={() => setIsTrackingOpen(false)}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />
      )}

      {isAdminOpen && (
        <AdminOrdersDrawer onClose={() => setIsAdminOpen(false)} />
      )}
    </div>
  );
}
