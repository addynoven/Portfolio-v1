# ReactBits Integration Guide

A complete guide on how to use animated components from [ReactBits.dev](https://reactbits.dev) in your React/Next.js projects.

---

## What is ReactBits?

ReactBits is an open-source library of **animated, interactive React components**. Unlike npm packages, ReactBits uses a **copy-paste approach** - you copy the component code directly into your project.

---

## Step 1: Browse Components

1. Go to [reactbits.dev](https://reactbits.dev)
2. Browse by category in the sidebar:
   - **Text Animations** - SplitText, GlitchText, ShinyText, etc.
   - **Animations** - ClickSpark, GlareHover, Magnet, etc.
   - **Components** - SpotlightCard, TiltedCard, etc.
   - **Backgrounds** - Aurora, Waves, Hyperspeed, etc.

---

## Step 2: Get the Component Code

1. Click on any component (e.g., "Click Spark")
2. Click the **"Code"** tab (next to Preview)
3. Under **Install**, click **"Manual"** to see the raw code
4. Copy the entire component code

![ReactBits Code Tab](file:///home/neon/.gemini/antigravity/brain/d8aba586-637f-4313-beb9-76c61c3d623e/click_spark_code_1765282061377.png)

---

## Step 3: Check Dependencies

Below the code, ReactBits shows required dependencies. Common ones:

| Component Type | Typical Dependencies |
|----------------|---------------------|
| Text animations | `gsap`, `@gsap/react` |
| 3D effects | `three`, `@react-three/fiber` |
| Basic animations | None (just React) |

**Install dependencies if needed:**
```bash
# For GSAP-based components
pnpm add gsap @gsap/react

# For Three.js components
pnpm add three @react-three/fiber
```

---

## Step 4: Create Component File

1. Create a folder for ReactBits components:
   ```
   components/
   └── reactbits/
       ├── ClickSpark.tsx
       ├── SplitText.tsx
       └── GlareHover.tsx
   ```

2. Create the component file and paste the code

3. **Important modifications for Next.js:**
   ```tsx
   // Add at the very top of the file
   "use client";
   ```

4. **Convert to TypeScript** (if needed):
   - Add type annotations to props
   - Add interface for props

---

## Step 5: Example - Creating ClickSpark

### Original ReactBits Code (JavaScript):
```jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ClickSpark = ({ sparkColor = '#fff', sparks = 10, sparkSize = 8 }) => {
  // ... component code
};

export default ClickSpark;
```

### Converted for Next.js (TypeScript):
```tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface ClickSparkProps {
  children: React.ReactNode;  // Added to wrap content
  sparkColor?: string;
  sparks?: number;
  sparkSize?: number;
}

const ClickSpark = ({
  children,
  sparkColor = "#00ff99",
  sparks = 10,
  sparkSize = 8,
}: ClickSparkProps) => {
  // ... same component code
  
  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      {children}  {/* Wrap children instead of empty div */}
    </div>
  );
};

export default ClickSpark;
```

---

## Step 6: Use the Component

```tsx
import ClickSpark from "@/components/reactbits/ClickSpark";
import { Button } from "@/components/ui/button";

export default function MyPage() {
  return (
    <ClickSpark sparkColor="#00ff99" sparks={12}>
      <Button>Click Me!</Button>
    </ClickSpark>
  );
}
```

---

## Common Patterns

### Wrapper Components
Many effects wrap around content:
```tsx
<GlareHover>
  <Card>Your content</Card>
</GlareHover>
```

### Text Components
Replace text directly:
```tsx
// Instead of:
<h1>My Title</h1>

// Use:
<h1><SplitText text="My Title" /></h1>
```

### Background Components
Add to the background:
```tsx
<div className="relative">
  <Aurora className="absolute inset-0 -z-10" />
  <YourContent />
</div>
```

---

## Quick Reference

| Effect You Want | Component to Use |
|-----------------|------------------|
| Text reveal animation | `SplitText` |
| Shimmer on text | `ShinyText` |
| Glitch effect | `GlitchText` |
| Matrix decode | `DecryptedText` |
| Sparks on click | `ClickSpark` |
| 3D card tilt | `GlareHover`, `TiltCard` |
| Magnetic cursor | `Magnet` |
| Spotlight follow | `SpotlightCard` |
| Gradient background | `Aurora` |

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "useRef is not defined" | Add `"use client"` at top |
| "Cannot find module 'gsap'" | Run `pnpm add gsap @gsap/react` |
| Component not animating | Check if `viewport={{ once: true }}` is blocking re-renders |
| Dark mode issues | Update colors to use CSS variables |

---

## File Structure Example

```
components/
└── reactbits/
    ├── SplitText.tsx      # Text animations
    ├── GlitchText.tsx
    ├── ShinyText.tsx
    ├── DecryptedText.tsx
    ├── ClickSpark.tsx     # Click/hover effects
    ├── GlareHover.tsx
    ├── Magnet.tsx
    ├── TiltCard.tsx
    ├── SpotlightCard.tsx  # Cards
    └── Aurora.tsx         # Backgrounds
```

---

## Summary

1. **Browse** → Find component at reactbits.dev
2. **Copy** → Click Code → Manual → Copy code
3. **Install** → Add required dependencies (gsap, etc.)
4. **Create** → New file in `components/reactbits/`
5. **Modify** → Add `"use client"`, TypeScript types
6. **Use** → Import and wrap/apply to your content

That's it! The beauty of ReactBits is the copy-paste simplicity - no package updates to worry about, full control over the code.
