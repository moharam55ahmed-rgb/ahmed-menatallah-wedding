"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GuestWish, wedding } from "@/config/wedding";
import Link from "next/link";
import {
  Trash2, Eye, EyeOff, MessageSquare, Users, Settings,
  Save, RotateCcw, LogOut, Lock,
  Heart, X, AlertTriangle, BarChart3, RefreshCw, Loader2, Check,
  Printer, Edit3, Sparkles
} from "lucide-react";
import { EmojiPicker, StickerPicker, WishStickerBadge } from "./WishEmbellishments";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
type Tab = "wishes" | "rsvp" | "settings" | "stats";
type RecipientFilter = "all" | "groom" | "bride" | "both";

interface RSVPEntry {
  id: string;
  name: string;
  attendance: "attending" | "not_attending";
  guestsCount: string;
  message: string;
  submittedAt: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("wishes");

  // Wishes
  const [wishes, setWishes] = useState<GuestWish[]>([]);
  const [wishesSearch, setWishesSearch] = useState("");
  const [recipientFilter, setRecipientFilter] = useState<RecipientFilter>("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [wishesLoading, setWishesLoading] = useState(false);

  // Print Wall State
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [printRecipientFilter, setPrintRecipientFilter] = useState<RecipientFilter>("all");
  const [printVisibleOnly, setPrintVisibleOnly] = useState(true);
  const [printOrientation, setPrintOrientation] = useState<"portrait" | "landscape">("portrait");

  // Edit Wish State
  const [editingWish, setEditingWish] = useState<GuestWish | null>(null);
  const [editName, setEditName] = useState("");
  const [editRecipient, setEditRecipient] = useState<"both" | "groom" | "bride">("both");
  const [editMessage, setEditMessage] = useState("");
  const [editSticker, setEditSticker] = useState<string | null>(null);
  const [editIsHidden, setEditIsHidden] = useState(false);
  const [editSaving, setEditSaving] = useState(false);
  const [showEditEmojiPicker, setShowEditEmojiPicker] = useState(false);
  const [showEditStickerPicker, setShowEditStickerPicker] = useState(false);

  // RSVP
  const [rsvpEntries, setRsvpEntries] = useState<RSVPEntry[]>([]);
  const [rsvpLoading, setRsvpLoading] = useState(false);
  const [daysUntilWedding, setDaysUntilWedding] = useState(0);

  // Settings
  const [config, setConfig] = useState({
    groomAr: wedding.groomAr,
    brideAr: wedding.brideAr,
    dayAr: wedding.dayAr,
    venueAr: wedding.venueAr,
    cityAr: wedding.cityAr,
    inviteText: wedding.heroText.inviteText,
    introLine: wedding.heroText.intro,
    invitationBody: wedding.invitationMessage.body,
    invitationClosing: wedding.invitationMessage.closing,
    romanticMomentsTitle: wedding.romanticMoments.title,
  });
  const [configSaved, setConfigSaved] = useState(false);

  // ── Data fetching ──────────────────────────────────────────────────────────
  const fetchWishes = useCallback(async () => {
    setWishesLoading(true);
    try {
      // No need to send a secret — the HttpOnly cookie is sent automatically
      const res = await fetch("/api/wishes");
      if (res.ok) {
        const data = await res.json();
        setWishes(data.wishes ?? []);
      }
    } catch {
      // silent
    } finally {
      setWishesLoading(false);
    }
  }, []);

  const fetchRSVP = useCallback(async () => {
    setRsvpLoading(true);
    try {
      const res = await fetch("/api/rsvp");
      if (res.ok) {
        const data = await res.json();
        setRsvpEntries(data.entries ?? []);
      }
    } catch {
      // silent
    } finally {
      setRsvpLoading(false);
    }
  }, []);

  // ── Auth ───────────────────────────────────────────────────────────────────
  // On mount, probe /api/rsvp — if we get 200 the cookie is valid, else 401 = not logged in
  useEffect(() => {
    const weddingDate = new Date("2026-10-14").getTime();
    setDaysUntilWedding(Math.max(0, Math.floor((weddingDate - Date.now()) / 86400000)));

    fetch("/api/rsvp")
      .then((r) => {
        if (r.ok) setAuthenticated(true);
      })
      .catch(() => {})
      .finally(() => setAuthChecked(true));
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    fetchWishes();
    fetchRSVP();
    const savedConfig = localStorage.getItem("wedding_config_override");
    if (savedConfig) {
      try { setConfig(JSON.parse(savedConfig)); } catch {}
    }
  }, [authenticated, fetchWishes, fetchRSVP]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setLoginLoading(true);
    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setAuthenticated(true);
      } else {
        setPasswordError("كلمة المرور غير صحيحة");
      }
    } catch {
      setPasswordError("تعذّر الاتصال، حاول مجدداً");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/verify", { method: "DELETE" });
    setAuthenticated(false);
    setPassword("");
  };

  // ── Wish actions ───────────────────────────────────────────────────────────
  const handleToggleHide = async (id: string) => {
    try {
      const res = await fetch(`/api/wishes/${id}`, { method: "PATCH" });
      if (res.ok) {
        const data = await res.json();
        setWishes((prev) => prev.map((w) => (w.id === id ? data.wish : w)));
      }
    } catch { /* silent */ }
  };

  const handleDeleteWish = async (id: string) => {
    if (confirmDeleteId !== id) { setConfirmDeleteId(id); return; }
    setDeletingId(id);
    try {
      await fetch(`/api/wishes/${id}`, { method: "DELETE" });
      setTimeout(() => {
        setWishes((prev) => prev.filter((w) => w.id !== id));
        setDeletingId(null);
        setConfirmDeleteId(null);
      }, 300);
    } catch {
      setDeletingId(null);
    }
  };

  const handleStartEdit = (wish: GuestWish) => {
    setEditingWish(wish);
    setEditName(wish.name);
    setEditRecipient(wish.recipient ?? "both");
    setEditMessage(wish.message);
    setEditSticker(wish.sticker ?? null);
    setEditIsHidden(wish.isHidden ?? false);
    setShowEditEmojiPicker(false);
    setShowEditStickerPicker(false);
  };

  const handleSaveEdit = async () => {
    if (!editingWish) return;
    if (!editName.trim() || !editMessage.trim()) return;

    setEditSaving(true);
    try {
      const res = await fetch(`/api/wishes/${editingWish.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editName.trim(),
          recipient: editRecipient,
          message: editMessage.trim(),
          sticker: editSticker,
          isHidden: editIsHidden,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setWishes((prev) => prev.map((w) => (w.id === editingWish.id ? data.wish : w)));
        setEditingWish(null);
      }
    } catch {
      // silent
    } finally {
      setEditSaving(false);
    }
  };

  const handleTriggerPrint = () => {
    setShowPrintModal(false);
    setTimeout(() => {
      window.print();
    }, 150);
  };

  // ── Settings ───────────────────────────────────────────────────────────────
  const handleSaveConfig = () => {
    localStorage.setItem("wedding_config_override", JSON.stringify(config));
    setConfigSaved(true);
    setTimeout(() => setConfigSaved(false), 3000);
  };

  const handleResetConfig = () => {
    setConfig({
      groomAr: wedding.groomAr, brideAr: wedding.brideAr,
      dayAr: wedding.dayAr, venueAr: wedding.venueAr,
      cityAr: wedding.cityAr, inviteText: wedding.heroText.inviteText,
      introLine: wedding.heroText.intro,
      invitationBody: wedding.invitationMessage.body,
      invitationClosing: wedding.invitationMessage.closing,
      romanticMomentsTitle: wedding.romanticMoments.title,
    });
    localStorage.removeItem("wedding_config_override");
  };

  // ── Derived data ───────────────────────────────────────────────────────────
  const filteredWishes = wishes.filter((w) => {
    const matchSearch =
      w.name.toLowerCase().includes(wishesSearch.toLowerCase()) ||
      w.message.toLowerCase().includes(wishesSearch.toLowerCase());
    const matchRecipient =
      recipientFilter === "all" || (w.recipient ?? "both") === recipientFilter;
    return matchSearch && matchRecipient;
  });

  const wishesForPrint = wishes.filter((w) => {
    if (printVisibleOnly && w.isHidden) return false;
    if (printRecipientFilter === "all") return true;
    return (w.recipient ?? "both") === printRecipientFilter;
  });

  const visibleCount = wishes.filter((w) => !w.isHidden).length;
  const hiddenCount = wishes.filter((w) => w.isHidden).length;
  const attendingCount = rsvpEntries.filter((e) => e.attendance === "attending").length;

  const recipientLabel = (r?: string) => {
    if (r === "groom") return "🤵 للعريس";
    if (r === "bride") return "👰 للعروسة";
    return "💑 للعروسين";
  };

  // ── Loading skeleton while checking auth ───────────────────────────────────
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#151311] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#C5A46D] animate-spin" />
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // LOGIN SCREEN
  // ═══════════════════════════════════════════════════════════════════════════
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#151311] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm"
        >
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-[#C5A46D]/20 border border-[#C5A46D]/40 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-[#C5A46D]" />
            </div>
            <h1 className="text-2xl font-amiri font-bold text-white">لوحة التحكم</h1>
            <p className="text-sm font-cairo text-white/50 mt-1">حفل زفاف أحمد ومنة الله</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="dash-password" className="block text-xs font-cairo text-white/60 mb-1.5">
                كلمة المرور
              </label>
              <input
                id="dash-password"
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setPasswordError(""); }}
                placeholder="أدخل كلمة المرور..."
                autoComplete="current-password"
                className={`w-full px-4 py-3 rounded-xl bg-white/10 border text-white font-cairo text-sm outline-none transition-all ${
                  passwordError ? "border-red-500 focus:border-red-400" : "border-white/20 focus:border-[#C5A46D]"
                }`}
              />
              {passwordError && (
                <p className="text-xs text-red-400 font-cairo mt-1">{passwordError}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#B58A48] to-[#DFCBA8] text-[#151311] font-bold font-cairo shadow-lg hover:shadow-xl transition-all cursor-pointer touch-target flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loginLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "دخول"}
            </button>
          </form>
          <p className="text-center text-xs font-cairo text-white/30 mt-6">
            هذه الصفحة للإدارة فقط •{" "}
            <Link href="/" className="text-[#C5A46D] hover:underline">العودة للدعوة</Link>
          </p>
        </motion.div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // DASHBOARD
  // ═══════════════════════════════════════════════════════════════════════════
  const tabs: { id: Tab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: "wishes",   label: "التهاني",       icon: <Heart className="w-4 h-4" />,    badge: wishes.length },
    { id: "rsvp",     label: "الحضور",         icon: <Users className="w-4 h-4" />,    badge: rsvpEntries.length },
    { id: "stats",    label: "الإحصائيات",    icon: <BarChart3 className="w-4 h-4" /> },
    { id: "settings", label: "الإعدادات",     icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <>
      <div className="min-h-screen bg-[#F8F2EA] font-cairo print:hidden" dir="rtl">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="bg-[#151311] border-b border-[#C5A46D]/30 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-amiri font-bold text-white">لوحة التحكم</h1>
            <p className="text-[11px] text-white/40 font-cairo">أحمد ومنة الله • 14 أكتوبر 2026</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xs text-[#DFCBA8] hover:text-white transition-colors font-cairo px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20">
              الدعوة ←
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-white/50 hover:text-red-400 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>خروج</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-5xl mx-auto px-4 flex gap-1 pb-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer touch-target ${
                activeTab === tab.id
                  ? "bg-[#C5A46D] text-[#151311]"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className={`w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold ${
                  activeTab === tab.id ? "bg-[#151311] text-[#C5A46D]" : "bg-[#C5A46D] text-[#151311]"
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-6">

        {/* ══════════════════════════ WISHES TAB ══════════════════════════ */}
        {activeTab === "wishes" && (
          <div className="space-y-4">
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "إجمالي التهاني", value: wishes.length, color: "text-[#231F1A]" },
                { label: "ظاهرة",           value: visibleCount,  color: "text-green-700" },
                { label: "مخفية",            value: hiddenCount,   color: "text-orange-600" },
              ].map((s) => (
                <div key={s.label} className="p-4 rounded-2xl bg-white border border-[#C5A46D]/20 text-center shadow-sm">
                  <p className={`text-2xl font-bold font-cormorant ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-[#70735F] mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Search + filter + print */}
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={wishesSearch}
                onChange={(e) => setWishesSearch(e.target.value)}
                placeholder="ابحث في التهاني..."
                className="flex-1 px-4 py-3 rounded-xl bg-white border border-[#C5A46D]/30 text-sm font-cairo outline-none focus:border-[#C5A46D]"
              />
              <select
                value={recipientFilter}
                onChange={(e) => setRecipientFilter(e.target.value as RecipientFilter)}
                className="px-4 py-3 rounded-xl bg-white border border-[#C5A46D]/30 text-sm font-cairo outline-none focus:border-[#C5A46D] cursor-pointer"
              >
                <option value="all">الكل</option>
                <option value="both">💑 للعروسين</option>
                <option value="groom">🤵 للعريس</option>
                <option value="bride">👰 للعروسة</option>
              </select>
              <button
                type="button"
                onClick={fetchWishes}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white border border-[#C5A46D]/30 text-sm font-cairo text-[#A07F47] hover:border-[#C5A46D] transition-all cursor-pointer touch-target"
              >
                <RefreshCw className={`w-4 h-4 ${wishesLoading ? "animate-spin" : ""}`} />
                <span>تحديث</span>
              </button>
              <button
                type="button"
                onClick={() => setShowPrintModal(true)}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#B58A48] to-[#DFCBA8] text-[#151311] font-bold text-sm font-cairo shadow-sm hover:shadow transition-all cursor-pointer touch-target whitespace-nowrap"
              >
                <Printer className="w-4 h-4" />
                <span>🖨 طباعة حائط التهاني</span>
              </button>
            </div>

            {/* Wishes list */}
            <div className="space-y-3">
              <AnimatePresence>
                {wishesLoading && (
                  <div className="text-center py-10">
                    <Loader2 className="w-6 h-6 text-[#C5A46D] animate-spin mx-auto" />
                  </div>
                )}
                {!wishesLoading && filteredWishes.length === 0 && (
                  <div className="text-center py-10 text-[#70735F] text-sm">
                    <MessageSquare className="w-8 h-8 text-[#C5A46D]/30 mx-auto mb-2" />
                    <p>لا توجد تهاني بعد</p>
                  </div>
                )}
                {filteredWishes.map((wish) => (
                  <motion.div
                    key={wish.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: deletingId === wish.id ? 0 : 1,
                      y: 0,
                      scale: deletingId === wish.id ? 0.95 : 1,
                    }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={`p-5 rounded-2xl bg-white border shadow-sm transition-all ${
                      wish.isHidden ? "border-orange-200 bg-orange-50/50 opacity-70" : "border-[#C5A46D]/25"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#DFCBA8] to-[#C5A46D] flex items-center justify-center shrink-0 font-bold text-[#151311]">
                          {wish.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-[#231F1A] truncate">{wish.name}</p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-[10px] text-[#70735F]">
                              {new Date(wish.timestamp).toLocaleDateString("ar-EG", {
                                year: "numeric", month: "long", day: "numeric",
                                hour: "2-digit", minute: "2-digit",
                              })}
                            </p>
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#C5A46D]/10 text-[#A07F47] border border-[#C5A46D]/20">
                              {recipientLabel(wish.recipient)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {wish.isHidden && (
                        <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 text-[10px] font-semibold shrink-0">
                          مخفية
                        </span>
                      )}

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleStartEdit(wish)}
                          title="تعديل التهنئة"
                          className="p-2 rounded-lg bg-[#C5A46D]/15 text-[#A07F47] hover:bg-[#C5A46D]/25 transition-colors cursor-pointer touch-target"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleHide(wish.id)}
                          title={wish.isHidden ? "إظهار" : "إخفاء"}
                          className={`p-2 rounded-lg transition-colors cursor-pointer touch-target ${
                            wish.isHidden
                              ? "bg-green-100 text-green-600 hover:bg-green-200"
                              : "bg-orange-100 text-orange-600 hover:bg-orange-200"
                          }`}
                        >
                          {wish.isHidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteWish(wish.id)}
                          title="حذف"
                          className={`p-2 rounded-lg transition-colors cursor-pointer touch-target ${
                            confirmDeleteId === wish.id
                              ? "bg-red-500 text-white hover:bg-red-600"
                              : "bg-red-100 text-red-500 hover:bg-red-200"
                          }`}
                        >
                          {confirmDeleteId === wish.id
                            ? <AlertTriangle className="w-4 h-4" />
                            : <Trash2 className="w-4 h-4" />}
                        </button>
                        {confirmDeleteId === wish.id && (
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(null)}
                            className="p-2 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 cursor-pointer touch-target"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {wish.sticker && (
                      <div className="mt-2.5 mb-1 flex items-center">
                        <WishStickerBadge stickerKey={wish.sticker} size="sm" />
                      </div>
                    )}

                    <p className="mt-2 text-sm text-[#231F1A]/90 leading-relaxed border-r-2 border-[#C5A46D]/40 pr-3 break-words">
                      {wish.message}
                    </p>

                    {confirmDeleteId === wish.id && (
                      <div className="mt-3 p-2 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600 font-cairo text-center">
                        اضغط على زر الحذف مرة أخرى للتأكيد
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* ═══════════════════════════ RSVP TAB ═══════════════════════════ */}
        {activeTab === "rsvp" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-amiri font-bold text-[#231F1A]">
                بيانات التأكيد ({rsvpEntries.length} ضيف)
              </h2>
              <button
                type="button"
                onClick={fetchRSVP}
                className="flex items-center gap-1.5 text-xs font-cairo text-[#A07F47] hover:text-[#231F1A] cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${rsvpLoading ? "animate-spin" : ""}`} />
                <span>تحديث</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-white border border-green-200 text-center shadow-sm">
                <p className="text-2xl font-bold font-cormorant text-green-700">{attendingCount}</p>
                <p className="text-xs text-[#70735F] mt-1">✅ سيحضرون</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-red-200 text-center shadow-sm">
                <p className="text-2xl font-bold font-cormorant text-red-500">
                  {rsvpEntries.length - attendingCount}
                </p>
                <p className="text-xs text-[#70735F] mt-1">❌ لن يحضروا</p>
              </div>
            </div>

            {rsvpLoading ? (
              <div className="text-center py-10">
                <Loader2 className="w-6 h-6 text-[#C5A46D] animate-spin mx-auto" />
              </div>
            ) : rsvpEntries.length === 0 ? (
              <div className="text-center py-10 text-[#70735F] text-sm">
                <Users className="w-8 h-8 text-[#C5A46D]/30 mx-auto mb-2" />
                <p>لم يتم تأكيد الحضور بعد</p>
              </div>
            ) : (
              <div className="space-y-3">
                {[...rsvpEntries].reverse().map((entry) => (
                  <div key={entry.id} className="p-5 rounded-2xl bg-white border border-[#C5A46D]/25 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#DFCBA8] to-[#C5A46D] flex items-center justify-center font-bold text-lg text-[#151311] font-cormorant shrink-0">
                        {entry.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[#231F1A] truncate">{entry.name}</p>
                        <p className="text-[11px] text-[#70735F]">
                          {new Date(entry.submittedAt).toLocaleDateString("ar-EG", {
                            year: "numeric", month: "long", day: "numeric",
                            hour: "2-digit", minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold font-cairo ${
                        entry.attendance === "attending"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}>
                        {entry.attendance === "attending" ? "✅ سيحضر" : "❌ لن يحضر"}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-3 mt-3 text-sm">
                      <div className="p-3 rounded-xl bg-[#F8F2EA] w-fit">
                        <p className="text-[11px] text-[#70735F] mb-0.5">المرافقون</p>
                        <p className="font-semibold text-[#231F1A]">
                          {entry.guestsCount === "0" ? "بدون مرافقين" : `${entry.guestsCount} مرافق`}
                        </p>
                      </div>
                      {entry.message && (
                        <div className="p-3 rounded-xl bg-[#F8F2EA]">
                          <p className="text-[11px] text-[#70735F] mb-0.5">رسالة</p>
                          <p className="text-sm text-[#231F1A]/90 leading-relaxed">{entry.message}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ═══════════════════════════ STATS TAB ══════════════════════════ */}
        {activeTab === "stats" && (
          <div className="space-y-4">
            <h2 className="text-xl font-amiri font-bold text-[#231F1A]">الإحصائيات</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: "إجمالي التهاني",   value: wishes.length,                                                   icon: "💌" },
                { label: "تهاني ظاهرة",      value: visibleCount,                                                    icon: "👁️" },
                { label: "تهاني مخفية",      value: hiddenCount,                                                     icon: "🙈" },
                { label: "سيحضرون",          value: attendingCount,                                                  icon: "✅" },
                { label: "إجمالي الردود",    value: rsvpEntries.length,                                              icon: "📝" },
                { label: "أيام للزفاف",      value: daysUntilWedding,                                                icon: "📅" },
                { label: "للعروسين معاً",    value: wishes.filter((w) => (w.recipient ?? "both") === "both").length, icon: "💑" },
                { label: "للعريس فقط",       value: wishes.filter((w) => w.recipient === "groom").length,            icon: "🤵" },
                { label: "للعروسة فقط",      value: wishes.filter((w) => w.recipient === "bride").length,            icon: "👰" },
              ].map((stat) => (
                <div key={stat.label} className="p-5 rounded-2xl bg-white border border-[#C5A46D]/20 shadow-sm text-center">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <p className="text-3xl font-bold font-cormorant text-[#231F1A]">{stat.value}</p>
                  <p className="text-xs text-[#70735F] mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═════════════════════════ SETTINGS TAB ═════════════════════════ */}
        {activeTab === "settings" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-amiri font-bold text-[#231F1A]">تعديل المحتوى</h2>
              <button
                type="button"
                onClick={handleResetConfig}
                className="flex items-center gap-1.5 text-xs text-[#70735F] hover:text-red-500 cursor-pointer font-cairo"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة تعيين</span>
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#C5A46D]/20 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-[#231F1A] border-b border-[#C5A46D]/20 pb-2">معلومات العروسين</h3>
              {[
                { key: "groomAr",  label: "اسم العريس (عربي)" },
                { key: "brideAr",  label: "اسم العروسة (عربي)" },
                { key: "dayAr",    label: "اليوم بالعربية" },
                { key: "venueAr",  label: "اسم القاعة" },
                { key: "cityAr",   label: "المدينة" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-semibold text-[#70735F] mb-1">{field.label}</label>
                  <input
                    type="text"
                    value={config[field.key as keyof typeof config]}
                    onChange={(e) => setConfig((prev) => ({ ...prev, [field.key]: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#F8F2EA] border border-[#C5A46D]/30 text-sm font-cairo outline-none focus:border-[#C5A46D]"
                  />
                </div>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#C5A46D]/20 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-[#231F1A] border-b border-[#C5A46D]/20 pb-2">نصوص الدعوة</h3>
              {[
                { key: "introLine",            label: "النص التمهيدي (Hero)",       multiline: false },
                { key: "inviteText",           label: "جملة الدعوة الرئيسية",       multiline: false },
                { key: "invitationBody",       label: "نص الدعوة الرسمية",          multiline: true },
                { key: "invitationClosing",    label: "الجملة الختامية للدعوة",     multiline: true },
                { key: "romanticMomentsTitle", label: "عنوان القصة الرومانسية",     multiline: false },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-semibold text-[#70735F] mb-1">{field.label}</label>
                  {field.multiline ? (
                    <textarea
                      rows={3}
                      value={config[field.key as keyof typeof config]}
                      onChange={(e) => setConfig((prev) => ({ ...prev, [field.key]: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#F8F2EA] border border-[#C5A46D]/30 text-sm font-cairo outline-none focus:border-[#C5A46D] resize-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={config[field.key as keyof typeof config]}
                      onChange={(e) => setConfig((prev) => ({ ...prev, [field.key]: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#F8F2EA] border border-[#C5A46D]/30 text-sm font-cairo outline-none focus:border-[#C5A46D]"
                    />
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleSaveConfig}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#B58A48] to-[#DFCBA8] text-[#151311] font-bold font-cairo shadow-md hover:shadow-lg transition-all cursor-pointer touch-target flex items-center justify-center gap-2"
            >
              {configSaved
                ? <><Check className="w-4 h-4" /><span>تم الحفظ!</span></>
                : <><Save className="w-4 h-4" /><span>حفظ التغييرات</span></>}
            </button>

            <p className="text-center text-[11px] text-[#70735F] font-cairo">
              ملاحظة: التغييرات تُحفظ محلياً في المتصفح. لتطبيق التغييرات على جميع الزوار يجب تعديل ملف{" "}
              <code className="text-[#A07F47] bg-[#FAF6F0] px-1 rounded">wedding.ts</code>
            </p>
          </div>
        )}

      </div>
    </div>

      {/* ══════════════════════════ EDIT WISH MODAL ══════════════════════════ */}
      <AnimatePresence>
        {editingWish && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm print:hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl border border-[#C5A46D]/30 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
              dir="rtl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#C5A46D]/20 bg-[#FAF6F0]">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-[#A07F47]" />
                  <h3 className="font-amiri font-bold text-lg text-[#231F1A]">تعديل التهنئة</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingWish(null)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4 overflow-y-auto flex-1 font-cairo">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#70735F] mb-1.5">اسم الضيف</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#C5A46D]/30 text-sm font-cairo text-[#231F1A] outline-none focus:border-[#C5A46D]"
                  />
                </div>

                {/* Recipient */}
                <div>
                  <label className="block text-xs font-semibold text-[#70735F] mb-1.5">التهنئة موجهة إلى</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "both" as const, label: "💑 للعروسين" },
                      { id: "groom" as const, label: "🤵 للعريس" },
                      { id: "bride" as const, label: "👰 للعروسة" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setEditRecipient(opt.id)}
                        className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                          editRecipient === opt.id
                            ? "bg-[#C5A46D] text-[#151311] border-[#C5A46D]"
                            : "bg-white text-[#70735F] border-[#C5A46D]/20 hover:border-[#C5A46D]/50"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-[#70735F]">نص التهنئة</label>
                    <div className="flex items-center gap-1.5 relative">
                      <button
                        type="button"
                        onClick={() => {
                          setShowEditEmojiPicker((prev) => !prev);
                          setShowEditStickerPicker(false);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                          showEditEmojiPicker
                            ? "bg-[#C5A46D] text-[#151311]"
                            : "bg-[#FAF6F0] text-[#70735F] hover:text-[#231F1A] border border-[#C5A46D]/20"
                        }`}
                        title="إضافة إيموجي"
                      >
                        <span>😊</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setShowEditStickerPicker((prev) => !prev);
                          setShowEditEmojiPicker(false);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                          showEditStickerPicker
                            ? "bg-[#C5A46D] text-[#151311]"
                            : "bg-[#FAF6F0] text-[#70735F] hover:text-[#231F1A] border border-[#C5A46D]/20"
                        }`}
                        title="إضافة ملصق راقي"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#A07F47]" />
                        <span>ملصقات</span>
                      </button>

                      {showEditEmojiPicker && (
                        <EmojiPicker
                          onSelectEmoji={(emoji) => {
                            setEditMessage((prev) => prev + " " + emoji);
                          }}
                          onClose={() => setShowEditEmojiPicker(false)}
                        />
                      )}

                      {showEditStickerPicker && (
                        <StickerPicker
                          selectedSticker={editSticker ?? undefined}
                          onSelectSticker={(stickerKey) => {
                            setEditSticker(stickerKey);
                            setShowEditStickerPicker(false);
                          }}
                          onClose={() => setShowEditStickerPicker(false)}
                        />
                      )}
                    </div>
                  </div>

                  <textarea
                    rows={4}
                    value={editMessage}
                    onChange={(e) => setEditMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#C5A46D]/30 text-sm font-cairo text-[#231F1A] outline-none focus:border-[#C5A46D] resize-none"
                  />
                </div>

                {/* Sticker display/remove */}
                {editSticker && (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF6F0] border border-[#C5A46D]/20">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#70735F]">الملصق المرفق:</span>
                      <WishStickerBadge stickerKey={editSticker} size="sm" />
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditSticker(null)}
                      className="text-xs text-red-500 hover:text-red-700 cursor-pointer font-cairo"
                    >
                      إزالة الملصق
                    </button>
                  </div>
                )}

                {/* Visibility */}
                <div className="pt-2 border-t border-[#C5A46D]/15">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!editIsHidden}
                      onChange={(e) => setEditIsHidden(!e.target.checked)}
                      className="w-4 h-4 rounded text-[#C5A46D] accent-[#C5A46D] cursor-pointer"
                    />
                    <span className="text-xs font-semibold text-[#231F1A]">
                      إظهار التهنئة للزوار في حائط التهاني
                    </span>
                  </label>
                  <p className="text-[11px] text-[#70735F] pr-6 mt-0.5">
                    {editIsHidden
                      ? "التهنئة حالياً مخفية ولن تظهر للزوار على صفحة الدعوة."
                      : "التهنئة حالياً ظاهرة لجميع الزوار."}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-2 px-6 py-3.5 border-t border-[#C5A46D]/20 bg-[#FAF6F0] font-cairo">
                <button
                  type="button"
                  onClick={() => setEditingWish(null)}
                  className="px-4 py-2 text-xs font-semibold text-[#70735F] hover:text-[#231F1A] transition-colors cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  disabled={editSaving || !editName.trim() || !editMessage.trim()}
                  onClick={handleSaveEdit}
                  className="px-5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-[#B58A48] to-[#DFCBA8] text-[#151311] shadow-sm hover:shadow transition-all disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
                >
                  {editSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  <span>حفظ التعديلات</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════ PRINT FILTER MODAL ══════════════════════════ */}
      <AnimatePresence>
        {showPrintModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm print:hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl border border-[#C5A46D]/30 w-full max-w-md overflow-hidden flex flex-col font-cairo"
              dir="rtl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#C5A46D]/20 bg-[#FAF6F0]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#C5A46D]/20 flex items-center justify-center text-[#A07F47]">
                    <Printer className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-amiri font-bold text-lg text-[#231F1A]">طباعة حائط التهاني</h3>
                    <p className="text-[11px] text-[#70735F]">تصدير تذكار زفاف فاخر للطباعة أو حفظه كـ PDF</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPrintModal(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                {/* Recipient selection per Section 27 */}
                <div>
                  <label className="block text-xs font-semibold text-[#70735F] mb-2">تصفية حسب المستلم</label>
                  <div className="space-y-2">
                    {[
                      { id: "all" as const, label: "كل التهاني", icon: "💌" },
                      { id: "both" as const, label: "للعروسين معاً", icon: "💑" },
                      { id: "groom" as const, label: "للعريس", icon: "🤵" },
                      { id: "bride" as const, label: "للعروسة", icon: "👰" },
                    ].map((opt) => (
                      <label
                        key={opt.id}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl border cursor-pointer transition-all ${
                          printRecipientFilter === opt.id
                            ? "bg-[#FAF6F0] border-[#C5A46D] text-[#231F1A] font-bold"
                            : "bg-white border-[#C5A46D]/20 text-[#70735F] hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="printRecipient"
                            value={opt.id}
                            checked={printRecipientFilter === opt.id}
                            onChange={() => setPrintRecipientFilter(opt.id)}
                            className="w-4 h-4 accent-[#C5A46D]"
                          />
                          <span className="text-sm">{opt.label}</span>
                        </div>
                        <span className="text-base">{opt.icon}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Visible only per Section 27 */}
                <div className="pt-2 border-t border-[#C5A46D]/15">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={printVisibleOnly}
                      onChange={(e) => setPrintVisibleOnly(e.target.checked)}
                      className="w-4 h-4 rounded accent-[#C5A46D]"
                    />
                    <span className="text-xs font-semibold text-[#231F1A]">
                      التهاني الظاهرة فقط (استبعاد التهاني المخفية)
                    </span>
                  </label>
                </div>

                {/* Page Orientation */}
                <div>
                  <label className="block text-xs font-semibold text-[#70735F] mb-1.5">اتجاه صفحة الطباعة</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPrintOrientation("portrait")}
                      className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                        printOrientation === "portrait"
                          ? "bg-[#C5A46D] text-[#151311] border-[#C5A46D]"
                          : "bg-white text-[#70735F] border-[#C5A46D]/20 hover:border-[#C5A46D]/50"
                      }`}
                    >
                      عمودي (A4 Portrait)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPrintOrientation("landscape")}
                      className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                        printOrientation === "landscape"
                          ? "bg-[#C5A46D] text-[#151311] border-[#C5A46D]"
                          : "bg-white text-[#70735F] border-[#C5A46D]/20 hover:border-[#C5A46D]/50"
                      }`}
                    >
                      أفقي (A4 Landscape)
                    </button>
                  </div>
                </div>

                {/* Counter Preview */}
                <div className="p-3 rounded-xl bg-[#FAF6F0] border border-[#C5A46D]/30 text-center">
                  <p className="text-xs text-[#70735F]">
                    سيتم تضمين{" "}
                    <span className="font-bold text-[#A07F47] text-sm">{wishesForPrint.length}</span>{" "}
                    تهنئة في السجل التذكاري
                  </p>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-[#C5A46D]/20 bg-[#FAF6F0]">
                <button
                  type="button"
                  onClick={() => setShowPrintModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#70735F] hover:text-[#231F1A] transition-colors cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  disabled={wishesForPrint.length === 0}
                  onClick={handleTriggerPrint}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#B58A48] to-[#DFCBA8] text-[#151311] font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50"
                >
                  <Printer className="w-4 h-4" />
                  <span>طباعة / حفظ PDF</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════ PRINTABLE KEEPSAKE VIEW ══════════════════════════ */}
      {/* This view only displays when printing via @media print (Section 26, 27, 28, 34) */}
      <div className="hidden print:block min-h-screen bg-[#FAF5EE] text-[#151311] p-4 font-amiri" dir="rtl">
        {/* Header Keepsake Banner */}
        <div className="text-center mb-8 pb-6 border-b-2 border-[#C5A46D]/60 relative">
          <div className="text-[#A07F47] text-sm tracking-widest uppercase mb-1">
            ✦ حائط التهاني التذكاري ✦
          </div>
          <h1 className="text-3xl font-bold text-[#231F1A] mb-1 font-amiri">
            تهانينا للعروسين
          </h1>
          <h2 className="text-2xl font-bold text-[#A07F47] mb-2 font-cormorant">
            أحمد &amp; منة الله
          </h2>
          <p className="text-sm text-[#70735F] tracking-wide font-amiri">
            14 أكتوبر 2026
          </p>

          <div className="flex items-center justify-center gap-3 mt-3 text-xs text-[#A07F47]">
            <span className="w-12 h-[1px] bg-[#C5A46D]/40"></span>
            <span>💍 ذكرى محبة وتبريكات الأهل والأحباب 🤍</span>
            <span className="w-12 h-[1px] bg-[#C5A46D]/40"></span>
          </div>
        </div>

        {/* Wishes Cards Grid */}
        {wishesForPrint.length === 0 ? (
          <div className="text-center py-12 text-[#70735F]">
            <p className="text-lg">لا توجد تهاني مطابقة للشروط المحددة</p>
          </div>
        ) : (
          <div className={`grid ${printOrientation === "landscape" ? "grid-cols-3" : "grid-cols-2"} gap-4`}>
            {wishesForPrint.map((wish) => (
              <div
                key={wish.id}
                className="bg-[#FAF5EE] border-2 border-[#C5A46D]/50 rounded-2xl p-5 relative overflow-hidden shadow-none flex flex-col justify-between"
                style={{
                  backgroundColor: "#FAF5EE",
                  pageBreakInside: "avoid",
                  breakInside: "avoid",
                  marginBottom: "16px",
                }}
              >
                {/* Decorative corners */}
                <div className="absolute top-1 right-1 text-[#C5A46D]/40 text-[10px] select-none">❖</div>
                <div className="absolute top-1 left-1 text-[#C5A46D]/40 text-[10px] select-none">❖</div>
                <div className="absolute bottom-1 right-1 text-[#C5A46D]/40 text-[10px] select-none">❖</div>
                <div className="absolute bottom-1 left-1 text-[#C5A46D]/40 text-[10px] select-none">❖</div>

                <div>
                  {/* Top card info: name, recipient, date */}
                  <div className="flex items-start justify-between gap-2 border-b border-[#C5A46D]/25 pb-3 mb-3">
                    <div>
                      <h4 className="font-bold text-base text-[#231F1A] leading-tight font-amiri">
                        {wish.name}
                      </h4>
                      <p className="text-[11px] text-[#70735F] mt-0.5">
                        {new Date(wish.timestamp).toLocaleDateString("ar-EG", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full border border-[#C5A46D]/40 text-[#A07F47] bg-[#FAF6F0] font-sans shrink-0">
                      {recipientLabel(wish.recipient)}
                    </span>
                  </div>

                  {/* Sticker if present */}
                  {wish.sticker && (
                    <div className="mb-2 text-center">
                      <WishStickerBadge stickerKey={wish.sticker} size="sm" />
                    </div>
                  )}

                  {/* Message */}
                  <p className="text-sm leading-relaxed text-[#231F1A]/90 whitespace-pre-wrap font-amiri">
                    {wish.message}
                  </p>
                </div>

                {/* Subtle ornamental footer line */}
                <div className="mt-4 pt-2 border-t border-[#C5A46D]/20 text-center">
                  <span className="text-[9px] text-[#C5A46D]/60 tracking-wider font-sans">
                    ✨ زفاف أحمد &amp; منة الله ✨
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Keepsake Note */}
        <div className="mt-8 pt-4 border-t border-[#C5A46D]/40 text-center text-xs text-[#70735F]">
          <p>تم استخراج هذا السجل التذكاري من دعوة زفاف أحمد ومنة الله الإلكترونية • 14 أكتوبر 2026</p>
        </div>
      </div>
    </>
  );
}
