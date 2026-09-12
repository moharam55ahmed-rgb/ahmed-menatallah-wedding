"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GuestWish, wedding } from "@/config/wedding";
import Link from "next/link";
import {
  Trash2, Eye, EyeOff, MessageSquare, Users, Settings,
  Save, RotateCcw, LogOut, Lock,
  Heart, X, AlertTriangle, BarChart3, RefreshCw, Loader2, Check
} from "lucide-react";

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
    <div className="min-h-screen bg-[#F8F2EA] font-cairo" dir="rtl">

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

            {/* Search + filter */}
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
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-[#C5A46D]/30 text-sm font-cairo text-[#A07F47] hover:border-[#C5A46D] transition-all cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${wishesLoading ? "animate-spin" : ""}`} />
                <span>تحديث</span>
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

                    <p className="mt-3 text-sm text-[#231F1A]/90 leading-relaxed border-r-2 border-[#C5A46D]/40 pr-3">
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
  );
}
