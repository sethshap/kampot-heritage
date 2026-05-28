# Design Brief

## Direction

Kampot Heritage Impact Network — a warm, community-focused Cambodian social enterprise platform selling artisanal liquid soap with champion-driven sales and transparent financial impact.

## Tone

Organic editorial aesthetic with professional trustworthiness: warm terracotta earth tones, cream backgrounds, natural sage green accents. Community-centered yet financially rigorous.

## Differentiation

Bold impact typography with dual currency display (Riel primary in large font, USD secondary in parentheses) and hero champion gallery — visual hierarchy emphasizes human stories and economic data equally.

## Color Palette

| Token | OKLCH | Role |
| --- | --- | --- |
| background | 0.96 0.012 75 | warm cream, light mode primary |
| foreground | 0.18 0.03 50 | deep warm brown |
| card | 0.98 0.01 75 | softest cream, card surfaces |
| primary | 0.48 0.13 35 | deep terracotta/amber, buttons & impact headers |
| accent | 0.52 0.1 155 | natural sage green, highlights & secondary CTAs |
| muted | 0.92 0.015 75 | light cream, disabled/secondary states |

## Typography

- Display: Lora — warm serif for hero headlines, section headings, and community names
- Body: DM Sans — clean, professional sans-serif for UI labels, product descriptions, and body copy
- Scale: hero 5xl-7xl bold tracking-tight, h2 3xl-5xl bold tracking-tight, label text-sm uppercase tracking-widest, body text-base

## Elevation & Depth

Subtle warm shadows (0.08 opacity on elevated surfaces) create visual separation without harshness. Cards float on cream background with 8px border-radius; section zones alternate between card and muted backgrounds.

## Structural Zones

| Zone | Background | Border | Notes |
| --- | --- | --- | --- |
| Header | card (0.98) | bottom border, subtle | bilingual logo, language switcher |
| Hero | background (0.96) | — | full-width cream with impact stats and gradient text |
| Content sections | alternate card/background | — | champion gallery, product cards, mission statement |
| Footer | muted/40 (0.92) | top border, subtle | community tagline, CTAs |

## Spacing & Rhythm

Spacious density (6-8 section gaps, 4-6 internal padding): content breathes. Section labels text-sm uppercase tracking-widest. Champion cards grid with 1.5rem gaps, 1rem internal padding.

## Component Patterns

- Buttons: terracotta primary (primary), sage accent (secondary), rounded 8px, bold sans-serif, shadow on hover
- Cards: cream (0.98) background, subtle warm shadow, 8px radius, warm border on hover
- Badge: sage green accent background, small caps, text-xs
- Impact stat: display font, 4xl-6xl, terracotta primary, tracking-tighter for currency amounts

## Motion

- Entrance: fade-in 0.3s ease-out on section scroll, stagger cards by 50ms
- Hover: scale 1.02 + shadow-elevated 0.2s ease-out on cards and buttons
- Decorative: none (anti-pattern: no bouncing, no gradients, no gratuitous animation)

## Constraints

- Always display Riel (KHR) in larger font than USD; USD in smaller parentheses
- No generic defaults (no safe blue, no purple gradients, no uniform rounded-lg)
- All colors expressed as OKLCH L C H values only; never hex or rgb()
- Khmer script font fallback support through system font stack
- Mobile-first responsive: sm: md: lg: breakpoints, touch-friendly hit targets (44px minimum)

## Signature Detail

Dual-currency display with Riel prominent and USD contextual — visual metaphor for economic empowerment and local value circulation through the Cambodian champion network.
