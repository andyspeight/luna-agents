---
name: travelgenix-email-design
description: World-class email design intelligence for every Travelgenix email. Use this skill BEFORE writing any email HTML, designing any template, or composing any email content for Luna Marketing, transactional flows, B2B newsletters, product launches, or client-branded campaigns. Triggers include any request to build, design, create, style, improve, review, or fix an email template, newsletter, marketing email, transactional email, product launch email, drip campaign, or HTML email of any kind. Also triggers for "make this email better", "design an email", "email template", "newsletter design", "launch email", "elevate this email", "the email looks average", or any feedback about email visual quality. This skill provides the design system, the four email archetypes, the component library, the dial system, and a mandatory pre-delivery checklist. Works alongside travelgenix-design (web brand law), travelgenix-taste (taste dials), and travelgenix-humanizer (copy quality). ALWAYS read this skill first for any email work.
---

# Travelgenix Email Design Intelligence

The design law for every email Travelgenix produces — Luna Marketing campaigns, transactional emails, B2B newsletters, product launches, and client-branded sends.

**Purpose:** Every Travelgenix email should look unmistakably Travelgenix, work in every major email client, drive one clear action, and never feel templated or AI-generated.

**Philosophy:** Email is not web. Constraints are real (600px width, table-based HTML, inline-friendly CSS, Outlook quirks). Working *with* the constraints produces better design than fighting them. The goal is editorial discipline, not visual fireworks.

---

## 0. HOW THIS SKILL WORKS WITH THE STACK

Read order, every time:

1. **`travelgenix-design`** (read first) — brand law for tokens, colours, fonts, accessibility. Anything in that skill overrides this one where they conflict.
2. **`travelgenix-taste`** (read second) — design dials and anti-slop principles.
3. **`travelgenix-humanizer`** (read third) — copy quality. Email copy MUST run through the humaniser before sending.
4. **`travelgenix-email-design`** (this file) — the email-specific design system.

**Conflict rule:** Email design rules in this file override web rules from `travelgenix-design` where they differ. Example: web targets 1440px, email targets 600px. Web uses CSS Grid; email uses tables. Web allows complex animations; email allows hover only.

---

## 1. MANDATORY EMAIL PRINCIPLES

These four rules override everything else. Non-negotiable on every email.

### 1.1 Width: 600px maximum
Email clients clip wider content. The email body sits inside a 600px wrapper. Inner content padding is 24-40px depending on density. Mobile reflows below 640px viewport.

### 1.2 Table-based structure for cross-client safety
The outer wrapper MUST be a `<table>` with `cellpadding="0" cellspacing="0" border="0"`. Modern CSS (flex, grid) can be used inside cells where Outlook compatibility isn't critical (Apple Mail, Gmail, mobile clients all support modern CSS). For broadest compatibility, structure with nested tables.

### 1.3 Light default, dark mode aware
Light mode is the default. Dark mode uses `@media (prefers-color-scheme: dark)` for Apple Mail, iOS Mail, and modern Gmail. For Outlook.com dark mode, use `[data-ogsc]` attribute selectors. Design dark mode deliberately — never let the client auto-invert. Test both modes before shipping.

### 1.4 One primary action per email
Every email has exactly ONE primary CTA, repeated maximum twice (top and bottom). Secondary CTAs use ghost/outline styling, never filled. If the email needs multiple equally-weighted actions, the email is wrong — split it into two emails or a digest with a single landing page CTA.

---

## 2. THE FOUR EMAIL ARCHETYPES

Every Travelgenix email belongs to one of these four archetypes. Pick the archetype FIRST. The archetype determines the design dials, the structure, and the components used.

### Archetype A: B2B Weekly Newsletter
**Reference:** `examples/b2b-weekly.html` (The Travelgenix Weekly)
**Use when:** Recurring weekly/fortnightly editorial dispatch to the Travelgenix subscriber list.
**Dials:** Variance 4 · Motion 2 · Density 6
**Feel:** Stratechery, Morning Brew, The Hustle. Editorial newspaper. Dense with value.
**Structure:** Masthead → TOC → Lead story (with byline) → Two-column secondaries → Industry pulse (data) → Quick wins list → Pull quote → On the radar → Footer
**Required components:** masthead, toc, lead-story, duo-grid, pulse-stats, numbered-list, pull-quote, calendar-grid, footer-light

### Archetype B: Marketing Newsletter
**Reference:** `examples/marketing-newsletter.html` (monthly destination newsletter)
**Use when:** Client-facing monthly newsletter, destination promotion, seasonal campaign.
**Dials:** Variance 6 · Motion 3 · Density 4
**Feel:** Travel magazine. Editorial but commercial. Generous breathing room.
**Structure:** Top bar → Hero (image + overlay) → Three-up destination grid → Feature story → Pull quote → CTA banner → Footer
**Required components:** top-bar, hero-image, destination-card, feature-story, pull-quote, cta-banner, footer-standard

### Archetype C: Product Launch
**Reference:** `examples/product-launch.html` (Luna Chat launch)
**Use when:** New product launch, major feature release, beta access, big announcement.
**Dials:** Variance 7 · Motion 5 · Density 3
**Feel:** Linear, Vercel, Stripe. Tech product launch. Single moment, single action.
**Structure:** Dark hero (mesh gradient) → Product mockup → Feature rows → Stats strip → Single testimonial → Final CTA (dark) → Footer
**Required components:** hero-dark, product-visual, feature-row, stats-strip, testimonial, cta-dark, footer-dark

### Archetype D: Transactional
**Reference:** `examples/transactional.html` (booking confirmation)
**Use when:** System-triggered email confirming an action or providing required information. Booking confirmation, payment receipt, password reset, departure reminder, change of itinerary.
**Dials:** Variance 2 · Motion 1 · Density 5
**Feel:** Stripe receipts. Apple booking confirmations. Airbnb trip details. Calm, scannable, information-first. Read in 8 seconds while standing in an airport queue.
**Structure:** Top bar (with booking ref) → Confirmation block (success icon + name) → Trip card (image header + detail rows + journey block) → Cost summary → Next steps (numbered) → Help block → Footer meta (legal/ATOL/ABTA)
**Required components:** top-bar, confirmation-block, trip-card, cost-summary, next-steps, help-block, footer-meta

**Decision rule:** If the email doesn't fit cleanly into one archetype, it's probably two emails.

---

## 3. THE TRAVELGENIX EMAIL DESIGN SYSTEM

### 3.1 Colour Tokens

Inherit from `travelgenix-design` but with email-specific clarifications:

```css
/* Primary brand */
--tg-primary: #1B2B5B;        /* Navy — masthead, top bars, dark heroes, primary text on dark */
--tg-primary-dark: #0A0F1F;   /* Deep navy — for layered dark heroes (launch archetype) */
--tg-primary-light: #2A3F7A;  /* Mid navy — gradient pairing */

/* Accent */
--tg-accent: #00B4D8;         /* Teal — primary CTA, links, kicker text, accent bars */
--tg-accent-light: #48CAE4;   /* Light teal — kicker text on dark backgrounds, gradient pairing */
--tg-accent-dark: #0096B7;    /* Dark teal — link hover */

/* Neutrals */
--tg-text-primary: #0F172A;   /* Body headlines */
--tg-text-secondary: #475569; /* Body copy */
--tg-text-tertiary: #94A3B8;  /* Meta, captions, dates */
--tg-bg-primary: #FFFFFF;     /* Email background */
--tg-bg-secondary: #F8FAFC;   /* Section background, footer */
--tg-bg-tertiary: #F1F5F9;    /* Card background, dividers */
--tg-border: #E2E8F0;
--tg-border-light: #F1F5F9;

/* Dark mode (prefers-color-scheme: dark) */
--tg-text-primary-dark: #F8FAFC;
--tg-text-secondary-dark: #CBD5E1;
--tg-text-tertiary-dark: #94A3B8;
--tg-bg-primary-dark: #0F172A;
--tg-bg-secondary-dark: #1E293B;
--tg-bg-tertiary-dark: #334155;
```

**Hard rule:** No purple. No pink. No green except for status dots (online/success). No orange except for warnings. The Travelgenix email palette is navy, teal, and neutrals. Full stop.

### 3.2 Typography

Inter only. Always with system fallbacks because email clients strip web fonts.

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

**Type scale for email** (slightly larger than web because email is read further from the eye):

| Token | Size | Weight | Line Height | Use |
|-------|------|--------|-------------|-----|
| `--text-xs` | 11px | 600 | 1.4 | Eyebrow text, kicker, badges, footer meta |
| `--text-sm` | 13px | 400 | 1.5 | Card meta, byline, pull-quote attribution |
| `--text-base` | 15px | 400 | 1.65 | Body copy (lead body, feature excerpts) |
| `--text-md` | 16px | 400 | 1.55 | Hero deck, lede paragraphs |
| `--text-lg` | 18px | 600 | 1.4 | Card titles, feature row headings |
| `--text-xl` | 22px | 700 | 1.25 | Section titles, feature story headlines |
| `--text-2xl` | 26px | 700 | 1.2 | Newsletter section titles, pulse titles |
| `--text-3xl` | 30px | 700 | 1.2 | Lead headlines (B2B weekly), feature titles (marketing) |
| `--text-4xl` | 36px | 700 | 1.15 | Hero headline (marketing newsletter) |
| `--text-5xl` | 52px | 800 | 1.02 | Hero headline (product launch only) |

**Letter-spacing rules:**
- Headlines 22px+: `letter-spacing: -0.025em` (tightens display type)
- Body copy: `letter-spacing: -0.005em` (very subtle tightening)
- Eyebrow/kicker (uppercase): `letter-spacing: 0.1em` to `0.15em`
- Stats/numbers: `letter-spacing: -0.03em` + `font-variant-numeric: tabular-nums`

### 3.3 Spacing

Inherits the 4px grid from `travelgenix-design`. Email-specific spacing rules:

- **Section padding (vertical):** 36-60px depending on archetype. B2B Weekly = 36px (denser), Product Launch = 60px (more breathing).
- **Section padding (horizontal):** 32-40px. Drops to 24px on mobile (≤640px).
- **Component spacing within sections:** 16-24px between blocks.
- **Tight spacing:** 8-12px between tightly related elements (eyebrow → headline → deck).

### 3.4 Radius System

| Use | Radius |
|-----|--------|
| Email outer wrapper | 16-20px (marketing/launch) or 4px (B2B weekly — newspaper feel) |
| Cards | 12px |
| Buttons | 10-12px |
| Image inside content | 8px |
| Icon tiles | 10-12px |
| Avatar / pill badges | 50% / 999px |

**Hard rule:** No more than three radius values in a single email. Pick one for cards, one for buttons, one for badges. Stop.

### 3.5 Shadows

Email shadows must be subtle — heavy shadows look broken in dark mode and clip in some clients.

| Use | Shadow |
|-----|--------|
| Email outer wrapper | `0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(15,23,42,0.06)` |
| Card hover | `0 8px 24px rgba(15,23,42,0.08)` |
| CTA button | `0 4px 12px rgba(0,180,216,0.25)` (teal glow on accent buttons) |
| Product launch hero outer | `0 32px 80px rgba(0,180,216,0.06)` (subtle ambient glow) |

No drop shadows on text. Ever.

---

## 4. THE COMPONENT LIBRARY

These are the reusable blocks. Every email composes from this list. New components are added to this list ONLY when a real gap appears repeatedly across multiple emails.

### Layout Components

**`top-bar`** — Navy bar, logo left, optional meta right (issue number, date). 18px vertical padding.

**`masthead`** — Newspaper-style header. Vol/issue line, large bold title (38-48px), italic tagline. White background, 3px navy bottom border.

**`footer-light`** — White/light grey footer with logo, tagline, social icons, legal meta. Use for marketing and B2B weekly.

**`footer-dark`** — Deep navy footer with white logo. Use for product launch.

**`footer-help`** — Helper-focused footer for transactional. Includes "Need help?" block with support contact.

### Hero Components

**`hero-image`** — Background image with gradient overlay, headline panel below or overlapping. Use for marketing newsletter. Image height 280-320px, panel offset -80px.

**`hero-dark`** — Dark background with mesh gradient glows (radial gradients with blur). Large bold headline (52px), italic gradient-filled accent word, deck, two CTAs (primary + ghost). Use for product launch only.

**`hero-text-only`** — No image. Eyebrow + headline + deck + single CTA. Use for transactional confirmations and minimal launches.

### Content Components

**`lead-story`** — B2B weekly lead. Kicker (with leading dash) → headline → deck → image → byline (avatar + name + read time) → body paragraphs → "Read more →" link.

**`feature-story`** — Marketing newsletter feature. Title → lede → image card with body and "Read the full piece →" link.

**`feature-row`** — Product launch feature. Icon tile (gradient) + title + description in a horizontal row. 4 max per email.

**`destination-card`** — Marketing newsletter destination. Image (180px) → tag → name → meta → price block (from £X pp). 3 max per row, stacks on mobile.

**`duo-grid`** — Two-column block for B2B weekly secondary stories. Tag → title → 2-line description → small link. Stacks on mobile.

**`pulse-stats`** — Three-up stats on dark navy background with radial glow. Big number (32-36px) + 2-line label. Includes source citation. Use in B2B weekly.

**`stats-strip`** — Three-up stats on light grey strip. Big number + 1-line label. Use in product launch.

**`numbered-list`** — "Five things to do this week." Numbered tile (28px) + title + description. Use in B2B weekly.

**`pull-quote`** — Italic quote with leading curly quote mark in teal, attribution below. Use sparingly — once per email max.

**`testimonial`** — Centred quote + avatar + name/role. Use in product launch only.

**`calendar-grid`** — "On the radar" diary items. Date tile (Mon + day) on left, title + 1-line on right. Each row is a link.

**`detail-card`** — Transactional key-value pairs. Light grey card with bordered rows. Use for booking confirmations, receipts.

**`confirmation-block`** — Transactional confirmation header. Coloured icon tile (success green by default), eyebrow, large headline using customer's first name, supporting paragraph. Sets the calm, confirmed tone.

**`trip-card`** — Transactional booking display. Header image with destination tag and name overlaid, body containing detail rows (hotel, dates, travellers) and a journey block (origin airport → destination airport with arrow). The visual centrepiece of a booking confirmation.

**`cost-summary`** — Transactional cost breakdown. Light grey card, line items with right-aligned amounts, total row with thicker border, payment status row at the bottom with green dot indicator.

**`next-steps`** — Transactional numbered actions. Smaller numbered tiles (24px) than the B2B weekly equivalent, more compressed spacing, optional inline link in the description.

**`help-block`** — Transactional support contact. Centred title and supporting line, then phone and email contacts displayed inline with leading icons.

**`footer-meta`** — Transactional legal footer. Plain centred text only — no logo, no socials. Includes legal name, ATOL/ABTA numbers, address, send reason, view-in-browser link.

### Action Components

**`cta-banner`** — Gradient navy banner with radial glow, centred title + text + primary button. Use for marketing newsletter mid-conversion moment.

**`cta-dark`** — Deep navy with mesh gradient glow, big bold title, scarcity copy, single primary CTA. Use for product launch closing.

**`btn-primary`** — Teal background, dark text, 10px radius, 14-16px padding, optional arrow icon, optional teal glow shadow.

**`btn-secondary`** — Transparent with border, white/dark text. Used alongside `btn-primary` in launch hero only.

### Connector Components

**`divider`** — 1px horizontal rule, full width within section padding. Use sparingly — only between major editorial beats.

**`section-eyebrow`** — Uppercase teal label, 11px, letter-spacing 0.1em. Optional leading dash.

---

## 5. STRUCTURED CONTENT PLAN SCHEMA

This is the schema the AI plan generator (Luna Marketing Part E) will produce. Every email is a JSON document matching this shape. The renderer takes the JSON and produces the HTML.

```typescript
type EmailPlan = {
  archetype: 'b2b-weekly' | 'marketing-newsletter' | 'product-launch' | 'transactional';
  meta: {
    subject: string;
    preheader: string;        // 80-120 chars, shown in inbox preview
    from_name: string;
    reply_to: string;
  };
  sections: Section[];        // ordered, rendered top to bottom
};

type Section =
  | { type: 'top-bar', logo: string, meta?: string }
  | { type: 'masthead', volume: string, issue: string, date: string, title: string, tagline: string }
  | { type: 'hero-image', image_url: string, eyebrow?: string, headline: string, deck: string, cta: CTA }
  | { type: 'hero-dark', badge?: { label: string, pulse: boolean }, eyebrow: string, headline: string, accent_word?: string, deck: string, ctas: CTA[] }
  | { type: 'lead-story', kicker: string, headline: string, deck: string, image_url: string, byline: { initials: string, name: string, read_time: string, category: string }, body_paragraphs: string[], read_more_url: string }
  | { type: 'feature-story', eyebrow: string, title: string, lede: string, image_url: string, body_title: string, excerpt: string, link: { text: string, url: string } }
  | { type: 'feature-row', icon: string, title: string, description: string }   // composed in groups of 2-4
  | { type: 'destination-grid', eyebrow: string, title: string, lede: string, cards: DestinationCard[] }
  | { type: 'duo-grid', items: DuoItem[] }                                       // exactly 2 items
  | { type: 'pulse-stats', eyebrow: string, title: string, stats: Stat[], source: string }
  | { type: 'stats-strip', stats: Stat[] }                                       // exactly 3 stats
  | { type: 'numbered-list', title: string, time_estimate: string, items: ListItem[] }   // 3-5 items
  | { type: 'pull-quote', quote: string, attribution: { name: string, role: string } }
  | { type: 'testimonial', quote: string, name: string, role: string, initials: string }
  | { type: 'calendar-grid', title: string, subtitle: string, items: CalendarItem[] }
  | { type: 'cta-banner', title: string, text: string, cta: CTA }
  | { type: 'cta-dark', eyebrow: string, title: string, text: string, cta: CTA }
  | { type: 'product-mockup', mockup_type: 'chat' | 'dashboard' | 'widget', mockup_data: object }
  | { type: 'detail-card', title: string, rows: { label: string, value: string }[] }
  | { type: 'footer', variant: 'light' | 'dark' | 'help', tagline?: string, links: { label: string, url: string }[] };

type CTA = { text: string, url: string, style: 'primary' | 'secondary' };
type DestinationCard = { image_url: string, tag: string, name: string, meta: string, price_from: string, price_amount: string, price_unit: string, url: string };
type Stat = { number: string, accent_part?: string, label: string };  // accent_part rendered in teal
type ListItem = { title: string, description: string };
type CalendarItem = { month: string, day: string, title: string, subtitle: string, url: string };
type DuoItem = { tag: string, title: string, description: string, link: { text: string, url: string } };
```

**Anti-fabrication rule (CRITICAL for the AI plan generator):**
Every dynamic value (price, destination, stat, testimonial, byline) MUST come from a real source — Airtable record ID, supplier API response, or explicit user input. The AI is FORBIDDEN from inventing destinations, prices, stats, or quotes. If the user doesn't provide a value and one isn't available from data, the AI must ask, not guess.

---

## 6. WRITING RULES

Email copy quality matters as much as design. These rules are layered on top of the `travelgenix-humanizer` skill.

### 6.1 Subject lines
- 30-50 characters (clips at 60 on mobile)
- No emoji unless the brand voice for that specific campaign explicitly allows
- No clickbait. No "You won't believe..."
- Lead with the value or the news. Not the brand name.

**Good:** "TProfile's £2.1M deal — what it means for you"
**Bad:** "🚀 INCREDIBLE NEWS from Travelgenix this week!!!"

### 6.2 Preheader text
- 80-120 characters
- Continues the subject line, doesn't repeat it
- Last chance to earn the open

### 6.3 Headlines
- Active voice
- One idea per headline
- Numbers and specifics beat vagueness ("3 destinations under £700" beats "Great deals inside")

### 6.4 Body copy
- Run every paragraph through `travelgenix-humanizer`
- No "delve", "leverage", "robust", "seamless", "ecosystem", "synergy"
- No em dashes (Andy hates them — use commas, parentheses, or full stops)
- No Oxford commas
- Short sentences mixed with longer. Vary the rhythm.

### 6.5 CTAs
- Verb-led: "Get early access", "Book a demo", "Read the full piece"
- Never "Click here", "Learn more" (unless followed by specific noun: "Learn more about Luna Chat")
- Never "Submit" on anything except a literal form submission

---

## 7. ANTI-PATTERNS

### Things that make emails look amateur
1. **Purple/blue gradients** — instant AI-slop tell. Travelgenix palette is navy and teal only.
2. **Three-column features grid with icons** — the universal "AI features section" cliché. Use feature rows (horizontal) instead.
3. **Stock photography of diverse smiling people** — generic, looks like every other SaaS email. Use real product imagery, real destinations, or no image at all.
4. **Centred everything** — left-aligned reads better. Centre only for hero CTAs and final CTA blocks.
5. **Multiple equally-weighted CTAs** — one primary action per email. If you have two, you have neither.
6. **Decorative dividers everywhere** — dividers are punctuation. Use them at major editorial beats only.
7. **Rounded pill buttons** — looks dated and "marketing-y". 10-12px radius reads as modern.
8. **Body text over 16px** — looks shouty. 15px body, 16px lede maximum.
9. **All-caps section titles** — only eyebrows/kickers go uppercase. Section titles use sentence case.
10. **Arbitrary text colours** — every text colour comes from the token list. No exceptions.
11. **Gradient text on body copy** — gradient text is for one accent word in a hero, not body.
12. **Em dashes** — Andy's pet hate. Use commas or full stops.
13. **Emoji as bullets, headers, or section markers** — never. Use SVG icons or numbered tiles.

### Subject-line anti-patterns
14. RE: or FW: prefixes pretending to be replies
15. ALL CAPS WORDS in subject lines
16. "Quick question" / "One thing" — manipulative open-bait
17. Personalisation that's clearly merge-tag-injected ("Hi {{first_name}}!")

### Design anti-patterns specific to travel
18. **Beach sunset stock images with no context** — generic, says nothing
19. **"Adventure awaits" copy** — every travel brand says this
20. **Globe icons as the primary brand mark** — overused
21. **Ticking clock urgency on every email** — destroys trust over time

---

## 8. CROSS-CLIENT COMPATIBILITY

### Required testing matrix
Before any email ships, render-test in:
- Apple Mail (macOS + iOS)
- Gmail (web + Android)
- Outlook 2016+ (Windows desktop)
- Outlook.com (web)

### Known constraints
- **Outlook desktop:** Renders with Word engine, not a browser. No CSS Grid. No flex (mostly). Background images need VML. Gradients stripped entirely. Use `<table>` layouts. **See §12 for the bulletproof patterns that solve all of this.**
- **Gmail web:** Strips `<style>` in `<head>` for some scenarios. Inline critical CSS or use `<style>` in `<body>`. 102KB clip limit — keep emails under 100KB.
- **Apple Mail:** Best CSS support of any major client. Auto-inverts colours in dark mode unless you opt out with `meta name="color-scheme" content="light dark"`.
- **Outlook.com:** Dark mode requires `[data-ogsc]` attribute selectors.

### Safe defaults for production rendering
- All images have explicit `width` and `height` attributes
- All images have `alt` text (treated as design fallback)
- Hero gradients have a `bgcolor` fallback on the parent `<td>` (see §12.4)
- Animations (pulse, typing dots) are decorative-only and degrade gracefully
- Buttons use the bulletproof CTA pattern (see §12.2 P2) — NOT styled `<a>` tags alone

**For all production rendering, follow the patterns in §12.** That section is the definitive guide for what the renderer (`lib/email-sections/`) must produce.

---

## 9. PRE-DELIVERY CHECKLIST

Run through this EVERY time before delivering an email to Andy or sending live.

### Strategy ✓
- [ ] Archetype declared (B2B Weekly / Marketing / Launch / Transactional)
- [ ] Design dials stated (variance / motion / density)
- [ ] One primary CTA, repeated max twice
- [ ] Subject line 30-50 chars, leads with value
- [ ] Preheader 80-120 chars, continues from subject

### Design ✓
- [ ] 600px max width
- [ ] Components composed from the library — no novel components
- [ ] Colours from token list — zero hardcoded hex outside tokens
- [ ] Type scale followed — no arbitrary sizes
- [ ] Three radius values maximum
- [ ] Light mode default, dark mode designed deliberately
- [ ] No purple, no pink, no green/orange except status

### Copy ✓
- [ ] Run through `travelgenix-humanizer`
- [ ] No em dashes
- [ ] No Oxford commas
- [ ] No banned words (delve, leverage, robust, seamless, etc.)
- [ ] CTAs are verb-led
- [ ] Headline is active voice, specific, one idea
- [ ] All facts/stats/quotes/prices verified against real sources (anti-fabrication)

### Cross-client ✓
- [ ] Outer wrapper is `<table>` with cellpadding/cellspacing/border 0
- [ ] All images have width, height, alt
- [ ] Hero gradient has static fallback image for Outlook
- [ ] Total weight under 100KB
- [ ] Tested in Apple Mail, Gmail, Outlook 2016+, Outlook.com

### Anti-pattern audit ✓
- [ ] No three-column features grid with icons
- [ ] No generic stock photography
- [ ] No purple/blue gradients
- [ ] No emoji as structural elements
- [ ] No "Adventure awaits" travel clichés
- [ ] No false-urgency timers

---

## 10. WORKFLOW

### When Andy asks for a new email

1. **Identify the archetype.** Ask if unclear. Don't guess.
2. **State the dials.** Open the response with: *"Designing as Archetype B (Marketing Newsletter), dials variance 6 / motion 3 / density 4."*
3. **Read the canonical example** from `examples/` for that archetype before writing any code.
4. **Compose from components.** Don't invent new ones unless absolutely necessary.
5. **Write copy through the humaniser lens.** Even if not running the skill explicitly, apply its rules.
6. **Verify all facts.** Every price, stat, name, quote must be real or explicitly placeholder.
7. **Build with light mode as default**, then add dark mode `@media` block.
8. **Run the pre-delivery checklist** before presenting.
9. **Flag anything uncertain.** Better to ask than ship something off-brand.

### When Andy asks to improve an existing email

1. Identify the archetype (often the email is the wrong archetype — that's the problem).
2. Audit against the anti-pattern list.
3. Audit against the component library — is the email using novel components?
4. Run the pre-delivery checklist as a diagnostic.
5. Propose specific changes, not vague rewrites.

### When the user is the AI plan generator (Luna Marketing Part E)

1. The plan generator outputs the JSON schema in §5.
2. The renderer reads the JSON and produces HTML using ONLY the components in §4.
3. The plan generator is FORBIDDEN from inventing facts. Anti-fabrication rules apply.
4. If a required field can't be sourced from data, the plan generator must surface the gap to the user, not guess.

---

## 11. CANONICAL EXAMPLES

These are the design law. Refer to them BEFORE building anything.

The full HTML source for all four canonical examples is included inline at the end of this skill (Appendix A). When designing or reviewing an email, find the matching archetype in the appendix and use it as the visual ground truth.

- **Archetype A** — The Travelgenix Weekly → see Appendix A.1
- **Archetype B** — Monthly destination newsletter → see Appendix A.2
- **Archetype C** — Luna Chat product launch → see Appendix A.3
- **Archetype D** — Booking confirmation → see Appendix A.4

When in doubt, find the relevant appendix section and match its design vocabulary. Do not improvise.

**Important — design references vs production HTML:** The four examples in Appendix A use modern CSS (gradients, flex, grid, animations) so they read well in a browser preview and serve as visual ground truth. **They are not the HTML that gets sent.** Production emails are assembled by the renderer using the bulletproof patterns in §12. The mockups show *what it should look like*; §12 shows *how to render it bulletproof*.

---

---

## 12. BULLETPROOF EMAIL PATTERNS (production rendering)

The four canonical examples in Appendix A are **design references** showing the visual standard. They use modern CSS (gradients, flex, grid, animations) to be readable and compelling in a browser. **They are not the HTML that gets sent.** Production emails are assembled by the renderer (`lib/email-sections/` in the luna-marketing repo) using the bulletproof patterns below.

### 12.1 — Why bulletproof patterns matter

Outlook desktop (2016, 2019, 2021) renders email using Microsoft Word's HTML engine, not a browser. It ignores or breaks:

- `linear-gradient`, `radial-gradient` — flat backgrounds only
- `display: flex`, `display: grid` — block/inline only, must use `<table>` for layout
- `border-radius` — every corner is 90° square
- `background-image` via CSS — needs VML
- `transform`, `transition`, `@keyframes`, `backdrop-filter` — all stripped
- Web fonts (sometimes) — falls back to Times New Roman if you don't specify a fallback

Other clients (Apple Mail, Gmail, Outlook.com, New Outlook 2024+, mobile clients) handle modern CSS fine. The technique is to **layer** code: Outlook gets a bulletproof fallback inside conditional comments; other clients ignore the conditional comments and see the modern CSS.

### 12.2 — The 8 core patterns

**P1 — Outlook conditional comments**
```html
<!--[if mso]>
  Only Outlook sees this
<![endif]-->

<!--[if !mso]><!-- -->
  Everyone EXCEPT Outlook sees this
<!--<![endif]-->
```

**P2 — Bulletproof CTA button (used everywhere in every archetype)**

This is THE most important pattern. Every CTA must follow it.

```html
<!-- Bulletproof CTA: works in every client including Outlook 2016+ -->
<table border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
  <tr>
    <td align="center" bgcolor="#00b4d8" style="border-radius: 10px;">
      <!--[if mso]>
        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"
          href="{{cta_url}}"
          style="height:48px;v-text-anchor:middle;width:200px;"
          arcsize="20%"
          stroke="f"
          fillcolor="#00b4d8">
          <w:anchorlock/>
          <center style="color:#0f172a;font-family:'Segoe UI',Arial,sans-serif;font-size:15px;font-weight:bold;">
            {{cta_text}}
          </center>
        </v:roundrect>
      <![endif]-->
      <!--[if !mso]><!-- -->
        <a href="{{cta_url}}"
           style="display: inline-block; padding: 14px 28px; background: #00b4d8; color: #0f172a; text-decoration: none; border-radius: 10px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; font-size: 15px; font-weight: 700; letter-spacing: -0.005em;">
          {{cta_text}}
        </a>
      <!--<![endif]-->
    </td>
  </tr>
</table>
```

**P3 — Gradient hero (Archetype B: Marketing Newsletter)**

The marketing newsletter hero uses an image with a gradient overlay panel below. For Outlook, use VML for the background image and a flat-coloured panel for the overlay. The hero headline sits inside the flat panel, so this works well.

```html
<!-- Hero with image + dark panel below (Outlook-safe) -->
<table border="0" cellspacing="0" cellpadding="0" width="100%" style="background: #1b2b5b;">
  <!--[if mso]>
    <tr>
      <td>
        <v:image xmlns:v="urn:schemas-microsoft-com:vml"
          src="{{hero_image_url}}"
          style="width:600px;height:320px;display:block;"/>
      </td>
    </tr>
  <![endif]-->
  <!--[if !mso]><!-- -->
    <tr>
      <td style="background-image: linear-gradient(180deg, rgba(27,43,91,0) 0%, rgba(27,43,91,0.85) 100%), url('{{hero_image_url}}'); background-size: cover; background-position: center; height: 320px;">
        &nbsp;
      </td>
    </tr>
  <!--<![endif]-->
  <tr>
    <td bgcolor="#1b2b5b" style="padding: 48px 32px 40px; color: #ffffff;">
      <!-- Hero text content goes here -->
    </td>
  </tr>
</table>
```

**P4 — Dark hero with gradient backdrop (Archetype C: Product Launch)**

The launch hero uses radial-gradient mesh glows on a dark navy background. Outlook can't do mesh — it gets the flat dark navy, which still works. The italic accent word in the headline uses a CSS gradient text fill that Outlook strips entirely, so the accent word should fall back to a solid teal colour.

```html
<table border="0" cellspacing="0" cellpadding="0" width="100%" bgcolor="#0a0f1f">
  <tr>
    <td>
      <!--[if mso]>
        <!-- Outlook: flat dark navy, no mesh, no gradient text -->
        <table border="0" cellspacing="0" cellpadding="0" width="600">
          <tr>
            <td bgcolor="#0a0f1f" style="padding: 48px 40px 56px; color: #ffffff; font-family: 'Segoe UI', Arial, sans-serif;">
              <span style="color: #48cae4; font-size: 12px; font-weight: 600;">{{eyebrow}}</span><br><br>
              <h1 style="color: #ffffff; font-size: 40px; font-weight: 800; margin: 0;">
                {{headline_line_1}}<br>
                <em style="color: #48cae4; font-style: italic;">{{accent_word}}</em>
              </h1>
              <p style="color: rgba(255,255,255,0.75); font-size: 18px; margin: 20px 0 36px;">
                {{deck}}
              </p>
              <!-- CTA from P2 -->
            </td>
          </tr>
        </table>
      <![endif]-->
      <!--[if !mso]><!-- -->
        <!-- Modern clients: full mesh gradient version -->
        <div style="position: relative; padding: 48px 40px 56px; background: #0a0f1f; overflow: hidden;">
          <!-- Mesh glow layers -->
          <div style="position: absolute; top: -200px; left: -200px; width: 500px; height: 500px; background: radial-gradient(circle, rgba(0,180,216,0.4) 0%, transparent 60%); filter: blur(40px); z-index: 1;"></div>
          <div style="position: relative; z-index: 2; color: #ffffff;">
            <!-- Hero content -->
          </div>
        </div>
      <!--<![endif]-->
    </td>
  </tr>
</table>
```

**P5 — Image with gradient overlay (Archetype B: destination cards, Archetype D: trip card)**

Destination cards use an image with a dark gradient at the bottom for text legibility. In Outlook, drop the gradient overlay and accept slightly lower contrast — the underlying image still shows.

```html
<table border="0" cellspacing="0" cellpadding="0" width="100%" style="border-radius: 12px; overflow: hidden;">
  <tr>
    <td>
      <!--[if mso]>
        <!-- Outlook: just the image, no overlay -->
        <img src="{{image_url}}" width="540" height="180" alt="{{alt}}" style="display: block; width: 100%; height: auto;"/>
      <![endif]-->
      <!--[if !mso]><!-- -->
        <div style="background-image: linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.2) 100%), url('{{image_url}}'); background-size: cover; background-position: center; height: 180px;">
          &nbsp;
        </div>
      <!--<![endif]-->
    </td>
  </tr>
  <!-- Card body below -->
</table>
```

**P6 — Two-column layout without flex/grid**

Used heavily across archetypes (duo-grid, journey block, cost rows). Always use a `<table>` with two `<td>` cells.

```html
<table border="0" cellspacing="0" cellpadding="0" width="100%">
  <tr>
    <td width="50%" valign="top" style="padding-right: 12px;">
      <!-- Left column -->
    </td>
    <td width="50%" valign="top" style="padding-left: 12px;">
      <!-- Right column -->
    </td>
  </tr>
</table>
```

For mobile, wrap in a media query that stacks the columns:
```css
@media only screen and (max-width: 600px) {
  .stack-mobile td {
    display: block !important;
    width: 100% !important;
    padding: 0 0 16px 0 !important;
  }
}
```

**P7 — Three-column grids (destination grid, stats strip, pulse stats)**

Same as P6 but with three cells. For three-column grids in 600px-wide emails, each column is 33.3% (use `width="200"` for fixed pixel width since 600/3 = 200).

**P8 — Animations and transforms — gracefully strip in Outlook**

Animations live in CSS that Outlook ignores. Just make sure the email looks intentional with them stripped:
- The launch's pulsing "new" badge dot — Outlook sees a static dot, still says "New launch", still works
- The launch's typing-dots animation in the chat mockup — Outlook sees three static dots, still reads as "loading"
- Card hover-lift transitions — Outlook just doesn't lift on hover; not interactive in email anyway

**Rule:** if removing the animation makes the email confusing or broken, the animation isn't decorative and shouldn't be in an email at all.

### 12.3 — Per-archetype Outlook checklist

When the renderer expansion happens, each archetype needs these specific patterns:

**Archetype A (B2B Weekly):**
- P1 conditional comments throughout
- P2 bulletproof CTAs (Read More links and footer Reply/Manage links)
- P3 not needed (no hero image)
- P4 on the masthead title (use bgcolor="#ffffff" with 3px navy bottom border)
- P5 on the lead-story image
- P6 for the duo-grid (two-column secondary stories)
- P7 for the pulse-stats three-up
- P7 for the calendar-grid
- The kicker dash before "Lead story" uses Unicode em-dash (—) not a CSS pseudo-element, since `::before` is unreliable in Outlook

**Archetype B (Marketing Newsletter):**
- P1 conditional comments throughout
- P2 bulletproof CTAs (hero CTA, banner CTA)
- P3 hero with image + gradient overlay panel
- P5 on each of the three destination cards
- P6 for the destination card price row (price label / price amount)
- P7 for the three-up destination grid (use width="33.33%" with stacking media query)
- The pull-quote left border uses a `<table>` cell with `border-left: 3px solid #00b4d8` (works in Outlook)

**Archetype C (Product Launch):**
- P1 conditional comments throughout
- P2 bulletproof CTAs (hero primary, hero secondary, final CTA)
- P4 dark hero with mesh-gradient (most complex; flat fallback for Outlook)
- The italic gradient-filled accent word in the headline must fall back to solid #48cae4 in Outlook
- The pulsing badge dot — fallback to static dot
- The typing dots — fallback to three static dots
- The chat mockup (product-mockup component) — uses table layout with bgcolor for the bot/user message bubbles (no gradients on bubbles)
- P7 for the stats-strip
- P6 for the testimonial author row (avatar / name+role)

**Archetype D (Transactional):**
- P1 conditional comments throughout
- P2 bulletproof CTAs in the help block (phone link, email link)
- P5 on the trip-card image (with destination tag overlay — use absolute positioning fallback OR put tag in a separate row beneath the image for Outlook)
- P6 for the journey block (origin / arrow / destination — use a 3-column table)
- The success-icon green tile — use a static SVG inline (Outlook supports inline SVG since 2019) OR a PNG fallback
- The "Settled" green dot status — use a Unicode bullet character (●) coloured green, NOT a CSS-styled span (more reliable)

### 12.4 — The Outlook-safe colour fallback table

When a gradient gets stripped in Outlook, the `bgcolor` attribute on the parent `<td>` shows through. Always set both:

| Element | Modern CSS | Outlook fallback `bgcolor` |
|---------|-----------|---------------------------|
| Marketing hero panel | gradient navy | `#1b2b5b` |
| Launch hero (mesh gradient) | gradient mesh | `#0a0f1f` |
| Marketing CTA banner | gradient navy | `#1b2b5b` |
| Launch final CTA | gradient navy | `#1b2b5b` |
| Logo mark tile | gradient teal | `#00b4d8` |
| Feature icon tiles | gradient teal | `#00b4d8` |
| Avatar circles | gradient navy | `#1b2b5b` |

### 12.5 — Web fonts and font fallbacks

Outlook desktop strips Google Fonts and similar. Always specify the fallback chain:

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
```

Outlook desktop will land on **Segoe UI** (Windows) or **Arial** (older Outlook), both clean sans-serifs that approximate Inter's feel.

For headlines that use Inter's display weight (800), Segoe UI Bold (700) is the closest match. Don't try to load Inter via `@import url('https://fonts.googleapis.com/...')` — Outlook 2016+ blocks it and falls back to Times New Roman.

### 12.6 — Testing matrix

Before any send goes live, render-test in:

| Client | Engine | Test priority | Likely issues |
|--------|--------|---------------|---------------|
| Apple Mail (macOS) | WebKit | High | Auto-inverts in dark mode if not opted out |
| Apple Mail (iOS) | WebKit | High | Same as macOS, plus narrow viewport reflows |
| Gmail web | Custom | High | Strips `<style>` in `<head>` sometimes; clip at 102KB |
| Gmail Android | Custom | High | Image proxy may delay loads |
| Outlook 2019 desktop | Word engine | **CRITICAL** | All bulletproof patterns matter most here |
| Outlook 365 desktop | Word engine | **CRITICAL** | Same as 2019 |
| Outlook.com web | Custom | High | Use `[data-ogsc]` attribute for dark mode |
| New Outlook (2024+) | Edge WebView | Medium | Modern CSS supported |

**Testing services worth paying for** when ready to send: Litmus, Email on Acid. About £80/month — pay it for one month around your first send, cancel after if you don't ship often.

### 12.7 — The mandatory pre-send Outlook check

For every email going to production, before sending, manually verify these three lines render correctly in Outlook 2019 or 365 desktop:

1. **The primary CTA renders as a clickable rounded rectangle, not a square block of teal text** — if it's square, P2 is missing
2. **The hero image (Archetype B) shows the destination, not a broken image icon** — if broken, the VML in P3 has a typo or the image URL is wrong
3. **The headline reads in Inter or Segoe UI, not Times New Roman** — if Times, the font fallback chain is missing

These three checks catch 95% of Outlook breakage. If all three pass, the email is shippable.

*Built for Travelgenix by Claude. Sits alongside `travelgenix-design`, `travelgenix-taste`, and `travelgenix-humanizer`. Read first for any email work.*

---

# APPENDIX A — CANONICAL HTML EXAMPLES

The full HTML source for the four canonical email archetypes. Each is a complete, working preview file with a dark-mode toggle in the top right. Use these as the visual ground truth when designing any new email.

**Important:** these files include a preview shell (the dark-mode toggle, sticky header, padded frame around the email) and use modern CSS that Outlook desktop won't render. They are **design references**, not production HTML. The patterns for rendering this design bulletproof in every email client are in §12.

When designing: match the visual standard from these examples.
When rendering production HTML: use the §12 bulletproof patterns.

---

## A.1 — Archetype A: The Travelgenix Weekly (B2B newsletter)

```html
<!DOCTYPE html>
<!--
  ═══════════════════════════════════════════════════════════════════
  TRAVELGENIX EMAIL DESIGN REFERENCE — NOT PRODUCTION HTML

  This file is a visual ground-truth mockup for the design system.
  It uses modern CSS (gradients, flex, grid, animations) so it reads
  well in a browser. It is NOT the HTML that gets sent.

  Production emails are assembled by the renderer using the
  bulletproof Outlook-safe patterns documented in
  travelgenix-email-design SKILL.md §12.

  When you build the renderer, design from this file (the visual)
  but render using §12 patterns (the technique).
  ═══════════════════════════════════════════════════════════════════
-->

<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>The Travelgenix Weekly — Preview</title>
<style>
  /* Preview shell */
  :root { --shell-bg: #f1f5f9; --shell-text: #0f172a; --shell-border: #e2e8f0; --shell-card: #ffffff; }
  [data-theme="dark"] { --shell-bg: #0a0f1f; --shell-text: #f8fafc; --shell-border: #1e293b; --shell-card: #0f172a; }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: var(--shell-bg); color: var(--shell-text); transition: background 0.3s ease; }
  .shell-header { position: sticky; top: 0; z-index: 10; background: var(--shell-card); border-bottom: 1px solid var(--shell-border); padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; backdrop-filter: blur(12px); }
  .shell-title { font-size: 13px; font-weight: 600; opacity: 0.7; }
  .theme-toggle { display: inline-flex; align-items: center; gap: 8px; padding: 8px 14px; background: transparent; border: 1px solid var(--shell-border); border-radius: 999px; font-family: inherit; font-size: 12px; font-weight: 500; color: var(--shell-text); cursor: pointer; transition: all 0.2s ease; }
  .theme-toggle:hover { background: var(--shell-bg); transform: translateY(-1px); }
  .preview-frame { padding: 40px 20px 80px; display: flex; justify-content: center; }

  /* ============ EMAIL ============ */
  .email-wrapper { width: 100%; max-width: 640px; margin: 0 auto; }
  .email-table {
    width: 100%; border-collapse: collapse; background: #ffffff; border-radius: 4px; overflow: hidden;
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px rgba(15, 23, 42, 0.06);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #0f172a;
  }
  [data-theme="dark"] .email-table { background: #0f172a; color: #f8fafc; box-shadow: 0 8px 24px rgba(0,0,0,0.3); }

  /* Masthead — newspaper style */
  .masthead {
    border-bottom: 3px solid #1b2b5b;
    padding: 32px 36px 20px;
    background: #ffffff;
  }
  [data-theme="dark"] .masthead { background: #0f172a; border-bottom-color: #48cae4; }
  .masthead-top { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 16px; font-size: 11px; color: #475569; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 500; }
  [data-theme="dark"] .masthead-top { color: #94a3b8; }
  .masthead-title {
    font-family: 'Inter', serif;
    font-size: 38px; font-weight: 800;
    letter-spacing: -0.035em; line-height: 1;
    color: #1b2b5b; margin: 0;
  }
  [data-theme="dark"] .masthead-title { color: #f8fafc; }
  .masthead-tagline {
    font-size: 12px; color: #475569; margin: 8px 0 0;
    font-style: italic; letter-spacing: -0.005em;
  }
  [data-theme="dark"] .masthead-tagline { color: #94a3b8; }

  /* In this issue */
  .toc {
    background: #f8fafc;
    padding: 20px 36px;
    border-bottom: 1px solid #e2e8f0;
  }
  [data-theme="dark"] .toc { background: #1e293b; border-bottom-color: #334155; }
  .toc-label { font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #00b4d8; margin: 0 0 10px; }
  [data-theme="dark"] .toc-label { color: #48cae4; }
  .toc-list { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 24px; font-size: 13px; color: #475569; }
  [data-theme="dark"] .toc-list { color: #cbd5e1; }
  .toc-item { display: flex; gap: 10px; align-items: baseline; }
  .toc-num { font-weight: 700; color: #1b2b5b; font-variant-numeric: tabular-nums; }
  [data-theme="dark"] .toc-num { color: #48cae4; }

  /* Lead story */
  .lead {
    padding: 40px 36px 36px;
    border-bottom: 1px solid #e2e8f0;
  }
  [data-theme="dark"] .lead { border-bottom-color: #334155; }
  .kicker {
    font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    color: #00b4d8; margin: 0 0 12px;
    display: inline-flex; align-items: center; gap: 8px;
  }
  [data-theme="dark"] .kicker { color: #48cae4; }
  .kicker::before {
    content: ''; width: 24px; height: 2px; background: currentColor;
  }
  .lead-headline {
    font-size: 30px; font-weight: 700; line-height: 1.2; letter-spacing: -0.025em;
    color: #0f172a; margin: 0 0 14px;
  }
  [data-theme="dark"] .lead-headline { color: #f8fafc; }
  .lead-deck {
    font-size: 17px; line-height: 1.55; color: #475569;
    font-weight: 400; margin: 0 0 24px; letter-spacing: -0.005em;
  }
  [data-theme="dark"] .lead-deck { color: #cbd5e1; }
  .lead-image {
    width: 100%; height: 220px; border-radius: 8px;
    background-size: cover; background-position: center;
    margin: 0 0 24px;
  }
  .lead-byline {
    display: flex; align-items: center; gap: 12px;
    padding: 14px 0;
    border-top: 1px solid #f1f5f9;
    border-bottom: 1px solid #f1f5f9;
    margin-bottom: 24px;
  }
  [data-theme="dark"] .lead-byline { border-color: #1e293b; }
  .byline-avatar {
    width: 36px; height: 36px; border-radius: 50%;
    background: linear-gradient(135deg, #1b2b5b, #00b4d8);
    color: #fff; display: inline-flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 700;
  }
  .byline-meta { font-size: 12px; color: #475569; }
  [data-theme="dark"] .byline-meta { color: #94a3b8; }
  .byline-name { color: #0f172a; font-weight: 600; }
  [data-theme="dark"] .byline-name { color: #f8fafc; }
  .lead-body p {
    font-size: 15px; line-height: 1.7; color: #334155; margin: 0 0 16px;
  }
  [data-theme="dark"] .lead-body p { color: #cbd5e1; }
  .lead-body strong { color: #0f172a; font-weight: 600; }
  [data-theme="dark"] .lead-body strong { color: #f8fafc; }
  .read-more {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 14px; font-weight: 600; color: #1b2b5b;
    text-decoration: none; margin-top: 8px;
    border-bottom: 2px solid #00b4d8; padding-bottom: 2px;
  }
  [data-theme="dark"] .read-more { color: #48cae4; border-bottom-color: #48cae4; }

  /* Two-column section */
  .duo {
    padding: 36px;
    border-bottom: 1px solid #e2e8f0;
  }
  [data-theme="dark"] .duo { border-bottom-color: #334155; }
  .duo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
  .duo-item .item-tag {
    font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    color: #00b4d8; margin: 0 0 8px;
  }
  [data-theme="dark"] .duo-item .item-tag { color: #48cae4; }
  .duo-item h3 {
    font-size: 18px; font-weight: 700; line-height: 1.3; letter-spacing: -0.015em;
    color: #0f172a; margin: 0 0 8px;
  }
  [data-theme="dark"] .duo-item h3 { color: #f8fafc; }
  .duo-item p {
    font-size: 14px; line-height: 1.6; color: #475569; margin: 0 0 12px;
  }
  [data-theme="dark"] .duo-item p { color: #cbd5e1; }
  .duo-item .small-link {
    font-size: 13px; font-weight: 600; color: #1b2b5b;
    text-decoration: none; display: inline-flex; align-items: center; gap: 4px;
  }
  [data-theme="dark"] .duo-item .small-link { color: #48cae4; }

  /* Industry pulse — data block */
  .pulse {
    background: #1b2b5b;
    color: #fff;
    padding: 36px;
    position: relative;
    overflow: hidden;
  }
  .pulse::before {
    content: ''; position: absolute; top: -100px; right: -100px;
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(0,180,216,0.2) 0%, transparent 70%);
  }
  .pulse-label {
    font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    color: #48cae4; margin: 0 0 6px; position: relative;
  }
  .pulse-title {
    font-size: 22px; font-weight: 700; letter-spacing: -0.02em; margin: 0 0 24px;
    position: relative;
  }
  .pulse-stats { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px; position: relative; }
  .pulse-stat-num {
    font-size: 32px; font-weight: 800; letter-spacing: -0.03em;
    color: #ffffff; line-height: 1; margin: 0 0 6px;
    font-variant-numeric: tabular-nums;
  }
  .pulse-stat-num span { color: #48cae4; }
  .pulse-stat-label {
    font-size: 12px; color: rgba(255,255,255,0.7);
    line-height: 1.4; margin: 0;
  }
  .pulse-source {
    font-size: 11px; color: rgba(255,255,255,0.5);
    margin: 20px 0 0; position: relative;
    border-top: 1px solid rgba(255,255,255,0.1); padding-top: 14px;
  }

  /* Quick wins list */
  .quickwins {
    padding: 36px;
    border-bottom: 1px solid #e2e8f0;
  }
  [data-theme="dark"] .quickwins { border-bottom-color: #334155; }
  .quickwins-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 20px; }
  .quickwins-title { font-size: 20px; font-weight: 700; letter-spacing: -0.02em; color: #0f172a; margin: 0; }
  [data-theme="dark"] .quickwins-title { color: #f8fafc; }
  .quickwins-time { font-size: 11px; color: #94a3b8; font-weight: 500; }
  .quickwins-list { list-style: none; padding: 0; margin: 0; }
  .quickwin-item {
    display: flex; gap: 16px; align-items: flex-start;
    padding: 16px 0;
    border-bottom: 1px solid #f1f5f9;
  }
  [data-theme="dark"] .quickwin-item { border-bottom-color: #1e293b; }
  .quickwin-item:last-child { border-bottom: none; }
  .quickwin-num {
    flex-shrink: 0;
    width: 28px; height: 28px;
    background: #1b2b5b;
    color: #fff;
    border-radius: 6px;
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
  [data-theme="dark"] .quickwin-num { background: #00b4d8; color: #0f172a; }
  .quickwin-content h4 { font-size: 14px; font-weight: 600; color: #0f172a; margin: 2px 0 4px; letter-spacing: -0.01em; }
  [data-theme="dark"] .quickwin-content h4 { color: #f8fafc; }
  .quickwin-content p { font-size: 13px; color: #475569; line-height: 1.55; margin: 0; }
  [data-theme="dark"] .quickwin-content p { color: #cbd5e1; }

  /* Quote */
  .heard {
    padding: 36px;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
  }
  [data-theme="dark"] .heard { background: #0a0f1f; border-bottom-color: #1e293b; }
  .heard-label { font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #00b4d8; margin: 0 0 14px; }
  [data-theme="dark"] .heard-label { color: #48cae4; }
  .heard-quote {
    font-size: 20px; line-height: 1.45; letter-spacing: -0.015em;
    color: #0f172a; margin: 0 0 16px; font-weight: 500;
  }
  [data-theme="dark"] .heard-quote { color: #f8fafc; }
  .heard-quote::before {
    content: '“'; color: #00b4d8; font-size: 32px; line-height: 0;
    vertical-align: -8px; margin-right: 4px; font-family: Georgia, serif;
  }
  .heard-cite { font-size: 13px; color: #475569; }
  [data-theme="dark"] .heard-cite { color: #cbd5e1; }
  .heard-cite-name { font-weight: 600; color: #0f172a; }
  [data-theme="dark"] .heard-cite-name { color: #f8fafc; }

  /* On the radar */
  .radar { padding: 36px; }
  .radar-title { font-size: 20px; font-weight: 700; letter-spacing: -0.02em; color: #0f172a; margin: 0 0 6px; }
  [data-theme="dark"] .radar-title { color: #f8fafc; }
  .radar-sub { font-size: 13px; color: #475569; margin: 0 0 20px; }
  [data-theme="dark"] .radar-sub { color: #94a3b8; }
  .radar-list { display: grid; gap: 12px; }
  .radar-item {
    display: grid; grid-template-columns: 80px 1fr;
    gap: 16px; padding: 14px 16px; align-items: center;
    background: #f8fafc;
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.2s ease;
    border: 1px solid transparent;
  }
  [data-theme="dark"] .radar-item { background: #1e293b; }
  .radar-item:hover { border-color: #00b4d8; transform: translateX(2px); }
  .radar-date {
    font-size: 11px; font-weight: 700; color: #1b2b5b;
    letter-spacing: 0.05em; text-transform: uppercase;
    text-align: center;
    border-right: 1px solid #e2e8f0;
    padding-right: 16px;
    line-height: 1.3;
  }
  [data-theme="dark"] .radar-date { color: #48cae4; border-right-color: #334155; }
  .radar-date-day { font-size: 18px; font-weight: 800; display: block; letter-spacing: -0.02em; }
  .radar-content h4 { font-size: 14px; font-weight: 600; color: #0f172a; margin: 0 0 3px; letter-spacing: -0.01em; }
  [data-theme="dark"] .radar-content h4 { color: #f8fafc; }
  .radar-content p { font-size: 12px; color: #475569; margin: 0; }
  [data-theme="dark"] .radar-content p { color: #94a3b8; }

  /* Footer */
  .footer {
    background: #0f172a; color: #94a3b8;
    padding: 36px;
    text-align: center;
  }
  .footer-logo { font-size: 14px; font-weight: 800; letter-spacing: -0.02em; color: #ffffff; margin-bottom: 8px; }
  .footer-tag { font-size: 12px; color: #94a3b8; margin: 0 0 20px; font-style: italic; }
  .footer-links { display: flex; justify-content: center; gap: 18px; margin-bottom: 18px; font-size: 12px; }
  .footer-links a { color: #cbd5e1; text-decoration: none; }
  .footer-meta { font-size: 11px; color: #64748b; line-height: 1.6; margin: 0; }
  .footer-meta a { color: #94a3b8; text-decoration: underline; }

  @media (max-width: 640px) {
    .masthead-title { font-size: 30px; }
    .lead-headline { font-size: 24px; }
    .duo-grid { grid-template-columns: 1fr; gap: 24px; }
    .pulse-stats { grid-template-columns: 1fr; gap: 20px; }
    .toc-list { grid-template-columns: 1fr; }
    .lead, .duo, .pulse, .quickwins, .heard, .radar, .masthead { padding-left: 24px; padding-right: 24px; }
  }
</style>
</head>
<body>

<div class="shell-header">
  <span class="shell-title">The Travelgenix Weekly — B2B Newsletter Preview</span>
  <button class="theme-toggle" onclick="toggleTheme()">
    <svg id="theme-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>
    <span id="theme-label">Dark mode</span>
  </button>
</div>

<div class="preview-frame">
  <div class="email-wrapper">
    <table class="email-table" cellpadding="0" cellspacing="0" border="0">
      <tr><td>

        <!-- Masthead -->
        <div class="masthead">
          <div class="masthead-top">
            <span>Vol. 02 · Issue 19</span>
            <span>Friday, 8 May 2026</span>
          </div>
          <h1 class="masthead-title">The Travelgenix Weekly</h1>
          <p class="masthead-tagline">Five minutes on what matters in travel tech, every Friday.</p>
        </div>

        <!-- TOC -->
        <div class="toc">
          <p class="toc-label">In this issue</p>
          <div class="toc-list">
            <div class="toc-item"><span class="toc-num">01</span><span>Why TProfile's NJT deal changes the consortia game</span></div>
            <div class="toc-item"><span class="toc-num">02</span><span>The post-sale gap nobody is fixing</span></div>
            <div class="toc-item"><span class="toc-num">03</span><span>SME bookings up 12% — but where</span></div>
            <div class="toc-item"><span class="toc-num">04</span><span>Five things to do this week</span></div>
          </div>
        </div>

        <!-- Lead story -->
        <div class="lead">
          <p class="kicker">Lead story</p>
          <h2 class="lead-headline">TProfile's £2.1M NJT deal isn't just about TProfile.</h2>
          <p class="lead-deck">It's a signal. Consortia are picking sides, and the agents inside them are about to find out what that means for their tech roadmap. Here's what to watch.</p>

          <div class="lead-image" style="background-image: url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80');"></div>

          <div class="lead-byline">
            <div class="byline-avatar">AS</div>
            <div class="byline-meta">
              <div class="byline-name">Andy Speight</div>
              <div>4 min read · Strategy</div>
            </div>
          </div>

          <div class="lead-body">
            <p>The headline number gets the attention. <strong>£2.1M from Not Just Travel</strong>, six hundred-plus agents getting TProfile free, Jet2 going live as the launch supplier. But the real story is what happens next inside the consortia world.</p>
            <p>For years, consortia tech was a fragmented mess — pick your CRM, pick your booking engine, pick your supplier connections, hope they talk. The NJT move is the first time a major consortium has bet a defining sum on one stack. Others are watching. PTS, TNG, Advantage — every consortium board meeting this quarter has the same agenda item.</p>
            <p>What this means for independent agents inside those consortia: <strong>the cost of tech inertia is about to go up</strong>. The agents who modernise their stack now are the ones who'll be in the strongest position when their consortium picks a side.</p>
            <a href="#" class="read-more">Read the full analysis →</a>
          </div>
        </div>

        <!-- Two-column -->
        <div class="duo">
          <div class="duo-grid">
            <div class="duo-item">
              <p class="item-tag">Trend watch</p>
              <h3>Why post-sale is the new pre-sale</h3>
              <p>The agents winning this year aren't outselling — they're out-supporting. The eight weeks between booking and departure is the single most underused window in travel.</p>
              <a href="#" class="small-link">Read more →</a>
            </div>
            <div class="duo-item">
              <p class="item-tag">Operator update</p>
              <h3>Jet2 Holidays opens dynamic packaging API</h3>
              <p>Quietly rolled out to selected partners last week. Jet2's first proper move toward agent-first distribution. Worth knowing what's in scope.</p>
              <a href="#" class="small-link">Read more →</a>
            </div>
          </div>
        </div>

        <!-- Industry pulse -->
        <div class="pulse">
          <p class="pulse-label">Industry pulse</p>
          <h2 class="pulse-title">The numbers that mattered this week</h2>
          <div class="pulse-stats">
            <div>
              <p class="pulse-stat-num">+<span>12</span>%</p>
              <p class="pulse-stat-label">SME travel agent bookings vs. same week 2025</p>
            </div>
            <div>
              <p class="pulse-stat-num"><span>£687</span></p>
              <p class="pulse-stat-label">Average UK package holiday spend, May to date</p>
            </div>
            <div>
              <p class="pulse-stat-num"><span>61</span>%</p>
              <p class="pulse-stat-label">Of bookings now happening outside 9 to 5 hours</p>
            </div>
          </div>
          <p class="pulse-source">Source: Travelgenix booking data, week ending 4 May 2026. Sample: 287 SME clients across 6 countries.</p>
        </div>

        <!-- Quick wins -->
        <div class="quickwins">
          <div class="quickwins-header">
            <h2 class="quickwins-title">Five things to do this week</h2>
            <span class="quickwins-time">10 min total</span>
          </div>
          <ol class="quickwins-list">
            <li class="quickwin-item">
              <span class="quickwin-num">1</span>
              <div class="quickwin-content">
                <h4>Audit your supplier mix</h4>
                <p>Pull a list of every supplier you've used in the last 90 days. If more than 30% of bookings go through one supplier, you're carrying concentration risk.</p>
              </div>
            </li>
            <li class="quickwin-item">
              <span class="quickwin-num">2</span>
              <div class="quickwin-content">
                <h4>Check your bounce rate on Tuesday morning</h4>
                <p>Tuesday 9 to 11am is now the busiest research window for UK package holidays. If your site bounces above 60% in that window, that's where to focus.</p>
              </div>
            </li>
            <li class="quickwin-item">
              <span class="quickwin-num">3</span>
              <div class="quickwin-content">
                <h4>Send one pre-departure message you've never sent before</h4>
                <p>Pick any client departing in the next four weeks. Send them something specific to their destination. Watch what happens to repeat booking rate.</p>
              </div>
            </li>
            <li class="quickwin-item">
              <span class="quickwin-num">4</span>
              <div class="quickwin-content">
                <h4>Review your three slowest-converting pages</h4>
                <p>Most travel sites have one or two pages doing 70% of the conversion. The rest are dead weight. Find them, fix them, or remove them.</p>
              </div>
            </li>
            <li class="quickwin-item">
              <span class="quickwin-num">5</span>
              <div class="quickwin-content">
                <h4>Block 30 minutes for a tech health check</h4>
                <p>Walk through the booking flow as a customer would. From a phone. On 4G. The friction you find is what your competitors are absorbing.</p>
              </div>
            </li>
          </ol>
        </div>

        <!-- Heard this week -->
        <div class="heard">
          <p class="heard-label">Heard this week</p>
          <p class="heard-quote">If you're still measuring success by bookings closed, you're measuring the wrong end of the customer relationship. The win is in the second trip.</p>
          <p class="heard-cite"><span class="heard-cite-name">Mark Reynolds</span>, MD at a UK regional agency, on a partner call</p>
        </div>

        <!-- On the radar -->
        <div class="radar">
          <h2 class="radar-title">On the radar</h2>
          <p class="radar-sub">Worth putting in the diary.</p>
          <div class="radar-list">
            <a href="#" class="radar-item">
              <div class="radar-date">May<span class="radar-date-day">14</span></div>
              <div class="radar-content">
                <h4>ABTA Travel Convention agenda drops</h4>
                <p>Watch for the AI panel — three names confirmed already.</p>
              </div>
            </a>
            <a href="#" class="radar-item">
              <div class="radar-date">Jun<span class="radar-date-day">24</span></div>
              <div class="radar-content">
                <h4>TravelTech Show, ExCeL London</h4>
                <p>Travelgenix on Stand 312. Book a slot to walk Quick Quote with us.</p>
              </div>
            </a>
            <a href="#" class="radar-item">
              <div class="radar-date">Jul<span class="radar-date-day">02</span></div>
              <div class="radar-content">
                <h4>UK summer booking peak forecast</h4>
                <p>Treasury data review — likely impact on consumer confidence.</p>
              </div>
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <div class="footer-logo">Travelgenix</div>
          <p class="footer-tag">Running a travel business can be complex, but your technology shouldn't be.</p>
          <div class="footer-links">
            <a href="#">Reply</a>
            <a href="#">Forward</a>
            <a href="#">Archive</a>
            <a href="#">Manage</a>
          </div>
          <p class="footer-meta">
            You're getting this because you signed up at travelgenix.io.<br>
            <a href="#">Update preferences</a> · <a href="#">Unsubscribe</a><br><br>
            Travelgenix Ltd · Bournemouth, UK · Co. #12781046
          </p>
        </div>

      </td></tr>
    </table>
  </div>
</div>

<script>
  function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    const label = document.getElementById('theme-label');
    const isDark = body.getAttribute('data-theme') === 'dark';
    if (isDark) {
      body.removeAttribute('data-theme');
      label.textContent = 'Dark mode';
      icon.innerHTML = '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>';
    } else {
      body.setAttribute('data-theme', 'dark');
      label.textContent = 'Light mode';
      icon.innerHTML = '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>';
    }
  }
</script>

</body>
</html>
```

---

## A.2 — Archetype B: Monthly Destination Newsletter (marketing)

```html
<!DOCTYPE html>
<!--
  ═══════════════════════════════════════════════════════════════════
  TRAVELGENIX EMAIL DESIGN REFERENCE — NOT PRODUCTION HTML

  This file is a visual ground-truth mockup for the design system.
  It uses modern CSS (gradients, flex, grid, animations) so it reads
  well in a browser. It is NOT the HTML that gets sent.

  Production emails are assembled by the renderer using the
  bulletproof Outlook-safe patterns documented in
  travelgenix-email-design SKILL.md §12.

  When you build the renderer, design from this file (the visual)
  but render using §12 patterns (the technique).
  ═══════════════════════════════════════════════════════════════════
-->

<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Travelgenix Newsletter Preview</title>
<style>
  /* Preview shell only — not part of the email */
  :root {
    --shell-bg: #f1f5f9;
    --shell-text: #0f172a;
    --shell-border: #e2e8f0;
    --shell-card: #ffffff;
  }
  [data-theme="dark"] {
    --shell-bg: #0a0f1f;
    --shell-text: #f8fafc;
    --shell-border: #1e293b;
    --shell-card: #0f172a;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: var(--shell-bg);
    color: var(--shell-text);
    transition: background 0.3s ease, color 0.3s ease;
  }
  .shell-header {
    position: sticky;
    top: 0;
    z-index: 10;
    background: var(--shell-card);
    border-bottom: 1px solid var(--shell-border);
    padding: 16px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    backdrop-filter: blur(12px);
  }
  .shell-title {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--shell-text);
    opacity: 0.7;
  }
  .theme-toggle {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    background: transparent;
    border: 1px solid var(--shell-border);
    border-radius: 999px;
    font-family: inherit;
    font-size: 12px;
    font-weight: 500;
    color: var(--shell-text);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .theme-toggle:hover {
    background: var(--shell-bg);
    transform: translateY(-1px);
  }
  .preview-frame {
    padding: 40px 20px 80px;
    display: flex;
    justify-content: center;
  }

  /* ============================================
     EMAIL STARTS HERE — everything below is the
     actual email design, table-based for Outlook.
     ============================================ */

  .email-wrapper {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }

  /* Email-specific tokens */
  .email-table {
    width: 100%;
    border-collapse: collapse;
    background: #ffffff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04),
                0 8px 24px rgba(15, 23, 42, 0.08),
                0 24px 64px rgba(15, 23, 42, 0.06);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: #0f172a;
  }

  [data-theme="dark"] .email-table {
    background: #111d3e;
    color: #f8fafc;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4),
                0 8px 24px rgba(0, 0, 0, 0.3),
                0 24px 64px rgba(0, 180, 216, 0.08);
  }

  /* Top bar */
  .top-bar {
    background: #1b2b5b;
    padding: 18px 32px;
    color: #ffffff;
  }
  .top-bar-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .logo {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #ffffff;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .logo-mark {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: linear-gradient(135deg, #00b4d8 0%, #48cae4 100%);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #1b2b5b;
    font-weight: 800;
    font-size: 14px;
  }
  .issue-meta {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #48cae4;
  }

  /* Hero */
  .hero {
    position: relative;
    padding: 0;
    background: #1b2b5b;
    overflow: hidden;
  }
  .hero-image {
    width: 100%;
    height: 320px;
    background-image:
      linear-gradient(180deg, rgba(27, 43, 91, 0) 0%, rgba(27, 43, 91, 0.85) 100%),
      url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80');
    background-size: cover;
    background-position: center;
    position: relative;
  }
  .hero-content {
    padding: 48px 32px 40px;
    background: #1b2b5b;
    color: #ffffff;
    position: relative;
    margin-top: -80px;
  }
  .hero-eyebrow {
    display: inline-block;
    padding: 6px 12px;
    background: rgba(0, 180, 216, 0.15);
    border: 1px solid rgba(0, 180, 216, 0.3);
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #48cae4;
    margin-bottom: 20px;
  }
  .hero-title {
    font-size: 36px;
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -0.025em;
    margin: 0 0 16px;
    color: #ffffff;
  }
  .hero-subtitle {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.8);
    margin: 0 0 28px;
    max-width: 480px;
  }
  .btn-primary {
    display: inline-block;
    padding: 14px 28px;
    background: #00b4d8;
    color: #0f172a;
    text-decoration: none;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.005em;
    transition: all 0.2s ease;
  }
  .btn-primary:hover {
    background: #48cae4;
    transform: translateY(-1px);
  }

  /* Section */
  .section {
    padding: 56px 32px;
  }
  .section-eyebrow {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #00b4d8;
    margin: 0 0 12px;
  }
  [data-theme="dark"] .section-eyebrow {
    color: #48cae4;
  }
  .section-title {
    font-size: 26px;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: #0f172a;
    margin: 0 0 8px;
  }
  [data-theme="dark"] .section-title {
    color: #f8fafc;
  }
  .section-lede {
    font-size: 15px;
    line-height: 1.6;
    color: #475569;
    margin: 0 0 32px;
    max-width: 520px;
  }
  [data-theme="dark"] .section-lede {
    color: #cbd5e1;
  }

  /* Destinations grid */
  .destinations {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .destination-card {
    border-radius: 12px;
    overflow: hidden;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    transition: all 0.2s ease;
    text-decoration: none;
    color: inherit;
    display: block;
  }
  [data-theme="dark"] .destination-card {
    background: #1e293b;
    border-color: #334155;
  }
  .destination-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
    border-color: #00b4d8;
  }
  .destination-image {
    width: 100%;
    height: 180px;
    background-size: cover;
    background-position: center;
  }
  .destination-body {
    padding: 20px;
  }
  .destination-tag {
    display: inline-block;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #00b4d8;
    margin-bottom: 8px;
  }
  [data-theme="dark"] .destination-tag {
    color: #48cae4;
  }
  .destination-name {
    font-size: 18px;
    font-weight: 600;
    letter-spacing: -0.015em;
    color: #0f172a;
    margin: 0 0 6px;
  }
  [data-theme="dark"] .destination-name {
    color: #f8fafc;
  }
  .destination-meta {
    font-size: 13px;
    color: #475569;
    margin: 0;
  }
  [data-theme="dark"] .destination-meta {
    color: #cbd5e1;
  }
  .destination-price {
    font-size: 13px;
    font-weight: 600;
    color: #1b2b5b;
    margin-top: 12px;
    display: flex;
    align-items: baseline;
    gap: 6px;
  }
  [data-theme="dark"] .destination-price {
    color: #48cae4;
  }
  .destination-price-from {
    font-size: 11px;
    font-weight: 500;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .destination-price-amount {
    font-size: 20px;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  /* Feature story */
  .feature {
    background: #f8fafc;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid #e2e8f0;
  }
  [data-theme="dark"] .feature {
    background: #1e293b;
    border-color: #334155;
  }
  .feature-image {
    width: 100%;
    height: 240px;
    background-size: cover;
    background-position: center;
  }
  .feature-body {
    padding: 32px;
  }
  .feature-title {
    font-size: 22px;
    font-weight: 700;
    line-height: 1.25;
    letter-spacing: -0.02em;
    color: #0f172a;
    margin: 0 0 12px;
  }
  [data-theme="dark"] .feature-title {
    color: #f8fafc;
  }
  .feature-excerpt {
    font-size: 15px;
    line-height: 1.65;
    color: #475569;
    margin: 0 0 20px;
  }
  [data-theme="dark"] .feature-excerpt {
    color: #cbd5e1;
  }
  .feature-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    font-weight: 600;
    color: #00b4d8;
    text-decoration: none;
    letter-spacing: -0.005em;
  }
  [data-theme="dark"] .feature-link {
    color: #48cae4;
  }
  .feature-link:hover {
    color: #0096b7;
  }
  .feature-link-arrow {
    transition: transform 0.2s ease;
    display: inline-block;
  }
  .feature-link:hover .feature-link-arrow {
    transform: translateX(3px);
  }

  /* Quote / pull-quote */
  .quote-block {
    border-left: 3px solid #00b4d8;
    padding: 24px 0 24px 28px;
    margin: 0;
  }
  .quote-text {
    font-size: 19px;
    font-weight: 500;
    line-height: 1.45;
    letter-spacing: -0.015em;
    color: #0f172a;
    margin: 0 0 16px;
    font-style: italic;
  }
  [data-theme="dark"] .quote-text {
    color: #f8fafc;
  }
  .quote-cite {
    font-size: 13px;
    color: #475569;
    margin: 0;
    font-style: normal;
  }
  [data-theme="dark"] .quote-cite {
    color: #cbd5e1;
  }
  .quote-cite-name {
    font-weight: 600;
    color: #0f172a;
  }
  [data-theme="dark"] .quote-cite-name {
    color: #f8fafc;
  }

  /* Divider */
  .divider {
    height: 1px;
    background: #e2e8f0;
    border: none;
    margin: 0;
  }
  [data-theme="dark"] .divider {
    background: #334155;
  }

  /* CTA banner */
  .cta-banner {
    background: linear-gradient(135deg, #1b2b5b 0%, #2a3f7a 100%);
    padding: 48px 32px;
    text-align: center;
    color: #ffffff;
    position: relative;
    overflow: hidden;
  }
  .cta-banner::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(0, 180, 216, 0.15) 0%, transparent 70%);
    pointer-events: none;
  }
  .cta-title {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin: 0 0 12px;
    position: relative;
  }
  .cta-text {
    font-size: 15px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.8);
    margin: 0 0 24px;
    max-width: 420px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
  }
  .cta-banner .btn-primary {
    position: relative;
  }

  /* Footer */
  .footer {
    background: #f8fafc;
    padding: 40px 32px 32px;
    text-align: center;
    color: #475569;
  }
  [data-theme="dark"] .footer {
    background: #0a0f1f;
    color: #94a3b8;
  }
  .footer-logo {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #1b2b5b;
    margin-bottom: 12px;
  }
  [data-theme="dark"] .footer-logo {
    color: #48cae4;
  }
  .footer-tagline {
    font-size: 13px;
    color: #475569;
    margin: 0 0 24px;
    max-width: 360px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
  }
  [data-theme="dark"] .footer-tagline {
    color: #94a3b8;
  }
  .footer-socials {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 24px;
  }
  .social-link {
    width: 36px;
    height: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #e2e8f0;
    border-radius: 50%;
    color: #475569;
    text-decoration: none;
    transition: all 0.2s ease;
  }
  [data-theme="dark"] .social-link {
    border-color: #334155;
    color: #94a3b8;
  }
  .social-link:hover {
    background: #1b2b5b;
    border-color: #1b2b5b;
    color: #ffffff;
  }
  .footer-meta {
    font-size: 11px;
    color: #94a3b8;
    line-height: 1.6;
    margin: 0;
  }
  .footer-meta a {
    color: #475569;
    text-decoration: underline;
  }
  [data-theme="dark"] .footer-meta a {
    color: #cbd5e1;
  }

  /* Responsive */
  @media (max-width: 640px) {
    .hero-title { font-size: 28px; }
    .section { padding: 40px 24px; }
    .hero-content { padding: 36px 24px 32px; }
    .top-bar { padding: 16px 24px; }
    .feature-body { padding: 24px; }
    .cta-banner { padding: 36px 24px; }
  }
</style>
</head>
<body>

<!-- Preview shell -->
<div class="shell-header">
  <span class="shell-title">Travelgenix Newsletter — Preview</span>
  <button class="theme-toggle" onclick="toggleTheme()">
    <svg id="theme-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
    </svg>
    <span id="theme-label">Dark mode</span>
  </button>
</div>

<div class="preview-frame">
  <div class="email-wrapper">

    <!-- ============== EMAIL ============== -->
    <table class="email-table" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td>

          <!-- Top bar -->
          <div class="top-bar">
            <div class="top-bar-inner">
              <a href="#" class="logo">
                <span class="logo-mark">T</span>
                <span>Travelgenix</span>
              </a>
              <span class="issue-meta">Issue 24 · May 2026</span>
            </div>
          </div>

          <!-- Hero -->
          <div class="hero">
            <div class="hero-image"></div>
            <div class="hero-content">
              <span class="hero-eyebrow">This Month</span>
              <h1 class="hero-title">Quiet shores, busy bookings.</h1>
              <p class="hero-subtitle">May is the sweet spot for shoulder-season travel — fewer crowds, softer prices, and the kind of weather that makes everyone want to escape. Here's what's moving for your clients this month.</p>
              <a href="#" class="btn-primary">Browse this month's deals</a>
            </div>
          </div>

          <!-- Destinations -->
          <div class="section">
            <p class="section-eyebrow">Trending now</p>
            <h2 class="section-title">Three destinations worth a closer look</h2>
            <p class="section-lede">Picked by our partners team based on availability, value, and what your clients are actually asking for this week.</p>

            <div class="destinations">

              <a href="#" class="destination-card">
                <div class="destination-image" style="background-image: linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.2) 100%), url('https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80');"></div>
                <div class="destination-body">
                  <span class="destination-tag">Greek Islands</span>
                  <h3 class="destination-name">Lindos, Rhodes</h3>
                  <p class="destination-meta">7 nights · 4★ boutique · all inclusive</p>
                  <div class="destination-price">
                    <span class="destination-price-from">From</span>
                    <span class="destination-price-amount">£689</span>
                    <span class="destination-price-from">pp</span>
                  </div>
                </div>
              </a>

              <a href="#" class="destination-card">
                <div class="destination-image" style="background-image: linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.2) 100%), url('https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=800&q=80');"></div>
                <div class="destination-body">
                  <span class="destination-tag">Algarve</span>
                  <h3 class="destination-name">Albufeira</h3>
                  <p class="destination-meta">7 nights · 5★ adults only · half board</p>
                  <div class="destination-price">
                    <span class="destination-price-from">From</span>
                    <span class="destination-price-amount">£849</span>
                    <span class="destination-price-from">pp</span>
                  </div>
                </div>
              </a>

              <a href="#" class="destination-card">
                <div class="destination-image" style="background-image: linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.2) 100%), url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80');"></div>
                <div class="destination-body">
                  <span class="destination-tag">Long-haul value</span>
                  <h3 class="destination-name">Cancun, Mexico</h3>
                  <p class="destination-meta">10 nights · 5★ resort · all inclusive</p>
                  <div class="destination-price">
                    <span class="destination-price-from">From</span>
                    <span class="destination-price-amount">£1,249</span>
                    <span class="destination-price-from">pp</span>
                  </div>
                </div>
              </a>

            </div>
          </div>

          <hr class="divider">

          <!-- Feature story -->
          <div class="section">
            <p class="section-eyebrow">Feature</p>
            <h2 class="section-title">Why post-sale matters more than the sale itself</h2>
            <p class="section-lede">The agents winning this year aren't outselling — they're out-supporting. Here's what we're seeing in the data.</p>

            <div class="feature">
              <div class="feature-image" style="background-image: url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80');"></div>
              <div class="feature-body">
                <h3 class="feature-title">The post-booking gap is your biggest growth lever</h3>
                <p class="feature-excerpt">Most travel businesses pour energy into the search and the sale, then go quiet. The clients who keep growing — even in a flat market — are the ones who treat the eight weeks between booking and departure as the most valuable window they own.</p>
                <a href="#" class="feature-link">
                  Read the full piece
                  <span class="feature-link-arrow">→</span>
                </a>
              </div>
            </div>
          </div>

          <hr class="divider">

          <!-- Pull quote -->
          <div class="section">
            <blockquote class="quote-block">
              <p class="quote-text">"We were drowning in supplier portals before Travelgenix. Now we book three times faster and our clients actually feel looked after between booking and departure."</p>
              <p class="quote-cite">
                <span class="quote-cite-name">Sarah Mitchell</span> · Mitchell Travel, Bournemouth
              </p>
            </blockquote>
          </div>

          <!-- CTA banner -->
          <div class="cta-banner">
            <h2 class="cta-title">See what your business could look like</h2>
            <p class="cta-text">Book a 20-minute walk-through and we'll show you exactly how Travelgenix fits the way you already work.</p>
            <a href="#" class="btn-primary">Book a demo</a>
          </div>

          <!-- Footer -->
          <div class="footer">
            <div class="footer-logo">Travelgenix</div>
            <p class="footer-tagline">Running a travel business can be complex, but your technology shouldn't be.</p>

            <div class="footer-socials">
              <a href="#" class="social-link" aria-label="LinkedIn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>
              </a>
              <a href="#" class="social-link" aria-label="Facebook">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
              </a>
              <a href="#" class="social-link" aria-label="Instagram">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01"/></svg>
              </a>
            </div>

            <p class="footer-meta">
              You're receiving this because you're part of the Travelgenix community.<br>
              <a href="#">Update preferences</a> · <a href="#">Unsubscribe</a> · <a href="#">View in browser</a><br><br>
              Travelgenix Ltd · Bournemouth, United Kingdom · Co. #12781046
            </p>
          </div>

        </td>
      </tr>
    </table>
    <!-- ============== /EMAIL ============== -->

  </div>
</div>

<script>
  function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    const label = document.getElementById('theme-label');
    const isDark = body.getAttribute('data-theme') === 'dark';

    if (isDark) {
      body.removeAttribute('data-theme');
      label.textContent = 'Dark mode';
      icon.innerHTML = '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>';
    } else {
      body.setAttribute('data-theme', 'dark');
      label.textContent = 'Light mode';
      icon.innerHTML = '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>';
    }
  }
</script>

</body>
</html>
```

---

## A.3 — Archetype C: Luna Chat Product Launch

```html
<!DOCTYPE html>
<!--
  ═══════════════════════════════════════════════════════════════════
  TRAVELGENIX EMAIL DESIGN REFERENCE — NOT PRODUCTION HTML

  This file is a visual ground-truth mockup for the design system.
  It uses modern CSS (gradients, flex, grid, animations) so it reads
  well in a browser. It is NOT the HTML that gets sent.

  Production emails are assembled by the renderer using the
  bulletproof Outlook-safe patterns documented in
  travelgenix-email-design SKILL.md §12.

  When you build the renderer, design from this file (the visual)
  but render using §12 patterns (the technique).
  ═══════════════════════════════════════════════════════════════════
-->

<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Introducing Luna Chat — Preview</title>
<style>
  /* Preview shell */
  :root { --shell-bg: #f1f5f9; --shell-text: #0f172a; --shell-border: #e2e8f0; --shell-card: #ffffff; }
  [data-theme="dark"] { --shell-bg: #0a0f1f; --shell-text: #f8fafc; --shell-border: #1e293b; --shell-card: #0f172a; }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: var(--shell-bg); color: var(--shell-text); transition: background 0.3s ease; }
  .shell-header { position: sticky; top: 0; z-index: 10; background: var(--shell-card); border-bottom: 1px solid var(--shell-border); padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; backdrop-filter: blur(12px); }
  .shell-title { font-size: 13px; font-weight: 600; opacity: 0.7; }
  .theme-toggle { display: inline-flex; align-items: center; gap: 8px; padding: 8px 14px; background: transparent; border: 1px solid var(--shell-border); border-radius: 999px; font-family: inherit; font-size: 12px; font-weight: 500; color: var(--shell-text); cursor: pointer; transition: all 0.2s ease; }
  .theme-toggle:hover { background: var(--shell-bg); transform: translateY(-1px); }
  .preview-frame { padding: 40px 20px 80px; display: flex; justify-content: center; }

  /* ============ EMAIL ============ */
  .email-wrapper { width: 100%; max-width: 600px; margin: 0 auto; }
  .email-table {
    width: 100%; border-collapse: collapse; background: #ffffff; border-radius: 20px; overflow: hidden;
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04), 0 12px 32px rgba(15, 23, 42, 0.08), 0 32px 80px rgba(0, 180, 216, 0.06);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #0f172a;
  }
  [data-theme="dark"] .email-table { background: #0f172a; color: #f8fafc; box-shadow: 0 32px 80px rgba(0,180,216,0.12); }

  /* Hero — full bleed dark with animated glow effect */
  .hero {
    position: relative;
    background: #0a0f1f;
    color: #ffffff;
    padding: 48px 40px 56px;
    overflow: hidden;
    isolation: isolate;
  }
  /* Layered gradient mesh — feels like a product launch */
  .hero::before {
    content: '';
    position: absolute;
    top: -200px; left: -200px;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(0, 180, 216, 0.4) 0%, transparent 60%);
    z-index: -1;
    filter: blur(40px);
  }
  .hero::after {
    content: '';
    position: absolute;
    bottom: -150px; right: -100px;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(72, 202, 228, 0.35) 0%, transparent 60%);
    z-index: -1;
    filter: blur(40px);
  }
  .hero-nav {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 80px; position: relative;
  }
  .hero-logo {
    display: flex; align-items: center; gap: 10px;
    font-size: 14px; font-weight: 700; letter-spacing: -0.01em;
    color: #ffffff; text-decoration: none;
  }
  .hero-logo-mark {
    width: 26px; height: 26px;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    backdrop-filter: blur(10px);
    border-radius: 7px;
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 800;
  }
  .new-badge {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 6px 12px;
    background: rgba(0, 180, 216, 0.15);
    border: 1px solid rgba(0, 180, 216, 0.4);
    border-radius: 999px;
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: #48cae4;
  }
  .new-badge-dot {
    width: 6px; height: 6px;
    background: #00b4d8;
    border-radius: 50%;
    box-shadow: 0 0 8px #00b4d8;
    animation: pulse 2s ease-in-out infinite;
  }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
  .hero-eyebrow {
    font-size: 12px; font-weight: 600;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: #48cae4; margin: 0 0 20px;
    position: relative;
  }
  .hero-headline {
    font-size: 52px; font-weight: 800;
    line-height: 1.02; letter-spacing: -0.04em;
    margin: 0 0 20px;
    color: #ffffff;
    position: relative;
  }
  .hero-headline em {
    font-style: italic;
    background: linear-gradient(135deg, #00b4d8 0%, #48cae4 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: #48cae4;
  }
  .hero-deck {
    font-size: 18px; line-height: 1.55;
    color: rgba(255, 255, 255, 0.75);
    margin: 0 0 36px; max-width: 480px;
    position: relative;
    letter-spacing: -0.005em;
  }
  .hero-cta-group {
    display: flex; gap: 12px; align-items: center;
    position: relative; flex-wrap: wrap;
  }
  .btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 16px 28px;
    background: #00b4d8;
    color: #0a0f1f;
    text-decoration: none;
    border-radius: 12px;
    font-size: 15px; font-weight: 700;
    letter-spacing: -0.01em;
    box-shadow: 0 4px 20px rgba(0, 180, 216, 0.4);
    transition: all 0.2s ease;
  }
  .btn-primary:hover {
    background: #48cae4;
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(0, 180, 216, 0.5);
  }
  .btn-secondary {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 16px 22px;
    background: transparent;
    color: #ffffff;
    text-decoration: none;
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 12px;
    font-size: 15px; font-weight: 600;
    letter-spacing: -0.01em;
    transition: all 0.2s ease;
  }
  .btn-secondary:hover {
    background: rgba(255,255,255,0.05);
    border-color: rgba(255,255,255,0.4);
  }

  /* Product visual / mockup */
  .visual-wrap {
    background: #ffffff;
    padding: 48px 40px 8px;
    text-align: center;
  }
  [data-theme="dark"] .visual-wrap { background: #0f172a; }
  .visual-frame {
    background: linear-gradient(135deg, #f8fafc 0%, #e0f7fa 100%);
    border-radius: 16px;
    padding: 40px 32px 0;
    position: relative;
    overflow: hidden;
    border: 1px solid #e2e8f0;
  }
  [data-theme="dark"] .visual-frame {
    background: linear-gradient(135deg, #1e293b 0%, #0a3a4a 100%);
    border-color: #334155;
  }

  /* Faux chat widget */
  .chat-mock {
    background: #ffffff;
    border-radius: 16px 16px 0 0;
    box-shadow: 0 -4px 24px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(15, 23, 42, 0.04);
    text-align: left;
    margin: 0 auto;
    max-width: 360px;
    overflow: hidden;
  }
  [data-theme="dark"] .chat-mock { background: #1e293b; box-shadow: 0 -4px 24px rgba(0,0,0,0.4); }
  .chat-header {
    background: #1b2b5b;
    color: #fff;
    padding: 14px 18px;
    display: flex; align-items: center; gap: 10px;
  }
  .chat-avatar {
    width: 32px; height: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, #00b4d8, #48cae4);
    display: inline-flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 13px; color: #0a0f1f;
    position: relative;
  }
  .chat-avatar::after {
    content: ''; position: absolute; bottom: 0; right: 0;
    width: 10px; height: 10px;
    background: #10b981;
    border-radius: 50%;
    border: 2px solid #1b2b5b;
  }
  .chat-name { font-size: 13px; font-weight: 600; margin: 0; }
  .chat-status { font-size: 11px; color: rgba(255,255,255,0.7); margin: 0; }
  .chat-body { padding: 18px; }
  .chat-msg {
    padding: 10px 14px;
    border-radius: 14px;
    font-size: 13px; line-height: 1.45;
    margin-bottom: 8px;
    max-width: 85%;
  }
  .chat-msg-bot {
    background: #f1f5f9;
    color: #0f172a;
    border-bottom-left-radius: 4px;
  }
  [data-theme="dark"] .chat-msg-bot { background: #334155; color: #f8fafc; }
  .chat-msg-user {
    background: #00b4d8;
    color: #0a0f1f;
    margin-left: auto;
    border-bottom-right-radius: 4px;
    font-weight: 500;
  }
  .chat-typing {
    display: inline-flex; gap: 3px;
    padding: 12px 14px;
    background: #f1f5f9;
    border-radius: 14px;
    border-bottom-left-radius: 4px;
  }
  [data-theme="dark"] .chat-typing { background: #334155; }
  .typing-dot {
    width: 6px; height: 6px;
    background: #94a3b8;
    border-radius: 50%;
    animation: typing 1.4s ease-in-out infinite;
  }
  .typing-dot:nth-child(2) { animation-delay: 0.2s; }
  .typing-dot:nth-child(3) { animation-delay: 0.4s; }
  @keyframes typing { 0%, 60%, 100% { transform: translateY(0); opacity: 0.4; } 30% { transform: translateY(-4px); opacity: 1; } }

  /* What's new section */
  .features {
    padding: 60px 40px 48px;
    background: #ffffff;
  }
  [data-theme="dark"] .features { background: #0f172a; }
  .features-eyebrow {
    font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    color: #00b4d8; margin: 0 0 12px; text-align: center;
  }
  [data-theme="dark"] .features-eyebrow { color: #48cae4; }
  .features-title {
    font-size: 30px; font-weight: 700; line-height: 1.2; letter-spacing: -0.025em;
    color: #0f172a; margin: 0 0 12px; text-align: center;
  }
  [data-theme="dark"] .features-title { color: #f8fafc; }
  .features-lede {
    font-size: 16px; line-height: 1.6; color: #475569;
    text-align: center; margin: 0 auto 40px;
    max-width: 460px;
  }
  [data-theme="dark"] .features-lede { color: #cbd5e1; }

  .feature-row {
    display: grid;
    grid-template-columns: 60px 1fr;
    gap: 20px;
    padding: 24px 0;
    border-bottom: 1px solid #f1f5f9;
    align-items: flex-start;
  }
  [data-theme="dark"] .feature-row { border-bottom-color: #1e293b; }
  .feature-row:last-child { border-bottom: none; }
  .feature-icon {
    width: 48px; height: 48px;
    background: linear-gradient(135deg, #00b4d8, #48cae4);
    border-radius: 12px;
    display: inline-flex; align-items: center; justify-content: center;
    color: #fff;
    box-shadow: 0 4px 12px rgba(0, 180, 216, 0.25);
  }
  .feature-content h3 {
    font-size: 18px; font-weight: 700;
    letter-spacing: -0.015em; color: #0f172a;
    margin: 4px 0 6px;
  }
  [data-theme="dark"] .feature-content h3 { color: #f8fafc; }
  .feature-content p {
    font-size: 14px; line-height: 1.6;
    color: #475569; margin: 0;
  }
  [data-theme="dark"] .feature-content p { color: #cbd5e1; }

  /* Big number block */
  .stats-strip {
    background: #f8fafc;
    padding: 40px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 24px;
    border-top: 1px solid #e2e8f0;
    border-bottom: 1px solid #e2e8f0;
  }
  [data-theme="dark"] .stats-strip { background: #1e293b; border-color: #334155; }
  .stat { text-align: center; }
  .stat-num {
    font-size: 36px; font-weight: 800;
    letter-spacing: -0.035em; line-height: 1;
    color: #1b2b5b; margin: 0 0 8px;
    font-variant-numeric: tabular-nums;
  }
  [data-theme="dark"] .stat-num { color: #48cae4; }
  .stat-label {
    font-size: 12px; font-weight: 500;
    color: #475569; margin: 0;
    line-height: 1.4;
  }
  [data-theme="dark"] .stat-label { color: #94a3b8; }

  /* Testimonial */
  .testimonial {
    padding: 56px 40px;
    text-align: center;
    background: #ffffff;
  }
  [data-theme="dark"] .testimonial { background: #0f172a; }
  .testimonial-quote {
    font-size: 22px; line-height: 1.4; letter-spacing: -0.02em;
    color: #0f172a; margin: 0 0 24px;
    font-weight: 500; max-width: 480px;
    margin-left: auto; margin-right: auto;
    font-style: italic;
  }
  [data-theme="dark"] .testimonial-quote { color: #f8fafc; }
  .testimonial-author { display: inline-flex; align-items: center; gap: 12px; }
  .testimonial-avatar {
    width: 44px; height: 44px;
    border-radius: 50%;
    background: linear-gradient(135deg, #1b2b5b, #2a3f7a);
    color: #fff;
    display: inline-flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 15px;
  }
  .testimonial-meta { text-align: left; }
  .testimonial-name {
    font-size: 14px; font-weight: 600;
    color: #0f172a; margin: 0;
  }
  [data-theme="dark"] .testimonial-name { color: #f8fafc; }
  .testimonial-role {
    font-size: 12px; color: #475569; margin: 2px 0 0;
  }
  [data-theme="dark"] .testimonial-role { color: #94a3b8; }

  /* Final CTA */
  .final-cta {
    background: linear-gradient(135deg, #1b2b5b 0%, #0a0f1f 100%);
    padding: 60px 40px;
    text-align: center;
    color: #ffffff;
    position: relative;
    overflow: hidden;
  }
  .final-cta::before {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(0,180,216,0.18) 0%, transparent 60%);
    transform: translate(-50%, -50%);
    filter: blur(60px);
  }
  .final-cta-eyebrow {
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: #48cae4; margin: 0 0 16px;
    position: relative;
  }
  .final-cta-title {
    font-size: 32px; font-weight: 800;
    letter-spacing: -0.03em; line-height: 1.15;
    margin: 0 0 16px; color: #ffffff;
    position: relative;
  }
  .final-cta-text {
    font-size: 16px; line-height: 1.55;
    color: rgba(255,255,255,0.75);
    margin: 0 auto 32px; max-width: 420px;
    position: relative;
  }

  /* Footer */
  .footer {
    background: #0a0f1f;
    color: #94a3b8;
    padding: 32px 40px;
    text-align: center;
    border-top: 1px solid rgba(255,255,255,0.06);
  }
  .footer-logo {
    font-size: 13px; font-weight: 800;
    letter-spacing: -0.02em; color: #ffffff;
    margin-bottom: 16px;
  }
  .footer-links { display: flex; justify-content: center; gap: 18px; margin-bottom: 16px; font-size: 12px; }
  .footer-links a { color: #94a3b8; text-decoration: none; }
  .footer-meta { font-size: 11px; color: #475569; line-height: 1.6; margin: 0; }
  .footer-meta a { color: #94a3b8; text-decoration: underline; }

  @media (max-width: 640px) {
    .hero { padding: 32px 24px 40px; }
    .hero-nav { margin-bottom: 56px; }
    .hero-headline { font-size: 36px; }
    .hero-deck { font-size: 16px; }
    .visual-wrap, .features, .testimonial, .final-cta { padding-left: 24px; padding-right: 24px; }
    .stats-strip { grid-template-columns: 1fr; padding: 32px 24px; gap: 28px; }
    .feature-row { grid-template-columns: 48px 1fr; gap: 14px; }
    .feature-icon { width: 40px; height: 40px; }
    .features-title, .final-cta-title { font-size: 24px; }
    .testimonial-quote { font-size: 18px; }
  }
</style>
</head>
<body>

<div class="shell-header">
  <span class="shell-title">Luna Chat Launch — Product Announcement Preview</span>
  <button class="theme-toggle" onclick="toggleTheme()">
    <svg id="theme-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>
    <span id="theme-label">Dark mode</span>
  </button>
</div>

<div class="preview-frame">
  <div class="email-wrapper">
    <table class="email-table" cellpadding="0" cellspacing="0" border="0">
      <tr><td>

        <!-- Hero -->
        <div class="hero">
          <div class="hero-nav">
            <a href="#" class="hero-logo">
              <span class="hero-logo-mark">T</span>
              <span>Travelgenix</span>
            </a>
            <span class="new-badge">
              <span class="new-badge-dot"></span>
              New launch
            </span>
          </div>

          <p class="hero-eyebrow">Introducing Luna Chat</p>
          <h1 class="hero-headline">Live conversations.<br><em>Smarter sales.</em></h1>
          <p class="hero-deck">The AI-powered live chat built for travel businesses. It answers the easy questions, hands the complex ones to your team, and turns more browsers into bookings — 24 hours a day.</p>

          <div class="hero-cta-group">
            <a href="#" class="btn-primary">
              Get early access
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
            <a href="#" class="btn-secondary">
              Watch the 90-sec demo
            </a>
          </div>
        </div>

        <!-- Product visual -->
        <div class="visual-wrap">
          <div class="visual-frame">
            <div class="chat-mock">
              <div class="chat-header">
                <div class="chat-avatar">L</div>
                <div>
                  <p class="chat-name">Luna</p>
                  <p class="chat-status">Online · responds instantly</p>
                </div>
              </div>
              <div class="chat-body">
                <div class="chat-msg chat-msg-bot">Hi! Looking for some sunshine this summer? I can help you find a deal in seconds.</div>
                <div class="chat-msg chat-msg-user">7 nights in Rhodes, late June, all inclusive</div>
                <div class="chat-msg chat-msg-bot">Perfect. I've found 14 options from £589pp. Want me to filter by 4★ and above?</div>
                <div class="chat-typing">
                  <span class="typing-dot"></span>
                  <span class="typing-dot"></span>
                  <span class="typing-dot"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Features -->
        <div class="features">
          <p class="features-eyebrow">What it does</p>
          <h2 class="features-title">Built specifically for the way travel converts</h2>
          <p class="features-lede">Luna Chat isn't a generic bot dressed in travel clothes. It's purpose-built to handle real customer questions with real travel intelligence.</p>

          <div class="feature-row">
            <div class="feature-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <div class="feature-content">
              <h3>Answers travel questions, not just FAQs</h3>
              <p>Trained on your destinations, suppliers, and policies. It knows the difference between Ayia Napa and Albufeira, and when to hand off to a human.</p>
            </div>
          </div>

          <div class="feature-row">
            <div class="feature-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
            <div class="feature-content">
              <h3>Live searches inside the conversation</h3>
              <p>Customer asks for a deal, Luna pulls live availability and pricing from your suppliers. No back-and-forth, no broken handoffs.</p>
            </div>
          </div>

          <div class="feature-row">
            <div class="feature-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div class="feature-content">
              <h3>Knows when to fetch a human</h3>
              <p>Routes complex questions to your team with full context. Your agents jump in mid-conversation and never start from scratch.</p>
            </div>
          </div>

          <div class="feature-row">
            <div class="feature-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div class="feature-content">
              <h3>Works while you sleep</h3>
              <p>61% of holiday research now happens outside 9 to 5. Luna captures and qualifies those leads so your morning starts with hot enquiries, not a cold inbox.</p>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="stats-strip">
          <div class="stat">
            <p class="stat-num">3.2x</p>
            <p class="stat-label">More qualified leads vs. static contact forms</p>
          </div>
          <div class="stat">
            <p class="stat-num">42%</p>
            <p class="stat-label">Of conversations resolved without human handoff</p>
          </div>
          <div class="stat">
            <p class="stat-num">90s</p>
            <p class="stat-label">From install to first conversation, average</p>
          </div>
        </div>

        <!-- Testimonial -->
        <div class="testimonial">
          <p class="testimonial-quote">"It picked up six leads on its first weekend live. Two of them booked. Honestly, it paid for itself before we'd even had a Monday morning team meeting."</p>
          <div class="testimonial-author">
            <div class="testimonial-avatar">JR</div>
            <div class="testimonial-meta">
              <p class="testimonial-name">James Reynolds</p>
              <p class="testimonial-role">Director, Reynolds Travel Group</p>
            </div>
          </div>
        </div>

        <!-- Final CTA -->
        <div class="final-cta">
          <p class="final-cta-eyebrow">Limited early access</p>
          <h2 class="final-cta-title">Be among the first 50 businesses to go live.</h2>
          <p class="final-cta-text">Early access clients get 90 days free, white-glove setup, and direct input into the roadmap. Spaces are filling fast.</p>
          <a href="#" class="btn-primary">
            Claim your spot
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </a>
        </div>

        <!-- Footer -->
        <div class="footer">
          <div class="footer-logo">Travelgenix</div>
          <div class="footer-links">
            <a href="#">Reply</a>
            <a href="#">Forward</a>
            <a href="#">Manage</a>
          </div>
          <p class="footer-meta">
            You're getting this because you're part of the Travelgenix community.<br>
            <a href="#">Update preferences</a> · <a href="#">Unsubscribe</a><br><br>
            Travelgenix Ltd · Bournemouth, UK · Co. #12781046
          </p>
        </div>

      </td></tr>
    </table>
  </div>
</div>

<script>
  function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    const label = document.getElementById('theme-label');
    const isDark = body.getAttribute('data-theme') === 'dark';
    if (isDark) {
      body.removeAttribute('data-theme');
      label.textContent = 'Dark mode';
      icon.innerHTML = '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>';
    } else {
      body.setAttribute('data-theme', 'dark');
      label.textContent = 'Light mode';
      icon.innerHTML = '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>';
    }
  }
</script>

</body>
</html>
```

---

## A.4 — Archetype D: Booking Confirmation (transactional)

```html
<!DOCTYPE html>
<!--
  ═══════════════════════════════════════════════════════════════════
  TRAVELGENIX EMAIL DESIGN REFERENCE — NOT PRODUCTION HTML

  This file is a visual ground-truth mockup for the design system.
  It uses modern CSS (gradients, flex, grid, animations) so it reads
  well in a browser. It is NOT the HTML that gets sent.

  Production emails are assembled by the renderer using the
  bulletproof Outlook-safe patterns documented in
  travelgenix-email-design SKILL.md §12.

  When you build the renderer, design from this file (the visual)
  but render using §12 patterns (the technique).
  ═══════════════════════════════════════════════════════════════════
-->

<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Booking Confirmation — Preview</title>
<style>
  /* Preview shell */
  :root { --shell-bg: #f1f5f9; --shell-text: #0f172a; --shell-border: #e2e8f0; --shell-card: #ffffff; }
  [data-theme="dark"] { --shell-bg: #0a0f1f; --shell-text: #f8fafc; --shell-border: #1e293b; --shell-card: #0f172a; }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: var(--shell-bg); color: var(--shell-text); transition: background 0.3s ease; }
  .shell-header { position: sticky; top: 0; z-index: 10; background: var(--shell-card); border-bottom: 1px solid var(--shell-border); padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; backdrop-filter: blur(12px); }
  .shell-title { font-size: 13px; font-weight: 600; opacity: 0.7; }
  .theme-toggle { display: inline-flex; align-items: center; gap: 8px; padding: 8px 14px; background: transparent; border: 1px solid var(--shell-border); border-radius: 999px; font-family: inherit; font-size: 12px; font-weight: 500; color: var(--shell-text); cursor: pointer; transition: all 0.2s ease; }
  .theme-toggle:hover { background: var(--shell-bg); transform: translateY(-1px); }
  .preview-frame { padding: 40px 20px 80px; display: flex; justify-content: center; }

  /* ============ EMAIL ============ */
  .email-wrapper { width: 100%; max-width: 600px; margin: 0 auto; }
  .email-table {
    width: 100%; border-collapse: collapse; background: #ffffff; border-radius: 12px; overflow: hidden;
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px rgba(15, 23, 42, 0.06);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #0f172a;
  }
  [data-theme="dark"] .email-table { background: #0f172a; color: #f8fafc; box-shadow: 0 8px 24px rgba(0,0,0,0.3); }

  /* Top bar */
  .top-bar {
    background: #ffffff;
    padding: 20px 32px;
    border-bottom: 1px solid #e2e8f0;
    display: flex; align-items: center; justify-content: space-between;
  }
  [data-theme="dark"] .top-bar { background: #0f172a; border-bottom-color: #1e293b; }
  .logo {
    display: flex; align-items: center; gap: 10px;
    text-decoration: none; color: #0f172a;
    font-size: 14px; font-weight: 700; letter-spacing: -0.01em;
  }
  [data-theme="dark"] .logo { color: #f8fafc; }
  .logo-mark {
    width: 26px; height: 26px;
    border-radius: 7px;
    background: #1b2b5b;
    color: #fff;
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 800;
  }
  [data-theme="dark"] .logo-mark { background: #00b4d8; color: #0a0f1f; }
  .booking-ref {
    font-size: 11px; font-weight: 500;
    color: #94a3b8;
    font-variant-numeric: tabular-nums;
  }
  .booking-ref strong {
    color: #0f172a;
    font-weight: 600;
    letter-spacing: 0.02em;
  }
  [data-theme="dark"] .booking-ref strong { color: #f8fafc; }

  /* Confirmation block */
  .confirm {
    padding: 48px 32px 32px;
    text-align: left;
  }
  .confirm-icon {
    width: 56px; height: 56px;
    background: #ecfdf5;
    color: #10b981;
    border-radius: 14px;
    display: inline-flex; align-items: center; justify-content: center;
    margin-bottom: 24px;
  }
  [data-theme="dark"] .confirm-icon { background: rgba(16, 185, 129, 0.15); }
  .confirm-eyebrow {
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: #10b981; margin: 0 0 8px;
  }
  .confirm-headline {
    font-size: 28px; font-weight: 700;
    line-height: 1.2; letter-spacing: -0.025em;
    color: #0f172a; margin: 0 0 12px;
  }
  [data-theme="dark"] .confirm-headline { color: #f8fafc; }
  .confirm-text {
    font-size: 15px; line-height: 1.6;
    color: #475569; margin: 0;
  }
  [data-theme="dark"] .confirm-text { color: #cbd5e1; }
  .confirm-text strong {
    color: #0f172a; font-weight: 600;
  }
  [data-theme="dark"] .confirm-text strong { color: #f8fafc; }

  /* Trip card — the hero of the email */
  .trip-card {
    margin: 0 32px 32px;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid #e2e8f0;
    background: #ffffff;
  }
  [data-theme="dark"] .trip-card {
    background: #1e293b; border-color: #334155;
  }
  .trip-image {
    width: 100%; height: 180px;
    background-size: cover; background-position: center;
    background-image: linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.5) 100%), url('https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&q=80');
    position: relative;
  }
  .trip-image-overlay {
    position: absolute;
    bottom: 16px; left: 20px;
    color: #ffffff;
  }
  .trip-image-tag {
    display: inline-block;
    padding: 4px 10px;
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.25);
    border-radius: 999px;
    font-size: 10px; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase;
    margin-bottom: 8px;
  }
  .trip-image-name {
    font-size: 22px; font-weight: 700;
    letter-spacing: -0.02em; line-height: 1.15;
    margin: 0;
  }
  .trip-body {
    padding: 24px;
  }

  /* Detail rows */
  .detail-row {
    display: grid;
    grid-template-columns: 130px 1fr;
    gap: 16px;
    padding: 14px 0;
    border-bottom: 1px solid #f1f5f9;
    align-items: baseline;
  }
  [data-theme="dark"] .detail-row { border-bottom-color: #334155; }
  .detail-row:last-child { border-bottom: none; }
  .detail-label {
    font-size: 12px; font-weight: 500;
    letter-spacing: 0.04em; text-transform: uppercase;
    color: #94a3b8;
  }
  .detail-value {
    font-size: 14px; font-weight: 500;
    color: #0f172a;
    line-height: 1.5;
  }
  [data-theme="dark"] .detail-value { color: #f8fafc; }
  .detail-value strong {
    font-weight: 700;
  }
  .detail-value-secondary {
    font-size: 12px;
    color: #475569;
    margin-top: 2px;
  }
  [data-theme="dark"] .detail-value-secondary { color: #94a3b8; }

  /* Two columns for outbound/return */
  .journey {
    display: grid;
    grid-template-columns: 1fr 24px 1fr;
    gap: 0;
    padding: 24px 0;
    border-top: 1px solid #f1f5f9;
    border-bottom: 1px solid #f1f5f9;
    margin: 16px 0 0;
    align-items: center;
  }
  [data-theme="dark"] .journey { border-color: #334155; }
  .journey-side {
    display: flex; flex-direction: column; gap: 4px;
  }
  .journey-side-right { text-align: right; }
  .journey-label {
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: #94a3b8;
  }
  .journey-airport {
    font-size: 22px; font-weight: 800;
    letter-spacing: -0.02em;
    color: #0f172a;
    line-height: 1;
  }
  [data-theme="dark"] .journey-airport { color: #f8fafc; }
  .journey-city {
    font-size: 13px;
    color: #475569;
  }
  [data-theme="dark"] .journey-city { color: #cbd5e1; }
  .journey-arrow {
    color: #00b4d8;
    display: flex; justify-content: center;
  }

  /* Cost summary */
  .cost {
    margin: 0 32px 32px;
    background: #f8fafc;
    border-radius: 12px;
    padding: 20px 24px;
  }
  [data-theme="dark"] .cost { background: #1e293b; }
  .cost-row {
    display: flex; justify-content: space-between;
    padding: 8px 0;
    font-size: 14px;
    color: #475569;
  }
  [data-theme="dark"] .cost-row { color: #cbd5e1; }
  .cost-row-total {
    border-top: 1px solid #e2e8f0;
    padding-top: 14px; margin-top: 8px;
    font-size: 16px;
    color: #0f172a; font-weight: 700;
  }
  [data-theme="dark"] .cost-row-total {
    border-top-color: #334155;
    color: #f8fafc;
  }
  .cost-amount {
    font-variant-numeric: tabular-nums;
    font-weight: 600;
  }
  .cost-row-total .cost-amount {
    font-weight: 800;
    letter-spacing: -0.02em;
  }
  .cost-paid {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #e2e8f0;
    display: flex; justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: #475569;
  }
  [data-theme="dark"] .cost-paid {
    border-top-color: #334155;
    color: #94a3b8;
  }
  .cost-paid-status {
    display: inline-flex; align-items: center; gap: 6px;
    color: #10b981; font-weight: 600;
  }
  .cost-paid-dot {
    width: 6px; height: 6px;
    background: #10b981;
    border-radius: 50%;
  }

  /* Next steps */
  .next-steps {
    padding: 32px;
    border-top: 1px solid #e2e8f0;
  }
  [data-theme="dark"] .next-steps { border-top-color: #1e293b; }
  .next-steps-title {
    font-size: 16px; font-weight: 700;
    letter-spacing: -0.015em;
    color: #0f172a; margin: 0 0 16px;
  }
  [data-theme="dark"] .next-steps-title { color: #f8fafc; }
  .next-step {
    display: grid;
    grid-template-columns: 32px 1fr;
    gap: 14px;
    padding: 12px 0;
    align-items: flex-start;
  }
  .next-step-num {
    width: 24px; height: 24px;
    background: #f1f5f9;
    color: #1b2b5b;
    border-radius: 50%;
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 700;
    margin-top: 1px;
  }
  [data-theme="dark"] .next-step-num {
    background: #334155;
    color: #48cae4;
  }
  .next-step-content h4 {
    font-size: 14px; font-weight: 600;
    color: #0f172a;
    margin: 0 0 3px;
    letter-spacing: -0.01em;
  }
  [data-theme="dark"] .next-step-content h4 { color: #f8fafc; }
  .next-step-content p {
    font-size: 13px; line-height: 1.55;
    color: #475569;
    margin: 0;
  }
  [data-theme="dark"] .next-step-content p { color: #cbd5e1; }
  .next-step-content a {
    color: #0096b7;
    font-weight: 600;
    text-decoration: none;
    border-bottom: 1px solid currentColor;
  }
  [data-theme="dark"] .next-step-content a { color: #48cae4; }

  /* Help footer */
  .help {
    background: #f8fafc;
    padding: 28px 32px;
    text-align: center;
    border-top: 1px solid #e2e8f0;
  }
  [data-theme="dark"] .help {
    background: #0a0f1f;
    border-top-color: #1e293b;
  }
  .help-title {
    font-size: 14px; font-weight: 600;
    color: #0f172a;
    margin: 0 0 6px;
  }
  [data-theme="dark"] .help-title { color: #f8fafc; }
  .help-text {
    font-size: 13px; line-height: 1.55;
    color: #475569;
    margin: 0 0 16px;
  }
  [data-theme="dark"] .help-text { color: #cbd5e1; }
  .help-contacts {
    display: flex; justify-content: center; gap: 24px;
    flex-wrap: wrap;
  }
  .help-contact {
    display: inline-flex; align-items: center; gap: 6px;
    text-decoration: none;
    font-size: 13px; font-weight: 500;
    color: #1b2b5b;
  }
  [data-theme="dark"] .help-contact { color: #48cae4; }
  .help-contact:hover { color: #00b4d8; }

  /* Footer meta */
  .footer-meta {
    padding: 20px 32px;
    text-align: center;
    background: #ffffff;
    border-top: 1px solid #f1f5f9;
  }
  [data-theme="dark"] .footer-meta {
    background: #0f172a;
    border-top-color: #1e293b;
  }
  .footer-meta-text {
    font-size: 11px;
    color: #94a3b8;
    line-height: 1.6;
    margin: 0;
  }
  .footer-meta-text a {
    color: #475569;
    text-decoration: underline;
  }
  [data-theme="dark"] .footer-meta-text a { color: #cbd5e1; }

  @media (max-width: 640px) {
    .top-bar { padding: 16px 20px; }
    .confirm { padding: 32px 20px 24px; }
    .trip-card { margin: 0 20px 24px; }
    .cost { margin: 0 20px 24px; }
    .next-steps { padding: 24px 20px; }
    .help { padding: 24px 20px; }
    .confirm-headline { font-size: 24px; }
    .detail-row { grid-template-columns: 110px 1fr; gap: 12px; }
    .journey-airport { font-size: 18px; }
  }
</style>
</head>
<body>

<div class="shell-header">
  <span class="shell-title">Booking Confirmation — Transactional Preview</span>
  <button class="theme-toggle" onclick="toggleTheme()">
    <svg id="theme-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>
    <span id="theme-label">Dark mode</span>
  </button>
</div>

<div class="preview-frame">
  <div class="email-wrapper">
    <table class="email-table" cellpadding="0" cellspacing="0" border="0">
      <tr><td>

        <!-- Top bar with booking ref -->
        <div class="top-bar">
          <a href="#" class="logo">
            <span class="logo-mark">T</span>
            <span>Mitchell Travel</span>
          </a>
          <div class="booking-ref">
            Booking ref · <strong>TG24189</strong>
          </div>
        </div>

        <!-- Confirmation block -->
        <div class="confirm">
          <div class="confirm-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <p class="confirm-eyebrow">Booking confirmed</p>
          <h1 class="confirm-headline">You're all set, Sarah.</h1>
          <p class="confirm-text">Your trip to <strong>Lindos, Rhodes</strong> is confirmed. We've sent your tickets and full itinerary to this email. Everything you need is below.</p>
        </div>

        <!-- Trip card -->
        <div class="trip-card">
          <div class="trip-image">
            <div class="trip-image-overlay">
              <span class="trip-image-tag">Greek Islands</span>
              <h2 class="trip-image-name">Lindos, Rhodes</h2>
            </div>
          </div>
          <div class="trip-body">

            <div class="detail-row">
              <div class="detail-label">Hotel</div>
              <div class="detail-value">
                <strong>Lindos Mare Resort</strong>
                <div class="detail-value-secondary">4★ · Half board · Sea view double room</div>
              </div>
            </div>

            <div class="detail-row">
              <div class="detail-label">Check in</div>
              <div class="detail-value">
                <strong>Tuesday, 16 June 2026</strong>
                <div class="detail-value-secondary">From 3:00 PM local time</div>
              </div>
            </div>

            <div class="detail-row">
              <div class="detail-label">Check out</div>
              <div class="detail-value">
                <strong>Tuesday, 23 June 2026</strong>
                <div class="detail-value-secondary">By 11:00 AM local time</div>
              </div>
            </div>

            <div class="detail-row">
              <div class="detail-label">Travellers</div>
              <div class="detail-value">
                Sarah Mitchell, James Mitchell
                <div class="detail-value-secondary">2 adults</div>
              </div>
            </div>

            <!-- Journey block -->
            <div class="journey">
              <div class="journey-side">
                <span class="journey-label">Outbound</span>
                <span class="journey-airport">LGW</span>
                <span class="journey-city">London Gatwick · 16 Jun, 06:25</span>
              </div>
              <div class="journey-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </div>
              <div class="journey-side journey-side-right">
                <span class="journey-label">Return</span>
                <span class="journey-airport">RHO</span>
                <span class="journey-city">Rhodes · 23 Jun, 14:50</span>
              </div>
            </div>

          </div>
        </div>

        <!-- Cost summary -->
        <div class="cost">
          <div class="cost-row">
            <span>Holiday package (2 adults)</span>
            <span class="cost-amount">£1,378.00</span>
          </div>
          <div class="cost-row">
            <span>Transfers (return)</span>
            <span class="cost-amount">£64.00</span>
          </div>
          <div class="cost-row">
            <span>Travel insurance</span>
            <span class="cost-amount">£48.00</span>
          </div>
          <div class="cost-row cost-row-total">
            <span>Total</span>
            <span class="cost-amount">£1,490.00</span>
          </div>
          <div class="cost-paid">
            <span>Paid in full · Visa ending 4421</span>
            <span class="cost-paid-status">
              <span class="cost-paid-dot"></span>
              Settled
            </span>
          </div>
        </div>

        <!-- Next steps -->
        <div class="next-steps">
          <h3 class="next-steps-title">A few things before you fly</h3>

          <div class="next-step">
            <span class="next-step-num">1</span>
            <div class="next-step-content">
              <h4>Check your passport</h4>
              <p>Greek entry requires at least 3 months validity beyond your return date. Your <a href="#">full travel checklist is here</a>.</p>
            </div>
          </div>

          <div class="next-step">
            <span class="next-step-num">2</span>
            <div class="next-step-content">
              <h4>Online check-in opens 16 May</h4>
              <p>We'll email you a reminder. You can also <a href="#">manage your booking online</a> any time.</p>
            </div>
          </div>

          <div class="next-step">
            <span class="next-step-num">3</span>
            <div class="next-step-content">
              <h4>Save your booking reference</h4>
              <p>Quote <strong>TG24189</strong> for any changes or queries. Tickets will arrive 14 days before departure.</p>
            </div>
          </div>
        </div>

        <!-- Help -->
        <div class="help">
          <h3 class="help-title">Questions before you go?</h3>
          <p class="help-text">Our team is here Monday to Saturday, 9am to 7pm.</p>
          <div class="help-contacts">
            <a href="tel:01202123456" class="help-contact">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              01202 123 456
            </a>
            <a href="mailto:bookings@mitchelltravel.co.uk" class="help-contact">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              bookings@mitchelltravel.co.uk
            </a>
          </div>
        </div>

        <!-- Footer meta -->
        <div class="footer-meta">
          <p class="footer-meta-text">
            Mitchell Travel Ltd · ATOL 11234 · ABTA Y6789<br>
            12 Old Christchurch Road, Bournemouth, BH1 1LG<br><br>
            This email was sent because you made a booking. <a href="#">View in browser</a>
          </p>
        </div>

      </td></tr>
    </table>
  </div>
</div>

<script>
  function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    const label = document.getElementById('theme-label');
    const isDark = body.getAttribute('data-theme') === 'dark';
    if (isDark) {
      body.removeAttribute('data-theme');
      label.textContent = 'Dark mode';
      icon.innerHTML = '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>';
    } else {
      body.setAttribute('data-theme', 'dark');
      label.textContent = 'Light mode';
      icon.innerHTML = '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>';
    }
  }
</script>

</body>
</html>
```

---

*End of Appendix A. The four examples above are the visual standard. For production rendering, see §12.*
