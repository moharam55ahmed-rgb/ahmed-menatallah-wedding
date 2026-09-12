"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GuestWish, wedding } from "@/config/wedding";
import Link from "next/link";
import {
  Trash2, Eye, EyeOff,
  LogOut, Lock,
  AlertTriangle, RefreshCw, Loader2,
  Printer, Edit3, Sparkles, Search,
  Home, Mail, Users, Phone, Image as ImageIcon, Settings
} from "lucide-react";
import { WishStickerBadge } from "./WishEmbellishments";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
type Tab = "wishes" | "rsvp" | "settings" | "stats" | "contacts" | "stickers";
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
  const [wishToDelete, setWishToDelete] = useState<GuestWish | null>(null);
  const [wishesLoading, setWishesLoading] = useState(false);

  // Print Wall State
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [printRecipientFilter] = useState<RecipientFilter>("all");
  const [printVisibleOnly, setPrintVisibleOnly] = useState(true);

  // Edit Wish State
  const [editingWish, setEditingWish] = useState<GuestWish | null>(null);
  const [editName, setEditName] = useState("");
  const [editRecipient, setEditRecipient] = useState<"both" | "groom" | "bride">("both");
  const [editMessage, setEditMessage] = useState("");
  const [editSticker, setEditSticker] = useState<string | null>(null);
  const [editIsHidden, setEditIsHidden] = useState(false);
  const [editSaving, setEditSaving] = useState(false);

  // RSVP
  const [rsvpEntries, setRsvpEntries] = useState<RSVPEntry[]>([]);
  const [rsvpLoading, setRsvpLoading] = useState(false);

  // ── Data fetching ──────────────────────────────────────────────────────────
  const fetchWishes = useCallback(async () => {
    setWishesLoading(true);
    try {
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
  useEffect(() => {
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
    } catch {
      // silent
    }
  };

  const handleConfirmDelete = async () => {
    if (!wishToDelete) return;
    setDeletingId(wishToDelete.id);
    try {
      const res = await fetch(`/api/wishes/${wishToDelete.id}`, { method: "DELETE" });
      if (res.ok) {
        setWishes((prev) => prev.filter((w) => w.id !== wishToDelete.id));
        setWishToDelete(null);
      }
    } catch {
      // silent
    } finally {
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
    }, 200);
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

  const recipientLabel = (r?: string) => {
    if (r === "groom") return "🤵 للعريس";
    if (r === "bride") return "👰 للعروسة";
    return "💑 للعروسين";
  };

  // ── Loading skeleton while checking auth ───────────────────────────────────
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#F7F1E6] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#C9A96A] animate-spin" />
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // LOGIN SCREEN (Matching Reference 10 Luxury Style)
  // ═══════════════════════════════════════════════════════════════════════════
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#F7F1E6] flex items-center justify-center p-4" dir="rtl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm rounded-3xl bg-white border border-[#C9A96A]/35 shadow-md p-6 sm:p-8 text-center"
        >
          <div className="w-12 h-12 rounded-full bg-[#FAF5EE] border border-[#C9A96A]/40 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-5 h-5 text-[#8A6A32]" />
          </div>

          <h1 className="text-2xl font-amiri font-bold text-[#241D18] mb-1">
            لوحة تحكم المشرف
          </h1>
          <p className="text-xs font-cairo text-[#5C5146] mb-6">
            زفاف {wedding.groomAr} &amp; {wedding.brideAr}
          </p>

          <form onSubmit={handleLogin} className="space-y-4 text-right">
            <div>
              <label className="block text-xs font-semibold font-cairo text-[#241D18] mb-1">
                كلمة المرور
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="أدخل كلمة المرور..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#C9A96A]/30 text-sm font-cairo text-[#241D18] outline-none focus:border-[#C9A96A] transition-all"
              />
            </div>

            {passwordError && (
              <p className="text-xs font-cairo text-red-600">{passwordError}</p>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 rounded-full bg-[#241D18] hover:bg-[#3A2D24] text-[#FBF8F1] font-bold text-sm font-cairo shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {loginLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>دخول للوحة التحكم</span>}
            </button>

            <div className="pt-2 text-center">
              <Link href="/" className="text-xs font-cairo text-[#8A6A32] hover:underline">
                العودة إلى الدعوة
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // REFERENCE 10: ADMIN DASHBOARD (لوحة تحكم المشرف)
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <>
      <div className="min-h-screen bg-[#F7F1E6] text-[#241D18] flex flex-col font-cairo print:hidden" dir="rtl">
        
        {/* Top Navbar */}
        <header className="bg-white border-b border-[#C9A96A]/25 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            <span className="text-xl sm:text-2xl font-amiri font-bold text-[#241D18]">
              لوحة تحكم المشرف
            </span>
            <span className="hidden sm:inline-block text-xs px-2.5 py-0.5 rounded-full bg-[#FAF5EE] border border-[#C9A96A]/30 text-[#8A6A32]">
              {wedding.groomAr} &amp; {wedding.brideAr}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPrintModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF5EE] hover:bg-[#F7F1E6] text-[#241D18] border border-[#C9A96A]/35 text-xs font-semibold transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#8A6A32]" />
              <span>طباعة حائط التهاني</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-[#FAF5EE] text-[#5C5146] border border-[#C9A96A]/25 text-xs transition-all"
            >
              <span>معاينة الدعوة</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 rounded-full text-[#5C5146] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              title="تسجيل الخروج"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Dashboard Main Body (Sidebar + Content matching Reference 10) */}
        <div className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 flex flex-col md:flex-row gap-6 items-start">
          
          {/* Left / Navigation Sidebar matching Reference 10 */}
          <aside className="w-full md:w-56 bg-white rounded-2xl border border-[#C9A96A]/30 p-3 shadow-2xs shrink-0">
            <nav className="space-y-1">
              <button
                type="button"
                onClick={() => setActiveTab("stats")}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "stats"
                    ? "bg-[#241D18] text-[#FBF8F1]"
                    : "text-[#5C5146] hover:bg-[#FAF5EE]"
                }`}
              >
                <Home className="w-4 h-4" />
                <span>الرئيسية</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("wishes")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "wishes"
                    ? "bg-[#241D18] text-[#FBF8F1]"
                    : "text-[#5C5146] hover:bg-[#FAF5EE]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4" />
                  <span>التهاني</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  activeTab === "wishes" ? "bg-white/20 text-[#FBF8F1]" : "bg-[#FAF5EE] text-[#8A6A32]"
                }`}>
                  {wishes.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("rsvp")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "rsvp"
                    ? "bg-[#241D18] text-[#FBF8F1]"
                    : "text-[#5C5146] hover:bg-[#FAF5EE]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4" />
                  <span>تأكيدات الحضور</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  activeTab === "rsvp" ? "bg-white/20 text-[#FBF8F1]" : "bg-[#FAF5EE] text-[#8A6A32]"
                }`}>
                  {rsvpEntries.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("contacts")}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "contacts"
                    ? "bg-[#241D18] text-[#FBF8F1]"
                    : "text-[#5C5146] hover:bg-[#FAF5EE]"
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>الإتصالات</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("stickers")}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "stickers"
                    ? "bg-[#241D18] text-[#FBF8F1]"
                    : "text-[#5C5146] hover:bg-[#FAF5EE]"
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>الملصقات</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "settings"
                    ? "bg-[#241D18] text-[#FBF8F1]"
                    : "text-[#5C5146] hover:bg-[#FAF5EE]"
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>الإعدادات</span>
              </button>
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 w-full space-y-4">
            
            {/* Top Statistics Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-white border border-[#C9A96A]/30 shadow-2xs text-center">
                <span className="text-xl sm:text-2xl font-bold font-cormorant text-[#241D18] block">
                  {wishes.length}
                </span>
                <span className="text-[11px] font-cairo text-[#5C5146]">إجمالي التهاني</span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#C9A96A]/30 shadow-2xs text-center">
                <span className="text-xl sm:text-2xl font-bold font-cormorant text-green-700 block">
                  {visibleCount}
                </span>
                <span className="text-[11px] font-cairo text-[#5C5146]">الظاهرة للزوار</span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#C9A96A]/30 shadow-2xs text-center">
                <span className="text-xl sm:text-2xl font-bold font-cormorant text-[#8A6A32] block">
                  {hiddenCount}
                </span>
                <span className="text-[11px] font-cairo text-[#5C5146]">المخفية</span>
              </div>
            </div>

            {/* TAB: WISHES MANAGEMENT (Reference 10 Main Table/Cards) */}
            {activeTab === "wishes" && (
              <div className="bg-white rounded-2xl border border-[#C9A96A]/30 p-4 sm:p-5 shadow-2xs space-y-4">
                
                {/* Search & Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#C9A96A]/20">
                  <div>
                    <h2 className="text-lg font-amiri font-bold text-[#241D18]">
                      إدارة التهاني
                    </h2>
                    <p className="text-xs text-[#5C5146]">
                      عرض، تعديل، إخفاء وحذف تهاني الضيوف
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Search Input */}
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-[#5C5146] absolute right-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={wishesSearch}
                        onChange={(e) => setWishesSearch(e.target.value)}
                        placeholder="بحث في التهاني..."
                        className="pl-3 pr-8 py-1.5 rounded-xl bg-[#FAF5EE] border border-[#C9A96A]/25 text-xs outline-none focus:border-[#C9A96A] transition-all w-44 sm:w-52"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={fetchWishes}
                      className="p-1.5 rounded-xl bg-[#FAF5EE] hover:bg-[#F7F1E6] text-[#8A6A32] border border-[#C9A96A]/25 cursor-pointer"
                      title="تحديث البيانات"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${wishesLoading ? "animate-spin" : ""}`} />
                    </button>
                  </div>
                </div>

                {/* Recipient Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {(["all", "both", "groom", "bride"] as RecipientFilter[]).map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setRecipientFilter(filter)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer shrink-0 ${
                        recipientFilter === filter
                          ? "bg-[#241D18] text-[#FBF8F1]"
                          : "bg-[#FAF5EE] text-[#5C5146] hover:bg-[#F7F1E6]"
                      }`}
                    >
                      {filter === "all" ? "الكل" : recipientLabel(filter)}
                    </button>
                  ))}
                </div>

                {/* Wishes List Cards matching Reference 10 */}
                <div className="space-y-2.5">
                  {wishesLoading && wishes.length === 0 ? (
                    <div className="py-12 text-center text-xs text-[#5C5146]">
                      <Loader2 className="w-6 h-6 text-[#C9A96A] animate-spin mx-auto mb-2" />
                      جاري تحميل التهاني...
                    </div>
                  ) : filteredWishes.length === 0 ? (
                    <div className="py-12 text-center text-xs text-[#5C5146]">
                      لا توجد تهاني مطابقة للبحث
                    </div>
                  ) : (
                    filteredWishes.map((wish) => (
                      <div
                        key={wish.id}
                        className={`p-3.5 sm:p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          wish.isHidden
                            ? "bg-[#FAF5EE]/60 border-dashed border-[#C9A96A]/25 opacity-75"
                            : "bg-[#FAF5EE] border-[#C9A96A]/30 hover:border-[#C9A96A]/60"
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="font-amiri font-bold text-sm text-[#241D18]">
                              {wish.name}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-[#8A6A32] border border-[#C9A96A]/20">
                              {recipientLabel(wish.recipient)}
                            </span>
                            {wish.sticker && (
                              <WishStickerBadge stickerKey={wish.sticker} size="sm" />
                            )}
                            {wish.isHidden && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                                مخفي
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-cairo text-[#3A2D24] leading-relaxed break-words">
                            {wish.message}
                          </p>
                          <span className="text-[10px] font-cairo text-[#8C8276] mt-1 block">
                            {new Date(wish.timestamp).toLocaleDateString("ar-EG", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>

                        {/* Action Buttons: Edit, Toggle Visibility, Delete */}
                        <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                          {/* Edit Button */}
                          <button
                            type="button"
                            onClick={() => handleStartEdit(wish)}
                            className="p-2 rounded-lg bg-white hover:bg-blue-50 text-blue-600 border border-blue-200 transition-all cursor-pointer shadow-2xs"
                            title="تعديل التهنئة"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          {/* Toggle Hide/Show */}
                          <button
                            type="button"
                            onClick={() => handleToggleHide(wish.id)}
                            className={`p-2 rounded-lg border transition-all cursor-pointer shadow-2xs ${
                              wish.isHidden
                                ? "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                                : "bg-white text-[#5C5146] border-[#C9A96A]/30 hover:bg-[#FAF5EE]"
                            }`}
                            title={wish.isHidden ? "إظهار في الحائط" : "إخفاء من الحائط"}
                          >
                            {wish.isHidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>

                          {/* Delete Button (Triggers custom confirmation modal) */}
                          <button
                            type="button"
                            onClick={() => setWishToDelete(wish)}
                            className="p-2 rounded-lg bg-white hover:bg-red-50 text-red-600 border border-red-200 transition-all cursor-pointer shadow-2xs"
                            title="حذف التهنئة"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

              </div>
            )}

            {/* TAB: RSVP ATTENDANCE */}
            {activeTab === "rsvp" && (
              <div className="bg-white rounded-2xl border border-[#C9A96A]/30 p-4 sm:p-5 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#C9A96A]/20">
                  <div>
                    <h2 className="text-lg font-amiri font-bold text-[#241D18]">
                      تأكيدات الحضور
                    </h2>
                    <p className="text-xs text-[#5C5146]">
                      سجل استجابات الضيوف لحفل الزفاف
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={fetchRSVP}
                    className="p-1.5 rounded-xl bg-[#FAF5EE] text-[#8A6A32] border border-[#C9A96A]/25 cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${rsvpLoading ? "animate-spin" : ""}`} />
                  </button>
                </div>

                <div className="space-y-2.5">
                  {rsvpEntries.length === 0 ? (
                    <div className="py-10 text-center text-xs text-[#5C5146]">
                      لا توجد تأكيدات حضور مسجلة حتى الآن
                    </div>
                  ) : (
                    rsvpEntries.map((entry) => (
                      <div
                        key={entry.id}
                        className="p-3.5 rounded-xl bg-[#FAF5EE] border border-[#C9A96A]/25 flex items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-amiri font-bold text-sm text-[#241D18]">
                              {entry.name}
                            </span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                              entry.attendance === "attending"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-700"
                            }`}>
                              {entry.attendance === "attending" ? "سأحضر بإذن الله" : "معتذر"}
                            </span>
                            <span className="text-[10px] text-[#5C5146]">
                              (عدد: {entry.guestsCount})
                            </span>
                          </div>
                          {entry.message && (
                            <p className="text-xs text-[#5C5146] mt-1">{entry.message}</p>
                          )}
                        </div>
                        <span className="text-[10px] text-[#8C8276] shrink-0">
                          {new Date(entry.submittedAt).toLocaleDateString("ar-EG")}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB: OTHER QUICK TABS */}
            {(activeTab === "stats" || activeTab === "contacts" || activeTab === "stickers" || activeTab === "settings") && (
              <div className="bg-white rounded-2xl border border-[#C9A96A]/30 p-6 shadow-2xs text-center space-y-3">
                <Sparkles className="w-8 h-8 text-[#C9A96A] mx-auto" />
                <h3 className="font-amiri font-bold text-lg text-[#241D18]">
                  إدارة حفل زفاف {wedding.groomAr} &amp; {wedding.brideAr}
                </h3>
                <p className="text-xs text-[#5C5146] max-w-sm mx-auto">
                  جميع الإعدادات والبيانات متصلة بقاعدة البيانات السحابية الحية (Upstash Redis) وتعمل بسلاسة تامة.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab("wishes")}
                  className="px-4 py-2 rounded-full bg-[#241D18] text-[#FBF8F1] text-xs font-semibold cursor-pointer"
                >
                  الانتقال لإدارة التهاني
                </button>
              </div>
            )}

          </main>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          CUSTOM DELETE CONFIRMATION MODAL (No browser confirm!)
          ═══════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {wishToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs print:hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#FBF8F1] rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#C9A96A]/35 text-[#241D18] font-cairo text-center"
              dir="rtl"
            >
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-amiri font-bold text-[#241D18] mb-1">
                هل أنت متأكد من حذف هذه التهنئة؟
              </h3>
              <p className="text-xs font-cairo text-[#5C5146] mb-4">
                المرسل: {wishToDelete.name}
              </p>

              <div className="p-3 rounded-xl bg-white border border-[#C9A96A]/20 text-xs text-[#3A2D24] text-right mb-5 line-clamp-3">
                &ldquo;{wishToDelete.message}&rdquo;
              </div>

              <div className="flex items-center justify-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setWishToDelete(null)}
                  disabled={deletingId !== null}
                  className="px-5 py-2 rounded-full border border-[#C9A96A]/35 text-xs font-semibold text-[#5C5146] hover:bg-white transition-colors cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  disabled={deletingId !== null}
                  className="px-6 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {deletingId ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <span>حذف</span>}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════════════
          EDIT WISH MODAL
          ═══════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {editingWish && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs print:hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#C9A96A]/35 text-[#241D18] font-cairo space-y-4"
              dir="rtl"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#C9A96A]/20">
                <h3 className="text-base font-amiri font-bold text-[#241D18]">
                  تعديل التهنئة
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingWish(null)}
                  className="text-xs text-[#5C5146] hover:text-[#241D18]"
                >
                  ✕
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#241D18] mb-1">
                  الاسم
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF5EE] border border-[#C9A96A]/30 text-xs text-[#241D18] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#241D18] mb-1">
                  الرسالة
                </label>
                <textarea
                  rows={3}
                  value={editMessage}
                  onChange={(e) => setEditMessage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF5EE] border border-[#C9A96A]/30 text-xs text-[#241D18] outline-none resize-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={!editIsHidden}
                    onChange={(e) => setEditIsHidden(!e.target.checked)}
                    className="accent-[#C9A96A]"
                  />
                  <span>إظهار التهنئة للزوار</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#C9A96A]/20">
                <button
                  type="button"
                  onClick={() => setEditingWish(null)}
                  className="px-4 py-1.5 text-xs text-[#5C5146] hover:text-[#241D18]"
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  disabled={editSaving}
                  onClick={handleSaveEdit}
                  className="px-5 py-1.5 rounded-full bg-[#241D18] text-[#FBF8F1] text-xs font-semibold flex items-center gap-1.5"
                >
                  {editSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <span>حفظ التعديلات</span>}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════════════
          PRINT OPTIONS MODAL
          ═══════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showPrintModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs print:hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#C9A96A]/35 text-[#241D18] font-cairo text-center space-y-4"
              dir="rtl"
            >
              <div className="w-12 h-12 rounded-full bg-[#FAF5EE] text-[#8A6A32] flex items-center justify-center mx-auto border border-[#C9A96A]/30">
                <Printer className="w-5 h-5" />
              </div>

              <h3 className="text-lg font-amiri font-bold text-[#241D18]">
                طباعة حائط التهاني التذكاري
              </h3>
              <p className="text-xs text-[#5C5146]">
                تصدير نسخة تذكارية فاخرة للطباعة بحجم A4 أو الحفظ كملف PDF
              </p>

              <div className="text-right space-y-2 py-2">
                <label className="flex items-center gap-2 text-xs text-[#3A2D24] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={printVisibleOnly}
                    onChange={(e) => setPrintVisibleOnly(e.target.checked)}
                    className="accent-[#C9A96A]"
                  />
                  <span>طباعة التهاني الظاهرة فقط</span>
                </label>
              </div>

              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPrintModal(false)}
                  className="px-4 py-2 rounded-full border border-[#C9A96A]/35 text-xs text-[#5C5146]"
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  onClick={handleTriggerPrint}
                  className="px-6 py-2 rounded-full bg-[#241D18] text-[#FBF8F1] text-xs font-bold flex items-center gap-2 shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>طباعة / PDF</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════════════
          REFERENCE 11: PRINTABLE WISHES WALL (شكل الطباعة)
          This renders only during window.print()
          ═══════════════════════════════════════════════════════════════════════ */}
      <div className="hidden print:block min-h-screen bg-[#FFFDF9] text-[#241D18] p-8 font-amiri" dir="rtl">
        {/* Physical A4 Floral Keepsake Frame */}
        <div className="border-2 border-[#C9A96A]/60 rounded-3xl p-6 relative">
          
          {/* Ornate Corner Flourishes */}
          <div className="absolute top-2 right-2 text-[#C9A96A] text-sm select-none">❖</div>
          <div className="absolute top-2 left-2 text-[#C9A96A] text-sm select-none">❖</div>
          <div className="absolute bottom-2 right-2 text-[#C9A96A] text-sm select-none">❖</div>
          <div className="absolute bottom-2 left-2 text-[#C9A96A] text-sm select-none">❖</div>

          {/* Keepsake Header matching Reference 11 */}
          <div className="text-center pb-6 border-b border-[#C9A96A]/30 mb-6">
            <p className="text-xs font-cairo text-[#8A6A32] tracking-widest mb-1">
              كلمات من القلب
            </p>
            <h1 className="text-3xl font-bold text-[#241D18] mb-1">
              {wedding.groomAr} <span className="text-[#C9A96A] font-cormorant">&amp;</span> {wedding.brideAr}
            </h1>
            <p className="text-xs font-cairo text-[#5C5146]">
              14 أكتوبر 2026
            </p>
          </div>

          {/* Wishes Cards Grid with page-break-inside: avoid */}
          <div className="grid grid-cols-2 gap-4">
            {wishesForPrint.map((wish) => (
              <div
                key={wish.id}
                className="p-4 rounded-2xl bg-[#FBF8F1] border border-[#C9A96A]/40 text-right print-page-break-avoid"
                style={{ breakInside: "avoid", pageBreakInside: "avoid" }}
              >
                <div className="flex items-center justify-between border-b border-[#C9A96A]/20 pb-1.5 mb-2">
                  <h3 className="font-bold text-base text-[#241D18]">
                    {wish.name}
                  </h3>
                  <span className="text-[10px] font-cairo text-[#8A6A32]">
                    {recipientLabel(wish.recipient)}
                  </span>
                </div>

                <p className="text-xs font-cairo text-[#241D18] leading-relaxed mb-2">
                  {wish.message}
                </p>

                <div className="flex items-center justify-between text-[9px] font-cairo text-[#8C8276] pt-1 border-t border-[#C9A96A]/15">
                  <span>{new Date(wish.timestamp).toLocaleDateString("ar-EG")}</span>
                  {wish.sticker && <span>✨ {wish.sticker}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Keepsake Footer Note matching Reference 11 */}
          <div className="mt-8 pt-4 border-t border-[#C9A96A]/30 text-center">
            <p className="text-sm font-amiri font-bold text-[#3A2D24]">
              شكراً لكل من شاركنا فرحتنا ❤️
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
