import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Play, Eye, MapPin, Calendar, Ticket, Instagram, Youtube, Twitter, Check, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import hero from "@/assets/hero-robot.jpg";
import titan from "@/assets/fighter-titan.jpg";
import falcon from "@/assets/fighter-falcon.jpg";
import ko from "@/assets/highlight-ko.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "URKL — Real Humanoid Combat League | Tickets & Highlights" },
      { name: "description", content: "Ultimate Robot Knock-out Legend. Watch T800 humanoid robots fight live. Buy tickets for White Eagle vs. Steel Titan and stream K.O. highlights." },
      { property: "og:title", content: "URKL — Real Humanoid Combat League" },
      { property: "og:description", content: "White Eagle vs. Steel Titan. Get tickets and stream the knockouts." },
    ],
  }),
  component: Index,
});

const EVENT_DATE = new Date("2026-12-12T20:00:00-05:00");

const zones = [
  { id: "ringside", name: "Ringside", price: 890, note: "Rows A–C · Cage-side" },
  { id: "vip", name: "VIP", price: 450, note: "Lounge + paddock tour" },
  { id: "general", name: "General", price: 89, note: "Upper bowl seating" },
];

const fighters = [
  { name: "White Eagle", unit: "T800-WE01", cls: "Heavyweight", img: hero, record: "14-1-0", weight: 78, torque: 450, velocity: 9.4, kos: 11, style: "Counter-striker" },
  { name: "Steel Titan", unit: "T800-ST03", cls: "Super Heavyweight", img: titan, record: "12-2-0", weight: 92, torque: 520, velocity: 8.1, kos: 10, style: "Pressure brawler" },
  { name: "Red Falcon", unit: "T800-RF07", cls: "Middleweight", img: falcon, record: "9-0-0", weight: 64, torque: 380, velocity: 10.6, kos: 6, style: "Kick specialist" },
];

const highlights = [
  { title: "White Eagle flatlines Titan-II in R2", dur: "0:48", views: "2.4M", pos: "object-left", live: false },
  { title: "URKL 07: Full main event replay", dur: "34:12", views: "1.1M", pos: "object-center", live: false },
  { title: "Red Falcon spinning heel KO", dur: "0:31", views: "3.8M", pos: "object-right", live: false },
  { title: "Weigh-ins & actuator calibration", dur: "LIVE", views: "18K", pos: "object-top", live: true },
];

function useCountdown(target: Date) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target.getTime() - (now ?? target.getTime()));
  const s = Math.floor(diff / 1000);
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster />
      <Header />
      <Hero />
      <Matchup />
      <Fighters />
      <Highlights />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-sm border border-border bg-background/70 px-5 py-3 backdrop-blur-xl">
        <a href="#top" className="font-display text-3xl font-bold tracking-wider">URKL<span className="text-primary">.</span></a>
        <div className="hidden gap-8 text-sm font-semibold uppercase tracking-widest text-muted-foreground md:flex">
          {[["Fight Card", "#fight-card"], ["T800 Athletes", "#athletes"], ["Highlights", "#highlights"], ["Venues", "#venues"]].map(([l, h]) => (
            <a key={h} href={h} className="transition-colors hover:text-foreground">{l}</a>
          ))}
        </div>
        <Button variant="fight" asChild><a href="#tickets">Buy Tickets</a></Button>
      </nav>
    </header>
  );
}

function Hero() {
  const c = useCountdown(EVENT_DATE);
  const [zone, setZone] = useState("vip");
  const [qty, setQty] = useState(2);
  const z = zones.find((x) => x.id === zone)!;
  return (
    <section id="top" className="relative overflow-hidden bg-arena pt-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 lg:grid-cols-2">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-sm bg-primary px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-primary-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-foreground" /> URKL 08 · On Sale Now
          </div>
          <h1 className="font-display text-7xl font-bold uppercase md:text-8xl xl:text-9xl">
            Real Humanoid<br /><span className="text-primary">Combat</span> League
          </h1>
          <div className="mt-6 flex flex-wrap gap-5 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> Sat, Dec 12 · 8PM ET</span>
            <span id="venues" className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Barclays Center, Brooklyn NY</span>
          </div>
          <div className="mt-6 flex gap-3">
            {([["Days", c.d], ["Hrs", c.h], ["Min", c.m], ["Sec", c.s]] as const).map(([l, v]) => (
              <div key={l} className="w-20 border border-border bg-card py-2 text-center">
                <div className="font-display text-4xl font-bold tabular-nums">{String(v).padStart(2, "0")}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>

          <div id="tickets" className="mt-8 max-w-xl scroll-mt-28 border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold uppercase">Quick Ticket Selector</h2>
              <Ticket className="h-5 w-5 text-primary" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {zones.map((x) => (
                <button key={x.id} onClick={() => setZone(x.id)}
                  className={`border p-3 text-left transition-colors ${zone === x.id ? "border-accent bg-red-dark/40" : "border-border hover:border-muted-foreground"}`}>
                  <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{x.name}</div>
                  <div className="font-display text-3xl font-bold">${x.price}</div>
                </button>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
              <span>{z.note}</span>
              <div className="flex items-center gap-2">
                <button className="h-8 w-8 border border-border hover:border-foreground" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                <span className="w-6 text-center font-bold text-foreground">{qty}</span>
                <button className="h-8 w-8 border border-border hover:border-foreground" onClick={() => setQty(Math.min(8, qty + 1))}>+</button>
              </div>
            </div>
            <Button variant="fight" size="xl" className="mt-4 w-full justify-between"
              onClick={() => toast.success(`${qty} × ${z.name} reserved`, { description: "Complete checkout within 10 minutes." })}>
              <span>Get Tickets Now</span><span>${(z.price * qty).toLocaleString()}</span>
            </Button>
          </div>
        </div>

        <div className="relative">
          <img src={hero} alt="White matte T800 humanoid robot in MMA guard stance inside the octagon" width={1024} height={1280}
            className="aspect-[4/5] w-full object-cover" />
          <div className="absolute inset-0 bg-fade" />
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-primary">Champion</div>
              <div className="font-display text-5xl font-bold uppercase">White Eagle</div>
            </div>
            <div className="text-right text-sm font-semibold uppercase tracking-wider text-muted-foreground">T800-WE01<br />14-1-0</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bar({ a, b, label, unit }: { a: number; b: number; label: string; unit: string }) {
  const max = Math.max(a, b);
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
      <div className="flex items-center gap-3">
        <span className="w-16 font-display text-2xl font-bold">{a}<span className="text-sm text-muted-foreground"> {unit}</span></span>
        <div className="flex h-1.5 flex-1 justify-end bg-muted"><div className="bg-primary" style={{ width: `${(a / max) * 100}%` }} /></div>
      </div>
      <span className="w-32 text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</span>
      <div className="flex items-center gap-3">
        <div className="h-1.5 flex-1 bg-muted"><div className="h-full bg-platinum" style={{ width: `${(b / max) * 100}%` }} /></div>
        <span className="w-16 text-right font-display text-2xl font-bold">{b}<span className="text-sm text-muted-foreground"> {unit}</span></span>
      </div>
    </div>
  );
}

function Matchup() {
  const [a, b] = fighters;
  return (
    <section id="fight-card" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20">
      <SectionTitle eyebrow="Main Event · 5 Rounds" title="Fight Card" />
      <div className="overflow-hidden border border-border bg-card bg-fight">
        <div className="grid items-center gap-6 p-6 md:grid-cols-[1fr_auto_1fr]">
          <FighterHead f={a} />
          <div className="font-display text-6xl font-bold text-primary">VS</div>
          <FighterHead f={b} right />
        </div>
        <div className="space-y-4 border-t border-border bg-background/40 p-6">
          <Bar a={a.weight} b={b.weight} label="Weight" unit="kg" />
          <Bar a={a.torque} b={b.torque} label="Actuator Torque" unit="Nm" />
          <Bar a={a.velocity} b={b.velocity} label="Strike Velocity" unit="m/s" />
          <Bar a={a.kos} b={b.kos} label="KO Record" unit="KO" />
        </div>
      </div>
    </section>
  );
}

function FighterHead({ f, right }: { f: (typeof fighters)[number]; right?: boolean }) {
  return (
    <div className={`flex items-center gap-5 ${right ? "md:flex-row-reverse md:text-right" : ""}`}>
      <img src={f.img} alt={f.name} loading="lazy" width={160} height={200} className="h-36 w-28 object-cover object-top" />
      <div>
        <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{f.unit}</div>
        <div className="font-display text-5xl font-bold uppercase md:text-6xl">{f.name}</div>
        <div className="text-sm font-semibold uppercase tracking-wider text-accent">{f.record} · {f.cls}</div>
      </div>
    </div>
  );
}

function Fighters() {
  return (
    <section id="athletes" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20">
      <SectionTitle eyebrow="EngineAI T800 Platform" title="T800 Athletes" />
      <div className="grid gap-5 md:grid-cols-3">
        {fighters.map((f) => (
          <article key={f.name} className="group border border-border bg-card transition-colors hover:border-accent">
            <div className="relative overflow-hidden">
              <img src={f.img} alt={f.name} loading="lazy" width={896} height={1120} className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute left-3 top-3 rounded-sm bg-accent px-2 py-0.5 text-xs font-bold uppercase tracking-widest text-accent-foreground">{f.cls}</span>
            </div>
            <div className="p-5">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-4xl font-bold uppercase">{f.name}</h3>
                <span className="font-display text-2xl text-muted-foreground">{f.record}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wider">
                <span className="border border-border px-2 py-1 text-platinum">{f.unit}</span>
                <span className="border border-border px-2 py-1 text-platinum">{f.weight} kg</span>
                <span className="border border-border px-2 py-1 text-platinum">{f.torque} Nm</span>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="mt-5 w-full rounded-sm font-bold uppercase tracking-widest"><Activity /> View Telemetry</Button>
                </DialogTrigger>
                <DialogContent className="rounded-sm border-border bg-card">
                  <DialogHeader>
                    <DialogTitle className="font-display text-4xl uppercase">{f.name} <span className="text-muted-foreground">· {f.unit}</span></DialogTitle>
                  </DialogHeader>
                  <dl className="grid grid-cols-2 gap-px bg-border">
                    {[["Weight class", f.cls], ["Fighting style", f.style], ["Mass", `${f.weight} kg`], ["Peak torque", `${f.torque} Nm`], ["Strike velocity", `${f.velocity} m/s`], ["Knockouts", `${f.kos}`], ["Record", f.record], ["Degrees of freedom", "31 DoF"]].map(([k, v]) => (
                      <div key={k} className="bg-card p-3">
                        <dt className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{k}</dt>
                        <dd className="font-display text-2xl font-semibold">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </DialogContent>
              </Dialog>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Highlights() {
  return (
    <section id="highlights" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20">
      <SectionTitle eyebrow="Replays & K.O. Clips" title="Highlights" />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {highlights.map((h, i) => (
          <button key={h.title} className={`group text-left ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
            onClick={() => toast("Streaming starts soon", { description: h.title })}>
            <div className="relative overflow-hidden border border-border bg-card">
              <img src={ko} alt={h.title} loading="lazy" width={1280} height={720} className={`aspect-video w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100 ${h.pos}`} />
              <div className="absolute inset-0 grid place-items-center">
                <span className={`grid place-items-center rounded-full bg-primary text-primary-foreground shadow-red transition-transform group-hover:scale-110 ${i === 0 ? "h-20 w-20" : "h-12 w-12"}`}>
                  <Play className="ml-1 fill-current" />
                </span>
              </div>
              <span className={`absolute bottom-2 right-2 rounded-sm px-1.5 py-0.5 text-xs font-bold ${h.live ? "bg-primary text-primary-foreground" : "bg-background/80"}`}>{h.dur}</span>
            </div>
            <h3 className={`mt-3 font-display font-semibold uppercase ${i === 0 ? "text-4xl" : "text-2xl"}`}>{h.title}</h3>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground"><Eye className="h-3.5 w-3.5" /> {h.views} views</p>
          </button>
        ))}
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-8 flex items-end justify-between border-b border-border pb-4">
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">{eyebrow}</div>
        <h2 className="font-display text-6xl font-bold uppercase">{title}</h2>
      </div>
    </div>
  );
}

function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2">
        <div>
          <div className="font-display text-5xl font-bold">URKL<span className="text-primary">.</span></div>
          <p className="mt-2 max-w-sm text-muted-foreground">Ultimate Robot Knock-out Legend. Real humanoid engineering. Real knockouts.</p>
          <div className="mt-5 flex gap-3">
            {[Instagram, Youtube, Twitter].map((I, i) => (
              <a key={i} href="#" aria-label="Social" className="grid h-10 w-10 place-items-center border border-border transition-colors hover:border-accent hover:text-primary"><I className="h-4 w-4" /></a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-display text-3xl font-semibold uppercase">Get Fight Alerts</h3>
          <p className="text-sm text-muted-foreground">Presale codes, weigh-in streams and K.O. clips first.</p>
          <form className="mt-4 flex gap-2" onSubmit={(e) => { e.preventDefault(); if (/\S+@\S+\.\S+/.test(email)) { setDone(true); setEmail(""); } else toast.error("Enter a valid email"); }}>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="h-12 rounded-sm bg-background" />
            <Button variant="fight" className="h-12 px-6">{done ? <Check /> : "Subscribe"}</Button>
          </form>
          {done && <p className="mt-2 text-sm text-primary">You're on the list.</p>}
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 py-6">
          <div className="flex flex-wrap gap-8 font-display text-2xl uppercase tracking-widest text-muted-foreground/60">
            {["EngineAI", "Servotek", "Kinetik", "ArenaOne", "Voltra"].map((s) => <span key={s}>{s}</span>)}
          </div>
          <p className="text-xs text-muted-foreground">© 2026 URKL. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
