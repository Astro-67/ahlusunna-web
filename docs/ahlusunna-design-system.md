design_md = """# Ahlusunna Design System — Exact Specifications

## Purpose

This file contains every visual specification the AI agent needs to implement Ahlusunna's UI. All values are exact — hex codes, pixel values, Tailwind classes. No approximations. No "use your judgment."

## Corner Rule (Mandatory)

**Default state: ZERO border-radius.** All components render as sharp rectangles unless explicitly listed in the "Rounded Exceptions" section below.

### Rounded Exceptions (Functional Only)

| Element | Border Radius | Reason |
|---------|--------------|--------|
| Audio progress bar track ends | `9999px` (full) | Slider UX standard |
| Play/pause button | `9999px` (full) | Universal media control pattern |
| User avatar | `9999px` (full) | Avatar convention |
| Loading spinner | `9999px` (full) | Circular motion requirement |
| Status indicator dot | `9999px` (full) | Dot shape |
| Checkbox input | `2px` | Native browser default, minimal |

**Everything else:** `border-radius: 0` → Tailwind: no `rounded-*` class, or explicitly `rounded-none`

## Color System (Exact)

### Primary Palette

| Name | Hex | RGB | Tailwind Arbitrary | Usage |
|------|-----|-----|-------------------|-------|
| Primary | `#1B4332` | `rgb(27, 67, 50)` | `bg-[#1B4332]` `text-[#1B4332]` | Navbar bg, primary buttons, headings, footer bg, active nav indicator |
| Primary Dark | `#143828` | `rgb(20, 56, 40)` | `bg-[#143828]` | Button hover, active sidebar item, pressed state |
| Primary Light | `rgba(27, 67, 50, 0.1)` | — | `bg-[#1B4332]/10` | Subtle primary backgrounds, badges |

### Accent Palette

| Name | Hex | RGB | Tailwind Arbitrary | Usage |
|------|-----|-----|-------------------|-------|
| Accent | `#C9A84C` | `rgb(201, 168, 76)` | `bg-[#C9A84C]` `text-[#C9A84C]` | Links, icons, borders on hover, CTA buttons, decorative elements, progress bar fill |
| Accent Dark | `#B8973A` | `rgb(184, 151, 58)` | `bg-[#B8973A]` | Accent button hover, link hover |
| Accent Light | `rgba(201, 168, 76, 0.15)` | — | `bg-[#C9A84C]/15` | Subtle accent backgrounds, hover states |

### Neutral Palette

| Name | Hex | RGB | Tailwind Arbitrary | Usage |
|------|-----|-----|-------------------|-------|
| Background Primary | `#FAF7F0` | `rgb(250, 247, 240)` | `bg-[#FAF7F0]` | Page backgrounds, main content areas |
| Background Surface | `#FFFFFF` | `rgb(255, 255, 255)` | `bg-white` | Cards, modals, input fields, dropdowns |
| Text Primary | `#1C1C1C` | `rgb(28, 28, 28)` | `text-[#1C1C1C]` | Body text, headings on light backgrounds |
| Text Inverse | `#FAF7F0` | `rgb(250, 247, 240)` | `text-[#FAF7F0]` | Text on primary/accent backgrounds |
| Text Muted | `#6B7280` | `rgb(107, 114, 128)` | `text-[#6B7280]` | Secondary text, captions, placeholders, metadata |
| Border | `#E5E0D8` | `rgb(229, 224, 216)` | `border-[#E5E0D8]` | Card borders, dividers, input borders, table borders |

### Semantic Colors

| Name | Hex | RGB | Tailwind Arbitrary | Usage |
|------|-----|-----|-------------------|-------|
| Success | `#2D6A4F` | `rgb(45, 106, 79)` | `text-[#2D6A4F]` `bg-[#2D6A4F]/10` | Completion indicators, success messages |
| Error | `#9B2335` | `rgb(155, 35, 53)` | `text-[#9B2335]` `bg-[#9B2335]/10` | Validation errors, delete actions, error states |
| Warning | `#D4A373` | `rgb(212, 163, 115)` | `text-[#D4A373]` `bg-[#D4A373]/10` | Warning messages, pending states |

### Overlay Colors

| Name | Value | Usage |
|------|-------|-------|
| Lock Overlay | `bg-[#1B4332]/80` | Semi-transparent primary over locked content |
| Modal Backdrop | `bg-[#1C1C1C]/50` | Behind modals, mobile menus |
| Hover Overlay | `bg-[#1C1C1C]/5` | Subtle hover on table rows, list items |

## Typography (Exact)

### Font Loading

Google Fonts URL (place in index.html `<head>` or index.css `@import`):
```
https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Amiri:ital,wght@0,400;0,700;1,400&family=Scheherazade+New:wght@400;700&display=swap
```

### Font Stack Definitions

```css
/* Swahili and English UI text */
font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* Arabic content and RTL text */
font-family: 'Amiri', 'Scheherazade New', 'Noto Naskh Arabic', 'Traditional Arabic', serif;

/* Decorative Arabic (Quranic verses, Bismillah) */
font-family: 'Amiri', serif;
font-style: italic;
```

### Type Scale (Exact Classes)

| Token | Mobile Size | Desktop Size (lg:) | Line Height | Weight | Letter Spacing | Tailwind Class Pattern |
|-------|-------------|-------------------|-------------|--------|---------------|----------------------|
| Hero | 32px | 48px | 1.2 | 700 | -0.02em | `text-[32px] lg:text-[48px] leading-[1.2] font-bold tracking-tight` |
| H1 | 28px | 36px | 1.3 | 700 | -0.01em | `text-[28px] lg:text-[36px] leading-[1.3] font-bold` |
| H2 | 24px | 28px | 1.3 | 700 | 0 | `text-[24px] lg:text-[28px] leading-[1.3] font-bold` |
| H3 | 20px | 22px | 1.4 | 600 | 0 | `text-[20px] lg:text-[22px] leading-[1.4] font-semibold` |
| Body | 16px | 16px | 1.6 | 400 | 0 | `text-base leading-[1.6]` |
| Body Large | 18px | 18px | 1.6 | 400 | 0 | `text-lg leading-[1.6]` |
| Small | 14px | 14px | 1.5 | 400 | 0 | `text-sm leading-[1.5]` |
| Small Medium | 14px | 14px | 1.5 | 500 | 0 | `text-sm leading-[1.5] font-medium` |
| XS | 12px | 12px | 1.4 | 500 | 0.01em | `text-xs leading-[1.4] font-medium` |
| Button | 16px | 16px | 1 | 500 | 0 | `text-base font-medium` |
| Label | 14px | 14px | 1.4 | 500 | 0 | `text-sm leading-[1.4] font-medium` |

### Arabic Typography Overrides

When `lang="ar"` or `dir="rtl"`:

| Element | Override |
|---------|----------|
| Body text | `font-family: 'Amiri', 'Scheherazade New', serif; font-size: 18px; line-height: 1.8;` |
| Headings | `font-family: 'Amiri', serif; font-weight: 700;` |
| Quranic verses | `font-family: 'Amiri', serif; font-style: italic; color: #C9A84C; text-align: center;` |
| Line height | Increased to 1.8 for all body text (Arabic needs more breathing room) |

## Spacing System (Exact)

### Base Unit: 4px

| Token | Value | Tailwind | Usage Examples |
|-------|-------|----------|---------------|
| space-0 | 0px | `p-0` `m-0` | Remove spacing |
| space-1 | 4px | `p-1` `m-1` `gap-1` | Tight icon gaps, tight padding |
| space-2 | 8px | `p-2` `m-2` `gap-2` | Inline spacing, small gaps |
| space-3 | 12px | `p-3` `m-3` `gap-3` | Compact component padding |
| space-4 | 16px | `p-4` `m-4` `gap-4` | Standard component padding, section gaps |
| space-5 | 20px | `p-5` `m-5` `gap-5` | Medium padding |
| space-6 | 24px | `p-6` `m-6` `gap-6` | Card padding, section margins |
| space-8 | 32px | `p-8` `m-8` `gap-8` | Large card padding, major gaps |
| space-10 | 40px | `p-10` `m-10` `gap-10` | Hero padding |
| space-12 | 48px | `p-12` `m-12` `gap-12` | Page section spacing |
| space-16 | 64px | `p-16` `m-16` `gap-16` | Major section breaks |
| space-20 | 80px | `p-20` `m-20` `gap-20` | Large section spacing |
| space-24 | 96px | `p-24` `m-24` `gap-24` | Hero section spacing |

### Component Spacing Standards

| Component | Padding | Gap | Margin |
|-----------|---------|-----|--------|
| Navbar | `px-4 lg:px-8` | — | — |
| Footer | `py-16 px-4 lg:px-8` | `gap-8` | `mt-auto` |
| Card | `p-6` | `gap-4` (internal) | `gap-4` (grid) |
| Subject Card | `p-6` | `gap-4` | — |
| Lesson Card | `p-4` | `gap-3` | — |
| Button | `px-6 py-3` (min-height 48px) | — | — |
| Input | `px-3 py-3` (min-height 48px) | — | — |
| Form group | — | `gap-4` | `mb-4` |
| Section | `py-12 lg:py-16` | `gap-8` | — |
| Container | `px-4 sm:px-6 lg:px-8` | — | `mx-auto max-w-7xl` |

## Layout System

### Container

```
max-width: 1280px (max-w-7xl)
padding: 16px mobile (px-4), 24px tablet (sm:px-6), 32px desktop (lg:px-8)
center: mx-auto
```

### Grid Patterns

| Pattern | Mobile | Tablet (md:) | Desktop (lg:) |
|---------|--------|-------------|---------------|
| Subject cards | 1 column | 2 columns | 3 columns |
| Lesson cards | 1 column | 2 columns | 3 columns |
| Stats cards | 1 column | 2 columns | 4 columns |
| Footer columns | 1 column stack | 2 columns | 3 columns |
| Admin sidebar | Hidden (overlay) | Hidden (overlay) | 240px fixed |

### Z-Index Stack

| Layer | Z-Index | Element |
|-------|---------|---------|
| Base content | 0 | Page content |
| Elevated cards | 10 | Hover cards |
| Sticky header | 40 | Navbar |
| Audio player | 40 | Persistent player |
| Dropdowns | 50 | Select menus, tooltips |
| Modals | 60 | Mobile menus, overlays |
| Toast notifications | 70 | Alerts |

## Component Size Standards (Big & Visual)

| Component | Minimum Height | Minimum Width | Notes |
|-----------|---------------|-------------|-------|
| Navbar | 64px | 100% | 56px on mobile |
| Hero section | 60vh | 100% | Max 80vh |
| Subject card | 200px | 100% | 1 column mobile, 1/3 desktop |
| Lesson card | 160px | 100% | Thumbnail 16:9 aspect ratio |
| Button | 48px | — | Padding `px-6` minimum |
| Input | 48px | 100% | Padding `px-3` |
| Audio player (desktop) | 64px | 100% | Fixed bottom |
| Audio player (mobile mini) | 48px | 100% | Collapsed state |
| Audio player (mobile expanded) | 200px | 100% | Full controls |
| Admin sidebar | 100vh | 240px | Fixed left |
| Card | — | 100% mobile | Max-width constraints on desktop |

## Shadow System

| Token | Value | Usage |
|-------|-------|-------|
| shadow-card | `0 1px 3px rgba(0,0,0,0.08)` | Default card state |
| shadow-card-hover | `0 4px 12px rgba(0,0,0,0.12)` | Card hover state |
| shadow-elevated | `0 8px 24px rgba(0,0,0,0.15)` | Modals, dropdowns, audio player |
| shadow-navbar | `0 1px 3px rgba(0,0,0,0.05)` | Subtle navbar shadow |

## Border System

| Token | Width | Style | Color | Usage |
|-------|-------|-------|-------|-------|
| border-default | 1px | solid | `#E5E0D8` | Cards, inputs, dividers |
| border-accent | 2px | solid | `#C9A84C` | Active nav, focus states, active tab |
| border-primary | 1px | solid | `#1B4332` | Primary buttons |
| border-left-accent | 4px | solid | `#C9A84C` | Active level card, current page indicator |
| border-bottom-muted | 1px | solid | `#E5E0D8` | Tab bars, section dividers |

## Button Styles (Exact)

### Primary Button

```
Background: #1B4332
Text: #FAF7F0
Padding: px-6 py-3 (min-height 48px)
Font: 16px, weight 500
Border: none
Hover background: #143828
Active background: #0f2d1f
Disabled: opacity 50%, cursor not-allowed
Transition: background-color 200ms ease-out
```

### Accent Button (CTA)

```
Background: #C9A84C
Text: #1C1C1C
Padding: px-6 py-3 (min-height 48px)
Font: 16px, weight 500
Border: none
Hover background: #B8973A
Active background: #a68633
Disabled: opacity 50%, cursor not-allowed
Transition: background-color 200ms ease-out
```

### Outline Button

```
Background: transparent
Text: #1B4332
Padding: px-6 py-3 (min-height 48px)
Font: 16px, weight 500
Border: 2px solid #1B4332
Hover background: #1B4332/10
Active background: #1B4332/20
Disabled: opacity 50%
Transition: all 200ms ease-out
```

### Ghost Button

```
Background: transparent
Text: #6B7280
Padding: px-4 py-2
Font: 14px, weight 500
Border: none
Hover text: #1C1C1C
Hover background: #1C1C1C/5
Active background: #1C1C1C/10
```

## Input Styles (Exact)

### Text Input

```
Background: #FFFFFF
Text: #1C1C1C
Placeholder: #6B7280
Padding: px-3 py-3 (min-height 48px)
Font: 16px
Border: 1px solid #E5E0D8
Focus border: 2px solid #C9A84C
Focus outline: none (use border for focus)
Error border: 1px solid #9B2335
Error background: #9B2335/5
Disabled: opacity 50%, background #FAF7F0
Transition: border-color 200ms ease-out
```

### Select Input

Same as text input, with:
```
Appearance: none (custom arrow icon)
Arrow icon: ChevronDown from lucide-react, 20px, color #6B7280
Padding-right: 40px (space for arrow)
```

### Textarea

```
Same as text input
Min-height: 120px
Resize: vertical only
```

## Card Styles (Exact)

### Standard Card

```
Background: #FFFFFF
Border: 1px solid #E5E0D8
Padding: p-6 (24px)
Shadow: shadow-card (0 1px 3px rgba(0,0,0,0.08))
Hover shadow: shadow-card-hover (0 4px 12px rgba(0,0,0,0.12))
Hover border: #C9A84C (optional, for interactive cards)
Transition: box-shadow 200ms ease-out, border-color 200ms ease-out
```

### Level Card (Home)

```
Standard card + left border indicator:
- Active (Beginner): border-l-4 border-l-[#C9A84C]
- Locked: overlay with #1B4332/80 background
```

### Subject Card

```
Standard card + large icon (48px, color #C9A84C)
Min-height: 200px
Icon hover: scale to 56px (transition transform 200ms)
```

## RTL (Right-to-Left) Specifications

### Trigger

When user selects Arabic language:
1. `document.documentElement.lang = 'ar'`
2. `document.documentElement.dir = 'rtl'`
3. i18next loads `ar.json` translations
4. All content with `content.ar` displays

### CSS Changes in RTL

| Property | LTR Value | RTL Value |
|----------|-----------|-----------|
| text-align | `text-left` | `text-right` |
| margin-left | `ml-*` | `mr-*` |
| margin-right | `mr-*` | `ml-*` |
| padding-left | `pl-*` | `pr-*` |
| padding-right | `pr-*` | `pl-*` |
| border-left | `border-l-*` | `border-r-*` |
| border-right | `border-r-*` | `border-l-*` |
| flex direction | `flex-row` | `flex-row-reverse` |
| absolute left | `left-*` | `right-*` |
| absolute right | `right-*` | `left-*` |

### Logical Properties (Preferred)

Use these instead of directional properties:
- `margin-inline-start` → `ms-*` (Tailwind)
- `margin-inline-end` → `me-*`
- `padding-inline-start` → `ps-*`
- `padding-inline-end` → `pe-*`
- `border-inline-start` → `border-s-*`
- `border-inline-end` → `border-e-*`
- `text-align: start` → `text-start`
- `text-align: end` → `text-end`

These automatically adapt to LTR/RTL without conditional classes.

### Arabic Content Display

| Element | LTR Display | RTL Display |
|---------|------------|-------------|
| Lesson title | `title.sw` | `title.ar` |
| Lesson content | `content.sw` | `content.ar` |
| Navigation labels | `sw.json` values | `ar.json` values |
| Font family | Inter | Amiri |
| Text alignment | left | right |
| Line height | 1.6 | 1.8 |

## Islamic Geometric Accents

### SVG Pattern Specifications

**8-point star motif:**
- Color: `#C9A84C` (accent) or `#FFFFFF` (on primary background)
- Opacity: 5-10% for backgrounds, 20% for decorative borders
- Size: 24x24px for corner ornaments, tileable for backgrounds
- Stroke width: 1px
- Fill: none (outline only) or solid at low opacity

**Usage locations:**
1. Hero section background: tiled pattern at 5% opacity
2. Section dividers: single row of 8-point stars, 20% opacity
3. Card corner ornaments: 24x24px, top-right or bottom-left
4. Admin header: subtle pattern overlay at 8% opacity
5. Empty state illustrations: centered geometric decoration

### Pattern Rules

- Angular lines only — no curves, no circles (except within 8-point star construction)
- Symmetrical — all patterns mirror on at least one axis
- Single color per pattern instance
- Never use as primary content — always decorative background/overlay

## Animation Specifications

### Standard Transitions

| Property | Duration | Easing | Usage |
|----------|----------|--------|-------|
| Background color | 200ms | ease-out | Button hovers, nav items |
| Border color | 200ms | ease-out | Card hovers, input focus |
| Box shadow | 200ms | ease-out | Card elevation changes |
| Opacity | 150ms | ease-out | Fade in/out |
| Transform (scale) | 200ms | ease-out | Icon hover scale |
| Transform (translate) | 200ms | ease-out | Mobile menu slide |
| Height | 300ms | ease-in-out | Audio player expand/collapse |

### Page Transitions

```
Enter: opacity 0 → 1, duration 150ms
Exit: opacity 1 → 0, duration 150ms
```

### Mobile Menu Animation

```
Open: translateX(-100%) → translateX(0), duration 200ms, ease-out
Close: translateX(0) → translateX(-100%), duration 200ms, ease-in
Backdrop: opacity 0 → 1, duration 200ms
```

### Reduced Motion

When `prefers-reduced-motion: reduce`:
- All transitions: duration 0.01ms
- All animations: disabled
- Instant state changes only

## Accessibility Specifications

### Focus Indicators

```
All interactive elements:
- Outline: 2px solid #C9A84C
- Outline offset: 2px
- Border radius: matches element (0 for sharp, full for circular)
- Visible on: :focus-visible only (not :focus)
```

### Color Contrast

| Combination | Ratio | Passes |
|-------------|-------|--------|
| #1C1C1C on #FFFFFF | 15.8:1 | AAA |
| #1C1C1C on #FAF7F0 | 14.2:1 | AAA |
| #FAF7F0 on #1B4332 | 10.5:1 | AAA |
| #C9A84C on #1B4332 | 4.8:1 | AA |
| #6B7280 on #FFFFFF | 5.4:1 | AA |
| #6B7280 on #FAF7F0 | 4.9:1 | AA |

### Screen Reader

- All `<img>`: descriptive `alt` in current language
- All icon-only buttons: `aria-label` describing action
- All form inputs: associated `<label>` with `htmlFor`
- All navigation: `<nav>` with `aria-label`
- Current page: `aria-current="page"` on active nav link
- Loading states: `aria-busy="true"` on loading containers
- Modal dialogs: `role="dialog"`, `aria-modal="true"`, focus trap

## Responsive Breakpoints (Exact)

| Name | Width | Tailwind Prefix | Primary Changes |
|------|-------|-----------------|-----------------|
| Mobile | < 640px | (default) | Single column, stacked layout, hamburger menu |
| Tablet | ≥ 640px | `sm:` | Minor adjustments, some 2-column grids |
| Desktop Small | ≥ 768px | `md:` | 2-column grids, sidebar appears on admin |
| Desktop | ≥ 1024px | `lg:` | 3-column grids, full navigation, admin sidebar fixed |
| Wide | ≥ 1280px | `xl:` | Max content width 1280px, centered |

## File References

For component-level specifications, see `ahlusunna-components.md`.
For data structures and mock content, see `ahlusunna-content-schema.md`.
"""
