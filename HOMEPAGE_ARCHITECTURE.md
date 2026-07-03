# Storage Homepage Content and Section Architecture

## 1. Homepage role
The Storage homepage acts as the central routing hub and trust-building entry point for the Storage ecosystem. Its primary job is to instantly communicate that this is a practical, no-nonsense utility site for agricultural operators. It must reduce the paradox of choice by clearly routing users to the specific calculator that solves their immediate storage, capacity, or spoilage problem. It also serves as the foundational SEO hub, connecting top-level storage planning intents to the dedicated tool pages.

## 2. Primary user intents
Users arriving on the homepage are typically looking to solve one of these specific operational workflows:
- Grain bin capacity estimation and moisture shrink calculation
- Dry/wet feed storage planning and volume constraints
- Equipment and machinery space allocation
- Liquid tank volume checking and basic EPA compliance screening
- Inventory rotation (FIFO) planning
- Spoilage risk and environmental exposure mitigation
- Storage cost, carry overhead, and depreciation planning

## 3. CTA hierarchy
- **Primary CTA:** "Open Grain Bin Calculator" (Drives users immediately to the highest-value, most universally understood tool).
- **Secondary CTA:** "Browse All Tools" (An anchor link that scrolls the user smoothly down to the tool grid).
- **Supporting CTAs:** "View Tool" or "Open Calculator" buttons located on each individual tool card in the grid.

## 4. Recommended section order
1. Top Utility Header
2. Main Hero
3. Featured Tool Highlight (Flagship Calculator)
4. Calculator Discovery Grid (Remaining Tools)
5. How Storage Helps (SEO & Context Block)
6. Trust / Disclaimer Strip
7. Footer

## 5. Section-by-section blueprint

**Top Utility Header**
- **Purpose:** Provide essential navigation without distracting from the tools.
- **Key content:** Brand lockup ("Rural Utility Cost | Storage Hub"), links to About, Contact, Legal.
- **CTA behavior:** Passive navigation links.
- **Visual priority:** Low. Compact, sticky, clean bottom border.

**Main Hero**
- **Purpose:** Establish immediate utility, explain the value proposition, and drive the first click.
- **Key content:** Eyebrow, headline, subheadline, primary/secondary CTAs, and a visual preview card.
- **CTA behavior:** High-contrast Primary CTA button; subtle outline Secondary CTA button.
- **Visual priority:** Highest.

**Featured Tool Highlight**
- **Purpose:** Isolate and promote the most commonly needed tool to reduce decision fatigue.
- **Key content:** A wide, prominent card for the Grain Bin Capacity Estimator, including a short description, metadata badges (e.g., "Fast estimate", "No login"), and a clear button.
- **CTA behavior:** Large "View Tool" button pointing to `/tools/grain-bin-capacity`.
- **Visual priority:** High. Should stand out from the grid below it.

**Calculator Discovery Grid**
- **Purpose:** Present the remaining 6 tools in a scannable, logical format.
- **Key content:** 6 cards (e.g., 2-column or 3-column grid). Each card needs a clear title, a 1–2 sentence description, and a subtle icon.
- **CTA behavior:** The entire card should be clickable, with a text link or subtle arrow indicating "View Tool".
- **Visual priority:** Medium. Clean, consistent card heights, subtle hover states.

**How Storage Helps**
- **Purpose:** Support SEO with semantic text and explain the operational value of the tools.
- **Key content:** 3 short benefit blocks (e.g., "Plan capacity before harvest", "Compare storage tradeoffs", "Reduce guesswork"). 
- **CTA behavior:** None. Informational only.
- **Visual priority:** Low-Medium. Soft background or bordered section to separate from the tools.

**Trust / Disclaimer Strip**
- **Purpose:** Set legal and operational expectations clearly.
- **Key content:** "Decision-support only", "Verify results independently", "Part of the Rural Utility Cost project".
- **CTA behavior:** None.
- **Visual priority:** Low but highly legible (e.g., dark strip with light text near the footer).

**Footer**
- **Purpose:** Catch-all for secondary links and legal compliance.
- **Key content:** Tool links, About, Contact, Legal, Privacy, License, and repeated disclaimer text.
- **CTA behavior:** Standard footer text links.
- **Visual priority:** Lowest.

## 6. Hero section recommendation
- **Eyebrow:** "Storage Planning Tools"
- **Headline direction:** Noun-heavy and literal (e.g., "Storage calculators for grain, feed, bins, and spoilage planning.").
- **Supporting copy direction:** A single sentence explaining capabilities (capacity, shrink, drying, cost factors) without marketing fluff.
- **Primary CTA destination:** `/tools/grain-bin-capacity`
- **Secondary CTA destination:** Anchor link to `#tools` or `#categories`.
- **Visual preview card:** YES. Include a visual "results snapshot" card (e.g., showing Bin diameter, Crop, Capacity, Shrink adj.) to instantly prove the site provides real math and actionable data, not just lead-gen forms. Add an "Example estimate only" label.

## 7. Calculator discovery section
**Recommendation: Hybrid structure.**
Do not use category pages for a 7-tool site. Instead, use a hybrid layout on the homepage:
1. One massive, horizontally spanning **Featured Tool Card** at the top of the discovery section.
2. A clean **Calculator Grid** (2 or 3 columns) directly below it containing the remaining 6 tools.
This prevents the "paradox of choice" of staring at 7 identical boxes while keeping all tools just one click away.

## 8. Featured tool strategy
**Visually emphasize the Grain Bin Capacity Estimator.**
Grain storage is the most universal, high-frequency need for this demographic. Emphasizing it anchors the page, proves immediate value, and gives first-time visitors an obvious starting point. The other 6 tools (Feed, Equipment, Tanks, Inventory, Spoilage, Cost) should be treated with equal, secondary visual weight in the grid below it.

## 9. Trust-building content
- **"Decision-support only" note:** Must be prominent in the trust strip and footer to clarify this isn't a certified engineering or laboratory tool.
- **No-login messaging:** Add metadata badges like "No login" or "Free utility" on the featured tool card to reduce friction.
- **Plain-language operational framing:** Use terms like "estimate", "plan", and "compare" rather than "revolutionize" or "optimize".
- **Ecosystem context:** "Part of the Rural Utility Cost project" builds authority and shows the site is part of a larger, reliable network.

## 10. SEO-supportive content blocks
- **"How Storage helps" section:** A 3-column text block below the calculator grid. This allows the inclusion of semantic keywords (harvest volume, flat storage, temporary holding, moisture tradeoffs) in a natural, readable way without cluttering the tool interface above.
- **Descriptive Card Copy:** Ensure the 1-2 sentence descriptions on every tool card contain exact-match and related keywords for those specific calculators.

## 11. Mobile homepage behavior
- **Hero simplification:** The visual preview card drops below the text/CTAs to prevent pushing the primary action below the fold.
- **CTA behavior:** Buttons expand to full-width (`w-full`) for easier tapping.
- **Card layout behavior:** The Featured Tool and the 6-tool grid stack into a single, vertical column (1 card per row).
- **Navigation behavior:** Top links collapse into a standard hamburger menu; the brand lockup remains centered or left-aligned.
- **Section stacking:** Keep vertical padding tight so users can quickly scroll from the hero into the tool list.

## 12. Homepage anti-patterns to avoid
- **Generic SaaS hero:** No abstract vector art, dashboard illustrations, or purple gradients.
- **Overcrowded first screen:** Do not try to fit all 7 tools above the fold. 
- **Equal-weight CTAs everywhere:** Ensure the Grain Bin calculator CTA is visually dominant.
- **Too much copy before tool links:** Keep the hero text brief. The tools are the content.
- **Weak internal-link visibility:** Ensure the cards look distinctly clickable (hover states, arrows, clear borders).

## 13. Launch-ready homepage definition
The homepage is considered structurally ready for launch when:
1. The hero clearly communicates the value prop and features a visual preview card.
2. The primary CTA routes directly to the Grain Bin tool.
3. The hybrid discovery section contains 1 featured tool and a grid of 6 secondary tools.
4. All 7 tools link to their respective `/tools/` URL slugs.
5. The "How it helps" SEO block and Trust/Disclaimer strip are present.
6. The layout stacks cleanly and legibly on mobile devices.

## 14. Implementation guardrails
- **Preserve approved section order** unless explicitly changed by the product owner.
- **Do not add random sections** (like pricing tables, fake testimonials, or newsletter popups) without approval.
- **Do not dilute CTA hierarchy;** the Grain Bin tool must remain the primary action.
- **Do not replace tool-first layout with marketing fluff;** keep the aesthetic neutral, agricultural, and operational.
- **Make additive, reviewable changes only.** Do not execute destructive redesigns of this structure.
