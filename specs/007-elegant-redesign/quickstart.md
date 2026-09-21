# Quickstart: Validation Guide

This guide outlines how to run and visually validate the portfolio redesign changes locally.

## Prerequisites

- Node.js (v18+)
- npm

## Setup & Run

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open Application**
   Navigate to `http://localhost:5173` (or the port Vite outputs) in your browser.

## Validation Scenarios

1. **Theme Validation**
   - Verify that the background of the main project area is no longer plain white.
   - Verify the global aesthetic matches an "elegant" dark or rich theme.
   - Verify that text contrast is legible.

2. **Header & Glassmorphism Check**
   - Scroll the page slightly so the header overlays content.
   - Verify that the header has a Japanese art background image.
   - Verify that a blur effect (glassmorphism) is clearly visible over the background.
   - Check that all header elements (links, logos) are perfectly aligned.
   - **Crucial**: Ensure the name animation in the header is still present and functioning exactly as before.

3. **Contacts Section Check**
   - Scroll to the bottom of the page.
   - Verify the contacts section has been redesigned to match the new elegant theme.

4. **Performance Check**
   - Build the project using `npm run build`.
   - Run `npm run preview`.
   - Run a Lighthouse report in Chrome DevTools.
   - Verify that the Performance score is 90 or above.
