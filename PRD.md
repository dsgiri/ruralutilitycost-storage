# Storage V1 Launch Scope

## 1. Product definition
Storage is a calculator-led agricultural operations hub focused on storage planning, inventory logic, spoilage prevention, capacity estimation, and rural compliance-related checks. It provides browser-based, decision-support tools that turn rough dimensions and operating assumptions into clearer planning numbers. The platform is designed to be practical, serious, and trustworthy, serving as a dependable utility rather than generic SaaS. It operates within the broader Rural Utility Cost ecosystem.

## 2. Primary audience
- Farmers and agricultural producers
- Rural utility operators and facility managers
- Grain elevator managers and storage coordinators
- Agricultural consultants and decision-makers

## 3. Core launch goal
To provide a trustworthy, immediately useful hub of 7 operational storage calculators that help agricultural decision-makers plan capacity, mitigate spoilage risk, and estimate overhead costs without requiring account creation or complex software onboarding.

## 4. Confirmed V1 calculators
- **Feed Storage Capacity Calculator:** Calculate maximum tonnage and volume constraints for dry and wet feed storage.
- **Grain Bin Capacity Estimator:** Estimate bushel capacity based on bin geometry and compaction factors.
- **Equipment Storage Planner:** Map square footage requirements for tractors, implements, and utility vehicles.
- **Tank Volume & EPA Auditor:** Verify liquid tank capacity and log sampling period data, screening for arsenic, nitrate, and coliform thresholds.
- **Inventory Rotation Planner:** Structure FIFO logistics to manage perishability and inventory flow constraints.
- **Spoilage Risk Assessor:** Track moisture, temperature, and biological parameters to evaluate loss-risk percentiles.
- **Storage Cost Analysis Matrix:** Calculate carry overhead, depreciation, and opportunity costs of agricultural holding.

## 5. Required launch pages
- **Homepage (Storage Hub):** Establishes trust, explains the platform, routes users to categories, and features the primary calculators.
- **Calculator Pages (7 total):** One dedicated page for each of the confirmed V1 calculators, featuring the tool interface and supporting contextual information.
- **About Page:** Explains the mission of the Rural Utility Cost Storage Hub and its ecosystem.
- **Contact Page:** Provides a simple form for support, inquiries, or reporting issues.
- **Legal/Disclaimer Page:** Houses terms of use, highlighting that tools are for decision support only and not professional regulatory certifications.
- **Privacy Policy Page:** Explains the data-minimization approach (no saved PII, local storage only).
- **Favorites/Pinned Tools Page:** Allows users to quickly access calculators they have saved locally.
- **404 Error Page:** A standard "not found" page routing users back to the hub.

## 6. Required launch features
- Responsive, mobile-first layouts for all pages and tools.
- Homepage category routing and featured tool cards.
- Per-tool interactive input/result UI with real-time updates.
- Form validation with clear error states.
- Local storage implementation for "pinning" favorite calculators.
- Footer with ecosystem links and disclaimers.
- Clear trust/disclaimer strips on all calculator pages.

## 7. Included in V1
- The 7 confirmed calculators functioning entirely client-side.
- Complete homepage UI as designed.
- Basic site navigation and mobile menu.
- Legal, contact, and about pages.
- Local "favorites" pinning functionality.
- Mobile responsiveness and fundamental web accessibility (semantic HTML, contrast, focus states).
- Baseline technical SEO (meta tags, clean URLs).

## 8. Excluded from V1
- User account creation and login (no auth).
- Cloud database storage or cross-device syncing of user data.
- PDF exports or advanced report generation.
- Multi-user collaboration or team sharing.
- Advanced charts, graphs, or data visualizations beyond simple progress bars.
- Admin dashboards or telemetry dashboards.
- External API integrations (e.g., live market prices, live weather).
- Email notifications or subscriptions.

## 9. Phase 2 / later
- PDF report generation and printing capabilities.
- Additional calculators (e.g., advanced drying energy modeling).
- Imperial to Metric toggle settings.
- Interactive charts for the Storage Cost Analysis Matrix.
- Save and compare multiple scenarios locally.

## 10. SEO requirements for launch
- One primary keyword theme and a single `H1` per page.
- Unique and descriptive `<title>` and `<meta name="description">` tags for every calculator page.
- Clean, semantic URL structures (e.g., `/tools/grain-bin-capacity`).
- Internal linking from the homepage to all tool pages.
- "How it works" and "Definitions" sections on calculator pages to satisfy search intent.

## 11. Trust, legal, and compliance requirements
- Sitewide footer disclaimer stating: "Estimates provided by Storage are for decision support only. Verify results independently. Part of the Rural Utility Cost project."
- Explicit disclaimer on the **Tank Volume & EPA Auditor** tool stating it is *not* a substitute for certified laboratory testing or official EPA compliance reporting.
- Clear indication that user inputs are processed locally in the browser and not saved to external databases.

## 12. QA requirements before launch
- All 7 calculators mathematically verified against standard agricultural formulas.
- No broken links across the header, footer, and category cards.
- Mobile layout tested for usability (no horizontal scrolling, tap targets $\ge$ 44px).
- All form inputs validate correctly (e.g., rejecting negative numbers for physical dimensions).
- Lighthouse score checks for Accessibility and SEO baselines.
- "Favorites" local storage persists across page reloads.

## 13. Launch readiness definition
The Storage site is considered ready to go live when all 7 calculators are fully functional and mathematically sound in the browser, all required pages are accessible and mobile-responsive, all legal/trust disclaimers are visible, and no placeholder text or "lorem ipsum" remains in the UI.

## 14. Nice-to-have but not required
- Subtle CSS transitions on result updates.
- "Copy link to this tool" sharing buttons.
- A basic FAQ accordion at the bottom of complex calculators.
- Tooltips explaining specific technical inputs (e.g., "compaction factor").

## 15. Implementation guardrails
- **Do not delete or overwrite existing work** without explicit approval.
- **Do not rename or move files** without consent.
- **Preserve brand consistency** using the established Tailwind color palette (stone, muted greens/teals).
- **Make additive, reviewable changes** rather than sweeping structural refactors.
- **Ask before destructive edits** or modifying the foundational layout.
