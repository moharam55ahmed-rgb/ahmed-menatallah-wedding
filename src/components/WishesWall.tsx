"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { containsProfanity } from "@/config/wedding";
import { GuestWish } from "@/config/wedding";
import { Heart, Send, AlertCircle, Loader2, Sparkles, RefreshCw } from "lucide-react";
import { useAudio } from "./AudioContext";

// ── Legacy localStorage helpers (kept for backward-compat / fallback) ──────
const STORAGE_KEY = "wedding_wishes_v1";
export function loadWishes(): GuestWish[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}
export function saveWishes(wishes: GuestWish[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
}

interface WishesWallProps {
  wishes: GuestWish[];
  setWishes: React.Dispatch<React.SetStateAction<GuestWish[]>>;
}

type Recipient = "both" | "groom" | "bride";

const RECIPIENT_OPTIONS: { value: Recipient; labelAr: string; emoji: string }[] = [
  { value: "both",  labelAr: "للعروسين معاً", emoji: "💑" },
  { value: "groom", labelAr: "للعريس",         emoji: "🤵" },
  { value: "bride", labelAr: "للعروسة",         emoji: "👰" },
];

export default function WishesWall({ wishes, setWishes }: WishesWallProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState<Recipient>("both");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const { playCelebrationSound } = useAudio();
  const formRef = useRef<HTMLFormElement>(null);

  // ── Fetch wishes from API on mount ─────────────────────────────────────
  const fetchWishes = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/wishes");
      if (res.ok) {
        const data = await res.json();
        setWishes(data.wishes ?? []);
      }
    } catch {
      // Fallback to localStorage
      setWishes(loadWishes());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visibleWishes = [...wishes].reverse();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !message.trim()) {
      setError("من فضلك أدخل اسمك ورسالتك.");
      return;
    }
    if (message.trim().length > 300) {
      setError("الرسالة طويلة جدًا، 300 حرف كحد أقصى.");
      return;
    }
    if (containsProfanity(name) || containsProfanity(message)) {
      setError("الرسالة تحتوي على ألفاظ غير لائقة. من فضلك استخدم لغة محترمة 😊");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), message: message.trim(), recipient }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "حدث خطأ، حاول مرة أخرى.");
        setSubmitting(false);
        return;
      }

      const data = await res.json();
      const newWish: GuestWish = data.wish;
      setWishes((prev) => [...prev, newWish]);
      setName("");
      setMessage("");
      setRecipient("both");
      setSubmitting(false);
      setSubmitted(true);

      playCelebrationSound();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.7 },
        colors: ["#C5A46D", "#EAD7D1", "#FAF5EE", "#B58A48", "#DFCBA8"],
      });

      setTimeout(() => setSubmitted(false), 4000);
    } catch {
      setError("تعذّر الاتصال بالخادم. تأكد من اتصالك بالإنترنت وحاول مجدداً.");
      setSubmitting(false);
    }
  };

  const recipientLabel = (r?: Recipient) => {
    const opt = RECIPIENT_OPTIONS.find((o) => o.value === r);
    return opt ? `${opt.emoji} ${opt.labelAr}` : "💑 للعروسين معاً";
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden bg-[#F8F2EA]">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A46D]/15 border border-[#C5A46D]/30 mb-3">
            <Heart className="w-3.5 h-3.5 text-[#A07F47] fill-[#A07F47]/20" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#70735F] font-cormorant">Wishes Wall</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-amiri font-bold text-[#231F1A]">حائط التهاني</h2>
          <p className="text-sm font-cairo text-[#70735F] mt-2">اكتب رسالتك وشاركهم فرحتك — تهنئتك تثبت للجميع 💛</p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="p-6 sm:p-8 rounded-3xl glass-card border border-[#C5A46D]/40 shadow-lg mb-8"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="text-center py-6 space-y-2"
              >
                <Sparkles className="w-10 h-10 text-[#C5A46D] mx-auto" />
                <h3 className="text-2xl font-amiri font-bold text-[#231F1A]">شكرًا على تهنئتكم! 🎉</h3>
                <p className="text-sm font-cairo text-[#231F1A]/80">ظهرت رسالتك على حائط التهاني للجميع</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                ref={formRef}
                initial={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {/* Name */}
                <div>
                  <label htmlFor="wish-name" className="block text-sm font-semibold font-cairo text-[#231F1A] mb-1.5">
                    اسمك <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="wish-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="أدخل اسمك..."
                    maxLength={60}
                    className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[#C5A46D]/30 focus:border-[#C5A46D] focus:ring-2 focus:ring-[#C5A46D]/20 text-sm font-cairo outline-none transition-all"
                  />
                </div>

                {/* Recipient selector */}
                <div>
                  <label className="block text-sm font-semibold font-cairo text-[#231F1A] mb-2">
                    تهنئتك موجّهة إلى
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {RECIPIENT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setRecipient(opt.value)}
                        className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border text-xs font-cairo font-semibold transition-all cursor-pointer touch-target ${
                          recipient === opt.value
                            ? "bg-[#231F1A] text-[#F8F2EA] border-[#231F1A] shadow-md"
                            : "bg-white/60 text-[#231F1A] border-[#C5A46D]/30 hover:border-[#C5A46D]"
                        }`}
                      >
                        <span className="text-lg">{opt.emoji}</span>
                        <span>{opt.labelAr}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="wish-message" className="block text-sm font-semibold font-cairo text-[#231F1A] mb-1.5">
                    رسالتك <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="wish-message"
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="اكتب تهنئتك أو كلمة من القلب..."
                    maxLength={300}
                    className="w-full px-4 py-3 rounded-xl bg-white/80 border border-[#C5A46D]/30 focus:border-[#C5A46D] focus:ring-2 focus:ring-[#C5A46D]/20 text-sm font-cairo outline-none transition-all resize-none"
                  />
                  <span className="text-[11px] text-[#70735F] font-cairo">{message.length}/300</span>
                </div>

                {error && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-xs font-cairo text-red-600">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#B58A48] via-[#DFCBA8] to-[#B58A48] text-[#151311] font-bold text-sm font-cairo shadow-md hover:shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer touch-target flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>أرسل تهنئتك</span>
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Wishes List */}
        {loading ? (
          <div className="text-center py-8">
            <Loader2 className="w-6 h-6 text-[#C5A46D] animate-spin mx-auto" />
          </div>
        ) : (
          <>
            {visibleWishes.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-cairo text-[#70735F]">{visibleWishes.length} تهنئة</p>
                  <button
                    type="button"
                    onClick={fetchWishes}
                    className="flex items-center gap-1 text-xs font-cairo text-[#A07F47] hover:text-[#231F1A] transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>تحديث</span>
                  </button>
                </div>
                <AnimatePresence>
                  {visibleWishes.map((wish) => (
                    <motion.div
                      key={wish.id}
                      initial={{ opacity: 0, y: 15, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                      className="p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#C5A46D]/25 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#DFCBA8] to-[#C5A46D] flex items-center justify-center shrink-0 text-sm font-bold text-[#151311] font-cormorant">
                            {wish.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-bold font-cairo text-[#231F1A]">{wish.name}</p>
                            <p className="text-[10px] font-cairo text-[#70735F]">
                              {new Date(wish.timestamp).toLocaleDateString("ar-EG", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {/* Recipient badge */}
                          <span className="text-xs px-2 py-0.5 rounded-full bg-[#C5A46D]/15 text-[#A07F47] font-cairo border border-[#C5A46D]/25">
                            {recipientLabel(wish.recipient as Recipient)}
                          </span>
                          <Heart className="w-4 h-4 text-[#C5A46D] fill-[#C5A46D]/30 shrink-0" />
                        </div>
                      </div>
                      <p className="mt-3 text-sm font-cairo text-[#231F1A]/90 leading-relaxed border-r-2 border-[#C5A46D]/50 pr-3">
                        {wish.message}
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {visibleWishes.length === 0 && (
              <div className="text-center py-8 text-[#70735F] font-cairo text-sm">
                <Heart className="w-8 h-8 text-[#C5A46D]/30 mx-auto mb-2" />
                <p>كن أول من يكتب تهنئته للعروسين 💛</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
