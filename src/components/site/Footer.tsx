import { useState } from "react";
import { Instagram, Youtube, Twitter, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { partners } from "./data";

export function Sponsors() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Socio Titular · Official Partners</div>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-8">
          <div className="font-display text-6xl font-bold uppercase md:text-7xl">Monster's Cinema</div>
          <div className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Official Host & Presenting Sponsor</div>
        </div>
        <div className="grid grid-cols-2 gap-px bg-border md:grid-cols-4">
          {partners.map((p) => (
            <div key={p} className="grid h-24 place-items-center bg-background font-display text-2xl uppercase tracking-widest text-platinum/60 transition-colors hover:text-foreground">{p}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2">
        <div>
          <div className="font-display text-5xl font-bold">APEX<span className="text-primary">.</span></div>
          <p className="mt-2 max-w-sm text-muted-foreground">Real humanoid engineering. Real knockouts. Presented by Monster's Cinema.</p>
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
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-muted-foreground">© 2026 APEX Combat League. All rights reserved.</p>
      </div>
    </footer>
  );
}
