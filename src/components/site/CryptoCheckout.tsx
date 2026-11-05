import { useEffect, useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Bitcoin, Wallet, CheckCircle2, Copy, RefreshCw, Ticket } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Coin = "BTC" | "ETH";
type Step = "quote" | "wallet" | "deposit" | "pass";
const ADDR: Record<Coin, string> = {
  BTC: "bc1qapx8x4r9demo0n1y7kq0w5u2cinema3drive0in8",
  ETH: "0xA9E1c0DeM0n5t3r5C1n3maApexArena01Demo7f2B",
};

export function CryptoCheckout({ open, onOpenChange, tier, price, qty, venue, event }: {
  open: boolean; onOpenChange: (o: boolean) => void; tier: string; price: number; qty: number; venue: string; event: string;
}) {
  const [rates, setRates] = useState<{ BTC: number; ETH: number } | null>(null);
  const [updated, setUpdated] = useState<Date | null>(null);
  const [err, setErr] = useState(false);
  const [coin, setCoin] = useState<Coin>("ETH");
  const [step, setStep] = useState<Step>("quote");
  const [wallet, setWallet] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const total = price * qty;

  const load = async () => {
    try {
      setErr(false);
      const r = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd");
      const j = await r.json();
      setRates({ BTC: j.bitcoin.usd, ETH: j.ethereum.usd });
      setUpdated(new Date());
    } catch { setErr(true); }
  };
  useEffect(() => {
    if (!open) return;
    setStep("quote"); setWallet(null); load();
    const id = setInterval(load, 30000);
    return () => clearInterval(id);
  }, [open]);

  const amount = useMemo(() => (rates ? total / rates[coin] : 0), [rates, coin, total]);
  const amt = amount.toFixed(coin === "BTC" ? 6 : 5);
  const ticketId = useMemo(() => `APX-${Math.random().toString(36).slice(2, 8).toUpperCase()}`, [open]);

  const connect = (w: string) => { setBusy(true); setTimeout(() => { setWallet(w); setBusy(false); setStep("deposit"); }, 1200); };
  const confirm = () => { setBusy(true); setTimeout(() => { setBusy(false); setStep("pass"); }, 1800); };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-border bg-background">
        <DialogHeader>
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">Crypto Checkout · Live CoinGecko FX</div>
          <DialogTitle className="font-display text-4xl font-bold uppercase">{step === "pass" ? "Your Digital Pass" : `${qty} × ${tier}`}</DialogTitle>
          <DialogDescription>{event} — {venue}</DialogDescription>
        </DialogHeader>

        <div className="flex gap-1">
          {(["quote", "wallet", "deposit", "pass"] as Step[]).map((s, i) => (
            <div key={s} className={`h-1 flex-1 ${["quote", "wallet", "deposit", "pass"].indexOf(step) >= i ? "bg-primary" : "bg-muted"}`} />
          ))}
        </div>

        {step === "quote" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {(["BTC", "ETH"] as Coin[]).map((c) => (
                <button key={c} onClick={() => setCoin(c)} className={`border p-3 text-left ${coin === c ? "border-accent bg-red-dark/40" : "border-border hover:border-muted-foreground"}`}>
                  <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{c}/USD</div>
                  <div className="font-display text-2xl font-bold">{rates ? `$${rates[c].toLocaleString()}` : "…"}</div>
                </button>
              ))}
            </div>
            <div className="border border-border bg-card p-4">
              <div className="flex justify-between text-sm text-muted-foreground"><span>Subtotal</span><span>${total.toLocaleString()} USD</span></div>
              <div className="mt-2 flex items-end justify-between">
                <span className="text-xs font-bold uppercase tracking-widest">You pay</span>
                <span className="font-display text-4xl font-bold text-primary">{rates ? amt : "—"} {coin}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>{err ? "Couldn't reach CoinGecko — retry" : updated ? `Rate updated ${updated.toLocaleTimeString()} · refreshes every 30s` : "Fetching live rate…"}</span>
                <button onClick={load} aria-label="Refresh rate"><RefreshCw className="h-3.5 w-3.5" /></button>
              </div>
            </div>
            <Button variant="fight" size="lg" className="w-full" disabled={!rates} onClick={() => setStep("wallet")}>Continue to Wallet</Button>
          </div>
        )}

        {step === "wallet" && (
          <div className="space-y-2">
            {["MetaMask", "Phantom"].map((w) => (
              <button key={w} disabled={busy} onClick={() => connect(w)} className="flex w-full items-center gap-3 border border-border p-4 text-left hover:border-accent disabled:opacity-50">
                <Wallet className="h-5 w-5 text-primary" />
                <span className="flex-1 font-bold uppercase tracking-wider">{w}</span>
                <span className="text-xs text-muted-foreground">{busy ? "Connecting…" : w === "Phantom" ? "Solana / ETH" : "EVM"}</span>
              </button>
            ))}
            <p className="pt-2 text-xs text-muted-foreground">Demo mode — no real wallet is accessed.</p>
          </div>
        )}

        {step === "deposit" && (
          <div className="space-y-4">
            <div className="text-xs text-muted-foreground">Connected: <span className="font-bold text-foreground">{wallet}</span></div>
            <div className="flex gap-4">
              <div className="bg-platinum p-2"><QRCodeSVG value={`${coin === "BTC" ? "bitcoin" : "ethereum"}:${ADDR[coin]}?amount=${amt}`} size={128} /></div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Send exactly</div>
                <div className="font-display text-3xl font-bold text-primary">{amt} {coin}</div>
                <div className="mt-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">To address</div>
                <button onClick={() => { navigator.clipboard?.writeText(ADDR[coin]); toast("Address copied"); }} className="flex w-full items-center gap-1 break-all text-left font-mono text-[11px]">
                  {ADDR[coin]} <Copy className="h-3 w-3 shrink-0" />
                </button>
              </div>
            </div>
            <Button variant="fight" size="lg" className="w-full" disabled={busy} onClick={confirm}>{busy ? "Verifying on-chain…" : "I've Sent the Payment"}</Button>
          </div>
        )}

        {step === "pass" && (
          <div className="overflow-hidden border border-accent bg-card">
            <div className="bg-fight flex items-center justify-between border-b border-border px-4 py-2">
              <span className="font-display text-3xl font-bold">APEX</span>
              <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-primary"><CheckCircle2 className="h-4 w-4" />Confirmed</span>
            </div>
            <div className="flex gap-4 p-4">
              <div className="bg-platinum p-2"><QRCodeSVG value={`APEX-PASS|${ticketId}|${event}|${venue}|${tier}x${qty}`} size={112} /></div>
              <div className="space-y-1 text-sm">
                <div className="font-display text-2xl font-bold uppercase leading-none">{event}</div>
                <div className="text-muted-foreground">{venue}</div>
                <div className="flex items-center gap-1 font-bold uppercase"><Ticket className="h-4 w-4 text-primary" />{qty} × {tier}</div>
                <div className="font-mono text-xs">{ticketId}</div>
                <div className="text-xs text-muted-foreground">Paid {amt} {coin}</div>
              </div>
            </div>
          </div>
        )}
        {step === "pass" && <Button variant="outline" onClick={() => onOpenChange(false)}>Done</Button>}
        <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground"><Bitcoin className="h-3 w-3" />Simulated payment · demo only</div>
      </DialogContent>
    </Dialog>
  );
}
