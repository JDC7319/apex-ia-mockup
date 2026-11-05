import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const nav = [
  { label: "Athletes", to: "/athletes" as const },
  { label: "Fight Card", to: "/" as const, hash: "fight-card" },
  { label: "Highlights", to: "/" as const, hash: "highlights" },
  { label: "Events & Tickets", to: "/events" as const },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-sm border border-border bg-background/70 px-5 py-2.5 backdrop-blur-xl">
        <Link to="/" className="leading-none">
          <div className="text-[9px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">Presented by Monster's Cinema</div>
          <div className="font-display text-3xl font-bold tracking-wider">APEX<span className="text-primary">.</span></div>
        </Link>
        <div className="hidden gap-8 text-sm font-semibold uppercase tracking-widest text-muted-foreground md:flex">
          {nav.map((n) => (
            <Link key={n.label} to={n.to} hash={n.hash} className="transition-colors hover:text-foreground"
              activeProps={n.hash ? undefined : { className: "text-foreground" }}>{n.label}</Link>
          ))}
        </div>
        <Button variant="fight" asChild><Link to="/events">Buy Tickets</Link></Button>
      </nav>
    </header>
  );
}
