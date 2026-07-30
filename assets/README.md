# Assets

Static assets for the AI-HRMS application.

## Structure

- `fonts/` — Custom font files (Inter is loaded via next/font in layout)
- `icons/` — Custom SVG icons (lucide-react is used by default)
- `images/` — Raster images and photos
- `illustrations/` — Custom illustrations
- `animations/` — Lottie JSON or other animation files

## Usage

Import assets in components:

```tsx
import logo from '@/assets/images/logo.svg';
```

> Note: This project uses Pexels for stock photos (referenced via URL) and lucide-react for icons, so this folder is mostly empty. Add custom assets here as needed.
