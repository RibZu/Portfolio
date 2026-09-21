# Quickstart Validation Guide

Follow these steps to validate the portfolio redesign locally before pushing to Vercel.

## 1. Prerequisites
- Node.js installed
- Dependencies installed (`npm install`)

## 2. Run the Application
Start the local Vite development server:
```bash
npm run dev
```

## 3. Validation Scenarios

### Scenario A: Verify Bootstrap is Removed
1. Open the browser DevTools (F12) -> Network tab.
2. Filter by `CSS`.
3. Refresh the page.
4. **Expected Outcome**: No `bootstrap.min.css` or related bootstrap files are loaded. Only `app.css` and the `.module.css` injected styles should appear.

### Scenario B: Verify Minimalist Design and Reduced Content
1. Navigate to the "Skills" (Habilidades) section.
2. **Expected Outcome**: The technologies should be listed cleanly and minimally. The long descriptive "blurbs" (e.g., "El lenguaje que hace que las páginas web cobren vida...") MUST NOT be visible.

### Scenario C: Responsive Layout Test
1. Resize the browser window to mobile width (~375px).
2. **Expected Outcome**: 
   - The navigation adapts (e.g., hamburger menu or scrollable row).
   - The project cards stack vertically.
   - There is no horizontal scrolling.
3. Resize the window to desktop width (>1024px).
4. **Expected Outcome**: The layout utilizes the space effectively, displaying projects in a multi-column grid.

### Scenario D: Build Success
1. Stop the dev server.
2. Run the production build:
   ```bash
   npm run build
   ```
3. **Expected Outcome**: The build completes successfully without errors, indicating it is ready to be pushed to Vercel.
