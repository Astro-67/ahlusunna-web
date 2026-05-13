---
name: Ahlusunna Learning Platform
colors:
  surface: '#f9faf6'
  surface-dim: '#dadad7'
  surface-bright: '#f9faf6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f1'
  surface-container: '#eeeeeb'
  surface-container-high: '#e8e8e5'
  surface-container-highest: '#e2e3e0'
  on-surface: '#1a1c1a'
  on-surface-variant: '#414844'
  inverse-surface: '#2f312f'
  inverse-on-surface: '#f0f1ee'
  outline: '#717973'
  outline-variant: '#c1c8c2'
  surface-tint: '#3f6653'
  primary: '#012d1d'
  on-primary: '#ffffff'
  primary-container: '#1b4332'
  on-primary-container: '#86af99'
  inverse-primary: '#a5d0b9'
  secondary: '#615e58'
  on-secondary: '#ffffff'
  secondary-container: '#e4dfd7'
  on-secondary-container: '#65625c'
  tertiary: '#401b1b'
  on-tertiary: '#ffffff'
  tertiary-container: '#5a302f'
  on-tertiary-container: '#d29895'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c1ecd4'
  primary-fixed-dim: '#a5d0b9'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#274e3d'
  secondary-fixed: '#e7e2da'
  secondary-fixed-dim: '#cac6be'
  on-secondary-fixed: '#1d1c17'
  on-secondary-fixed-variant: '#494741'
  tertiary-fixed: '#ffdad8'
  tertiary-fixed-dim: '#f5b7b4'
  on-tertiary-fixed: '#331111'
  on-tertiary-fixed-variant: '#673a39'
  background: '#FAF7F0'
  on-background: '#1a1c1a'
  surface-variant: '#e2e3e0'
  primary-dark: '#143828'
  primary-foreground: '#FAF7F0'
  accent: '#C9A84C'
  accent-dark: '#B8973A'
  accent-foreground: '#1C1C1C'
  foreground: '#1C1C1C'
  card: '#FFFFFF'
  muted: '#F4EFE6'
  muted-foreground: '#6B7280'
  border: '#E5E0D8'
  destructive: '#9B2335'
  warning: '#D4A373'
  success: '#2D6A4F'
  sidebar: '#1B4332'
  sidebar-border: rgba(201, 168, 76, 0.2)
typography:
  display:
    fontFamily: Amiri, Newsreader
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.05'
    letterSpacing: -0.05em
  h1:
    fontFamily: Amiri, Newsreader
    fontSize: 44px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.025em
  h2:
    fontFamily: Amiri, Newsreader
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.2'
  h3:
    fontFamily: Amiri, Newsreader
    fontSize: 24px
    fontWeight: '400'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.75'
  body:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.75'
  body-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.14em
  arabic-body:
    fontFamily: Amiri, Scheherazade New
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.8'
spacing:
  base: 4px
  tight: 8px
  comfortable: 20px
  spacious: 40px
  dramatic: 80px
  max-content-width: 65ch
  max-page-width: 1280px
---

---
name: Ahlusunna Learning Platform
philosophy: Scholarly Heritage — Warm Islamic Educational Aesthetic
description: A trilingual Islamic learning platform combining scholarly gravitas with warm hospitality. The design balances reverence and approachability through traditional Islamic geometric patterns, classical Arabic typography, and an earthy color palette grounded in nature.
version: 1.0.0

# Design Tokens

## Colors

### Brand Colors
```yaml
primary:              "#1B4332"    # Deep forest green — trust, tradition, growth
primary-dark:         "#143828"    # Darker green for hover/active states
primary-foreground:   "#FAF7F0"    # Warm cream text on primary backgrounds
accent:               "#C9A84C"    # Gold amber — knowledge, prestige, divine light
accent-dark:          "#B8973A"    # Darker gold for hover states
accent-foreground:    "#1C1C1C"    # Dark text on gold backgrounds
```

### Neutral Palette
```yaml
background:           "#FAF7F0"    # Warm ivory — paper, parchment, openness
foreground:           "#1C1C1C"    # Near-black — clarity, readability
card:                 "#FFFFFF"    # Pure white for elevated content
card-foreground:      "#1C1C1C"
popover:              "#FFFFFF"
popover-foreground:   "#1C1C1C"
secondary:            "#E5E0D8"    # Warm gray — subtle structure
secondary-foreground: "#1C1C1C"
muted:                "#F4EFE6"    # Soft cream — secondary backgrounds
muted-foreground:     "#6B7280"    # Medium gray for secondary text
border:               "#E5E0D8"    # Subtle warm borders
input:                "#E5E0D8"
```

### Semantic Colors
```yaml
destructive:         "#9B2335"    # Deep burgundy — error states
warning:              "#D4A373"    # Terracotta — caution states
success:              "#2D6A4F"    # Green — success states
ring:                 "#C9A84C"    # Focus ring uses accent gold
```

### Sidebar (Admin)
```yaml
sidebar:              "#1B4332"    # Same primary green
sidebar-foreground:   "#FAF7F0"    # Cream text
sidebar-primary:      "#C9A84C"    # Gold for primary actions
sidebar-primary-foreground: "#1C1C1C"
sidebar-accent:       "#143828"    # Darker green for accent areas
sidebar-accent-foreground: "#FAF7F0"
sidebar-border:       "rgba(201, 168, 76, 0.2)"  # Subtle gold border
sidebar-ring:         "#C9A84C"
```

## Typography

### Font Families
```yaml
font-sans:            "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
font-arabic:          "'Amiri', 'Scheherazade New', 'Noto Naskh Arabic', serif"
font-decorative:      "'Amiri', serif"          # Headings with Arabic styling
font-display:        "'Fraunces', 'Source Serif 4', 'Cormorant Garamond', Georgia, serif"
```

### Type Scale
```yaml
text-xs:              "0.75rem"    # 12px
text-sm:              "0.875rem"   # 14px
text-base:            "1rem"       # 16px
text-body-sm:         "1rem"       # 16px — body small
text-body:            "1.125rem"   # 18px — body standard
text-body-lg:         "1.25rem"    # 20px — body large
text-h3:              "1.5rem"     # 24px
text-h2:              "2rem"       # 32px
text-h1:              "2.75rem"    # 44px
text-display:         "4rem"       # 64px
```

### Line Heights
```yaml
leading-none:         "1"          # Headings
leading-tight:        "1.1"        # Display/H1
leading-snug:         "1.2"        # H2/H3
leading-normal:       "1.4"        # UI text
leading-relaxed:      "1.6"        # Body small
leading-7:            "1.75"       # Body/Body-lg
leading-8:            "1.8"        # Arabic text
```

### Letter Spacing
```yaml
tracking-tighter:     "-0.05em"   # Large display headings
tracking-tight:       "-0.025em"  # Headings
tracking-normal:       "0"         # Body
tracking-wide:         "0.025em"   # Subheadings
tracking-wider:        "0.05em"    # Labels
tracking-widest:       "0.1em"     # Small caps, badges
uppercase-tracking:    "0.14em"    # Form labels
```

## Spacing

### Base Scale (4px)
```yaml
space-0:              "0"
space-1:              "0.25rem"   # 4px
space-2:              "0.5rem"    # 8px
space-3:              "0.75rem"   # 12px
space-4:              "1rem"      # 16px
space-5:              "1.25rem"   # 20px
space-6:              "1.5rem"    # 24px
space-8:              "2rem"      # 32px
space-10:             "2.5rem"    # 40px
space-12:             "3rem"      # 48px
space-16:             "4rem"      # 64px
space-20:             "5rem"      # 80px
space-24:             "6rem"      # 96px
```

## Border Radius

```yaml
radius-sm:            "calc(var(--radius) * 0.6)"    # 0px (sharp)
radius-md:            "calc(var(--radius) * 0.8)"    # 0px (sharp)
radius-lg:            "var(--radius)"                  # 0px (sharp — rectangular)
radius-xl:            "calc(var(--radius) * 1.4)"
radius-2xl:           "calc(var(--radius) * 1.8)"
radius-3xl:           "calc(var(--radius) * 2.2)"
radius-4xl:           "calc(var(--radius) * 2.6)"

# Note: Base radius is 0 — the design uses sharp, rectangular edges for a traditional, scholarly feel
```

## Shadows

### Elevation Levels
```yaml
shadow-sm:            "0 1px 2px rgba(0,0,0,0.05)"
shadow:               "0 4px 6px -1px rgba(0,0,0,0.1)"
shadow-md:            "0 10px 15px -3px rgba(0,0,0,0.1)"
shadow-lg:            "0 20px 25px -5px rgba(0,0,0,0.1)"
shadow-xl:            "0 25px 50px -12px rgba(0,0,0,0.25)"

# Component-specific
shadow-card:          "0 4px 20px rgba(27,67,50,0.1)"
shadow-card-hover:    "0 8px 30px rgba(27,67,50,0.12)"
shadow-nav:           "0 10px 30px rgba(27,67,50,0.08)"
shadow-dropdown:      "0 18px 50px rgba(0,0,0,0.16)"
shadow-button-hover:  "0 8px 24px rgba(27,67,50,0.18)"
shadow-hero-card:     "0 14px 45px rgba(0,0,0,0.22)"
shadow-input-focus:   "inset 0 -2px 0 var(--color-accent)"
```

## Motion

### Duration
```yaml
duration-fast:        "150ms"
duration-normal:      "200ms"
duration-slow:        "300ms"
duration-slower:      "500ms"
duration-slowest:     "700ms"
duration-hero:        "900ms"
duration-autoplay:    "1000ms"     # Image carousel
```

### Easing
```yaml
ease-out:             "cubic-bezier(0.33, 1, 0.68, 1)"
ease-in-out:          "cubic-bezier(0.65, 0, 0.35, 1)"
ease-spring:          "cubic-bezier(0.34, 1.56, 0.64, 1)"
```

### Animations
```yaml
# Hero entrance
hero-enter:           "translateY(18px) → translateY(0), 700ms ease-out, staggered 120ms"

# Lesson reader
lesson-title-rise:    "opacity 0→1, translateY(8px→0), 300ms ease-out"
lesson-body-fade:     "opacity 0→1, 200ms ease-out, delay 100ms"
lesson-heading-reveal: "opacity 0→1, translateY(6px→0), 280ms ease-out"

# Skeleton shimmer (ivory)
lesson-shimmer:       "background-position -200%→200%, 1.6s linear infinite"

# Form fade up
fadeUp:               "opacity 0→1, translateY(8px→0), 500ms ease-out"

# Interactive states
hover-lift:            "translateY(-2px), 300ms"
hover-scale:           "scale(1.02→1.05), 300ms"
arrow-translate:       "translateX(0→3px), 200ms"
```

## Z-Index Scale

```yaml
z-base:               "0"
z-dropdown:            "40"
z-sticky:             "40"
z-navbar:             "40"
z-modal-backdrop:      "100"
z-modal:               "110"
z-popover:            "50"
z-tooltip:            "50"
z-toast:              "100"
```

## Breakpoints

```yaml
sm:                    "640px"      # Mobile landscape
md:                    "768px"      # Tablet portrait
lg:                    "1024px"     # Tablet landscape / Small desktop
xl:                    "1280px"     # Desktop
2xl:                   "1536px"     # Large desktop
```

---

# Design Language

## Visual Identity

### Scholarly Heritage Philosophy
The Ahlusunna platform embodies a **Scholarly Heritage** aesthetic — an Islamic educational design language that bridges centuries of traditional manuscript illumination with modern digital clarity. The visual identity draws from:

- **Mosque architecture**: Deep green surfaces reminiscent of mosque domes and madrasa walls
- **Illuminated manuscripts**: Gold accents echoing the gold leaf used in classical Qur'an decoration
- **Warm hospitality**: Ivory backgrounds evoking the welcoming atmosphere of a scholar's study
- **Islamic geometry**: Subtle arabesque patterns as decorative elements

### Color Emotional Mapping
| Color | Hex | Emotional Quality | Usage |
|-------|-----|-------------------|-------|
| Deep Forest Green | `#1B4332` | Trust, tradition, spiritual depth | Primary actions, hero backgrounds |
| Gold Amber | `#C9A84C` | Knowledge, prestige, divine light | Accents, highlights, dividers |
| Warm Ivory | `#FAF7F0` | Openness, warmth, approachability | Page backgrounds |
| Deep Burgundy | `#9B2335` | Alert, serious, sacred warning | Destructive/error states |

## Typography System

### Hierarchy & Usage

**Display/Headings (Arabic styling)**
- Font: `font-decorative` ("Amiri", serif)
- Used for: Hero titles, section headers, lesson titles, Arabic text display
- Character: Elegant, classical, carries cultural authenticity
- Sizes: 24px–68px depending on context

**Body Text (Modern clarity)**
- Font: `font-sans` ("Inter", sans-serif)
- Used for: Paragraphs, UI text, form labels, navigation
- Character: Clean, highly readable, professional
- Sizes: 14px–18px depending on importance

**Arabic Content (RTL support)**
- Font: `font-arabic` ("Amiri", "Scheherazade New", serif)
- Size increase: +2px over surrounding Latin text
- Line height: 1.8–2.0 for optimal Arabic readability
- Direction: `dir="rtl"` with appropriate font stack

### Type Scale Guidelines
```
Display:  64px / 1.05 line-height  → Hero main title (68px on large screens)
H1:       44px / 1.1 line-height    → Page titles
H2:       32px / 1.2 line-height    → Section headers
H3:       24px / 1.2 line-height    → Card titles, lesson headings
Body LG:  20px / 1.75 line-height  → Lesson paragraphs, featured text
Body:     18px / 1.75 line-height  → Standard body text
Body SM:  16px / 1.6 line-height   → Secondary text, descriptions
Caption:  14px / 1.5 line-height   → Labels, timestamps
Small:    12px / 1.4 line-height   → Badges, meta information
```

## Spacing & Rhythm

### 4px Base Grid
All spacing values derive from a 4px base unit, creating visual harmony across the interface:
- **Tight (4–8px)**: Icon gaps, badge padding
- **Comfortable (16–24px)**: Standard padding, gaps between related elements
- **Spacious (32–48px)**: Section spacing, card padding
- **Dramatic (64px+)**: Major section breaks, hero content spacing

### Content Width
- **Max content width**: 65ch (optimal reading line length)
- **Max page width**: 1280px (7xl)
- **Container padding**: 16px (mobile) → 24px (tablet) → 32px (desktop)

## Component Patterns

### Card Design Language
Cards use a restrained, paper-like aesthetic:
- **Border**: 1px solid `#E5E0D8` (warm gray)
- **Hover**: Border transitions to accent gold, subtle shadow lift
- **Corner radius**: 0px (sharp, rectangular — traditional feel)
- **Content padding**: 24–28px

### Button Variants

| Variant | Background | Text | Border | Hover Effect |
|---------|-----------|------|--------|--------------|
| `default` | `#1B4332` | `#FAF7F0` | transparent | Darken to `#143828` |
| `accent` | `#C9A84C` | `#1C1C1C` | transparent | Darken to `#B8973A` |
| `outline` | transparent | `#1B4332` | 2px `#1B4332` | 10% green tint |
| `secondary` | `#E5E0D8` | `#1C1C1C` | transparent | Lighten |
| `ghost` | transparent | muted | transparent | 5% dark tint |
| `destructive` | 10% burgundy | burgundy | transparent | 20% burgundy tint |

**Button Heights**: 36px (sm), 44px (default/lg), 48px (xl)

### Form Input Styling
- **Border**: 1px solid `#E5E0D8`
- **Focus**: Bottom accent line (`inset 0 -2px 0 var(--color-accent)`)
- **Background**: White, transitions to ivory on focus
- **Height**: 44px minimum (touch-friendly)
- **Corner radius**: 0px

### Decorative Elements

**Islamic Divider Variants**
1. **Simple**: Horizontal line with centered diamond star
2. **Ornate**: Extended lines with interlocking diamond shapes
3. **Geometric**: Six-pointed star with symmetric lines
4. **Floral**: Flowing line with graduated dot accents

**Pattern Overlays**
- Arabesque SVG patterns at 6% opacity
- Variants: geometric, diamond, star, intersecting circles
- Color: Gold amber (`#C9A84C`)

## Motion Philosophy

### Purposeful Animation
Animations serve communication, not decoration:
- **Entrance**: Content rises into view, suggesting knowledge ascending
- **Feedback**: Immediate response to user actions
- **Continuity**: Smooth transitions maintain context

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Responsive Strategy

### Mobile-First Approach
Layouts build up from mobile, enhancing for larger screens:

| Breakpoint | Width | Key Adaptations |
|------------|-------|-----------------|
| Base | <640px | Single column, stacked navigation |
| sm | 640px+ | Increased padding, wider touch targets |
| md | 768px+ | Two-column grids, expanded navigation |
| lg | 1024px+ | Full horizontal navigation, sidebar layouts |
| xl | 1280px+ | Maximum content width, expanded whitespace |

### Touch Targets
- Minimum: 44×44px (WCAG 2.1 AA)
- Recommended: 48×48px for primary actions
- Navigation items: Full-height tappable areas

## Accessibility

### Color Contrast
All text meets WCAG AA standards:
- Body text on background: 10.5:1 (exceeds 4.5:1)
- Secondary text: 5.2:1 (exceeds 4.5:1)
- Large text (18px+): 8.8:1 (exceeds 3:1)

### Focus States
- Ring: 2px solid `#C9A84C` (gold)
- Offset: 2px
- Visible on all interactive elements

### Semantic HTML
- Landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`
- Headings: Logical H1→H6 hierarchy
- Labels: All form inputs have associated labels
- ARIA: Interactive components include ARIA attributes

## Iconography

### Library
Lucide React — consistent 24px stroke icons

### Stroke Weights
- Standard UI: 1.5–2px
- Subtle accents: 1.4px
- Dense content: 2.5px

### Sizing
- Inline with text: 16–20px
- Icon-only buttons: 20–24px
- Feature icons: 32px (cards), 40px (sections)

---

# Component Inventory

## Navigation

### Navbar
- **States**: Default, scrolled (with shadow), mobile menu open
- **Background**: `rgba(250, 247, 240, 0.96)` with backdrop blur
- **Border**: 1px warm gray, bottom only
- **Height**: 80px (mobile), 96px (tablet), 112px (desktop)
- **Active indicator**: 2px gold underline on active link

### Mobile Menu
- **Trigger**: Hamburger icon, transforms to X
- **Animation**: Slide down with shadow
- **Max height**: `calc(100svh - nav-height)`
- **Backdrop**: None (uses navbar background)

## Content Cards

### Subject Card
- **Background**: White
- **Featured indicator**: 3px gold left border
- **Icon container**: 64×64px, green/5% background
- **Hover**: Background warms to `#FDFCF8`, border can become gold

### Course Card
- **Border**: 2px warm gray
- **Thumbnail aspect ratio**: 16:9
- **Hover**: Border gold, shadow lift, subtle image zoom (scale 1.05)
- **Featured line**: Gold gradient at top, appears on hover

### Benefit Card
- **Border**: 1px warm gray
- **Hover**: Gold border at 50% opacity, subtle shadow
- **Icon container**: 64–80px square with gold border accent
- **Top decoration**: Gold gradient line (appears on hover)

## Forms

### Input Fields
- **Height**: 44px (touch-friendly)
- **Padding**: 16px horizontal
- **Border**: 1px warm gray
- **Focus**: Green border, gold bottom accent line
- **Error**: Red border, error message below

### Login Form
- **Layout**: Vertical stack, generous spacing
- **Labels**: 11px uppercase, 0.14em tracking
- **Submit button**: Full width, gold accent bottom line on hover

## Lesson Reader

### Lesson Header
- **Title**: Large display font, 36–48px
- **Arabic subtitle**: Gold accent color, 28px
- **Meta badges**: Border, 12px text, status badge with gold accent
- **Divider**: Islamic pattern between header and content

### Lesson Body
- **Content width**: 65ch maximum
- **Paragraphs**: 18px, 1.75 line height
- **Headings**: Uppercase, display font, gold accent
- **Lists**: Gold bullets/numbers
- **Arabic blocks**: Centered, gold-tinted background, decorative lines

## Hero Section

### Background
- **Image**: Full-bleed with overlay gradient
- **Gradient**: Dark green at bottom, lighter at top
- **Overlay**: Additional dark layer for text contrast

### Level Cards
- **Container**: Dark green with subtle transparency
- **Border**: White at 10% opacity (locked), gold at 28% (unlocked)
- **Hover**: Border intensifies, subtle lift
- **Locked state**: Reduced opacity, lock icon

### Login Prompt Modal
- **Backdrop**: Black at 60% with blur
- **Panel**: White with gold top accent line
- **Icon**: Large centered lock with pulsing ring
- **Actions**: Full-width stacked buttons

## Admin Sidebar

### Colors
- **Background**: Deep forest green
- **Text**: Cream
- **Accent**: Gold
- **Border**: Gold at 20% opacity

### Menu Items
- **Default**: Cream text
- **Hover**: Gold icon, slightly lighter background
- **Active**: Gold left border, gold icon

---

# Dark Mode

Dark mode is currently **not implemented** in this version. The design uses CSS custom properties throughout, making dark mode implementation straightforward when needed.

## Future Dark Mode Token Mapping

When implementing dark mode, map to these values:
```yaml
background:           "#0F1419"    # Deep charcoal
foreground:           "#E7E5E4"    # Warm off-white
card:                 "#1C1C1C"    # Elevated surface
muted:                "#292524"    # Secondary backgrounds
border:               "#3D3D3D"    # Subtle borders
primary:              "#2D6A4F"    # Lighter green for dark
accent:               "#D4A84C"    # Brighter gold for contrast
```
