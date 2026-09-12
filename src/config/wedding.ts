export interface GuestWish {
  id: string;
  name: string;
  message: string;
  timestamp: string;
  isHidden?: boolean;
  recipient?: "groom" | "bride" | "both";
}

export interface WeddingConfig {
  groom: string;
  bride: string;
  groomAr: string;
  brideAr: string;
  date: string;
  time: string;
  dateTimeISO: string;
  dayAr: string;
  cityAr: string;
  venueAr: string;
  introMusic: string;
  celebrationSound: string;
  heroImage: string;
  venueImage: string;
  waxSealImage: string;
  heroText: {
    intro: string;
    subline: string;
    inviteText: string;
  };
  invitationMessage: {
    basmala: string;
    body: string;
    closing: string;
  };
  romanticMoments: {
    title: string;
    blocks: { tag: string; title: string; description: string }[];
  };
  timeline: { time: string; title: string; description: string; icon: string }[];
  location: {
    addressAr: string;
    mapsUrl: string;
    latitude: number;
    longitude: number;
    uberUrl: string;
    inDriveUrl: string;
  };
}

export const wedding: WeddingConfig = {
  groom: "Ahmed",
  bride: "Menatallah",
  groomAr: "أحمد",
  brideAr: "منة الله",
  date: "2026-10-14",
  time: "19:00",
  dateTimeISO: "2026-10-14T19:00:00+02:00",
  dayAr: "الأربعاء",
  cityAr: "شبين القناطر - القليوبية",
  venueAr: "قاعة قصر كازبلانكا",
  introMusic: "/audio/wedding.mp3",
  celebrationSound: "/audio/zaghareet.mp3",
  heroImage: "/images/hero.jpg",
  venueImage: "/images/venue.jpg",
  waxSealImage: "/images/wax-seal.jpg",
  heroText: {
    intro: "بكل الحب والسعادة",
    subline: "We are getting married",
    inviteText: "يسرّنا دعوتكم لمشاركتنا فرحة زفافنا",
  },
  invitationMessage: {
    basmala: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    body: "بكل الحب والفرح.. نتشرف بدعوتكم لمشاركتنا أجمل لحظات العمر",
    closing: "وجودكم بيننا يزيد فرحتنا اكتمالًا، ونتطلع بشوق إلى مشاركتكم هذا اليوم المميز.",
  },
  romanticMoments: {
    title: "بداية أجمل حكاية",
    blocks: [
      { tag: "The Promise", title: "الوعد", description: "حب جمع بين قلبين على المودة والرحمة، وعهد صادق بأن نسير معًا في درب الحياة يدًا بيد." },
      { tag: "The Date", title: "الموعد", description: "نلتقي يوم 14 أكتوبر 2026 لنبدأ فصلًا جديدًا وتتوج قلوبنا بأسمى آيات الفرح والسعادة." },
      { tag: "The Joy", title: "الفرحة", description: "بحضوركم تكتمل سعادتنا وتصبح الليلة أجمل وأدفأ، فأنتم السند والبسمة في ليلة العمر." },
    ],
  },
  timeline: [
    { time: "7:00 مساءً", title: "استقبال الضيوف", description: "نستقبلكم بكل الود والمحبة في بهو القصر", icon: "Users" },
    { time: "8:00 مساءً", title: "بداية الحفل والزفة", description: "دخول العروسين ومراسم الزفة الملكية", icon: "Sparkles" },
    { time: "9:00 مساءً", title: "العشاء والاحتفال", description: "مأدبة العشاء وتقطيع كعكة الزفاف", icon: "Utensils" },
    { time: "10:00 مساءً", title: "السهرة والفرحة", description: "أجواء الرقص والبهجة حتى نهاية أجمل ليلة", icon: "Music" },
  ],
  location: {
    addressAr: "قاعة قصر كازبلانكا، شبين القناطر، القليوبية، مصر",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=%D9%82%D8%A7%D8%B9%D8%A9%20%D9%82%D8%B5%D8%B1%20%D9%83%D8%A7%D8%B2%D8%A8%D9%84%D8%A7%D9%86%D9%83%D8%A7%20%D8%B4%D8%A8%D9%8A%D9%86%20%D8%A7%D9%84%D9%82%D9%86%D8%A7%D8%B7%D8%B1%20%D8%A7%D9%84%D9%82%D9%84%D9%8A%D9%88%D8%A8%D9%8A%D8%A9%20%D9%85%D8%B5%D8%B1",
    latitude: 30.3129,
    longitude: 31.3197,
    uberUrl: "https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=%D9%82%D8%A7%D8%B9%D8%A9%20%D9%82%D8%B5%D8%B1%20%D9%83%D8%A7%D8%B2%D8%A8%D9%84%D8%A7%D9%86%D9%83%D8%A7%20%D8%B4%D8%A8%D9%8A%D9%86%20%D8%A7%D9%84%D9%82%D9%86%D8%A7%D8%B7%D8%B1",
    inDriveUrl: "indrive://ride?destination=%D9%82%D8%A7%D8%B9%D8%A9%20%D9%82%D8%B5%D8%B1%20%D9%83%D8%A7%D8%B2%D8%A8%D9%84%D8%A7%D9%86%D9%83%D8%A7",
  },
};

// ==========================================
// PROFANITY FILTER
// Egyptian Arabic common profanity list
// ==========================================
const PROFANITY_LIST = [
  "كس", "كسم", "كسمك", "كسمي", "كسمه", "كسمها", "كسمهم",
  "طيز", "طيزك", "طيزه", "طيزها",
  "زب", "زبه", "زبك", "زبي",
  "متناك", "متناكة", "منيك", "منيكة",
  "عرص", "عرصة",
  "شرموط", "شرموطة",
  "وسخ", "وسخة", "قحبة", "قحاب",
  "ابن الكلب", "ابن المتناكة", "يلعن",
  "نيك", "نيكك", "نيكه",
  "خول", "خوله",
  "لعنت", "يلعنك", "يلعنه",
  "fuck", "shit", "bitch", "asshole", "dick", "pussy",
];

export function containsProfanity(text: string): boolean {
  const normalized = text.toLowerCase().trim();
  return PROFANITY_LIST.some((word) =>
    normalized.includes(word.toLowerCase())
  );
}

export function censorProfanity(text: string): string {
  let result = text;
  PROFANITY_LIST.forEach((word) => {
    const regex = new RegExp(word, "gi");
    result = result.replace(regex, "***");
  });
  return result;
}
