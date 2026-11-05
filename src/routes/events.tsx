import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, MapPin, Film } from "lucide-react";
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
  { id: "ringside", name: "Ringside", price: 890, note: "Rows A–C · cage-side view" },
  { id: "vipbox", name: "Drive-In VIP Box", price: 320, note: "Private car bay · concierge snacks · per vehicle" },
  { id: "general", name: "General Admission", price: 89, note: "Upper bowl / open lawn" },
];

function Events() {
  const [ev, setEv] = useState(events[0]!.id);
  const event = events.find((e) => e.id === ev)!;
  const [venue, setVenue] = useState(event.venues[0]!);
  const [tier, setTier] = useState("general");
  const [qty, setQty] = useState(2);
  const t = tiers.find((x) => x.id === tier)!;
  const v = venues.find((x) => x.id === venue)!;
  const pick = (id: string) => { const e = events.find((x) => x.id === id)!; setEv(id); setVenue(e.venues[0]!); };
  return (
    <SiteLayout>
      <PageTitle eyebrow="Ticket Office" title="Events & Tickets" sub="Pick a fight night, choose your venue — arena or Monster's Drive-In big-screen — and check out." />
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
              <button key={x.id} onClick={() => setTier(x.id)} className={`flex items-center justify-between border p-3 text-left ${tier === x.id ? "border-accent bg-red-dark/40" : "border-border hover:border-muted-foreground"}`}>
                <div><div className="font-bold uppercase tracking-wider">{x.name}</div><div className="text-xs text-muted-foreground">{x.note}</div></div>
                <div className="font-display text-3xl font-bold">${x.price}</div>
              </button>
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
