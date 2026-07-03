# Storage V1 Sitemap and URL Architecture

## 1. Architecture recommendation
For the V1 launch, use a flat **homepage + calculator pages + support pages only** structure. 
Skip dedicated category pages for now. With only 7 tools at launch, category pages would be too thin and introduce unnecessary friction. The homepage will act as the primary hub, routing users directly to individual calculator pages. This keeps the architecture lean, crawlable, and focused on immediate utility.

## 2. Final V1 sitemap
- `/` (Homepage)
- `/tools/feed-storage-capacity`
- `/tools/grain-bin-capacity`
- `/tools/equipment-storage-planner`
- `/tools/tank-volume-epa-auditor`
- `/tools/inventory-rotation-planner`
- `/tools/spoilage-risk-assessor`
- `/tools/storage-cost-analysis`
- `/about`
- `/contact`
- `/legal`
- `/privacy`
- `/favorites`

## 3. Final page list with purpose

| Page name | Recommended URL | Purpose | Launch priority |
|---|---|---|---|
| Homepage | `/` | Establish trust, explain product, route to tools | P0 |
| Feed Storage Capacity | `/tools/feed-storage-capacity` | Calculate dry/wet feed volume and tonnage limits | P0 |
| Grain Bin Capacity | `/tools/grain-bin-capacity` | Estimate bushel capacity based on bin geometry | P0 |
| Equipment Storage Planner | `/tools/equipment-storage-planner` | Map square footage for tractors and implements | P0 |
| Tank Volume & EPA Auditor | `/tools/tank-volume-epa-auditor` | Verify liquid tank capacity and screen thresholds | P0 |
| Inventory Rotation Planner | `/tools/inventory-rotation-planner` | Structure FIFO logistics for perishable flow | P0 |
| Spoilage Risk Assessor | `/tools/spoilage-risk-assessor` | Evaluate loss-risk based on moisture and temp | P0 |
| Storage Cost Analysis | `/tools/storage-cost-analysis` | Calculate carrying overhead and opportunity costs | P0 |
| About | `/about` | Project mission, team, and ecosystem context | P1 |
| Contact | `/contact` | Simple contact form for feedback | P1 |
| Legal / Terms | `/legal` | Terms of use and tool liability disclaimers | P0 |
| Privacy Policy | `/privacy` | Data minimization and local-storage policies | P0 |
| Favorites | `/favorites` | Local storage view of pinned calculators | P1 |

## 4. Calculator page naming recommendations

- **Feed Storage Capacity Calculator**
  - Name: Feed Storage Capacity Calculator
  - Slug: `/tools/feed-storage-capacity`
- **Grain Bin Capacity Estimator**
  - Name: Grain Bin Capacity Calculator
  - Slug: `/tools/grain-bin-capacity`
  - *Note: Swapped "Estimator" for "Calculator" for better search intent match.*
- **Equipment Storage Planner**
  - Name: Equipment Storage Planner
  - Slug: `/tools/equipment-storage-planner`
- **Tank Volume & EPA Auditor**
  - Name: Tank Volume & EPA Compliance Auditor
  - Slug: `/tools/tank-volume-epa-auditor`
- **Inventory Rotation Planner**
  - Name: Inventory Rotation & FIFO Planner
  - Slug: `/tools/inventory-rotation-planner`
- **Spoilage Risk Assessor**
  - Name: Grain & Feed Spoilage Risk Assessor
  - Slug: `/tools/spoilage-risk-assessor`
  - *Note: Clarified what is spoiling for better SEO.*
- **Storage Cost Analysis Matrix**
  - Name: Agricultural Storage Cost Calculator
  - Slug: `/tools/storage-cost-analysis`
  - *Note: Added "Agricultural" and "Calculator" to align with search behavior.*

## 5. Navigation structure
- **Top Navigation:** About, Contact, Legal. Keep it minimal to drive focus to the tools.
- **Homepage Primary Links:** Hero CTA to Grain Bin Capacity.
- **Mobile Navigation:** Hamburger menu mirroring the top nav.
- **Footer Links:** 
  - Tools column: Link directly to the 7 calculators.
  - Support column: About, Contact.
  - Legal column: Legal, Privacy, License.

## 6. Homepage internal-link architecture
- **Hero CTA:** Links directly to `/tools/grain-bin-capacity`.
- **Hero Secondary CTA:** Anchor link to `#tools` section on the homepage.
- **Category Cards (if shown visually):** Anchor link to the specific filtered tool section or link directly to the flagship tool of that category.
- **Featured Tool Cards:** Direct links to the respective `/tools/...` pages.
- **Footer:** Direct links to all support and legal pages.

## 7. Calculator-to-calculator internal linking
To establish topical clusters, include a "Related Tools" block at the bottom of each calculator:
- **Grain Bin Capacity** → cross-links to *Spoilage Risk Assessor*, *Storage Cost Analysis*
- **Feed Storage Capacity** → cross-links to *Inventory Rotation Planner*, *Spoilage Risk Assessor*
- **Tank Volume & EPA Auditor** → cross-links to *Equipment Storage Planner*
- **Spoilage Risk Assessor** → cross-links to *Grain Bin Capacity*, *Storage Cost Analysis*
- **Storage Cost Analysis** → cross-links to *Inventory Rotation Planner*

## 8. Category page decision
**Skip category pages for V1.** 
With only 7 calculators, intermediate category pages (e.g., `/categories/grain`) would require users to click twice to reach a tool and would result in thin pages with only 1-2 tools each. The homepage will serve as the master category hub. We will introduce dedicated `/categories/` or `/topics/` pages once the tool count exceeds 15-20 and logical grouping becomes necessary for UX.

## 9. URL rules
- **Lowercase only:** Force lowercase on all slugs (no CamelCase).
- **Hyphens only:** Use hyphens to separate words (no underscores or spaces).
- **No dates or dynamic parameters:** Keep URLs static and timeless for indexable pages.
- **Root-level for tools:** Use the `/tools/` directory to keep them organized and allow future content like `/guides/` to exist parallel to them.
- **Stable slugs:** Once a calculator is launched and indexed, the slug must not change.

## 10. SEO content structure recommendations
Every calculator page must follow this minimum content structure below the fold:
1. **Short Intro:** 1-2 sentences explaining what the tool calculates.
2. **The Calculator UI:** The interactive tool itself (above the fold where possible).
3. **How it Works / Assumptions:** Bullet points explaining the math, variables, or constants used (e.g., compaction factor assumptions).
4. **Definitions:** Brief explanations of technical terms (e.g., "FIFO", "Eave Height").
5. **Related Tools:** 2-3 links to related calculators.
6. **Disclaimer:** "For decision support only" text.

## 11. Future expansion map
- **Categories (Phase 2):** When tool count grows, introduce `/categories/grain-storage/`, `/categories/compliance/`.
- **Guides/Articles (Phase 2):** Educational content at `/guides/how-to-measure-bin-capacity`.
- **Glossary (Phase 3):** `/glossary/bushel-weight` for long-tail SEO.
- **More Calculators:** Simply add to the `/tools/` subfolder.

## 12. Launch-critical internal links
- [ ] Homepage Hero CTA → Grain Bin Calculator
- [ ] Homepage Featured Cards → Top 4 Calculators
- [ ] Footer "Tools" Menu → All 7 Calculators
- [ ] Footer "Legal" Menu → Legal, Privacy
- [ ] Each Calculator's "Related Tools" → 2 relevant calculators
- [ ] Each Calculator's Disclaimer → Legal page

## 13. Implementation guardrails
- **Do not rename approved URLs** without explicit product consent.
- **Do not move pages into deeper folders** (e.g., `/tools/grain/bin-capacity/`) unless approved.
- **Preserve internal-link consistency**; avoid orphaned calculator pages.
- **Avoid duplicate pages** targeting the exact same calculator intent.
- **Make URL changes only with approval** and ensure 301 redirects are planned if ever renaming post-launch.
