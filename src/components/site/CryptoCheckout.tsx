import { useEffect, useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Check, Copy, Loader2, RefreshCw, Wallet } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Coin = "BTC" | "ETH";
type Props = { open: boolean; onOpenChange: (o: boolean) => void; tier: string; usd: number; qty: number; venue: string; event: string };

const FALLBACK = { BTC: 98000, ETH: 3500 };
const ADDR = { BTC: "bc1qapex8w3k7l0x9sp4n2mz6vqf5h8r3c2d7t0yz", ETH: "0xA9E8c3F1b27D4e60a5C1F0d9B3e7a2C4D8f61E07" };

export function CryptoCheckout({ open, onOpenChange, tier, usd, qty, venue, event }: Props) {
  const [prices, setPrices] = useState(FALLBACK);
  const [live, setLive] = useState(false);
  const [updated, setUpdated] = useState<Date | null>(null);
  const [coin, setCoin] = useState<Coin>("BTC");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [wallet, setWallet] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const total = usd * qty;

  const load = async () => {
    try {
      const r = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd");
      const j = await r.json();
      setPrices({ BTC: j.bitcoin.usd, ETH: j.ethereum.usd });
      setLive(true);
    } catch { setLive(false); }
    setUpdated(new Date());
  };
  useEffect(() => {
    if (!open) return;
    setStep(1); setWallet(null); load();
    const id = setInterval(load, 30000);
    return () => clearInterval(id);
  }, [open]);

  const amount = (total / prices[coin]).toFixed(coin === "BTC" ? 6 : 5);
  const passId = useMemo(() => `APEX-${Math.random().toString(36).slice(2, 8).toUpperCase()}`, [step === 3]);

  const connect = (name: string) => { setBusy(true); setTimeout(() => { setWallet(name); setBusy(false); setStep(2); }, 900); };
  const confirm = () => { setBusy(true); setTimeout(() => { setBusy(false); setStep(3); }, 1400); };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto border-border bg-background sm:max-w-lg">
        <DialogHeader>
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Crypto Checkout · Step {step}/3</div>
          <DialogTitle className="font-display text-4xl font-bold uppercase">{qty} × {tier}</DialogTitle>
          <DialogDescription>{event} — {venue}</DialogDescription>
        </DialogHeader>

        <div className="border border-border bg-card p-4">
          <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
            <span className="flex items-center gap-2"><span className={`h-2 w-2 rounded-full ${live ? "bg-primary animate-pulse" : "bg-muted-foreground"}`} />{live ? "Live CoinGecko FX" : "Offline estimate"}</span>
            <button onClick={load} className="flex items-center gap-1 hover:text-foreground"><RefreshCw className="h-3 w-3" />{updated?.toLocaleTimeString() ?? "…"}</button>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {(["BTC", "ETH"] as Coin[]).map((c) => (
              <button key={c} disabled={step === 3} onClick={() => setCoin(c)} className={`border p-3 text-left ${coin === c ? "border-accent bg-red-dark/40" : "border-border hover:border-muted-foreground"}`}>
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{c} / USD</div>
                <div className="font-display text-2xl font-bold">${prices[c].toLocaleString()}</div>
              </button>
            ))}
          </div>
          <div className="mt-3 flex items-end justify-between border-t border-border pt-3">
            <span className="text-sm text-muted-foreground">Total ${total.toLocaleString()} USD</span>
            <span className="font-display text-3xl font-bold text-primary">{amount} {coin}</span>
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Connect wallet (demo)</div>
            {["MetaMask", "Phantom"].map((w) => (
              <Button key={w} variant="outline" disabled={busy} onClick={() => connect(w)} className="h-14 w-full justify-between rounded-none border-border text-base uppercase tracking-wider">
                <span className="flex items-center gap-3"><Wallet className="h-5 w-5 text-primary" />{w}</span>
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <span className="text-xs text-muted-foreground">{w === "MetaMask" ? "ETH · BTC bridge" : "SOL · ETH"}</span>}
              </Button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Connected: <span className="text-foreground">{wallet}</span> · Send exactly {amount} {coin}</div>
            <div className="flex gap-4">
              <div className="bg-foreground p-2"><QRCodeSVG value={`${coin === "BTC" ? "bitcoin" : "ethereum"}:${ADDR[coin]}?amount=${amount}`} size={128} /></div>
              <div className="min-w-0 flex-1">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Deposit address</div>
                <div className="mt-1 break-all font-mono text-xs">{ADDR[coin]}</div>
                <button onClick={() => { navigator.clipboard?.writeText(ADDR[coin]); toast("Address copied"); }} className="mt-2 flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-primary"><Copy className="h-3 w-3" />Copy</button>
                <div className="mt-2 text-[10px] uppercase tracking-widest text-muted-foreground">Simulated address — do not send real funds</div>
              </div>
            </div>
            <Button variant="fight" size="xl" className="w-full" disabled={busy} onClick={confirm}>
              {busy ? <><Loader2 className="h-4 w-4 animate-spin" />Confirming on-chain…</> : "I've sent the payment"}
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="border border-accent bg-card">
            <div className="bg-fight flex items-center justify-between border-b border-border p-4">
              <div className="font-display text-4xl font-bold">APEX</div>
              <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-primary"><Check className="h-4 w-4" />Paid</span>
            </div>
            <div className="flex gap-4 p-4">
              <div className="bg-foreground p-2"><QRCodeSVG value={`${passId}|${event}|${tier}|x${qty}`} size={112} /></div>
              <div className="text-sm">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Digital Pass</div>
                <div className="font-mono font-bold">{passId}</div>
                <div className="mt-2 font-semibold">{event}</div>
                <div className="text-muted-foreground">{venue}</div>
                <div className="mt-1 text-primary">{qty} × {tier} · {amount} {coin}</div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
