import type { CSSProperties } from "react";

/**
 * Variant types for the character carousel component.
 */
export type CharacterCarouselVariant = "filmstrip" | "wave";

/**
 * Props for the CharacterCarousel component.
 */
export type CharacterCarouselProps = {
  variant?: CharacterCarouselVariant;
  speed?: number;
  scale?: number;
  opacity?: number;
  hue?: number;
  saturation?: number;
  brightness?: number;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Default values for CharacterCarousel component props.
 * These are stable constants that don't change at runtime.
 */
export const CHARACTER_CAROUSEL_DEFAULTS = {
  variant: "filmstrip",
  speed: 1,
  scale: 1,
  opacity: 1,
  hue: 0,
  saturation: 1,
  brightness: 1,
} as const satisfies Required<Pick<
  CharacterCarouselProps,
  "variant" | "speed" | "scale" | "opacity" | "hue" | "saturation" | "brightness"
>>;

/**
 * Mapping of carousel variants to their source HTML strings.
 * These are imported from separate source files.
 */
import characterFilmstripSource from "./sources/character-filmstrip-source";
import characterWaveSource from "./sources/character-wave-source";

export const SOURCE_BY_VARIANT = {
  filmstrip: characterFilmstripSource,
  wave: characterWaveSource,
} as const;

/**
 * Utility function to clamp a value between minimum and maximum.
 * Used for constraining carousel control values.
 */
export function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

/**
 * Builds the focused document HTML for the iframe srcDoc.
 * This injects control scripts and styles into the base source.
 */
export function buildFocusedDocument(variant: CharacterCarouselVariant) {
  const focusStyles = `<style data-character-carousel-focus>
:root { --character-carousel-scale: 1; }
html, body, .stage { width: 100%; height: 100%; margin: 0; overflow: hidden; }
.stage { min-height: 0 !important; }
.deck { transform: scale(var(--character-carousel-scale)); transform-origin: 50% 50%; }
</style>`;
  const controls = `<script data-character-carousel-controls>
(function () {
  var nativeFrame = window.requestAnimationFrame.bind(window);
  var clock = { real: null, virtual: null };
  var controls = window.__CHARACTER_CAROUSEL_CONTROLS = { speed: 1, scale: 1, paused: false };
  window.__CHARACTER_CAROUSEL_NOW = function () {
    return clock.virtual === null ? performance.now() : clock.virtual;
  };
  window.requestAnimationFrame = function (callback) {
    function tick(realTime) {
      if (clock.real === null) {
        clock.real = realTime;
        clock.virtual = realTime;
      } else {
        if (!controls.paused) clock.virtual += (realTime - clock.real) * controls.speed;
        clock.real = realTime;
      }
      if (controls.paused) {
        return nativeFrame(tick);
      }
      callback(clock.virtual);
    }
    return nativeFrame(tick);
  };
  window.addEventListener('message', function (event) {
    if (!event.data || event.data.type !== 'character-carousel-controls') return;
    var next = event.data.controls || {};
    if (Number.isFinite(next.speed)) controls.speed = Math.max(0, Math.min(2.5, next.speed));
    if (Number.isFinite(next.scale)) controls.scale = Math.max(0.7, Math.min(1.3, next.scale));
    controls.paused = Boolean(next.paused);
    document.documentElement.style.setProperty('--character-carousel-scale', String(controls.scale));
  });
})();
</script>`;

  const focusedSource = SOURCE_BY_VARIANT[variant]
    .replaceAll("performance.now()", "window.__CHARACTER_CAROUSEL_NOW()");

  return focusedSource
    .replace(/<script[^>]+cloudflareinsights\.com[^>]*><\/script>/gi, "")
    .replace("</head>", `${focusStyles}${controls}</head>`);
}
