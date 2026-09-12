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
      setError("تعذّر الاتصال بالخادم. تأكد من اتصالك بالإنترنت وحاو�  const formatRelativeTime = (timestamp: string) => {
    const diff = Math.max(0, Date.now() - new Date(timestamp).getTime());
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 14) {
      return new Date(timestamp).toLocaleDateString("ar-EG", { month: "short", day: "numeric" });
    }
    if (days >= 2) return `منذ ${days} أيام`;
    if (days === 1) return "أمس";
    if (hours >= 1) return `منذ ${hours} ساعة`;
    if (minutes >= 1) return `منذ ${minutes} دقيقة`;
    return "الآن";
  };

  return (
    <section id="wishes-section" className="py-12 sm:py-16 px-4 relative overflow-hidden bg-[#F7F1E6]" dir="rtl">
      <div className="max-w-5xl mx-auto">

        {/* ═══════════════════════════════════════════════════════════════════
            2-COLUMN DESKTOP GRID / STACKED MOBILE (Matching References 08 & 09)
            - Column 1 (Right): Reference 08 — نموذج إضافة تهنئة
            - Column 2 (Left): Reference 09 — حائط التهاني
            ═══════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          
          {/* ═════════════════════════════════════════════════════════════════
              REFERENCE 08: نموذج إضافة تهنئة (Add Wish Form)
              ═════════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-[#C9A96A]/35 shadow-sm text-center flex flex-col items-center"
          >
            {/* Top Icon in Circle */}
            <div className="w-12 h-12 rounded-full bg-[#FAF5EE] border border-[#C9A96A]/40 flex items-center justify-center text-xl mb-3 shadow-2xs">
              ✏️
            </div>

            <h3 className="text-xl sm:text-2xl font-amiri font-bold text-[#241D18]">
              كلمات من القلب
            </h3>

            <p className="text-xs sm:text-sm font-cairo text-[#70735F] mt-0.5 mb-6">
              شاركونا تهانيكم ودعواتكم للعروسين
            </p>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="text-center py-8 space-y-3 w-full"
                >
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#FAF5EE] border border-[#C9A96A]/40 flex items-center justify-center shadow-xs">
                    <Sparkles className="w-7 h-7 text-[#C9A96A]" />
                  </div>
                  <h4 className="text-2xl font-amiri font-bold text-[#241D18]">
                    شكرًا على تهنئتكم الكريمة! 🎉
                  </h4>
                  <p className="text-xs sm:text-sm font-cairo text-[#5C5146]">
                    أُضيفت رسالتك إلى حائط التهاني وأصبحت معروضة للجميع
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  initial={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="w-full space-y-4 text-right"
                >
                  {/* Name */}
                  <div>
                    <label htmlFor="wish-name" className="block text-xs font-semibold font-cairo text-[#241D18] mb-1.5">
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
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#C9A96A]/30 text-xs sm:text-sm font-cairo text-[#241D18] outline-none focus:border-[#C9A96A] transition-all placeholder:text-[#9E978C]"
                    />
                  </div>

                  {/* Recipient selector */}
                  <div>
                    <label className="block text-xs font-semibold font-cairo text-[#241D18] mb-1.5">
                      المستلم
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {RECIPIENT_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setRecipient(opt.value)}
                          className={`flex flex-col items-center gap-0.5 py-2 px-2 rounded-xl border text-[11px] font-cairo font-semibold transition-all cursor-pointer ${
                            recipient === opt.value
                              ? "bg-[#241D18] text-[#F7F1E6] border-[#241D18] shadow-xs"
                              : "bg-[#FAF5EE] text-[#241D18] border-[#C9A96A]/30 hover:border-[#C9A96A]"
                          }`}
                        >
                          <span>{opt.labelAr}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="wish-message" className="block text-xs font-semibold font-cairo text-[#241D18]">
                        الرسالة <span className="text-red-500">*</span>
                      </label>
                      <span className="text-[10px] text-[#8C8276] font-cairo">{message.length}/300</span>
                    </div>
                    <textarea
                      id="wish-message"
                      required
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="اكتب تهنئتك من القلب..."
                      maxLength={300}
                      className="w-full px-4 py-2 rounded-xl bg-[#FAF5EE] border border-[#C9A96A]/30 text-xs sm:text-sm font-cairo text-[#241D18] outline-none focus:border-[#C9A96A] transition-all resize-none placeholder:text-[#9E978C]"
                    />

                    {/* Emoji & Sticker Buttons */}
                    <div className="relative mt-2 flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        {/* Emoji Picker Trigger */}
                        <button
                          type="button"
                          onClick={() => {
                            setShowEmojiPicker((prev) => !prev);
                            setShowStickerPicker(false);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF5EE] border border-[#C9A96A]/35 text-xs font-cairo text-[#5C5146] hover:border-[#C9A96A] transition-all cursor-pointer shadow-2xs"
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
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-cairo transition-all cursor-pointer shadow-2xs ${
                            selectedSticker
                              ? "bg-[#FAF5EE] border-[#C9A96A] text-[#8A6A32] font-semibold"
                              : "bg-[#FAF5EE] border-[#C9A96A]/35 text-[#5C5146] hover:border-[#C9A96A]"
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
                    <div className="flex items-start gap-2 p-2.5 rounded-xl bg-red-50/90 border border-red-200">
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <p className="text-xs font-cairo text-red-700 leading-normal">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-6 rounded-full bg-[#241D18] hover:bg-[#3A2D24] text-[#FBF8F1] font-bold text-sm font-cairo shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer touch-target flex items-center justify-center gap-2 disabled:opacity-60 mt-2 border border-[#C9A96A]/40"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>جاري الإرسال...</span>
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

          {/* ═════════════════════════════════════════════════════════════════
              REFERENCE 09: حائط التهاني (Wishes Wall Display)
              ═════════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-[#C9A96A]/35 shadow-sm text-center flex flex-col items-center w-full"
          >
            {/* Top Icon in Circle */}
            <div className="w-12 h-12 rounded-full bg-[#FAF5EE] border border-[#C9A96A]/40 flex items-center justify-center text-xl mb-3 shadow-2xs">
              🤎
            </div>

            <h3 className="text-xl sm:text-2xl font-amiri font-bold text-[#241D18]">
              حائط التهاني
            </h3>

            <p className="text-xs sm:text-sm font-cairo text-[#70735F] mt-0.5 mb-5">
              أجمل ما قيل في أحمد ومنة الله
            </p>

            {/* Filter Tabs & Refresh Bar */}
            <div className="w-full mb-4 flex items-center justify-between gap-2 p-1.5 rounded-xl bg-[#FAF5EE] border border-[#C9A96A]/25">
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
                <button
                  type="button"
                  onClick={() => setWallFilter("all")}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-cairo font-semibold transition-all cursor-pointer shrink-0 ${
                    wallFilter === "all" ? "bg-[#241D18] text-[#F7F1E6]" : "text-[#5C5146] hover:bg-white"
                  }`}
                >
                  الكل ({counts.all})
                </button>
                <button
                  type="button"
                  onClick={() => setWallFilter("both")}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-cairo font-semibold transition-all cursor-pointer shrink-0 ${
                    wallFilter === "both" ? "bg-[#241D18] text-[#F7F1E6]" : "text-[#5C5146] hover:bg-white"
                  }`}
                >
                  💑 للعروسين
                </button>
                <button
                  type="button"
                  onClick={() => setWallFilter("groom")}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-cairo font-semibold transition-all cursor-pointer shrink-0 ${
                    wallFilter === "groom" ? "bg-[#241D18] text-[#F7F1E6]" : "text-[#5C5146] hover:bg-white"
                  }`}
                >
                  🤵 للعريس
                </button>
                <button
                  type="button"
                  onClick={() => setWallFilter("bride")}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-cairo font-semibold transition-all cursor-pointer shrink-0 ${
                    wallFilter === "bride" ? "bg-[#241D18] text-[#F7F1E6]" : "text-[#5C5146] hover:bg-white"
                  }`}
                >
                  👰 للعروسة
                </button>
              </div>

              <button
                type="button"
                onClick={fetchWishes}
                className="p-1.5 rounded-lg text-[#8A6A32] hover:bg-white transition-colors cursor-pointer shrink-0"
                title="تحديث التهاني"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              </button>
            </div>

            {/* Wishes Cards Scrollable List */}
            <div className="w-full max-h-[480px] overflow-y-auto space-y-3 pr-1 text-right">
              {loading && wishesList.length === 0 ? (
                <div className="text-center py-10">
                  <Loader2 className="w-6 h-6 text-[#C9A96A] animate-spin mx-auto mb-2" />
                  <p className="text-xs font-cairo text-[#8C8276]">جاري تحميل التهاني...</p>
                </div>
              ) : filteredWishes.length > 0 ? (
                filteredWishes.map((wish) => (
                  <div
                    key={wish.id}
                    className="p-4 rounded-2xl bg-[#FAF5EE] border border-[#C9A96A]/25 text-right relative hover:border-[#C9A96A]/50 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="min-w-0">
                        <span className="font-amiri font-bold text-sm text-[#241D18] block truncate">
                          {wish.name}
                        </span>
                        <span className="text-[10px] font-cairo text-[#8C8276]">
                          {formatRelativeTime(wish.timestamp)}
                        </span>
                      </div>

                      {/* Sticker Badge if present */}
                      {wish.sticker ? (
                        <WishStickerBadge sticker={wish.sticker} />
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-[#8A6A32] font-cairo border border-[#C9A96A]/20">
                          {recipientLabel(wish.recipient as Recipient)}
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm font-cairo text-[#3A2D24] leading-relaxed break-words">
                      {wish.message}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 px-4 rounded-2xl bg-[#FAF5EE]/60 border border-dashed border-[#C9A96A]/35">
                  <Heart className="w-7 h-7 text-[#C9A96A]/40 mx-auto mb-1.5" />
                  <p className="font-amiri text-base text-[#241D18]">لا توجد رسائل في هذا القسم بعد</p>
                  <p className="text-[11px] font-cairo text-[#8C8276] mt-0.5">
                    كن أول من يكتب تهنئة مباركة للعروسين 💛
                  </p>
                </div>
              )}
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}r-3.5 border-r-2 border-[#C9A96A]/50">
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
