"use client";

import { CharacterCarousel } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";

export function Scene() {
  return (
    <div className="shader-frame" aria-label="Interactive character filmstrip">
      <CharacterCarousel
        variant="filmstrip"
        speed={0.65}
        scale={1.30}
        opacity={1.00}
        hue={0}
        saturation={0.87}
        brightness={1.00}
      />
    </div>
  );
}
