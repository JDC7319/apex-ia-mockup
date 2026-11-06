import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, MapPin, Film, Bitcoin, Users } from "lucide-react";
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
  const t = tiers.find((x) => x.id === tier)!;
  const v = venues.find((x) => x.id === venue)!;
  const [zone, setZone] = useState("ringside");
  const [crypto, setCrypto] = useState(false);
  const pick = (id: string) => { const e = events.find((x) => x.id === id)!; setEv(id); setVenue(e.venues[0]!); };
  return (
    <SiteLayout>
      <PageTitle eyebrow="Ticket Office" title="Events & Tickets" sub="Pick a fight night, choose your venue — arena or Monster's Drive-In big-screen — and check out." />
      <ArenaShowcase zone={zone} setZone={setZone} />
      <CryptoCheckout open={crypto} onOpenChange={setCrypto} tier={t.name} usd={t.price} qty={qty} venue={`${v.name}, ${v.city}`} event={event.title} />
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
              <div key={x.id} className={`border ${tier === x.id ? "border-accent bg-red-dark/40" : "border-border hover:border-muted-foreground"}`}>
                <button onClick={() => setTier(x.id)} className="flex w-full items-center justify-between p-3 text-left">
                  <div><div className="font-bold uppercase tracking-wider">{x.name}</div><div className="text-xs text-muted-foreground">{x.note}</div></div>
                  <div className="font-display text-3xl font-bold">${x.price}<span className="ml-1 text-xs text-muted-foreground">USD</span></div>
                </button>
                <button onClick={() => { setTier(x.id); setCrypto(true); }} className="flex w-full items-center justify-center gap-2 border-t border-border bg-primary py-2 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-accent">
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
    </SiteLayout>
  );
}

const zones = [
  { id: "ringside", label: "Ringside", seats: 480, note: "Rows A–C, steps from the cage" },
  { id: "vip", label: "VIP", seats: 1200, note: "Drive-In VIP car bays + lounge decks" },
  { id: "general", label: "General Access", seats: 6320, note: "Open lawn + big-screen bowl" },
];

function ArenaShowcase({ zone, setZone }: { zone: string; setZone: (z: string) => void }) {
  const z = zones.find((x) => x.id === zone)!;
  const ring = (id: string, r: number, w: number) => (
    <polygon key={id} onClick={() => setZone(id)} points={Array.from({ length: 8 }, (_, i) => { const a = (Math.PI / 4) * i + Math.PI / 8; return `${100 + r * Math.cos(a)},${100 + r * Math.sin(a)}`; }).join(" ")}
      fill="none" strokeWidth={w} className={`cursor-pointer transition-all ${zone === id ? "stroke-primary" : "stroke-border hover:stroke-muted-foreground"}`} />
  );
  return (
    <section className="mx-auto max-w-7xl px-4 pt-12">
      <div className="relative overflow-hidden border border-border">
        <img src={arena} alt="APEX octagon arena under spotlights" width={1600} height={912} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-fade" />
        <div className="relative grid gap-8 p-6 pt-48 md:grid-cols-[3fr_2fr] md:p-10 md:pt-64">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Flagship Venue</div>
            <h2 className="font-display text-5xl font-bold uppercase md:text-7xl">APEX Arena 01</h2>
            <p className="text-lg font-semibold uppercase tracking-wider text-muted-foreground">Monster's Cinema Drive-In Grounds</p>
            <div className="mt-6 flex flex-wrap gap-6">
              <div><div className="font-display text-5xl font-bold">8,000</div><div className="text-xs uppercase tracking-widest text-muted-foreground">Total capacity</div></div>
              <div><div className="font-display text-5xl font-bold text-primary">{z.seats.toLocaleString()}</div><div className="text-xs uppercase tracking-widest text-muted-foreground">{z.label} seats</div></div>
            </div>
          </div>
          <div className="border border-border bg-background/80 p-4 backdrop-blur">
            <div className="mb-3 flex gap-1">
              {zones.map((x) => (
                <button key={x.id} onClick={() => setZone(x.id)} className={`flex-1 border px-2 py-2 text-xs font-bold uppercase tracking-wider ${zone === x.id ? "border-accent bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>{x.label}</button>
              ))}
            </div>
            <svg viewBox="0 0 200 200" className="mx-auto h-44 w-44">
              {ring("general", 90, 14)}{ring("vip", 66, 12)}{ring("ringside", 45, 10)}
              <polygon points={Array.from({ length: 8 }, (_, i) => { const a = (Math.PI / 4) * i + Math.PI / 8; return `${100 + 26 * Math.cos(a)},${100 + 26 * Math.sin(a)}`; }).join(" ")} className="fill-card stroke-foreground" strokeWidth={2} />
              <text x="100" y="104" textAnchor="middle" className="fill-foreground font-display text-[10px]">OCTAGON</text>
            </svg>
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground"><Users className="h-4 w-4 text-primary" />{z.note}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
