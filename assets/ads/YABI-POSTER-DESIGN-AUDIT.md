# YABI poster design and conversion-readiness audit

Audit date: 30 August 2026

## Result

**PASS** — all three v3 poster formats pass the automated typography, safe-area, dimension, file-size, copy, asset, contrast, and overflow checks.

| Format | Dimensions | File size | Centre 80% safe area | Copy and accents | Text overflow |
| --- | ---: | ---: | --- | --- | --- |
| Mobile | 1080 × 1350 | 471.7 KiB | Pass | Pass | Pass |
| Square | 1200 × 1200 | 449.3 KiB | Pass | Pass | Pass |
| Landscape | 1200 × 628 | 401.0 KiB | Pass | Pass | Pass |

All files are substantially below Google’s 5 MiB image-asset limit.

## Typography system

- Display: Barlow Condensed, weights 700–800
- Supporting copy and CTA: Manrope, weights 700–800
- One display family and one body family only
- Three deliberate emphasis levels: headline, price, supporting copy
- Controlled line breaks at every aspect ratio
- Exact French accents, punctuation, price spacing, `HTVA / mois`, and discount wording
- Real YABI website logo, not an AI-redrawn mark
- Real daylight fleet photograph already used by the website

## Contrast

The audit uses the WCAG relative-luminance formula and a 4.5:1 minimum for text.

| Pair | Ratio | Result |
| --- | ---: | --- |
| Navy on white | 16.84:1 | Pass |
| Blue on white | 6.24:1 | Pass |
| White CTA text on blue | 6.24:1 | Pass |
| Navy badge text on lime | 10.93:1 | Pass |

Lime is used as an accent background with navy text; it is not used as low-contrast text on white.

## Conversion design checks

- One promise: professional monthly van rental without long-term leasing
- One primary price anchor: from €1,200 excluding VAT per month
- One CTA: request an offer
- One restrained promotional badge: 15% off from four months
- Benefit copy is subordinate to the headline and price
- Vehicle sizes remain visible without competing with the main message
- Essential content remains inside the centre 80% safe area
- Separate mobile, square, and landscape compositions; no mechanical cropping
- Readable hierarchy confirmed at reduced mobile and landscape preview sizes
- No unsupported superlatives, fake urgency, clickbait, or guaranteed availability

## Google asset strategy

The designed posters are ready for placements that accept uploaded static creative. Keep the separate clean, overlay-free fleet images in the campaign as well. Google’s responsive systems combine images, logos, headlines, and CTA elements dynamically, and clean images avoid duplicated or cramped text in those combinations.

No static design can guarantee conversion. The professional launch standard is to run the v3 family against the clean-image asset group, measure qualified quote submissions rather than clicks alone, and retain the winner after enough real traffic has accumulated.

## Reproduce the checks

```powershell
node assets/ads/render-yabi-posters.js
node assets/ads/audit-yabi-posters.js
```
