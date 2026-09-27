# Paraform Standard Linter

Enforces Lee Monarc's locked design baseline and Paraform anti-slop standards.

## Installation

No installation required - runs with Node.js.

## Usage

```bash
# Run the linter
npm run lint:paraform

# Or directly
node scripts/lint-paraform-standard.js
```

## What It Checks

### 🛑 FAILURES (Block commit)
- Rejected architectural homepage elements (pinned perspective, monogram study)
- Fake form success messages
- Public publishing (robots index enabled)

### ❌ ERRORS (Block PR)
- Typography overrides in refresh.css conflicting with globals.css
- Motion choreography changes without Vivienne/Youssef review
- Design tokens not in src/app/tokens.css

### ⚠️ WARNINGS (Review before PR)
- Missing visual hierarchy (insufficient clamp() usage)
- Excessive motion (more than 10 animations)
- Unlabeled placeholders

### 🎨 ANTI-SLOP (Paraform standards)
- Inconsistent typography (more than 3 font families)
- Too many colors (more than 10-12 color tokens)
- Global scroll listeners (use IntersectionObserver)

## Configuration

The linter enforces:
- **Kev's baseline** from `docs/REVIEW.md` ("absolutely perfect")
- **AGENTS.md** constraints (no rejected homepage, no fake success, no public publish)
- **Paraform standards** (intentional hierarchy, constrained palette, purposeful motion)

## Standards Reference

- [Paraform](https://www.paraform.com/) - Design inspiration
- [docs/REVIEW.md](../docs/REVIEW.md) - Kev's locked baseline
- [docs/AGENTS.md](../docs/AGENTS.md) - Project constraints
- [docs/MOTION.md](../docs/MOTION.md) - Motion contract
