import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, MapPin, Film, Users, Bitcoin } from "lucide-react";
import arena from "@/assets/arena-octagon.jpg";
import { CryptoCheckout } from "@/components/site/CryptoCheckout";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { SiteLayout, PageTitle } from "@/components/site/Layout";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events & Ticket Office — APEX Combat League" },
      { name: "description", content: "Upcoming APEX humanoid robot fights. Pick a venue, including Monster's Drive-In Cinema screenings, and buy Ringside, Drive-In VIP Box or General tickets." },
      { property: "og:title", content: "Events & Ticket Office — APEX" },
      { property: "og:description", content: "Full calendar of APEX combat events and tickets." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Events,
});

const venues = [
  { id: "barclays", name: "Barclays Center", city: "Brooklyn, NY", screening: false },
  { id: "drivein-mia", name: "Monster's Drive-In Cinema", city: "Miami, FL", screening: true },
  { id: "drivein-la", name: "Monster's Drive-In Cinema", city: "Los Angeles, CA", screening: true },
  { id: "tmobile", name: "T-Mobile Arena", city: "Las Vegas, NV", screening: false },
];

const events = [
  { id: "apex08", title: "APEX 08: White Eagle vs. Steel Titan", date: "Sat, Dec 12 2026 · 8PM ET", venues: ["barclays", "drivein-mia", "drivein-la"] },
  { id: "apex09", title: "APEX 09: Red Falcon vs. TBA", date: "Sat, Jan 23 2027 · 9PM ET", venues: ["tmobile", "drivein-la"] },
  { id: "apex10", title: "APEX 10: Heavyweight Grand Prix", date: "Sat, Mar 6 2027 · 8PM ET", venues: ["barclays", "drivein-mia"] },
  { id: "apex11", title: "APEX 11: Night of Titans", date: "Sat, Apr 17 2027 · 8PM ET", venues: ["tmobile", "drivein-mia", "drivein-la"] },
];

const tiers = [
  { id: "ringside", name: "Ringside", price: 150, note: "Rows A–C · cage-side view" },
  { id: "vipbox", name: "Drive-In VIP Box", price: 100, note: "Private car bay · concierge snacks · per vehicle" },
  { id: "general", name: "General Admission", price: 50, note: "Upper bowl / open lawn" },
];

function Events() {
  const [ev, setEv] = useState(events[0]!.id);
  const event = events.find((e) => e.id === ev)!;
  const [venue, setVenue] = useState(event.venues[0]!);
  const [tier, setTier] = useState("general");
  const [qty, setQty] = useState(2);
  const [zone, setZone] = useState<"ringside" | "vip" | "general">("ringside");
  const [crypto, setCrypto] = useState(false);
  const t = tiers.find((x) => x.id === tier)!;
  const v = venues.find((x) => x.id === venue)!;
  const pick = (id: string) => { const e = events.find((x) => x.id === id)!; setEv(id); setVenue(e.venues[0]!); };
  return (
    <SiteLayout>
      <PageTitle eyebrow="Ticket Office" title="Events & Tickets" sub="Pick a fight night, choose your venue — arena or Monster's Drive-In big-screen — and check out." />
      <section className="mx-auto max-w-7xl px-4 pt-12">
        <div className="relative overflow-hidden border border-border bg-background">
          <img src={arena} alt="APEX octagon arena under spotlights" width={1600} height={912} className="h-[420px] w-full object-cover opacity-80" />
          <div className="bg-fade absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Arena Showcase</div>
              <h2 className="font-display text-5xl font-bold uppercase md:text-6xl">APEX Arena 01</h2>
              <div className="text-lg text-muted-foreground">Monster's Cinema Drive-In Grounds</div>
              <div className="mt-3 flex flex-wrap gap-4 text-sm">
                <span className="flex items-center gap-1"><Users className="h-4 w-4 text-primary" />12,500 capacity</span>
                <span>· 600 Ringside</span><span>· 240 VIP car bays</span><span>· 11,660 General</span>
              </div>
            </div>
            <div className="border border-border bg-card/90 p-4 backdrop-blur">
              <div className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">Venue Map</div>
              <div className="mb-3 flex gap-1">
                {(["ringside", "vip", "general"] as const).map((z) => (
                  <button key={z} onClick={() => setZone(z)} className={`border px-3 py-1 text-xs font-bold uppercase tracking-wider ${zone === z ? "border-accent bg-primary text-primary-foreground" : "border-border hover:border-muted-foreground"}`}>{z === "vip" ? "VIP" : z === "general" ? "General Access" : "Ringside"}</button>
                ))}
              </div>
              <svg viewBox="0 0 200 140" className="h-36 w-56">
                <rect x="10" y="10" width="180" height="120" fill="none" className={zone === "general" ? "fill-primary/30 stroke-primary" : "stroke-border"} strokeWidth="2" />
                <rect x="40" y="30" width="120" height="80" className={zone === "vip" ? "fill-primary/40 stroke-primary" : "fill-background stroke-border"} strokeWidth="2" />
                <rect x="65" y="45" width="70" height="50" className={zone === "ringside" ? "fill-primary/60 stroke-primary" : "fill-background stroke-border"} strokeWidth="2" />
                <polygon points="90,55 110,55 120,65 120,75 110,85 90,85 80,75 80,65" className="fill-foreground" />
              </svg>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[3fr_2fr]">
        <div>
          <h2 className="mb-4 font-display text-3xl font-semibold uppercase">Upcoming Events</h2>
          <div className="space-y-3">
            {events.map((e) => (
              <button key={e.id} onClick={() => pick(e.id)}
                className={`flex w-full items-center justify-between border p-5 text-left transition-colors ${ev === e.id ? "border-accent bg-card" : "border-border hover:border-muted-foreground"}`}>
                <div>
                  <div className="font-display text-3xl font-bold uppercase">{e.title}</div>
                  <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground"><Calendar className="h-4 w-4 text-primary" />{e.date}</div>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{e.venues.length} venues</span>
              </button>
            ))}
          </div>
        </div>
        <div className="h-fit border border-border bg-card p-5 lg:sticky lg:top-28">
          <div className="text-xs font-bold uppercase tracking-widest text-primary">{event.date}</div>
          <h3 className="font-display text-3xl font-bold uppercase">{event.title}</h3>
          <div className="mt-5 text-xs font-bold uppercase tracking-widest text-muted-foreground">Venue</div>
          <div className="mt-2 space-y-2">
            {event.venues.map((id) => { const x = venues.find((y) => y.id === id)!; return (
              <button key={id} onClick={() => setVenue(id)} className={`flex w-full items-center gap-3 border p-3 text-left text-sm ${venue === id ? "border-accent bg-red-dark/40" : "border-border hover:border-muted-foreground"}`}>
                {x.screening ? <Film className="h-4 w-4 text-primary" /> : <MapPin className="h-4 w-4 text-primary" />}
                <span className="flex-1 font-semibold">{x.name} <span className="text-muted-foreground">· {x.city}</span></span>
                {x.screening && <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Special Screening</span>}
              </button>
            ); })}
          </div>
          <div className="mt-5 text-xs font-bold uppercase tracking-widest text-muted-foreground">Ticket Tier</div>
          <div className="mt-2 grid gap-2">
            {tiers.map((x) => (
              <div key={x.id} className={`border ${tier === x.id ? "border-accent bg-red-dark/40" : "border-border"}`}>
                <button onClick={() => setTier(x.id)} className="flex w-full items-center justify-between p-3 text-left">
                  <div><div className="font-bold uppercase tracking-wider">{x.name}</div><div className="text-xs text-muted-foreground">{x.note}</div></div>
                  <div className="font-display text-3xl font-bold">${x.price} <span className="text-sm text-muted-foreground">USD</span></div>
                </button>
                <button onClick={() => { setTier(x.id); setCrypto(true); }} className="flex w-full items-center justify-center gap-2 border-t border-border bg-primary py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-accent">
                  <Bitcoin className="h-4 w-4" />Pay with Crypto (Live CoinGecko FX)
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Quantity</span>
            <div className="flex items-center gap-2">
              <button className="h-8 w-8 border border-border hover:border-foreground" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <span className="w-6 text-center font-bold">{qty}</span>
              <button className="h-8 w-8 border border-border hover:border-foreground" onClick={() => setQty(Math.min(8, qty + 1))}>+</button>
            </div>
          </div>
          <Button variant="fight" size="xl" className="mt-4 w-full justify-between"
            onClick={() => toast.success(`${qty} × ${t.name} reserved`, { description: `${v.name}, ${v.city} — complete checkout within 10 minutes.` })}>
            <span>Checkout</span><span>${(t.price * qty).toLocaleString()}</span>
          </Button>
        </div>
      </section>
      <CryptoCheckout open={crypto} onOpenChange={setCrypto} tier={t.name} price={t.price} qty={qty} venue={`${v.name}, ${v.city}`} event={event.title} />
    </SiteLayout>
  );
}
