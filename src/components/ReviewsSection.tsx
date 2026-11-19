import React, { useState } from 'react';
import { Star, PlusCircle, Heart, CheckCircle } from 'lucide-react';
import { PRODUCT_REVIEWS } from '../data/productData';
import { ProductReview } from '../types';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<ProductReview[]>(() => {
    try {
      const stored = localStorage.getItem('jhilmill_user_reviews');
      if (stored) {
        return [...JSON.parse(stored), ...PRODUCT_REVIEWS];
      }
    } catch (e) {
      console.error(e);
    }
    return PRODUCT_REVIEWS;
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerCity, setReviewerCity] = useState('');
  const [reviewerRating, setReviewerRating] = useState(5);
  const [reviewerComment, setReviewerComment] = useState('');

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewerComment.trim()) return;

    const newRev: ProductReview = {
      id: `rev-${Date.now()}`,
      name: reviewerName.trim(),
      city: reviewerCity.trim() || 'বাংলাদেশ',
      rating: reviewerRating,
      date: 'আজকে',
      comment: reviewerComment.trim(),
      verified: true,
      image: '/assets/aistudio/18K-Premium-Gold-Finishing-Stainles-5_8cf9a3fb.jpg',
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);

    try {
      const existingUser = localStorage.getItem('jhilmill_user_reviews');
      const userList = existingUser ? JSON.parse(existingUser) : [];
      userList.unshift(newRev);
      localStorage.setItem('jhilmill_user_reviews', JSON.stringify(userList));
    } catch (err) {
      console.error(err);
    }

    setReviewerName('');
    setReviewerCity('');
    setReviewerComment('');
    setModalOpen(false);
  };

  return (
    <section id="reviews" className="py-6 px-3 sm:px-4 max-w-3xl mx-auto w-full font-bengali space-y-4">
      {/* Clean Header Bar */}
      <div className="bg-[#1e3a8a] text-white rounded-xl py-2.5 px-4 text-center font-bold text-sm sm:text-base shadow-xs">
        ক্রেতাদের অভিজ্ঞতা ও রিভিউ (৪.৯/৫ ★)
      </div>

      {/* Simple Summary & Add Review Action */}
      <div className="bg-white rounded-xl border border-[#eddce0] p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="font-bold text-lg text-[#1c1917] tabular-nums">৪.৯ / ৫</span>
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
          </div>
          <p className="text-xs text-[#57534e] mt-0.5">
            ১৮৪+ ভেরিফায়েড ক্রেতা এই পায়েলটিকে ৫-স্টার রেটিং দিয়েছেন
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 rounded-lg border border-[#e11d48] text-[#e11d48] hover:bg-[#fff5f6] font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>আপনার রিভিউ লিখুন</span>
        </button>
      </div>

      {/* Simple 2-Column Review Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white p-4 rounded-xl border border-[#eddce0] space-y-2.5 shadow-2xs"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                {rev.image && (
                  <img
                    src={rev.image}
                    alt={rev.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-lg object-cover border border-[#eddce0] shrink-0"
                  />
                )}
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#1c1917] flex items-center gap-1">
                    <span>{rev.name}</span>
                    {rev.verified && <CheckCircle className="w-3.5 h-3.5 text-[#16a34a] shrink-0" />}
                  </h4>
                  <p className="text-[11px] text-[#78716c]">
                    {rev.city} · {rev.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center text-amber-500 shrink-0">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#44403c] leading-relaxed">
              "{rev.comment}"
            </p>
          </div>
        ))}
      </div>

      {/* Write Review Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-5 sm:p-6 max-w-md w-full border border-[#eddce0] shadow-xl font-bengali space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#f2e8ea] pb-3">
              <h3 className="font-bold text-base text-[#1c1917] flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-[#e11d48]" />
                <span>আপনার মূল্যবান রিভিউ দিন</span>
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-stone-400 hover:text-black cursor-pointer text-sm px-2 py-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#292524] mb-1">
                  আপনার নাম <span className="text-[#e11d48]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  placeholder="উদা: ফারহানা আফরিন"
                  className="w-full p-2.5 text-xs sm:text-sm rounded-lg border border-[#d6d3d1] focus:outline-none focus:ring-1 focus:ring-[#e11d48]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#292524] mb-1">
                  শহর / এলাকা
                </label>
                <input
                  type="text"
                  value={reviewerCity}
                  onChange={(e) => setReviewerCity(e.target.value)}
                  placeholder="উদা: ধানমন্ডি, ঢাকা"
                  className="w-full p-2.5 text-xs sm:text-sm rounded-lg border border-[#d6d3d1] focus:outline-none focus:ring-1 focus:ring-[#e11d48]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#292524] mb-1">
                  রেটিং
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewerRating(star)}
                      className="cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= reviewerRating
                            ? 'text-amber-500 fill-current'
                            : 'text-stone-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-[#c91d42]">
                    {reviewerRating} স্টার
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#292524] mb-1">
                  আপনার মতামত <span className="text-[#e11d48]">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={reviewerComment}
                  onChange={(e) => setReviewerComment(e.target.value)}
                  placeholder="পায়েলটির ফিনিশিং, কোয়ালিটি এবং ডেলিভারি অভিজ্ঞতা কেমন ছিল লিখুন..."
                  className="w-full p-2.5 text-xs sm:text-sm rounded-lg border border-[#d6d3d1] focus:outline-none focus:ring-1 focus:ring-[#e11d48]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs rounded-lg border border-[#d6d3d1] hover:bg-stone-50 text-stone-700 cursor-pointer"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs rounded-lg bg-[#e11d48] hover:bg-[#c8163d] text-white font-semibold cursor-pointer"
                >
                  সাবমিট করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
