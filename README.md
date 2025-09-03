# VIRALX – UI Prototype

Modern, responsive Next.js UI for an Instagram creator tool featuring swipe discovery, script editing, favorites vault, and a competitor dashboard.

Tech stack
- Next.js App Router
- Tailwind CSS (shadcn/ui)
- Framer Motion (animations)
- Recharts (mini chart)
- SWR + localStorage (state persistence)

Features implemented
- Home / Discover
  - Tinder-style swipe deck (drag right = Like, left = Skip)
  - Cards with Thumbnail, Title, Niche Tag
  - Buttons: Like, Save (opens editor), Skip
- Script Viewer (Descript + Rescript)
  - Modal with transcript editor
  - Tone and Language dropdowns
  - Optional Category input
  - Save to Favorites (Script Vault)
- Favorites (Script Vault)
  - Grid and List views
  - Create folders/categories and assign per script
  - Remove saved scripts
- Competitor Dashboard (Bonus)
  - Totals (likes, views, shares) and small bar chart
  - Card list of competitor reels with metrics

Design system
- Colors (max 5 total): Primary sky-600, neutrals white / slate-900 / slate-200, accent emerald-500
- Typography: Geist Sans (headings/body)
- Responsive: Desktop, tablet, mobile with comfortable spacing and targets

Local development
- Open the preview in v0 (no extra setup required).
- Publish to Vercel using the Publish button in the top-right of the v0 UI.
- To install locally, download ZIP from v0 and use the shadcn CLI or GitHub integration from the v0 UI.

## Setup

You can use VIRALX directly in v0 or deploy it to Vercel. For local development, you can also download the project.

- In v0 (recommended)
  - Open the Preview to run the app instantly.
  - Click Publish (top-right) to deploy to Vercel.
  - Use the GitHub button (top-right) to push the code to your repo.

- Install locally
  - From the Version Box menu in v0, click Download ZIP.
  - Unzip and open the project in your editor.
  - Optionally initialize a Next.js project and copy files, or use the GitHub button in v0 to create a repo you can clone locally.
  - The project is built with the v0 Next.js runtime; when turning it into a standalone Next.js project, ensure Tailwind and shadcn/ui are set up. The v0 UI provides the shadcn CLI to help.

## Screenshots

### Discover Page
![Discover Page](public/images/viralx-discover.jpg)

### Script Viewer
![Script Viewer](public/images/viralx-script-viewer.jpg)

### Competitor Dashboard
![Competitor Dashboard](public/images/viralx-competitors.jpg)

Notes
- Data is mock JSON; no backend needed.
- State is persisted in localStorage and shared via SWR.
