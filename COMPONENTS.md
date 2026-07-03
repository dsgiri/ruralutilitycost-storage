# Component Library Spec

## 1. Core Principles
- All components must be pure UI, containing no business logic.
- Use Tailwind CSS for all styling.
- Ensure all components are accessible (WCAG AA).

## 2. Global Components
- `Header`: Contains the brand logo and top navigation links.
- `Footer`: Contains the disclaimer strip, ecosystem links, and legal links.
- `Button`: Standardized button component with variants (primary, secondary, outline, ghost).
- `Card`: A flexible container for tools and information blocks.
- `Input`: Standardized text/number input fields with label and error states.
- `Select`: Dropdown selection menus.
- `Toggle`/`Switch`: Boolean input controls.
- `Slider`: Range selection controls.

## 3. Calculator-Specific Components
- `CalculatorLayout`: A standard two-column layout wrapper (Input on left/top, Output on right/bottom).
- `ResultDisplay`: A visually prominent component for displaying the primary calculated output.
- `Progress/CapacityBar`: A visual indicator showing usage vs. capacity limits.
- `DisclaimerBox`: A standard warning box for "decision support only" messaging.

## 4. Usage Rules
- Do not build custom UI if a standard HTML element suffices (e.g., use `<select>` for simple dropdowns unless complex styling is required).
- Extract repetitive UI patterns into reusable components in `/src/components`.
