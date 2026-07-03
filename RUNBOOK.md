# Admin & Ops Runbook

## 1. Deployment
The application is a static client-side React app (Vite).
- **Build Command:** `npm run build`
- **Output Directory:** `dist/`

## 2. Environment Variables
- V1 requires no environment variables for production deployment.

## 3. Monitoring & Error Handling
- The app relies on client-side React error boundaries to catch crashes and display a generic fallback UI.
- No external logging services (e.g., Sentry) are configured for V1.

## 4. Content Updates
- All tool logic and text content are currently hardcoded in the React components. Any updates require a code change and a new deployment.
