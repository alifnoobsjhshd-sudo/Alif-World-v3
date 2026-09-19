---
name: Tailwind source scope
description: Why this project explicitly scopes Tailwind v4 candidate scanning.
---

Tailwind v4 must use an explicit source scope in this project instead of scanning the repository root.

**Why:** The repository contains media assets and imported project files outside the app source tree. Root auto-detection caused Vite production builds to stall during Tailwind scanning.

**How to apply:** Keep the Tailwind import configured with automatic detection disabled and register the `src` directory explicitly. If the source layout changes, update that scope deliberately and verify the production build.