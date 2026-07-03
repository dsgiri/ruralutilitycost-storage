# Known Issues & Decisions Log

## Architecture
- **Decision:** Use a flat routing structure (Homepage -> Tools directly) for V1 instead of category intermediate pages.
- **Reasoning:** Reduces click depth and cognitive load for a small (7-tool) application.

## State Management
- **Decision:** Use React Context and standard state hooks over Redux/Zustand for V1.
- **Reasoning:** The application consists of isolated calculators that do not need to share complex global state, other than standard settings and saved favorites.

## Styling
- **Decision:** Use standard Tailwind CSS utility classes. Avoid custom CSS files.
- **Reasoning:** Improves maintainability and keeps styles colocated with components.

## Documentation
- **Decision:** Documentation must strictly adhere to the standards outlined in `AGENTS.md`.
- **Reasoning:** Ensures long-term maintainability and consistent agent behavior.
