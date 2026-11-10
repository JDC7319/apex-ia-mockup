# Prompt Engineering — APEX Kombat

## Descripción

Este documento recopila los tres prompts utilizados durante el desarrollo de **APEX Kombat**, un prototipo de plataforma web de combates entre robots humanoides, generado mediante [Lovable](https://lovable.dev/).

El proyecto fue desarrollado como parte del reto de Prompt Engineering de RIWI.

## Objetivo

Utilizar instrucciones estructuradas en lenguaje natural para generar una aplicación web, definir su identidad visual, incorporar funcionalidades y mejorar progresivamente los resultados mediante iteraciones.

## Herramientas y tecnologías

- **Lovable:** generación de la aplicación mediante IA.
- **React y Tailwind CSS:** tecnologías solicitadas en el prompt inicial.
- **Lucide Icons y componentes inspirados en shadcn/ui:** elementos de interfaz.
- **CoinGecko:** consulta de cotizaciones de criptomonedas para una simulación de compra.
- **GitHub:** almacenamiento y seguimiento del código generado.

---

## Prompt 1 — Creación de la landing page

**Fecha:** 5 de noviembre de 2026.

**Objetivo:** generar la primera versión de la plataforma, inicialmente denominada URKL.

### Prompt original

```text
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
```

### Resultado de la primera iteración

Lovable generó la landing page inicial con navegación, presentación del evento, cuenta regresiva, comparación de luchadores, tarjetas interactivas y sección de highlights.

Algunas funcionalidades eran demostrativas y los datos de eventos y luchadores eran ficticios.

---

## Prompt 2 — Identidad APEX y nuevas páginas

**Fecha:** 5 de noviembre de 2026.

**Objetivo:** establecer la identidad APEX, reorganizar la página principal e incorporar nuevas páginas.

### Prompt original

```text
Update the current landing page project with the following changes, branding, routing, and new subpages:

1. BRANDING & HEADER UPDATES:

- Change the main brand logo to "APEX".

- Swap navigation menu items order to: 1. "Athletes" (T800 roster), 2. "Fight Card", 3. "Highlights", 4. "Events & Tickets".

- Add a subtle sponsor presenting line right above or next to the APEX logo: "Presented by Monster's Cinema".

- Keep the primary CTA button in #E5383B as "BUY TICKETS".

2. INDEX / HOME PAGE UPDATES:

- Reorder Sections: Position the T800 Athletes section BEFORE the Fight Card section on the main page.

- Presenting Sponsor Highlight: In the Hero Section, include a sleek badge reading "OFFICIAL HOST & PRESENTING SPONSOR: MONSTER'S CINEMA DRIVER-IN ARENA".

- Official Partners Grid: Right above the footer, add a minimalist, industrial-style Sponsors Section. Feature "Monster's Cinema" as the main headline/headline logo (Socio Titular), accompanied by a grid of fictive tech/hardware/sports brand logos in muted platinum/gray tones (#B1A7A6) that highlight on hover.

3. SUBPAGES & ROUTING (Set up internal React Router):

Create and connect the following 2 dedicated subpages from the main navigation:

- Athletes Subpage (/athletes):

  * Dedicated roster page for the T800 'White Eagle' and its variant combat models.

  * Interactive technical telemetry cards: Weight (kg), Joint Torque (Nm), Actuator Type, KO Record, and engineering blueprints.

- Events & Ticket Office Subpage (/events):

  * Full calendar list of upcoming APEX combat events.

  * Interactive venue selector (including special screenings at Monster's Drive-In Cinema).

  * Ticket tier options (Ringside, Drive-In VIP Box, General Admission) with direct checkout triggers.
```

### Resultado de la segunda iteración

Se reportó la incorporación de la identidad APEX, la reorganización de secciones y la creación de las páginas de atletas y eventos.

Lovable también reportó la corrección de un error relacionado con la actualización de la vista previa.

---

## Prompt 3 — Eventos y simulación de compra con criptomonedas

**Fecha:** 6 de noviembre de 2026.

**Objetivo:** mejorar la presentación de eventos e incorporar una experiencia interactiva de compra simulada.

### Prompt original

```text
Update the /events page with a high-impact, professional sports broadcast design (UFC/DAZN industrial aesthetic).

Arena Showcase Section:

Add a background hero card featuring an industrial MMA Octagon arena illuminated by intense top-down spotlights over a dark background (#0B090A).

Add venue details: "APEX Arena 01 - Monster's Cinema Drive-In Grounds", seating capacity, and interactive venue map toggle (Ringside, VIP, General Access).

Crypto Ticket Checkout Modal:

Under each ticket tier (e.g., Ringside $150 USD, VIP $100 USD), add a primary action button: "Pay with Crypto (Live CoinGecko FX)".

Integrate a dark-themed modal popup displaying real-time BTC/ETH price calculations, a mock wallet connection step (MetaMask / Phantom), a simulated QR payment deposit address, and a confirmation trigger generating a digital pass with a QR ticket.
```

### Resultado de la tercera iteración

Lovable reportó la implementación de:

- Una sección de arena de combate.
- Un selector de localidades.
- Categorías de entradas con precios ficticios.
- Consulta de cotizaciones de BTC y ETH mediante CoinGecko.
- Un flujo simulado de conexión de billetera.
- Generación de un pase digital con código QR.

Según el registro de Lovable, se completó una prueba del flujo simulado de compra en la vista previa.

---

## Conclusión

El proyecto evolucionó mediante tres iteraciones principales:

1. **Generación:** construcción de la landing page inicial.
2. **Refinamiento:** actualización de identidad visual y ampliación de páginas.
3. **Funcionalidad:** incorporación de una experiencia interactiva de compra simulada.

Este proceso permitió aplicar Prompt Engineering para transformar una idea inicial en un prototipo web más completo, mediante instrucciones específicas, evaluación de resultados y mejoras progresivas.

**Nota:** APEX es un prototipo académico. Los eventos, patrocinadores, estadísticas y procesos de pago son demostrativos.

Para conocer la evolución del proyecto, consultar [Proceso de desarrollo](./proceso.md).