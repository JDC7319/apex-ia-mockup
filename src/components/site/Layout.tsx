import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "./Header";
import { Footer, Sponsors } from "./Footer";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster />
      <Header />
      {children}
      <Sponsors />
      <Footer />
    </div>
  );
}

export function PageTitle({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <section className="bg-arena pt-36 pb-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">{eyebrow}</div>
        <h1 className="font-display text-7xl font-bold uppercase md:text-8xl">{title}</h1>
        {sub && <p className="mt-3 max-w-2xl text-muted-foreground">{sub}</p>}
      </div>
    </section>
  );
}
