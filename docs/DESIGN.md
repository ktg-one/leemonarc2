# Lee Monarc — reference-led weekend build

Updated 25 September 2026. The client rejected the earlier architectural redesign. Read `REFERENCE.md` for observed composition and the source precedence; older design prose is superseded by this contract.

## Visual system

The homepage follows Paraform's wide cinematic hero, light feature/story chapters, dark advisory/feature chapters, returning-light selector/proof area, image CTA and footer. The dark background is not a global theme. Figma's extracted frames supply useful layout/copy slots but contain overlap defects and unsupported recruiting content.

Use supplied Lee Monarc logo files unchanged. The desktop shell is 1248px maximum. Paper is #f5f8f6; dark chapters #1a1a1a; cards #272727. Brass accents derive from the supplied identity. Card radii are 10px; CTAs are pills. Typography uses Newsreader and Manrope through Next font loading. This is an available font substitution for Paraform's proprietary Bureau faces; do not claim typeface identity.

`src/app/tokens.css` owns shared values. `src/app/refresh.css` owns current shared primitives, shell/header/footer and overrides for supporting routes. Existing route styles remain individually editable. Home components use scoped prefixes and separate CSS; they do not own global styles.

## Content and placeholders

The revised September DOCX remains proposed client copy. Its review section identifies credentials, biography, experience, contact details and other facts awaiting confirmation. Missing video, portrait, client logos, proof and testimonial media are explicit review placeholders. Illustrative UI is labelled as such, not presented as a real report or customer outcome. Never use Paraform's client companies as Lee Monarc proof or create extra staff to fill a carousel.

All enquiry CTAs lead to the existing contact path. No portal, fake form submission or recruitment platform is implemented. Public release is separate from this review build.
