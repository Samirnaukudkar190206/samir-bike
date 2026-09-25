import React, { useState } from 'react';
import { 
  Star, 
  Sparkles, 
  CheckCircle2, 
  MessageSquare, 
  ThumbsUp, 
  Edit3, 
  Wrench, 
  ShieldCheck, 
  Clock, 
  Send,
  AlertCircle
} from 'lucide-react';
import { Booking } from '../types/index.ts';
import { api } from '../services/api.ts';

interface FeedbackProps {
  booking: Booking;
  onFeedbackSubmitted: (updatedBooking: Booking) => void;
}

const RATING_DESCRIPTIONS: Record<number, { label: string; text: string; color: string }> = {
  1: { label: 'Poor', text: 'Significant issues encountered during service', color: 'text-rose-400' },
  2: { label: 'Fair', text: 'Met some requirements, but room for improvement', color: 'text-amber-400' },
  3: { label: 'Good', text: 'Average service, bike feels fine', color: 'text-yellow-400' },
  4: { label: 'Very Good', text: 'Smooth experience and noticeably better ride quality', color: 'text-emerald-400' },
  5: { label: 'Exceptional', text: 'Bike rides like brand new! Exceeded all expectations', color: 'text-cyan-400' }
};

const SUGGESTED_TAGS = [
  '⚡ Ultra Smooth Throttle',
  '🛑 Crisp & Responsive Brakes',
  '⏱️ On-Time Doorstep Handover',
  '👨‍🔧 Master Tech Walkthrough',
  '✨ Spotless Wash & Jet Polish',
  '💰 100% Honest Pricing',
  '🔇 Eliminated Chattering & Noise',
  '🔋 Optimum Battery / Mileage'
];

export const Feedback: React.FC<FeedbackProps> = ({ booking, onFeedbackSubmitted }) => {
  const [rating, setRating] = useState<number>(booking.customerRating || 5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>(booking.customerFeedback || '');
  const [selectedTags, setSelectedTags] = useState<string[]>(
    booking.feedbackTags && booking.feedbackTags.length > 0 
      ? booking.feedbackTags 
      : ['⚡ Ultra Smooth Throttle', '✨ Spotless Wash & Jet Polish']
  );
  
  // If booking already has a rating and user hasn't toggled editing
  const [isEditing, setIsEditing] = useState<boolean>(!booking.customerRating);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const activeRating = hoverRating || rating;
  const ratingInfo = RATING_DESCRIPTIONS[activeRating] || RATING_DESCRIPTIONS[5];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating < 1 || rating > 5) {
      setErrorMessage('Please pick a star rating between 1 and 5.');
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await api.submitFeedback(booking.id, {
        rating,
        feedback: comment,
        tags: selectedTags
      });

      setSuccessMessage('Thank you! Your verified service review has been recorded.');
      setIsEditing(false);
      onFeedbackSubmitted(res.booking);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to record feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // If already reviewed and not in edit mode, display confirmed review card
  if (booking.customerRating && !isEditing) {
    return (
      <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-6 sm:p-8 shadow-xl space-y-5 animate-in fade-in duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Verified Rider Review
                </span>
                <span className="text-[10px] text-slate-500">•</span>
                <span className="text-xs text-slate-400">
                  {booking.feedbackSubmittedAt ? new Date(booking.feedbackSubmittedAt).toLocaleDateString() : 'Recent'}
                </span>
              </div>
              <h4 className="text-base font-bold text-white">
                Service Experience on {booking.bikeBrand} {booking.bikeModel}
              </h4>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Edit Review</span>
          </button>
        </div>

        {/* Stars Display */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-6 h-6 ${
                  star <= booking.customerRating!
                    ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]'
                    : 'text-slate-700'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-extrabold text-white font-mono">
            {booking.customerRating}.0 / 5.0
          </span>
          <span className="text-xs text-slate-400">
            ({RATING_DESCRIPTIONS[booking.customerRating]?.label || 'Rated'})
          </span>
        </div>

        {/* Review Comments */}
        {booking.customerFeedback ? (
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs sm:text-sm text-slate-200 italic leading-relaxed">
            "{booking.customerFeedback}"
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic">No written comments provided.</p>
        )}

        {/* Tag Badges */}
        {booking.feedbackTags && booking.feedbackTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {booking.feedbackTags.map((t, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-950 border border-cyan-500/25 text-cyan-300 font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Mechanic Recognition */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Wrench className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              Serviced by: <strong className="text-slate-200">{booking.assignedMechanic || 'Master Technician'}</strong>
            </span>
          </div>
          <span className="text-emerald-400 font-medium">100% Satisfaction Protected</span>
        </div>
      </div>
    );
  }

  // Edit / Input Review Form
  return (
    <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex items-start justify-between pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[11px] font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Service Experience Feedback</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white">
            How does your {booking.bikeBrand} {booking.bikeModel} ride?
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Your review directly rates technician <strong className="text-slate-200">{booking.assignedMechanic || 'the service team'}</strong> and updates workshop quality standards.
          </p>
        </div>

        {booking.customerRating && (
          <button
            onClick={() => setIsEditing(false)}
            className="text-xs text-slate-400 hover:text-white"
          >
            Cancel
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Interactive Star Rating Selector */}
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-3">
          <span className="text-xs font-semibold text-slate-300 block uppercase tracking-wider text-[11px]">
            Overall Service Satisfaction:
          </span>

          <div className="flex items-center justify-center gap-2 sm:gap-3 py-1">
            {[1, 2, 3, 4, 5].map((star) => {
              const isFilled = star <= activeRating;
              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 focus:outline-none transition-transform hover:scale-125 cursor-pointer"
                  title={`${star} Star - ${RATING_DESCRIPTIONS[star]?.label}`}
                >
                  <Star
                    className={`w-8 h-8 sm:w-10 sm:h-10 transition-colors ${
                      isFilled
                        ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]'
                        : 'text-slate-700 hover:text-slate-500'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Dynamic Rating Label */}
          <div className="min-h-[38px]">
            <div className="text-sm font-bold text-white flex items-center justify-center gap-2">
              <span className={`font-mono text-base ${ratingInfo.color}`}>
                {activeRating}.0 Star
              </span>
              <span>—</span>
              <span className={ratingInfo.color}>{ratingInfo.label}</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">{ratingInfo.text}</p>
          </div>
        </div>

        {/* Quick Highlights / Tags */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">
            What went especially well? (Select all that apply)
          </label>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_TAGS.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`text-xs px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-semibold shadow-sm shadow-cyan-500/10'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Comments Text Area */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
              Detailed Rider Feedback & Mechanical Notes:
            </span>
            <span className="text-[10px] text-slate-500">Optional</span>
          </label>
          <textarea
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us about the engine smoothness, gear shifts, brake bite, pickup punctuality, or technician interaction..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Error / Success Banners */}
        {errorMessage && (
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Submit Actions */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Verified Customer Feedback
          </span>

          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {submitting ? (
              <span>Submitting Review...</span>
            ) : (
              <>
                <Send className="w-3.5 h-3.5 text-slate-950" />
                <span>{booking.customerRating ? 'Update Review' : 'Submit Service Rating'}</span>
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
};
