"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { containsProfanity, GuestWish } from "@/config/wedding";
import { Heart, Send, AlertCircle, Loader2, Sparkles, RefreshCw, MessageCircleHeart } from "lucide-react";
import { useAudio } from "./AudioContext";
import { EmojiPicker, StickerPicker, WishStickerBadge } from "./WishEmbellishments";

interface WishesWallProps {
  wishes?: GuestWish[];
  setWishes?: React.Dispatch<React.SetStateAction<GuestWish[]>>;
}

type Recipient = "both" | "groom" | "bride";
type FilterType = "all" | "both" | "groom" | "bride";

const RECIPIENT_OPTIONS: { value: Recipient; labelAr: string; emoji: string }[] = [
  { value: "both",  labelAr: "أحمد & منة الله", emoji: "💑" },
  { value: "groom", labelAr: "أحمد",            emoji: "🤵" },
  { value: "bride", labelAr: "منة الله",        emoji: "👰" },
];

export default function WishesWall({ wishes: propWishes, setWishes: propSetWishes }: WishesWallProps) {
  const [internalWishes, setInternalWishes] = useState<GuestWish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState<Recipient>("both");
  const [wallFilter, setWallFilter] = useState<FilterType>("all");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showStickerPicker, setShowStickerPicker] = useState(false);
  const [selectedSticker, setSelectedSticker] = useState<string>("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const { playCelebrationSound } = useAudio();
  const formRef = useRef<HTMLFormElement>(null);

  // Active wishes list (supports either parent-driven state or self-contained state)
  const wishesList = propWishes !== undefined ? propWishes : internalWishes;
  const updateWishes = (updater: (prev: GuestWish[]) => GuestWish[]) => {
    if (propSetWishes) {
      propSetWishes(updater);
    }
    setInternalWishes(updater);
  };

  // ── Fetch global wishes from API (Single Source of Truth) ───────────────────
  const fetchWishes = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/wishes", {
        headers: { "Cache-Control": "no-cache" },
      });
      if (res.ok) {
        const data = await res.json();
        const serverWishes: GuestWish[] = data.wishes ?? [];
        updateWishes(() => serverWishes);
      }
    } catch (e) {
      console.error("Failed to fetch global wishes", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Global Filter Logic (strictly by recipient, never by device/session) ───
  const activeWishes = wishesList.filter((w) => !w.isHidden);
  
  const filteredWishes = activeWishes.filter((wish) => {
    if (wallFilter === "all") return true;
    return (wish.recipient || "both") === wallFilter;
  }).reverse();

  // Counts for each tab
  const counts = {
    all: activeWishes.length,
    both: activeWishes.filter((w) => (w.recipient || "both") === "both").length,
    groom: activeWishes.filter((w) => w.recipient === "groom").length,
    bride: activeWishes.filter((w) => w.recipient === "bride").length,
  };

  // ── Submission Handler ──────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedMessage) {
      setError("من فضلك أدخل اسمك ورسالتك.");
      return;
    }
    if (trimmedName.length > 60) {
      setError("الاسم طويل جدًا (60 حرف كحد أقصى).");
      return;
    }
    if (trimmedMessage.length > 300) {
      setError("الرسالة طويلة جدًا، 300 حرف كحد أقصى.");
      return;
    }
    if (containsProfanity(trimmedName) || containsProfanity(trimmedMessage)) {
      setError("الرسالة تحتوي على ألفاظ غير لائقة. من فضلك استخدم لغة محترمة تليق بالمناسبة 💛");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          message: trimmedMessage,
          recipient,
          sticker: selectedSticker || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "حدث خطأ أثناء إرسال التهنئة، حاول مرة أخرى.");
        setSubmitting(false);
        return;
      }

      const data = await res.json();
      const newWish: GuestWish = data.wish;

      // Update state immediately with server-returned wish
      updateWishes((prev) => [...prev, newWish]);
      setName("");
      setMessage("");
      setRecipient("both");
      setSelectedSticker("");
      setShowEmojiPicker(false);
      setShowStickerPicker(false);
      setSubmitting(false);
      setSubmitted(true);

      // Trigger celebratory fanfare
      playCelebrationSound();
      confetti({
        particleCount: 110,
        spread: 80,
        origin: { y: 0.65 },
        colors: ["#C9A96A", "#D8BC82", "#F7F1E6", "#241D18"],
      });

      // Background revalidation to ensure 100% sync with all devices
      fetchWishes();

      setTimeout(() => setSubmitted(false), 4500);
    } catch {
      setError("تعذّر الاتصال بالخادم. تأكد من اتصالك بالإنترنت وحاول مجدداً.");
      setSubmitting(false);
    }
  };

  const handleSelectEmoji = (emoji: string) => {
    setMessage((prev) => {
      if (prev.length + emoji.length > 300) return prev;
      return prev + emoji;
    });
  };

  const recipientLabel = (r?: Recipient) => {
    const opt = RECIPIENT_OPTIONS.find((o) => o.value === r);
    return opt ? `${opt.emoji} ${opt.labelAr}` : "💑 أحمد & منة الله";
  };

  return (
    <section id="wishes-section" className="py-24 px-4 relative overflow-hidden bg-gradient-to-b from-[#F7F1E6] via-[#FBF8F1] to-[#F7F1E6]">
      {/* Subtle ambient lighting */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-[#C9A96A]/10 blur-[90px]" />
        <div className="absolute bottom-1/3 -left-20 w-80 h-80 rounded-full bg-[#D8BC82]/10 blur-[90px]" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C9A96A]/15 border border-[#C9A96A]/35 backdrop-blur-sm mb-3">
            <MessageCircleHeart className="w-3.5 h-3.5 text-[#A07D38]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#5C5146] font-cormorant font-semibold">
              Words From The Heart
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-amiri font-bold text-[#241D18]">
            كلمات من القلب
          </h2>

          <div className="flex items-center justify-center gap-3 my-3">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#C9A96A]/60 to-transparent" />
            <span className="text-xs text-[#C9A96A]">✦ 💛 ✦</span>
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#C9A96A]/60 to-transparent" />
          </div>

          <p className="text-sm font-cairo text-[#5C5146] max-w-md mx-auto leading-relaxed">
            شاركونا تهانيكم ودعواتكم للعروسين
          </p>
        </motion.div>

        {/* Wish Submission Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative p-6 sm:p-8 rounded-3xl bg-[#FBF8F1]/95 backdrop-blur-md border border-[#C9A96A]/40 shadow-[0_10px_35px_rgba(201,169,106,0.12)] mb-10"
        >
          {/* Decorative Corner Borders */}
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#C9A96A]/40 rounded-tr" />
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#C9A96A]/40 rounded-tl" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#C9A96A]/40 rounded-br" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#C9A96A]/40 rounded-bl" />

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="text-center py-8 space-y-3"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-tr from-[#D8BC82] to-[#C9A96A] flex items-center justify-center shadow-md">
                  <Sparkles className="w-7 h-7 text-[#241D18]" />
                </div>
                <h3 className="text-2xl font-amiri font-bold text-[#241D18]">
                  شكرًا على تهنئتكم الكريمة! 🎉
                </h3>
                <p className="text-sm font-cairo text-[#5C5146]">
                  أُضيفت رسالتك إلى حائط التهاني وأصبحت معروضة للجميع
                </p>
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
                  <label htmlFor="wish-name" className="block text-sm font-semibold font-cairo text-[#241D18] mb-1.5">
                    الاسم <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="wish-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="اكتب اسمك"
                    maxLength={60}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#C9A96A]/35 focus:border-[#C9A96A] focus:bg-white focus:ring-2 focus:ring-[#C9A96A]/20 text-sm font-cairo outline-none transition-all placeholder:text-[#9E978C] text-[#241D18]"
                  />
                </div>

                {/* Recipient selector */}
                <div>
                  <label className="block text-sm font-semibold font-cairo text-[#241D18] mb-2">
                    المستلم
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {RECIPIENT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setRecipient(opt.value)}
                        className={`flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl border text-xs font-cairo font-semibold transition-all cursor-pointer touch-target ${
                          recipient === opt.value
                            ? "bg-[#241D18] text-[#F7F1E6] border-[#241D18] shadow-md scale-[1.02]"
                            : "bg-white/80 text-[#241D18] border-[#C9A96A]/30 hover:border-[#C9A96A] hover:bg-white"
                        }`}
                      >
                        <span className="text-base">{opt.emoji}</span>
                        <span>{opt.labelAr}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="wish-message" className="block text-sm font-semibold font-cairo text-[#241D18]">
                      الرسالة <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[11px] text-[#8C8276] font-cairo">{message.length}/300</span>
                  </div>
                  <textarea
                    id="wish-message"
                    required
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="اكتب تهنئتك من القلب..."
                    maxLength={300}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#C9A96A]/35 focus:border-[#C9A96A] focus:bg-white focus:ring-2 focus:ring-[#C9A96A]/20 text-sm font-cairo outline-none transition-all resize-none placeholder:text-[#9E978C] text-[#241D18]"
                  />

                  {/* Emoji & Sticker Action Buttons */}
                  <div className="relative mt-2.5 flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      {/* Emoji Picker Trigger */}
                      <button
                        type="button"
                        onClick={() => {
                          setShowEmojiPicker((prev) => !prev);
                          setShowStickerPicker(false);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#C9A96A]/35 text-xs font-cairo text-[#5C5146] hover:border-[#C9A96A] hover:bg-[#F7F1E6] transition-all cursor-pointer shadow-xs"
                        title="إضافة رمز تعبيري"
                      >
                        <span className="text-sm">😊</span>
                        <span>إيموجي</span>
                      </button>

                      {/* Sticker Picker Trigger */}
                      <button
                        type="button"
                        onClick={() => {
                          setShowStickerPicker((prev) => !prev);
                          setShowEmojiPicker(false);
                        }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-cairo transition-all cursor-pointer shadow-xs ${
                          selectedSticker
                            ? "bg-[#F7F1E6] border-[#C9A96A] text-[#8A6A32] font-semibold"
                            : "bg-white border-[#C9A96A]/35 text-[#5C5146] hover:border-[#C9A96A] hover:bg-[#F7F1E6]"
                        }`}
                        title="إضافة ملصق زفاف"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#C9A96A]" />
                        <span>{selectedSticker ? `الملصق: ${selectedSticker}` : "✨ ملصقات"}</span>
                      </button>
                    </div>

                    {selectedSticker && (
                      <button
                        type="button"
                        onClick={() => setSelectedSticker("")}
                        className="text-[11px] font-cairo text-red-600 hover:underline cursor-pointer"
                      >
                        إزالة الملصق ✕
                      </button>
                    )}

                    {/* Emoji Popover */}
                    <EmojiPicker
                      isOpen={showEmojiPicker}
                      onClose={() => setShowEmojiPicker(false)}
                      onSelectEmoji={handleSelectEmoji}
                    />

                    {/* Sticker Popover */}
                    <StickerPicker
                      isOpen={showStickerPicker}
                      onClose={() => setShowStickerPicker(false)}
                      selectedSticker={selectedSticker}
                      onSelectSticker={(stk) => setSelectedSticker(stk)}
                    />
                  </div>
                </div>

                {error && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50/90 border border-red-200">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-xs font-cairo text-red-700 leading-normal">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-[#241D18] hover:bg-[#342B24] text-[#F7F1E6] font-bold text-sm font-cairo shadow-[0_4px_15px_rgba(36,29,24,0.25)] hover:shadow-[0_6px_20px_rgba(36,29,24,0.35)] transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer touch-target flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>جاري إرسال التهنئة...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#C9A96A]" />
                      <span>أرسل تهنئتك ❤️</span>
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Recipient Filter Tabs & Refresh Bar ──────────────────────────────── */}
        <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/70 backdrop-blur-sm p-2 rounded-2xl border border-[#C5A46D]/25 shadow-sm">
          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              type="button"
              onClick={() => setWallFilter("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-cairo font-semibold transition-all shrink-0 cursor-pointer ${
                wallFilter === "all"
                  ? "bg-[#241D18] text-[#F7F1E6] shadow-sm"
                  : "text-[#5C5146] hover:bg-[#F7F1E6]"
              }`}
            >
              الكل ({counts.all})
            </button>
            <button
              type="button"
              onClick={() => setWallFilter("both")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-cairo font-semibold transition-all shrink-0 cursor-pointer ${
                wallFilter === "both"
                  ? "bg-[#241D18] text-[#F7F1E6] shadow-sm"
                  : "text-[#5C5146] hover:bg-[#F7F1E6]"
              }`}
            >
              💑 للعروسين ({counts.both})
            </button>
            <button
              type="button"
              onClick={() => setWallFilter("groom")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-cairo font-semibold transition-all shrink-0 cursor-pointer ${
                wallFilter === "groom"
                  ? "bg-[#241D18] text-[#F7F1E6] shadow-sm"
                  : "text-[#5C5146] hover:bg-[#F7F1E6]"
              }`}
            >
              🤵 للعريس ({counts.groom})
            </button>
            <button
              type="button"
              onClick={() => setWallFilter("bride")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-cairo font-semibold transition-all shrink-0 cursor-pointer ${
                wallFilter === "bride"
                  ? "bg-[#241D18] text-[#F7F1E6] shadow-sm"
                  : "text-[#5C5146] hover:bg-[#F7F1E6]"
              }`}
            >
              👰 للعروسة ({counts.bride})
            </button>
          </div>

          {/* Refresh Action */}
          <button
            type="button"
            onClick={fetchWishes}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-cairo text-[#8A6A32] hover:bg-[#F7F1E6] transition-colors cursor-pointer shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>تحديث التهاني</span>
          </button>
        </div>

        {/* ── Wishes List Display ────────────────────────────────────────────── */}
        {loading && wishesList.length === 0 ? (
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 text-[#C9A96A] animate-spin mx-auto mb-2" />
            <p className="text-xs font-cairo text-[#8C8276]">جاري تحميل التهاني...</p>
          </div>
        ) : (
          <>
            {filteredWishes.length > 0 ? (
              <div className="space-y-4">
                <AnimatePresence>
                  {filteredWishes.map((wish) => (
                    <motion.div
                      key={wish.id}
                      initial={{ opacity: 0, y: 16, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.4 }}
                      className="relative p-5 sm:p-6 rounded-2xl bg-[#FBF8F1]/95 backdrop-blur-sm border border-[#C9A96A]/35 shadow-[0_4px_16px_rgba(201,169,106,0.08)] hover:border-[#C9A96A]/60 transition-all"
                    >
                      {/* Decorative delicate watermark/corner ornament */}
                      <div className="absolute top-2.5 left-2.5 text-[10px] text-[#C9A96A]/40 font-cormorant select-none">✦</div>
                      <div className="absolute bottom-2.5 left-2.5 text-[10px] text-[#C9A96A]/40 font-cormorant select-none">✦</div>

                      {/* Top Row: Avatar + Name + Date & Badge */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D8BC82] to-[#C9A96A] flex items-center justify-center shrink-0 text-base font-bold text-[#241D18] font-cormorant shadow-xs">
                            {wish.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-base font-amiri font-bold text-[#241D18] leading-snug">
                              {wish.name}
                            </p>
                            <p className="text-[10px] font-cairo text-[#8C8276] mt-0.5">
                              {new Date(wish.timestamp).toLocaleDateString("ar-EG", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#F7F1E6] text-[#8A6A32] font-cairo font-semibold border border-[#C9A96A]/30 shadow-2xs">
                            {recipientLabel(wish.recipient as Recipient)}
                          </span>
                          <Heart className="w-4 h-4 text-[#C9A96A] fill-[#C9A96A]/20 shrink-0" />
                        </div>
                      </div>

                      {/* Optional Wedding Sticker Emblem */}
                      {wish.sticker && (
                        <div className="mt-3 flex items-center">
                          <WishStickerBadge sticker={wish.sticker} />
                        </div>
                      )}

                      {/* Message Body with Calligraphic Border */}
                      <div className="mt-3.5 pr-3.5 border-r-2 border-[#C9A96A]/50">
                        <p className="text-sm sm:text-base font-cairo text-[#241D18] leading-relaxed">
                          {wish.message}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center py-12 px-4 rounded-2xl bg-[#FBF8F1]/70 border border-dashed border-[#C9A96A]/40">
                <Heart className="w-9 h-9 text-[#C9A96A]/40 mx-auto mb-2" />
                <p className="font-amiri text-lg text-[#241D18]">لا توجد رسائل في هذا القسم بعد</p>
                <p className="text-xs font-cairo text-[#8C8276] mt-1">
                  كن أول من يكتب تهنئة مباركة للعروسين 💛
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
