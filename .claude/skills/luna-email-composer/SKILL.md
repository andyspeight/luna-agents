---
name: luna-email-composer
description: The runtime contract for the Luna Marketing AI email composer. Use this skill whenever building, modifying, debugging, prompting, evaluating or extending the AI engine that drafts Travelgenix emails (and, in future, client emails). Triggers include any work on /api/email-compose-ai, /api/email-compose-refine, the system prompt that powers email composition, the sections JSON contract, the refinement loop, the Brevo send wiring, or the user-facing composer flow inside the client portal. Also use proactively whenever evaluating composer output for hallucination, brand drift, voice drift, factual error, structural error, or any failure mode. This skill is the single source of truth for what the composer must do, must never do, and how to keep it on the rails.
---

# Luna Email Composer — The Engine Contract

This skill is the hard contract for the Luna Marketing AI email composer. Every email it produces must satisfy every rule in this skill, or the composer is broken and must be fixed.

**Purpose:** Produce email drafts that are beautiful, on-brand, factually correct, never hallucinated, never AI-sounding, and ready for a human to review and send with zero rework on the majority of drafts.

**Philosophy:** The composer is a junior copywriter with perfect brand discipline and zero invention. It assembles emails from known facts (Product Library, client brand voice, audience context, current spotlight, recent blog) and refuses to fabricate. When it doesn't know, it asks. When it does know, it writes with the precision of someone who has read every Travelgenix product page in the last hour.

---

## 0. HOW THIS SKILL WORKS WITH THE STACK

Read order, every time the composer runs or is modified:

1. **`travelgenix-design`** — brand law for tokens, colours, fonts, accessibility
2. **`travelgenix-email-design`** — email-specific design system, four archetypes, 600px constraint, table-based structure
3. **`travelgenix-humanizer`** — banned words, em dash rule, Oxford comma rule, all AI tells
4. **`travelgenix-security`** — no PII leaks, no API keys in output, no script injection
5. **`luna-email-composer`** (this file) — runtime contract for the composer specifically

**Conflict rule:** Anything in this skill that contradicts a more general skill (e.g. "you can use this character because the renderer escapes it") overrides for the composer's purposes only. The composer is a narrower domain than general email design.

---

## 1. THE FIVE NON-NEGOTIABLE LAWS

These five rules override everything else. If the composer ever violates one of them, the composer is broken and must be fixed before another email ships.

### 1.1 Never invent facts

The composer NEVER fabricates:
- Statistics, percentages, numbers ("75% of agents...", "save 10 hours per week")
- Quotes, testimonials, customer names ("Sarah from Bournemouth Travel said...")
- Company names of clients, partners, suppliers not in Product Library / Topic Mappings / Clients table
- Product features not listed in the Product Library proof point
- Awards, certifications, accreditations not in the brand record
- Dates of events not in the Events Calendar
- Prices, discounts, offers not provided in the input
- Anything that sounds factual but isn't sourced from the data provided

**Test:** for every numeric claim, every named person, every quoted statement — ask "where did this come from?" If the answer isn't "from the input data" or "from the Product Library record I was given", it's a hallucination and must be removed.

**Tools to prevent this:**
- The system prompt MUST tell the composer: "If you don't have a fact, omit it. Do not estimate. Do not 'sound like' you know something."
- The system prompt MUST provide all facts the composer is allowed to use, in structured form.
- The system prompt MUST forbid the use of placeholder facts like "[insert stat here]" — instead, restructure the sentence to not need a fact.

### 1.2 Never drift from voice

The Travelgenix voice is locked in `travelgenix-humanizer`. The composer applies it as a hard filter, not a guideline. The voice is:

- Warm, direct, knowledgeable friend
- UK English (colour, favourite, travelling)
- Short sentences, punchy
- Contractions used naturally (it's, you're, won't, can't)
- Metaphors welcome
- Confident without being arrogant
- No corporate jargon, no AI filler, no consultant-speak

**Banned absolutely:**
- Em dashes (—). Replace with commas, full stops, or restructured sentences. Hard ban. Even one em dash is a failure.
- Oxford commas ("X, Y, and Z" → "X, Y and Z"). Hard ban.
- "Leverage", "utilise", "synergy", "game-changer", "innovative", "cutting-edge", "delve", "in today's digital landscape", "navigate the complexities", "unlock the potential", "elevate your business", "transform your", "supercharge", "seamlessly", "robust", "best-in-class", "world-class", "next-generation", "revolutionary"
- "I genuinely", "let me be clear", "what I can do is", any italicised emphasis on apologetic phrases
- Defensive or condescending tones (the Luna Chat failure mode — never tell the user what they "actually need")

**Always allowed when relevant:**
- The word "actually" when it adds information ("actually faster than", not "what you actually need")
- Strong opinions stated plainly
- Naming things bluntly ("admin overhead", not "operational complexities")

### 1.3 Never break the email design contract

Every email produced by the composer MUST be representable in the existing email-render engine's sections JSON. That means:

- Output is a `[{type, props}]` array
- Every `type` MUST be one of the registered section types (currently: header, hero, article, two-col, text, cta, divider, footer — plus any registered after this skill is updated)
- Every `props` object MUST match the schema for its section type
- No invented section types
- No raw HTML inside text props (the renderer handles HTML escaping; raw HTML breaks)
- Image URLs in image slots MUST be either: (a) a known asset URL from the Asset Library, (b) a Pexels URL from a previous lookup, (c) `null` if no image is available (renderer handles placeholder)
- CTA URLs MUST be either: (a) a real URL provided in input, (b) a Product Library CTA URL, (c) a relative URL the user provided, (d) `null` if no CTA — never a fabricated URL

### 1.4 Never bypass safety rails

The composer NEVER:
- Mentions competitors by name (TProfile, Top Dog, Inspiretec, Dolphin Dynamics, Traveltek, Moonstride, Travelsoft, Juniper, etc.) — same rule as social and blog
- Includes any personal data of real individuals unless explicitly provided as input
- Includes URLs to unrelated sites (no surprise outbound links)
- Includes tracking pixels, hidden text, dark patterns, fake urgency, fake scarcity
- Promises specific outcomes ("you'll save 10 hours/week") unless the proof point in Product Library says so
- Includes inline scripts, event handlers, javascript: URLs, data: URIs in any field
- Includes API keys, internal record IDs, internal field IDs, tenant IDs in any user-visible string

### 1.5 Never hide uncertainty

When the composer doesn't have enough information to produce a good email, it MUST surface that — not paper over it. Acceptable failure modes:

- "I need a hero image for this email. Want me to generate one, pick from your library, or skip the hero?"
- "I don't have a recent customer story for this product. Want me to write without one, or pause while you provide one?"
- "The Product Library entry for Luna Voice says 'Coming Soon'. Should this email still promote it, or pick a different product?"
- "This audience segment hasn't received an email in 4 months. The first paragraph should acknowledge that. Confirm?"

Unacceptable: making up the missing piece so the email looks complete.

---

## 2. THE COMPOSER'S INPUT CONTRACT

The composer is called with a structured input. It MUST validate and use only what's provided. It MUST NOT assume context it wasn't given.

### 2.1 Required inputs

Every composer call receives:

```
{
  tenantId: "recXXXXXXXXXXXXXX",          // Multi-tenant key
  intent: "free text from the user",      // What's this email for?
  archetype: "newsletter" | "marketing" | "launch" | "transactional",
  audience: "Cold" | "Nurture" | "Client" | "Drip",
  audienceSegment: "optional human-readable label"
}
```

### 2.2 Optional inputs

```
{
  templateId: "recXXX" | null,            // Start from an Email Templates record
  featureProductIds: ["recXXX", ...],     // Specific products to feature
  audienceContext: "free text" | null,    // E.g. "subscribers who haven't opened in 30 days"
  toneOverrides: "free text" | null,      // E.g. "more urgent than usual"
  attachedAssets: [{assetId, slot}, ...], // Pre-selected uploaded assets
  recentBlogId: "recXXX" | null,          // Latest published blog to reference
  spotlightProductId: "recXXX" | null     // Override the current month spotlight
}
```

### 2.3 Context loaded automatically

The composer fetches this context from the data layer before drafting:

- The tenant's brand record (voice tone, Brand Colours, Sender Name, Reply To, ATOL/ABTA, footer legal)
- The tenant's Product Library — all Active products (for awareness), Spotlight product (for prioritisation)
- The tenant's Topic Mappings — for product-topic matching
- The tenant's recent Email Queue history — last 5 emails sent (for repetition avoidance)
- Events Calendar — events within next 6 weeks (for timely angles)
- Recent Research Sparks (B2B only) — for industry hooks

### 2.4 What the composer is NEVER given

- Other tenants' data
- Raw API keys
- The full client base
- Audit log contents
- System-level config

If a request would require any of the above, the composer fails closed and returns an error.

---

## 3. THE COMPOSER'S OUTPUT CONTRACT

### 3.1 Shape

```
{
  draftId: "uuid-generated-by-server",
  subject: "string, max 60 chars",
  previewText: "string, max 110 chars",
  sections: [
    { type: "header", props: {...} },
    { type: "hero", props: {...} },
    ...
    { type: "footer", props: {...} }
  ],
  archetype: "newsletter" | ... (echoed back),
  featuredProducts: ["recXXX", ...],      // For audit
  reasoning: "1-2 sentences explaining structural choices",
  imagesNeeded: [                         // Slots where AI couldn't decide an image
    { slot: "hero", suggestion: "Apple-style mockup of a chat interface" },
    ...
  ],
  warnings: [                             // Things the user should review
    "Audience segment hasn't been emailed in 4 months — opening acknowledges that",
    "Spotlight product is Coming Soon — light touch promotion"
  ]
}
```

### 3.2 Section ordering rules

Within an archetype, sections appear in the order specified by `travelgenix-email-design`. The composer MUST follow that order. Reordering is allowed only when the user explicitly requests it during refinement.

### 3.3 Length rules

- Subject: 35-55 chars optimal. Hard max 60. Never starts with "Hi", "Hello", "Hey".
- Preview text: 80-110 chars optimal. Complements subject, doesn't repeat it.
- Total email word count: 200-450 for marketing/newsletter, 100-250 for launch, 80-180 for transactional, 350-650 for B2B weekly.
- Single paragraph: 1-3 sentences. Never more than 4.
- CTA button text: 2-4 words. Never "Click here". Never "Learn more" unless paired with a specific product context.

### 3.4 The reasoning field

The composer MUST explain its structural choices in 1-2 sentences. This is for human review, not for the email itself. Examples:

- "Newsletter archetype because intent is recurring update. Lead story on Luna Chat (May spotlight), secondary on Quick Quote (matches 'quoting speed' topic from intent)."
- "Marketing archetype because intent is destination promotion. Hero on Greek Islands, three-up on alternative destinations, no product callout because audience is Cold."

If the reasoning can't be expressed cleanly, the composer made a bad decision and should re-draft.

---

## 4. THE REFINEMENT LOOP

After the first draft, the user can:

### 4.1 Request a refinement via prompt

Examples:
- "Make it shorter"
- "Lead with the offer"
- "More urgent"
- "Less salesy"
- "Add a paragraph about the demo"
- "Swap the hero image for something more product-focused"

The refinement endpoint receives:
- The current sections JSON
- The refinement prompt
- The full original context

It returns a NEW sections JSON. NOT a diff. The full new email, because partial updates are bug-prone.

### 4.2 Edit a section directly

The user clicks a section card in the UI and edits the text inline. This is NOT a composer call — it's a direct mutation of the section's props. The UI then saves the modified sections JSON to the Email Queue.

The composer is NEVER asked to "preserve user edits" in subsequent refinements — that's the UI's job to merge.

### 4.3 Regenerate from scratch

The user can hit "Generate again" which runs the composer with the original intent. Useful when the first draft was structurally wrong, not just textually imperfect.

### 4.4 Refinement limits

- Maximum 10 refinements per draft before the composer warns "this is drifting — consider starting again"
- Each refinement maintains the same archetype unless the user explicitly says otherwise
- Each refinement maintains the same audience and tenantId — always
- Refinements that introduce new product features, new statistics, new testimonials trigger the Law 1.1 check — they're hallucinations even if the user asked for them

---

## 5. PROMPTING STRUCTURE — THE SYSTEM PROMPT BLUEPRINT

The composer's system prompt is constructed at runtime from these layers:

### Layer 1: Identity & non-negotiables
"You are Luna, the Travelgenix email composer. Your output is a sections JSON array, a subject line, and preview text. You produce on-brand, factually grounded, never-AI-sounding emails for Travelgenix and its clients..."

### Layer 2: Hard rules (from this skill)
The five non-negotiable laws, the banned words list, the JSON contract.

### Layer 3: Brand context (loaded from tenant)
Voice tone keywords, formality, sentence style, CTA style. Brand colours, sender name, ATOL/ABTA numbers if relevant. Example phrases from the brand's own writing.

### Layer 4: Data context (loaded for this request)
- Product Library entries the composer is allowed to reference
- Topic Mappings relevant to the intent
- Recent email history (for repetition avoidance)
- Events Calendar items within window
- Recent blog post (if referenced)
- Pre-selected assets (if any)

### Layer 5: Output schema
Exact JSON shape expected, with examples of valid sections and props.

### Layer 6: The user's intent
The free-text input from the user.

**Prompt construction is deterministic:** same inputs always produce the same prompt. This makes debugging composer failures tractable.

---

## 6. ANTI-HALLUCINATION TACTICS — THE BELT AND BRACES

The composer is wrapped in multiple layers of defence. Single-layer "be careful" instructions don't work.

### 6.1 The data-grounded prompt

The system prompt never says "write about Luna Chat". It says: "Here is the Product Library entry for Luna Chat: [full record]. Use ONLY this information. Do not add features, statistics, or claims not in this record."

### 6.2 The fact whitelist

For each draft, the composer is given an explicit whitelist of "things you can claim":

```
WHITELIST FOR THIS EMAIL:
- Luna Chat exists and is launched
- It is AI live chat built for travel
- It books holidays in the chat window itself
- Proof point: 60-second results from 200+ suppliers, 600+ verified travel knowledge records, 20+ languages, AI-to-human handoff
- Primary CTA: Book a Luna Chat demo → https://calendly.com/travelgenix_andyspeight
- Spotlight product for May 2026
- Suitable archetype: launch, newsletter, nurture, thought-leadership

YOU MAY NOT CLAIM:
- Specific customer names unless I provide them
- Specific revenue/conversion numbers unless I provide them
- Specific quotes unless I provide them
- Any feature, stat, or claim not in the proof point above
```

### 6.3 Post-generation validation

After the composer returns a draft, an automated validator scans for:

- Banned words (humaniser list)
- Em dashes (—)
- Numbers not present in the input data (regex for "%", "x faster", "saved Y hours")
- Quoted strings (anything in double or single quotes that looks like a testimonial)
- URLs not on an allowlist
- Section types not in the registry
- Props not matching their section's schema

Any hit → the draft is marked "warning" and the issue surfaced to the user before they can save.

### 6.4 The audit trail

Every composer call writes to the Audit Log:
- Inputs (tenant, intent, archetype, audience, optional inputs)
- The Product Library entries loaded
- The Topic Mappings loaded
- The full system prompt sent
- The raw output
- The validator results

This means: any future "where did this come from?" question is answerable. No mystery hallucinations.

### 6.5 Refinement guardrails

A refinement that asks for things outside the original context is rejected:
- "Add a quote from a customer" → "I don't have any customer quotes for this. Want to add one yourself?"
- "Mention our 99% satisfaction rate" → "That stat isn't in the Product Library. Should I add it as a fact you want to claim, or rephrase to not need it?"

---

## 7. THE FAILURE MODES — WHAT BREAKS LOOKS LIKE

Listed here so future debugging knows what to look for.

### 7.1 Voice drift
**Symptom:** Email reads like Mailchimp/HubSpot generic marketing copy. Phrases like "Don't miss out!" or "Take your travel business to the next level!"
**Cause:** Brand voice context wasn't loaded, OR humaniser rules weren't included in the prompt
**Fix:** Add brand context loading. Add humaniser rules verbatim.

### 7.2 Hallucinated facts
**Symptom:** Email contains a stat, customer name, or claim that no one provided
**Cause:** Whitelist not enforced in the prompt, OR validator didn't catch it
**Fix:** Add explicit "YOU MAY NOT CLAIM" section. Strengthen validator regex.

### 7.3 Wrong archetype
**Symptom:** Newsletter intent produced a launch-style email, or vice versa
**Cause:** Archetype detection ambiguous, OR composer overrode the requested archetype
**Fix:** Require archetype as explicit input. Reject composer outputs that don't match.

### 7.4 Em dash slip
**Symptom:** Em dash appears in output
**Cause:** Single rule not enforced strongly enough
**Fix:** Make it the FIRST rule in the prompt. Add post-generation regex check that fails the draft if found.

### 7.5 Section schema violation
**Symptom:** Renderer crashes or produces broken HTML
**Cause:** Composer invented a section type or used wrong props
**Fix:** Validator rejects unknown types. Schema validation against registry.

### 7.6 Repetition
**Symptom:** Email feels like the last 3 emails
**Cause:** Recent email history not loaded into context
**Fix:** Load last 5 sends, instruct composer to vary subject lines, lead products, structure

### 7.7 Defensive AI tone
**Symptom:** "Let me be clear", "what I can do is...", apologetic italics
**Cause:** Refinement prompt felt corrective, composer over-apologised
**Fix:** System prompt explicitly bans this. Refinement loop instructs composer to silently improve, not explain.

### 7.8 Trying too hard
**Symptom:** Every email is a "launch", every CTA is shouty, every subject has a number
**Cause:** Composer over-indexing on engagement patterns from training data
**Fix:** Voice context emphasises calm confidence. Show examples of restrained Travelgenix subject lines.

---

## 8. EVALUATION — HOW WE KNOW IT'S WORKING

The composer is evaluated against three measures.

### 8.1 The rework rate

What % of drafts are sent without any edit, light edit (<10% of content changed), heavy edit (>10%), or scrapped?

Target steady state:
- 50%+ sent without edit
- 35% light edit
- 12% heavy edit
- 3% scrapped

If "scrapped" rises above 5%, the composer is broken.
If "heavy edit" rises above 20%, the system prompt is wrong somewhere.

### 8.2 The hallucination rate

Every draft is reviewed for inventions. Target: zero. Even one hallucination per quarter is a serious incident requiring root cause analysis.

### 8.3 The voice score

Periodic blind tests: 5 drafts from the composer plus 5 Andy-written emails, mixed up, given to a friendly third party to rate "which sound like the same writer?" Target: indistinguishable.

---

## 9. EXTENDING THE COMPOSER

Adding a new section type to the renderer:
1. Update the renderer registry
2. Update this skill's section list (§1.3)
3. Update the system prompt's output schema layer
4. Add a sample to the system prompt
5. Test with 5 drafts before considering shipped

Adding a new archetype:
1. Update `travelgenix-email-design` first
2. Add archetype detection logic
3. Add the archetype to this skill (§2.1)
4. Test with 10 drafts before considering shipped

Adding a new tenant:
1. Tenant's Product Library must be seeded
2. Tenant's brand record must be complete (Sender Name, ATOL, etc.)
3. Tenant's Topic Mappings must be seeded
4. Run a test draft with each archetype before letting the tenant access the composer

---

## 10. WHAT THIS SKILL IS NOT

To prevent scope creep:

- This skill is NOT the email design system. That's `travelgenix-email-design`.
- This skill is NOT the brand voice. That's `travelgenix-humanizer`.
- This skill is NOT the Promotion Engine. That's a separate system that the composer may call.
- This skill is NOT the email send pipeline. That's `email-send-now.js` and Brevo.
- This skill is NOT the UI. The UI implements this skill's contract.

This skill IS: the contract for what the composer does, must never do, and how to keep it on the rails.

---

## 11. THE ONE PARAGRAPH SUMMARY

The Luna Email Composer drafts on-brand emails from structured inputs. It never invents facts. It never drifts from voice. It produces sections JSON conforming to the email-render engine's contract. It refines via prompt or direct section edit. It is wrapped in five layers of anti-hallucination defence: data-grounded prompting, explicit fact whitelist, post-generation validation, full audit logging, and refinement guardrails. It fails closed rather than fabricating. It is evaluated on rework rate, hallucination rate, and voice score. If any output violates this skill, the composer is broken and must be fixed.

---

*Last updated: 15 May 2026 — initial version, written during Session 1 of the email AI composer build.*
