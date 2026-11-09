# T800 Arena Showdown

Create a high-impact, minimalist sports landing page for a real humanoid robot MMA fighting league, inspired by URKL (Ultimate Robot Knock-out Legend) and the EngineAI T800 'White Eagle' combat robots. The primary goal of the landing page is event ticket sales and video highlights streaming.

1. TECH STACK & DESIGN SYSTEM:

- Framework: React, Tailwind CSS, Lucide Icons, UI components inspired by shadcn/ui.

- Aesthetics: Clean, high-tech sports journalism (like UFC or DAZN). NO sci-fi/arcade elements, no holograms, no neon lasers. Real-world robotics engineering (white matte shells, exposed metallic actuators, arena lights).

- Custom Color Palette (Tailwind Custom Config):

  * bg-main: #0B090A (Deep black arena background)

  * bg-card: #161A1D (Dark industrial panel gray)

  * red-primary: #E5383B (Bright action red for primary CTAs and LIVE tags)

  * red-accent: #BA181B / #A4161A (Active borders & secondary badges)

  * red-dark: #660708 (Subtle gradients on fight cards)

  * text-muted: #B1A7A6 / #D3D3D3 (Platinum gray for technical specs & subheadings)

  * text-light: #F5F3F4 / #FFFFFF (Pure white for main titles and robot panels)

- Typography: Use condensed bold sans-serif headers (like Teko/Impact style) and clean technical sans-serif for specs (Rajdhani/Inter style).

2. CORE PAGE SECTIONS:

- HEADER:

  * Floating, dark translucent navbar with backdrop-blur.

  * Left: League logo ("URKL" or "ROBO-COMBAT").

  * Center: Links for "Fight Card", "T800 Athletes", "Highlights", "Venues".

  * Right: Prominent "BUY TICKETS" button in #E5383B with hover effect.

- HERO SECTION (Ticket Sales Focused):

  * Background: Dark arena environment (#0B090A) with dramatic overhead stadium lighting.

  * Left Column: Bold header ("REAL HUMANOID COMBAT LEAGUE"), event countdown timer (Live event date & venue location), and an interactive "Quick Ticket Selector" widget inside a #161A1D container with zone choices (Ringside, VIP, General), pricing, and a primary CTA "Get Tickets Now" (#E5383B).

  * Right Column: High-resolution realistic photo of a white matte humanoid robot (EngineAI T800 style) in a striking MMA guard posture inside an octagon ring.

- MATCHUP CARD (Main Event):

  * A horizontal fight preview module comparing two T800 humanoid units (e.g., White Eagle vs. Steel Titan).

  * Show telemetry & stats (Weight in kg, Actuator Torque in Nm, Strike Velocity, KO Record) with minimalist progress bars.

- FIGHTERS GRID (T800 EngineAI Variants):

  * 3-card grid featuring fighter profiles. Cards styled in #161A1D with subtle #BA181B borders on hover.

  * Technical specs badge, weight class, and "View Telemetry" modal trigger.

- VIDEO HIGHLIGHTS / REPLAYS (DAZN Style Grid):

  * Video grid showcasing recent K.O. clips and fight teasers.

  * Dark cards with play button overlay in #E5383B, duration timestamps, and view counters.

- FOOTER:

  * Clean, dark footer with newsletter signup for fight alerts, sponsor logos, and social media links.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a286e7db-8585-53cc-b224-b39d41a4f76f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
