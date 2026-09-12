"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart, Home, Users, PieChart, Archive, Settings,
  Search, Edit3, Trash2, Printer, ArrowRight, Check
} from "lucide-react";
import { JasmineSticker, RingSticker, BouquetSticker } from "./WishEmbellishments";
import { wedding } from "@/config/wedding";

export default function ShowcaseScreens() {
  const [selectedDashboardTab, setSelectedDashboardTab] = useState("wishes");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPrintWish, setSelectedPrintWish] = useState("hajar");
  const [wishesList, setWishesList] = useState([
    {
      id: "hajar",
      name: "هاجر عبدالله",
      time: "منذ يومين",
      sticker: "jasmine",
      preview: "ألف مبروك يا أجمل عروسين",
      fullLines: [
        "ألف مبروك يا أجمل عروسين",
        "ربنا يبارك لكم ويجمع بينكم في خير"
      ],
      hearts: "❤️",
      printHearts: "❤️❤️",
    },
    {
      id: "ahmed",
      name: "أحمد رفعت",
      time: "منذ 3 أيام",
      sticker: "ring",
      preview: "ربنا يسعدكم",
      fullLines: [
        "ربنا يسعدكم ويبارك لكم دايما مع بعض",
        "في كل أيامكم"
      ],
      hearts: "❤️",
      printHearts: "❤️❤️",
    },
    {
      id: "nada",
      name: "ندى مصطفى",
      time: "منذ 5 أيام",
      sticker: "bouquet",
      preview: "عقبال الذرية الصالحة",
      fullLines: [
        "عقبال الذرية الصالحة إن شاء الله",
        "مبروك"
      ],
      hearts: "❤️",
      printHearts: "❤️❤️",
    },
  ]);

  const activePrintWish = wishesList.find(w => w.id === selectedPrintWish) || wishesList[0];

  const handleDelete = (id: string) => {
    setWishesList(prev => prev.filter(w => w.id !== id));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F7F2E9] py-8 px-3 sm:px-6 font-cairo text-[#241710]" dir="rtl">
      {/* Top Banner Navigation */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D8C7B0] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C5A059]" />
            <h1 className="text-xl sm:text-2xl font-bold font-amiri text-[#241710]">
              معاينة الشاشات الثلاث (09 - 10 - 11)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#7A695A] mt-0.5">
            تصميم مطابق بالملي لمخطط الدعوة ولوحة التحكم وشكل الطباعة
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#D8C7B0] text-xs font-semibold text-[#4A3222] hover:bg-[#FAF6F0] transition-colors shadow-2xs"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>العودة للدعوة الرئيسية</span>
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#432C1E] text-white text-xs font-semibold hover:bg-[#321F14] transition-colors shadow-2xs"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>لوحة تحكم المشرف</span>
          </Link>
        </div>
      </div>

      {/* 3 Screens Showcase Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
        
        {/* ═════════════════════════════════════════════════════════════════════
            SCREEN 09: عرض التهاني (Wishes Wall Display)
            ═════════════════════════════════════════════════════════════════════ */}
        <div className="flex flex-col items-center">
          <div className="w-full bg-[#FFFDF9] rounded-[28px] border border-[#E8DFC8] p-5 sm:p-6 shadow-[0_10px_30px_rgba(50,40,30,0.05)] text-center relative flex flex-col">
            
            {/* Top Brown Heart */}
            <div className="flex items-center justify-center mb-1.5">
              <Heart className="w-5 h-5 text-[#5C3822] fill-[#5C3822]" />
            </div>

            {/* Title & Subtitle */}
            <h2 className="text-xl sm:text-2xl font-bold font-amiri text-[#241710]">
              حائط التهاني
            </h2>
            <p className="text-xs sm:text-sm font-cairo text-[#7A695A] mt-0.5 mb-5 font-medium">
              أجمل ما قيل في أحمد ومنة الله
            </p>

            {/* 3 Cards List */}
            <div className="space-y-3.5 text-right">
              {wishesList.map((wish) => (
                <div
                  key={wish.id}
                  onClick={() => setSelectedPrintWish(wish.id)}
                  className={`p-4 rounded-2xl bg-[#FFFDF9] border transition-all cursor-pointer shadow-[0_2px_8px_rgba(46,35,28,0.03)] relative ${
                    selectedPrintWish === wish.id
                      ? "border-[#C5A059] ring-2 ring-[#C5A059]/20"
                      : "border-[#E8DFC8] hover:border-[#D5C2A5]"
                  }`}
                >
                  {/* Card Header (Name, Time, Illustration Sticker) */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <h3 className="font-cairo font-bold text-sm sm:text-base text-[#241710]">
                        {wish.name}
                      </h3>
                      <span className="text-[11px] font-cairo text-[#9B8C7E]">
                        {wish.time}
                      </span>
                    </div>

                    {/* Sticker Badge */}
                    <div className="shrink-0">
                      {wish.sticker === "jasmine" && <JasmineSticker className="w-9 h-9 sm:w-10 sm:h-10" />}
                      {wish.sticker === "ring" && <RingSticker className="w-9 h-9 sm:w-10 sm:h-10" />}
                      {wish.sticker === "bouquet" && <BouquetSticker className="w-9 h-9 sm:w-10 sm:h-10" />}
                    </div>
                  </div>

                  {/* Message Content with Centered Heart */}
                  <div className="text-center sm:text-right mt-1">
                    {wish.fullLines.map((line, idx) => (
                      <p key={idx} className="text-xs sm:text-[13px] font-cairo text-[#2E2016] leading-relaxed">
                        {line}
                      </p>
                    ))}
                    <div className="text-center mt-1 text-sm">
                      <span className="text-red-500 select-none">❤️</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Screen Caption Footer */}
          <div className="mt-3.5 text-center">
            <span className="inline-block text-xs sm:text-sm font-bold font-cairo text-[#5C4533] px-3 py-1 rounded-full bg-[#EFE6D8]">
              09 - عرض التهاني
            </span>
          </div>
        </div>


        {/* ═════════════════════════════════════════════════════════════════════
            SCREEN 10: لوحة التحكم (Admin Dashboard - إدارة التهاني)
            ═════════════════════════════════════════════════════════════════════ */}
        <div className="flex flex-col items-center">
          <div className="w-full bg-white rounded-[28px] border border-[#E8DFC8] p-4 sm:p-5 shadow-[0_10px_30px_rgba(50,40,30,0.05)] relative flex flex-col">
            
            {/* Header: لوحة تحكم المشرف */}
            <h2 className="text-base sm:text-lg font-bold font-amiri text-[#241710] text-center mb-3">
              لوحة تحكم المشرف
            </h2>

            {/* Two Columns: Sidebar (Right) + Content (Left) */}
            <div className="flex gap-3 items-start">
              
              {/* Sidebar Menu */}
              <div className="w-28 sm:w-32 shrink-0 space-y-1">
                <button
                  type="button"
                  onClick={() => setSelectedDashboardTab("home")}
                  className={`w-full flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold transition-all cursor-pointer ${
                    selectedDashboardTab === "home"
                      ? "bg-[#432C1E] text-white"
                      : "text-[#5C4533] hover:bg-[#FAF6F0]"
                  }`}
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>الرئيسية</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedDashboardTab("wishes")}
                  className={`w-full flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold transition-all cursor-pointer ${
                    selectedDashboardTab === "wishes"
                      ? "bg-[#432C1E] text-white shadow-xs"
                      : "text-[#5C4533] hover:bg-[#FAF6F0]"
                  }`}
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>التهاني</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedDashboardTab("rsvp")}
                  className={`w-full flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold transition-all cursor-pointer ${
                    selectedDashboardTab === "rsvp"
                      ? "bg-[#432C1E] text-white"
                      : "text-[#5C4533] hover:bg-[#FAF6F0]"
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>تأكيدات الحضور</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedDashboardTab("stats")}
                  className={`w-full flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold transition-all cursor-pointer ${
                    selectedDashboardTab === "stats"
                      ? "bg-[#432C1E] text-white"
                      : "text-[#5C4533] hover:bg-[#FAF6F0]"
                  }`}
                >
                  <PieChart className="w-3.5 h-3.5" />
                  <span>الإحصائيات</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedDashboardTab("stickers")}
                  className={`w-full flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold transition-all cursor-pointer ${
                    selectedDashboardTab === "stickers"
                      ? "bg-[#432C1E] text-white"
                      : "text-[#5C4533] hover:bg-[#FAF6F0]"
                  }`}
                >
                  <Archive className="w-3.5 h-3.5" />
                  <span>الملصقات</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedDashboardTab("settings")}
                  className={`w-full flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold transition-all cursor-pointer ${
                    selectedDashboardTab === "settings"
                      ? "bg-[#432C1E] text-white"
                      : "text-[#5C4533] hover:bg-[#FAF6F0]"
                  }`}
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>الإعدادات</span>
                </button>
              </div>

              {/* Main Area: إدارة التهاني */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xs sm:text-sm font-amiri font-bold text-[#241710] mb-2">
                  إدارة التهاني
                </h3>

                {/* Search Input */}
                <div className="relative mb-2.5">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="بحث في التهاني..."
                    className="w-full pr-2.5 pl-7 py-1.5 rounded-xl bg-[#FFFDF9] border border-[#E8DFC8] text-[11px] text-[#241710] outline-none focus:border-[#C5A059]"
                  />
                  <Search className="w-3.5 h-3.5 text-[#9B8C7E] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Items List */}
                <div className="space-y-2">
                  {wishesList
                    .filter(w => !searchQuery || w.name.includes(searchQuery) || w.preview.includes(searchQuery))
                    .map((wish) => (
                      <div
                        key={wish.id}
                        className="p-2.5 rounded-xl bg-[#FFFDF9] border border-[#E8DFC8] flex items-center justify-between gap-2 shadow-2xs hover:border-[#C5A059]/40 transition-all"
                      >
                        <div className="min-w-0 flex-1">
                          <h4 className="font-cairo font-bold text-xs text-[#241710] truncate">
                            {wish.name}
                          </h4>
                          <p className="font-cairo text-[10px] sm:text-[11px] text-[#7A695A] truncate mt-0.5">
                            {wish.preview}
                          </p>
                        </div>

                        {/* Action Buttons: Blue Edit + Red Trash */}
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => setSelectedPrintWish(wish.id)}
                            className="p-1 rounded-md text-blue-600 hover:bg-blue-50 transition-colors"
                            title="تعديل أو معاينة للطباعة"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(wish.id)}
                            className="p-1 rounded-md text-red-600 hover:bg-red-50 transition-colors"
                            title="حذف"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

            </div>

          </div>

          {/* Screen Caption Footer */}
          <div className="mt-3.5 text-center">
            <span className="inline-block text-xs sm:text-sm font-bold font-cairo text-[#5C4533] px-3 py-1 rounded-full bg-[#EFE6D8]">
              10 - لوحة التحكم
            </span>
          </div>
        </div>


        {/* ═════════════════════════════════════════════════════════════════════
            SCREEN 11: شكل الطباعة (Print Keepsake Certificate)
            ═════════════════════════════════════════════════════════════════════ */}
        <div className="flex flex-col items-center">
          <div className="w-full bg-[#FFFDF9] rounded-[28px] border border-[#E8DFC8] p-5 sm:p-6 shadow-[0_10px_30px_rgba(50,40,30,0.05)] text-center relative flex flex-col items-center">
            
            {/* Top Certificate Card with Authentic Blank Background */}
            <div className="relative aspect-[682/1024] w-full max-w-[340px] sm:max-w-[360px] mx-auto rounded-2xl overflow-hidden shadow-xl border border-[#E8DFC8] bg-[#FFFDF9]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/wish-print-bg.png"
                alt="كارت طباعة التهنئة"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none z-0"
              />

              {/* Top Section */}
              <div className="absolute top-[13%] left-[12%] right-[12%] text-center z-10">
                <p className="font-amiri font-bold text-xs sm:text-sm text-[#241710] tracking-wide">
                  كلمات من القلب
                </p>
                <p className="font-cairo text-[9px] sm:text-[10px] text-[#8C7A6B] mt-0.5 font-medium">
                  دعوة فرح زفاف
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold font-ruqaa text-[#241710] my-0.5 sm:my-1">
                  أحمد <span className="font-cormorant font-normal text-lg text-[#C5A059]">&amp;</span> منة الله
                </h3>
                <p className="font-cairo text-[10px] sm:text-xs font-bold text-[#432C1E]">
                  14 أكتوبر 2026
                </p>
              </div>

              {/* Inner Box Section */}
              <div className="absolute top-[44%] bottom-[22%] left-[13%] right-[13%] flex flex-col items-center justify-center text-center px-4 z-10">
                <h4 className="font-cairo font-bold text-xs sm:text-sm text-[#241710] mb-1.5">
                  {activePrintWish.name}
                </h4>
                <div className="space-y-0.5 mb-2 max-w-[220px]">
                  {activePrintWish.fullLines.map((line, idx) => (
                    <p key={idx} className="font-cairo font-semibold text-[10px] sm:text-[11px] text-[#2E2016] leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
                <div className="text-xs sm:text-sm">
                  <span className="text-red-500 select-none">❤️❤️</span>
                </div>
              </div>

              {/* Bottom Text - Sits safely inside the white box above the bottom border line */}
              <div className="absolute bottom-[17%] left-0 right-0 text-center z-10 pointer-events-none">
                <p className="font-amiri font-bold text-[11px] sm:text-xs text-[#432C1E]">
                  شكراً لكل من شاركنا فرحتنا
                </p>
              </div>
            </div>

            {/* Print Trigger Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="mt-3 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#432C1E] hover:bg-[#321F14] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة هذه البطاقة (Print / PDF)</span>
            </button>

          </div>

          {/* Screen Caption Footer */}
          <div className="mt-3.5 text-center">
            <span className="inline-block text-xs sm:text-sm font-bold font-cairo text-[#5C4533] px-3 py-1 rounded-full bg-[#EFE6D8]">
              11 - شكل الطباعة
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
