import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageTitle } from "@/components/site/Layout";
import { fighters } from "@/components/site/data";

export const Route = createFileRoute("/athletes")({
  head: () => ({
    meta: [
      { title: "T800 Athletes Roster — APEX Combat League" },
      { name: "description", content: "Meet the T800 White Eagle and its combat variants: weight, joint torque, actuator type, KO record and blueprints." },
      { property: "og:title", content: "T800 Athletes Roster — APEX" },
      { property: "og:description", content: "Technical telemetry for every T800 combat robot in the APEX league." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Athletes,
});

function Athletes() {
  const [sel, setSel] = useState(0);
  const f = fighters[sel]!;
  const stats: [string, string][] = [["Weight", `${f.weight} kg`], ["Joint Torque", `${f.torque} Nm`], ["Actuator Type", f.actuator], ["KO Record", `${f.kos} KO · ${f.record}`], ["Strike Velocity", `${f.velocity} m/s`], ["Degrees of Freedom", `${f.dof} DoF`]];
  return (
    <SiteLayout>
      <PageTitle eyebrow="EngineAI T800 Platform" title="Athletes" sub="The T800 'White Eagle' and its combat variants. Select a unit to inspect live telemetry and engineering blueprints." />
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 flex flex-wrap gap-2">
          {fighters.map((x, i) => (
            <button key={x.unit} onClick={() => setSel(i)}
              className={`border px-4 py-2 text-sm font-bold uppercase tracking-widest transition-colors ${i === sel ? "border-accent bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>{x.name}</button>
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
          <div className="relative border border-border bg-card">
            <img src={f.img} alt={f.name} width={896} height={1120} className="aspect-[4/5] w-full object-cover" />
            <div className="absolute inset-0 bg-fade" />
            <div className="absolute bottom-5 left-5">
              <div className="text-xs font-bold uppercase tracking-widest text-primary">{f.unit} · {f.cls}</div>
              <div className="font-display text-6xl font-bold uppercase">{f.name}</div>
            </div>
          </div>
          <div className="space-y-6">
            <dl className="grid grid-cols-2 gap-px bg-border md:grid-cols-3">
              {stats.map(([k, v]) => (
                <div key={k} className="bg-card p-4 transition-colors hover:bg-secondary">
                  <dt className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{k}</dt>
                  <dd className="mt-1 font-display text-2xl font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
            <Blueprint f={f} />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Blueprint({ f }: { f: (typeof fighters)[number] }) {
  const joints = [[100, 40, "Head · Vision"], [100, 95, `Torso · ${f.dof} DoF`], [55, 110, "Shoulder"], [145, 110, "Shoulder"], [80, 175, "Hip"], [120, 175, "Hip"], [78, 240, `Knee · ${f.torque} Nm`], [122, 240, "Knee"]] as const;
  return (
    <div className="border border-border bg-background p-4">
      <div className="mb-2 flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground"><span>Engineering Blueprint</span><span>{f.unit}</span></div>
      <svg viewBox="0 0 400 300" className="w-full text-platinum">
        <defs><pattern id="g" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="currentColor" strokeOpacity=".08" /></pattern></defs>
        <rect width="400" height="300" fill="url(#g)" />
        <g fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="100" cy="40" r="18" /><rect x="72" y="62" width="56" height="95" rx="6" />
          <path d="M72 75 L40 140 L35 190 M128 75 L160 140 L165 190 M85 157 L78 240 L75 285 M115 157 L122 240 L125 285" />
        </g>
        {joints.map(([x, y, l], i) => (
          <g key={i} className="text-primary">
            <circle cx={x} cy={y} r="4" fill="currentColor" />
            {i % 2 === 0 && <><line x1={x} y1={y} x2={230} y2={y} stroke="currentColor" strokeOpacity=".5" strokeDasharray="3 3" /><text x={236} y={y + 4} fill="currentColor" className="text-platinum" fontSize="11" style={{ fill: "var(--color-platinum, currentColor)" }}>{l}</text></>}
          </g>
        ))}
      </svg>
    </div>
  );
}
