import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "لوحة التحكم | حفل زفاف أحمد ومنة الله",
  description: "لوحة إدارة حفل الزفاف",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
