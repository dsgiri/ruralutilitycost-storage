# System Design & Style Guide

## 1. Brand Identity
The Rural Utility Cost Storage Hub is a serious, practical, and dependable utility for agricultural operators. The design should reflect this: no fluff, highly legible, data-focused, and robust.

## 2. Colors
We use a Tailwind CSS palette based on neutral tones and agricultural accents.

- **Backgrounds:** `bg-stone-50`, `bg-stone-100` for main pages. `bg-white` for cards.
- **Text:** `text-stone-900` for primary text, `text-stone-600` for secondary text.
- **Accents:** `emerald-600` for primary CTAs, success states. `amber-600` for warnings (e.g., spoilage risk). `blue-600` for informational highlights. `rose-600` for destructive actions/errors.
- **Borders:** `border-stone-200` for subtle separation.

## 3. Typography
- **Primary Font:** Inter (or similar clean sans-serif like system-ui).
- **Headings:** Bold, dark stone, tightly tracked.
- **Data/Numbers:** Use monospace or tabular numerals where possible to align digits in calculators.

## 4. Spacing & Layout
- Mobile-first approach using standard Tailwind breakpoints (`sm`, `md`, `lg`, `xl`, `2xl`).
- Container max-width: `max-w-7xl mx-auto`.
- Standard padding: `p-4` or `p-6` inside cards. `gap-4` or `gap-6` between grid items.

## 5. UI Components
- **Cards:** White background, subtle shadow (`shadow-sm` or `shadow-md`), rounded corners (`rounded-lg` or `rounded-xl`), light border.
- **Buttons:** High contrast. Primary buttons have solid backgrounds. Secondary buttons have borders and transparent backgrounds. Standard tap target > 44px for mobile.
- **Inputs:** Clean borders, clear focus rings (`focus:ring-2 focus:ring-emerald-500`).
- **Icons:** Use Lucide React icons.

## 6. Accessibility
- All text must pass WCAG AA contrast ratios.
- All interactive elements must have clear focus states.
- Use semantic HTML tags (`main`, `article`, `nav`, `section`).
