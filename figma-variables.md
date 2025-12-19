# Figma Design Variables System

**Collection:** Design System

This document describes the Design Variables system for the Habit Coach MVP, focusing exclusively on the "Design System" collection. It documents Breakpoints, Colors (Light / Dark), and Typography variable groups.

---

## Breakpoints

### Purpose
The Breakpoints variable group defines responsive layout parameters for Desktop, Tablet, and Mobile viewports. These variables control grid systems, spacing, margins, and breakpoint thresholds to ensure consistent layouts across device sizes.

### Naming Conventions
- **Variable Type Prefixes:**
  - `#` indicates a Number variable type
  - `T` indicates a Text/String variable type (though values are numerical)
- **Naming Pattern:** `[Group]/[Variable Name]`
- **Separator:** Forward slash (`/`) for group hierarchy
- **Variable Names:** Use lowercase with hyphens (e.g., `page-x`, `page-y`) or abbreviations (e.g., `xs`, `s`, `md`, `lg`, `xl`, `2xl`)

### Variable Structure

#### Group: `breakpoints`
- **Variable:** `# Number`
  - **Parent:** `breakpoints`
  - **Type:** Number
  - **Purpose:** Defines the viewport width breakpoint threshold

#### Group: `margin`
- **Variable:** `T page-x`
  - **Parent:** `margin`
  - **Type:** Text/String
  - **Purpose:** Horizontal page margin
- **Variable:** `T page-y`
  - **Parent:** `margin`
  - **Type:** Text/String
  - **Purpose:** Vertical page margin

#### Group: `gap`
- **Variable:** `T xs`
  - **Parent:** `gap`
  - **Type:** Text/String
  - **Purpose:** Extra small gap spacing
- **Variable:** `T s`
  - **Parent:** `gap`
  - **Type:** Text/String
  - **Purpose:** Small gap spacing
- **Variable:** `T md`
  - **Parent:** `gap`
  - **Type:** Text/String
  - **Purpose:** Medium gap spacing
- **Variable:** `T lg`
  - **Parent:** `gap`
  - **Type:** Text/String
  - **Purpose:** Large gap spacing
- **Variable:** `T xl`
  - **Parent:** `gap`
  - **Type:** Text/String
  - **Purpose:** Extra large gap spacing
- **Variable:** `T 2xl`
  - **Parent:** `gap`
  - **Type:** Text/String
  - **Purpose:** 2x extra large gap spacing

#### Group: `grid`
- **Variable:** `T columns`
  - **Parent:** `grid`
  - **Type:** Text/String
  - **Purpose:** Number of grid columns
- **Variable:** `T gutter`
  - **Parent:** `grid`
  - **Type:** Text/String
  - **Purpose:** Spacing between grid columns
- **Variable:** `T margin`
  - **Parent:** `grid`
  - **Type:** Text/String
  - **Purpose:** Grid container margin

### Modes

Three modes are defined: **Desktop**, **Tablet**, and **Mobile**.

#### Mode Values

| Variable | Desktop | Tablet | Mobile |
|----------|---------|--------|--------|
| `breakpoints/# Number` | `1440` | `810` | `393` |
| `margin/T page-x` | `32` | `24` | `16` |
| `margin/T page-y` | `32` | `24` | `16` |
| `gap/T xs` | `4` | `4` | `4` |
| `gap/T s` | `8` | `8` | `8` |
| `gap/T md` | `16` | `16` | `12` |
| `gap/T lg` | `24` | `20` | `16` |
| `gap/T xl` | `40` | `32` | `24` |
| `gap/T 2xl` | `48` | `40` | `32` |
| `grid/T columns` | `12` | `8` | `4` |
| `grid/T gutter` | `24` | `24` | `16` |
| `grid/T margin` | `32` | `24` | `16` |

#### Responsive Behavior
- **Breakpoint threshold:** Decreases from Desktop (1440px) to Tablet (810px) to Mobile (393px)
- **Margins:** Scale down proportionally across modes (Desktop > Tablet > Mobile)
  - `page-x` and `page-y` follow identical scaling: 32 → 24 → 16
- **Gap spacing:** 
  - `xs` and `s` remain constant across all modes
  - `md` and larger scale down from Desktop to Mobile
  - Progressive reduction pattern: Desktop values are largest, Mobile values are smallest
- **Grid system:**
  - `columns`: Reduces from 12 (Desktop) to 8 (Tablet) to 4 (Mobile)
  - `gutter`: Remains constant at 24 for Desktop and Tablet, reduces to 16 for Mobile
  - `margin`: Scales down from 32 (Desktop) to 24 (Tablet) to 16 (Mobile), matching `page-x` and `page-y` values

---

## Colors (Light / Dark)

### Purpose
The Colors variable group defines a comprehensive color palette supporting both light and dark themes. Colors are organized by semantic purpose (background, surface, text, borders, buttons, status indicators) to ensure consistent theming and maintainability across the UI.

### Naming Conventions
- **Hierarchical Structure:** `[Group Name]/[Variable Name]`
- **Separator:** Forward slash (`/`) for group hierarchy
- **Semantic Naming:** Variables use purpose-based names rather than literal color names
  - Background hierarchy: `primary`, `secondary`, `tertiary`, `inverse`
  - Surface states: `default`, `raised`, `overlay`
  - Text hierarchy: `primary`, `secondary`, `tertiary`, etc.
  - Button types: `primary`, `secondary`, `destructive`
  - Status types: `success`, `warning`, `error`, `info`
- **Naming Pattern:** Lowercase with hyphens for multi-word groups (e.g., `button-primary`, `status-success`)

### Variable Structure

#### Individual Variables
- **Variable:** `25`
  - **Type:** Color
  - **Light Mode:** `F6F9FC` (Light Blue)
  - **Dark Mode:** `F6F9FC` (Light Blue)
  - **Purpose:** Generic color variable (consistent across modes)

#### Group: `background` (4 variables)
- **Variable:** `primary`
  - **Type:** Color
  - **Light Mode:** `FFFFFF` (White)
  - **Dark Mode:** `0A0A0A` (Very Dark Gray)
- **Variable:** `secondary`
  - **Type:** Color
  - **Light Mode:** `F5F5F5` (Light Gray)
  - **Dark Mode:** `171717` (Dark Gray)
- **Variable:** `tertiary`
  - **Type:** Color
  - **Light Mode:** `E5E5E5` (Medium Light Gray)
  - **Dark Mode:** `262626` (Medium Dark Gray)
- **Variable:** `inverse`
  - **Type:** Color
  - **Light Mode:** `171717` (Dark Gray)
  - **Dark Mode:** `FFFFFF` (White)

#### Group: `surface` (3 variables)
- **Variable:** `default`
  - **Type:** Color
  - **Light Mode:** `FFFFFF` (White)
  - **Dark Mode:** `171717` (Dark Gray)
- **Variable:** `raised`
  - **Type:** Color
  - **Light Mode:** `FFFFFF` (White)
  - **Dark Mode:** `262626` (Medium Dark Gray)
- **Variable:** `overlay`
  - **Type:** Color
  - **Light Mode:** `FFFFFF` (White)
  - **Dark Mode:** `262626` (Medium Dark Gray)

#### Group: `text` (10 variables)
- **Variable:** `primary`
  - **Type:** Color
  - **Light Mode:** `171717` (Dark Gray)
  - **Dark Mode:** `FAFAFA` (Very Light Gray)
- **Variable:** `secondary`
  - **Type:** Color
  - **Light Mode:** `FFFFFF` (White)
  - **Dark Mode:** `262626` (Medium Dark Gray)
- **Variable:** `tertiary`
  - **Type:** Color
  - **Light Mode:** `737373` (Medium Gray)
  - **Dark Mode:** `A3A3A3` (Light Gray)
- **Variable:** `disabled`
  - **Type:** Color
  - **Light Mode:** `A3A3A3` (Light Gray)
  - **Dark Mode:** `737373` (Medium Gray)
- **Variable:** `inverse`
  - **Type:** Color
  - **Light Mode:** `FFFFFF` (White)
  - **Dark Mode:** `171717` (Dark Gray)
- **Variable:** `link`
  - **Type:** Color
  - **Light Mode:** `4F46E5` (Blue/Purple)
  - **Dark Mode:** `818CF8` (Lighter Blue/Purple)
- **Variable:** `success`
  - **Type:** Color
  - **Light Mode:** `16A34A` (Dark Green)
  - **Dark Mode:** `4ADE80` (Lighter Green)
- **Variable:** `warning`
  - **Type:** Color
  - **Light Mode:** `D97706` (Orange)
  - **Dark Mode:** `FBBF24` (Yellow)
- **Variable:** `error`
  - **Type:** Color
  - **Light Mode:** `DC2626` (Red)
  - **Dark Mode:** `F87171` (Lighter Red/Pink)
- **Variable:** `info`
  - **Type:** Color
  - **Light Mode:** `2563EB` (Blue)
  - **Dark Mode:** `60A5FA` (Lighter Blue)

#### Group: `border` (6 variables)
- **Variable:** `default`
  - **Type:** Color
  - **Light Mode:** `E5E5E5` (Light Gray)
  - **Dark Mode:** `404040` (Dark Gray)
- **Variable:** `hover`
  - **Type:** Color
  - **Light Mode:** `D4D4D4` (Medium Gray)
  - **Dark Mode:** `525252` (Darker Gray)
- **Variable:** `focus`
  - **Type:** Color
  - **Light Mode:** `4F46E5` (Blue/Purple)
  - **Dark Mode:** `818CF8` (Lighter Blue/Purple)
- **Variable:** `error`
  - **Type:** Color
  - **Light Mode:** `DC2626` (Red)
  - **Dark Mode:** `F87171` (Lighter Red/Pink)
- **Variable:** `disabled`
  - **Type:** Color
  - **Light Mode:** `F5F5F5` (Very Light Gray)
  - **Dark Mode:** `262626` (Medium Dark Gray)
- **Variable:** `placeholder`
  - **Type:** Color
  - **Light Mode:** `A3A3A3` (Medium Gray)
  - **Dark Mode:** `737373` (Darker Gray)

#### Group: `button-primary` (6 variables)
- **Variable:** `background`
  - **Type:** Color
  - **Light Mode:** `4F46E5` (Blue/Purple)
  - **Dark Mode:** `6366F1` (Slightly Different Blue/Purple)
- **Variable:** `background-hover`
  - **Type:** Color
  - **Light Mode:** `4338CA` (Darker Blue/Purple)
  - **Dark Mode:** `4F46E5` (Light Mode Background Color)
- **Variable:** `background-active`
  - **Type:** Color
  - **Light Mode:** `3730A3` (Even Darker Blue/Purple)
  - **Dark Mode:** `4338CA` (Light Mode Hover Color)
- **Variable:** `background-disabled`
  - **Type:** Color
  - **Light Mode:** `E5E5E5` (Light Gray)
  - **Dark Mode:** `262626` (Very Dark Gray)
- **Variable:** `text`
  - **Type:** Color
  - **Light Mode:** `FFFFFF` (White)
  - **Dark Mode:** `FFFFFF` (White)
- **Variable:** `text-disabled`
  - **Type:** Color
  - **Light Mode:** `A3A3A3` (Medium Gray)
  - **Dark Mode:** `737373` (Darker Gray)

#### Group: `button-secondary` (4 variables)
- **Variable:** `background`
  - **Type:** Color
  - **Light Mode:** `F5F5F5` (Very Light Gray)
  - **Dark Mode:** `262626` (Very Dark Gray)
- **Variable:** `background-hover`
  - **Type:** Color
  - **Light Mode:** `E5E5E5` (Light Gray)
  - **Dark Mode:** `404040` (Dark Gray)
- **Variable:** `background-active`
  - **Type:** Color
  - **Light Mode:** `D4D4D4` (Slightly Darker Light Gray)
  - **Dark Mode:** `525252` (Medium Dark Gray)
- **Variable:** `text`
  - **Type:** Color
  - **Light Mode:** `171717` (Dark Gray)
  - **Dark Mode:** `FAFAFA` (Very Light Gray)

#### Group: `button-destructive` (3 variables)
- **Variable:** `background`
  - **Type:** Color
  - **Light Mode:** `DC2626` (Red)
  - **Dark Mode:** `EF4444` (Lighter Red)
- **Variable:** `background-hover`
  - **Type:** Color
  - **Light Mode:** `B91C1C` (Darker Red)
  - **Dark Mode:** `DC2626` (Red)
- **Variable:** `text`
  - **Type:** Color
  - **Light Mode:** `FFFFFF` (White)
  - **Dark Mode:** `FFFFFF` (White)

#### Group: `card` (3 variables)
- **Variable:** `background`
  - **Type:** Color
  - **Light Mode:** `FFFFFF` (White)
  - **Dark Mode:** `171717` (Dark Gray)
- **Variable:** `border`
  - **Type:** Color
  - **Light Mode:** `E5E5E5` (Light Gray)
  - **Dark Mode:** `404040` (Dark Gray)
- **Variable:** `shadow`
  - **Type:** Color
  - **Light Mode:** `FFFFFF` (White)
  - **Dark Mode:** `FFFFFF` (White)

#### Group: `input` (8 variables)
- **Variable:** `background`
  - **Type:** Color
  - **Light Mode:** `FFFFFF` (White)
  - **Dark Mode:** `1A1A1A` (Dark Gray)
- **Variable:** `background-disabled`
  - **Type:** Color
  - **Light Mode:** `F5F5F5` (Very Light Gray)
  - **Dark Mode:** `262626` (Medium Dark Gray)
- **Variable:** `border`
  - **Type:** Color
  - **Light Mode:** `E5E5E5` (Light Gray)
  - **Dark Mode:** `404040` (Dark Gray)
- **Variable:** `border-hover`
  - **Type:** Color
  - **Light Mode:** `D4D4D4` (Medium Gray)
  - **Dark Mode:** `525252` (Darker Gray)
- **Variable:** `border-focus`
  - **Type:** Color
  - **Light Mode:** `4F46E5` (Blue/Purple)
  - **Dark Mode:** `818CF8` (Lighter Blue/Purple)
- **Variable:** `border-error`
  - **Type:** Color
  - **Light Mode:** `DC2626` (Red)
  - **Dark Mode:** `F87171` (Lighter Red/Pink)
- **Variable:** `text`
  - **Type:** Color
  - **Light Mode:** `171717` (Very Dark Gray/Black)
  - **Dark Mode:** `FAFAFA` (Very Light Gray/Off-White)
- **Variable:** `placeholder`
  - **Type:** Color
  - **Light Mode:** `A3A3A3` (Medium Gray)
  - **Dark Mode:** `737373` (Darker Gray)

#### Group: `status-success` (4 variables)
- **Variable:** `background`
  - **Type:** Color
  - **Light Mode:** `F0FDF4` (Very Light Green)
  - **Dark Mode:** `14532D` (Dark Green)
- **Variable:** `border`
  - **Type:** Color
  - **Light Mode:** `BBF7D0` (Light Green)
  - **Dark Mode:** `166534` (Dark Green)
- **Variable:** `text`
  - **Type:** Color
  - **Light Mode:** `15803D` (Medium Dark Green)
  - **Dark Mode:** `BBF7D0` (Light Green)
- **Variable:** `icon`
  - **Type:** Color
  - **Light Mode:** `16A34A` (Medium Green)
  - **Dark Mode:** `4ADE80` (Bright Green)

#### Group: `status-warning` (4 variables)
- **Variable:** `background`
  - **Type:** Color
  - **Light Mode:** `FFFBEB` (Very Light Yellow)
  - **Dark Mode:** `78350F` (Dark Brown/Orange)
- **Variable:** `border`
  - **Type:** Color
  - **Light Mode:** `FDE68A` (Light Yellow/Orange)
  - **Dark Mode:** `92400E` (Dark Orange/Brown)
- **Variable:** `text`
  - **Type:** Color
  - **Light Mode:** `B45309` (Medium Brown/Orange)
  - **Dark Mode:** `FDE68A` (Light Yellow/Orange)
- **Variable:** `icon`
  - **Type:** Color
  - **Light Mode:** `F59E0B` (Orange)
  - **Dark Mode:** `FBBF24` (Yellow)

#### Group: `status-error` (4 variables)
- **Variable:** `background`
  - **Type:** Color
  - **Light Mode:** `FEF2F2` (Pale Pink)
  - **Dark Mode:** `7F1D1D` (Dark Red/Maroon)
- **Variable:** `border`
  - **Type:** Color
  - **Light Mode:** `FECACA` (Light Pink)
  - **Dark Mode:** `991B1B` (Dark Red/Maroon)
- **Variable:** `text`
  - **Type:** Color
  - **Light Mode:** `B91C1C` (Red)
  - **Dark Mode:** `FECACA` (Light Pink)
- **Variable:** `icon`
  - **Type:** Color
  - **Light Mode:** `DC2626` (Bright Red)
  - **Dark Mode:** `F87171` (Coral Pink)

#### Group: `status-info` (4 variables)
- **Variable:** `background`
  - **Type:** Color
  - **Light Mode:** `EFF6FF` (Very Light Blue/White)
  - **Dark Mode:** `1E3A8A` (Dark Blue)
- **Variable:** `border`
  - **Type:** Color
  - **Light Mode:** `BFDBFE` (Light Blue)
  - **Dark Mode:** `1E40AF` (Dark Blue)
- **Variable:** `text`
  - **Type:** Color
  - **Light Mode:** `1D4ED8` (Blue)
  - **Dark Mode:** `BFDBFE` (Light Blue)
- **Variable:** `icon`
  - **Type:** Color
  - **Light Mode:** `3B82F6` (Medium Blue)
  - **Dark Mode:** `60A5FA` (Lighter Blue)

#### Group: `habit-blue` (3 variables)
- **Variable:** `background`
  - **Type:** Color
  - **Light Mode:** `EEF2FF` (Very Light Blue/White)
  - **Dark Mode:** `312E81` (Dark Purple-Blue)
- **Variable:** `dot`
  - **Type:** Color
  - **Light Mode:** `7C3AED` (Medium Purple)
  - **Dark Mode:** `8B5CF6` (Darker Purple)
- **Variable:** `dot-completed`
  - **Type:** Color
  - **Light Mode:** `8B5CF6` (Lighter Purple)
  - **Dark Mode:** `A78BFA` (Even Lighter Purple)

#### Group: `habit-purple` (3 variables)
- **Variable:** `background`
  - **Type:** Color
  - **Light Mode:** `F5F3FF` (Light Purple)
  - **Dark Mode:** `4C1D95` (Dark Purple)
- **Variable:** `dot`
  - **Type:** Color
  - **Light Mode:** `7C3AED` (Medium Purple)
  - **Dark Mode:** `8B5CF6` (Darker Purple)
- **Variable:** `dot-completed`
  - **Type:** Color
  - **Light Mode:** `8B5CF6` (Lighter Purple)
  - **Dark Mode:** `A78BFA` (Even Lighter Purple)

#### Group: `habit-orange` (3 variables)
- **Variable:** `background`
  - **Type:** Color
  - **Light Mode:** `FFF7ED` (Light Orange/Cream)
  - **Dark Mode:** `7C2D12` (Dark Brown/Orange)
- **Variable:** `dot`
  - **Type:** Color
  - **Light Mode:** `EA580C` (Bright Orange)
  - **Dark Mode:** `F97316` (Slightly Darker Orange)
- **Variable:** `dot-completed`
  - **Type:** Color
  - **Light Mode:** `F97316` (Medium Orange)
  - **Dark Mode:** `FB923C` (Lighter Orange)

#### Group: `habit-red` (3 variables)
- **Variable:** `background`
  - **Type:** Color
  - **Light Mode:** `FEF2F2` (Very Light Red/Pink)
  - **Dark Mode:** `7F1D1D` (Dark Red/Brown)
- **Variable:** `dot`
  - **Type:** Color
  - **Light Mode:** `DC2626` (Bright Red)
  - **Dark Mode:** `EF4444` (Slightly Darker Red)
- **Variable:** `dot-completed`
  - **Type:** Color
  - **Light Mode:** `EF4444` (Medium Red)
  - **Dark Mode:** `F87171` (Lighter Red/Pink)

#### Group: `brand-primary-blue` (10 variables)
- **Variable:** `50`
  - **Type:** Color
  - **Light Mode:** `EEF2FF` (Very Light Blue)
  - **Dark Mode:** `EEF2FF` (Very Light Blue)
- **Variable:** `100`
  - **Type:** Color
  - **Light Mode:** `E0E7FF` (Light Blue)
  - **Dark Mode:** `E0E7FF` (Light Blue)
- **Variable:** `200`
  - **Type:** Color
  - **Light Mode:** `C7D2FE` (Pale Blue)
  - **Dark Mode:** `C7D2FE` (Pale Blue)
- **Variable:** `300`
  - **Type:** Color
  - **Light Mode:** `A5B4FC` (Medium Light Blue)
  - **Dark Mode:** `A5B4FC` (Medium Light Blue)
- **Variable:** `400`
  - **Type:** Color
  - **Light Mode:** `818CF8` (Medium Blue)
  - **Dark Mode:** `818CF8` (Medium Blue)
- **Variable:** `500`
  - **Type:** Color
  - **Light Mode:** `6366F1` (Mid-Range Blue - Primary Brand Blue)
  - **Dark Mode:** `6366F1` (Mid-Range Blue - Primary Brand Blue)
- **Variable:** `600`
  - **Type:** Color
  - **Light Mode:** `4F46E5` (Darker Blue)
  - **Dark Mode:** `4F46E5` (Darker Blue)
- **Variable:** `700`
  - **Type:** Color
  - **Light Mode:** `4338CA` (Dark Blue)
  - **Dark Mode:** `4338CA` (Dark Blue)
- **Variable:** `800`
  - **Type:** Color
  - **Light Mode:** `3730A3` (Very Dark Blue)
  - **Dark Mode:** `3730A3` (Very Dark Blue)
- **Variable:** `900`
  - **Type:** Color
  - **Light Mode:** `312E81` (Deepest Dark Blue)
  - **Dark Mode:** `312E81` (Deepest Dark Blue)

#### Group: `brand-secondary-purple` (10 variables)
- **Variable:** `50`
  - **Type:** Color
  - **Light Mode:** `F5F3FF` (Very Light Purple)
  - **Dark Mode:** `F5F3FF` (Very Light Purple)
- **Variable:** `100`
  - **Type:** Color
  - **Light Mode:** `EDE9FE` (Slightly Darker Purple)
  - **Dark Mode:** `EDE9FE` (Slightly Darker Purple)
- **Variable:** `200`
  - **Type:** Color
  - **Light Mode:** `DDD6FE` (Light Purple)
  - **Dark Mode:** `DDD6FE` (Light Purple)
- **Variable:** `300`
  - **Type:** Color
  - **Light Mode:** `C4B5FD` (Pale Purple)
  - **Dark Mode:** `C4B5FD` (Pale Purple)
- **Variable:** `400`
  - **Type:** Color
  - **Light Mode:** `A78BFA` (Medium Lavender)
  - **Dark Mode:** `A78BFA` (Medium Lavender)
- **Variable:** `500`
  - **Type:** Color
  - **Light Mode:** `8B5CF6` (Medium Purple)
  - **Dark Mode:** `8B5CF6` (Medium Purple)
- **Variable:** `600`
  - **Type:** Color
  - **Light Mode:** `7C3AED` (Deeper Purple)
  - **Dark Mode:** `7C3AED` (Deeper Purple)
- **Variable:** `700`
  - **Type:** Color
  - **Light Mode:** `6D28D9` (Darker Purple)
  - **Dark Mode:** `6D28D9` (Darker Purple)
- **Variable:** `800`
  - **Type:** Color
  - **Light Mode:** `5B21B6` (Dark Purple)
  - **Dark Mode:** `5B21B6` (Dark Purple)
- **Variable:** `900`
  - **Type:** Color
  - **Light Mode:** `4C1D95` (Deepest Purple)
  - **Dark Mode:** `4C1D95` (Deepest Purple)

#### Group: `semantic-success-green` (10 variables)
- **Variable:** `50`
  - **Type:** Color
  - **Light Mode:** `F0FDF4` (Very Light Green)
  - **Dark Mode:** `F0FDF4` (Very Light Green)
- **Variable:** `100`
  - **Type:** Color
  - **Light Mode:** `DCFCE7` (Pale Green)
  - **Dark Mode:** `DCFCE7` (Pale Green)
- **Variable:** `200`
  - **Type:** Color
  - **Light Mode:** `BBF7D0` (Light Green)
  - **Dark Mode:** `BBF7D0` (Light Green)
- **Variable:** `300`
  - **Type:** Color
  - **Light Mode:** `86EFAC` (Medium Light Green)
  - **Dark Mode:** `86EFAC` (Medium Light Green)
- **Variable:** `400`
  - **Type:** Color
  - **Light Mode:** `4ADE80` (Medium Green)
  - **Dark Mode:** `4ADE80` (Medium Green)
- **Variable:** `500`
  - **Type:** Color
  - **Light Mode:** `22C55E` (Medium Green)
  - **Dark Mode:** `22C55E` (Medium Green)
- **Variable:** `600`
  - **Type:** Color
  - **Light Mode:** `16A34A` (Medium Dark Green)
  - **Dark Mode:** `16A34A` (Medium Dark Green)
- **Variable:** `700`
  - **Type:** Color
  - **Light Mode:** `15803D` (Dark Green)
  - **Dark Mode:** `15803D` (Dark Green)
- **Variable:** `800`
  - **Type:** Color
  - **Light Mode:** `166534` (Very Dark Green)
  - **Dark Mode:** `166534` (Very Dark Green)
- **Variable:** `900`
  - **Type:** Color
  - **Light Mode:** `14532D` (Deepest Dark Green)
  - **Dark Mode:** `14532D` (Deepest Dark Green)

#### Group: `semantic-warning-yellow` (10 variables)
- **Variable:** `50`
  - **Type:** Color
  - **Light Mode:** `FFFBEB` (Very Light Yellow)
  - **Dark Mode:** `FFFBEB` (Very Light Yellow)
- **Variable:** `100`
  - **Type:** Color
  - **Light Mode:** `FEF3C7` (Pale Yellow)
  - **Dark Mode:** `FEF3C7` (Pale Yellow)
- **Variable:** `200`
  - **Type:** Color
  - **Light Mode:** `FDE68A` (Light Yellow/Orange)
  - **Dark Mode:** `FDE68A` (Light Yellow/Orange)
- **Variable:** `300`
  - **Type:** Color
  - **Light Mode:** `FCD34D` (Medium Yellow)
  - **Dark Mode:** `FCD34D` (Medium Yellow)
- **Variable:** `400`
  - **Type:** Color
  - **Light Mode:** `FBBF24` (Medium Yellow/Orange)
  - **Dark Mode:** `FBBF24` (Medium Yellow/Orange)
- **Variable:** `500`
  - **Type:** Color
  - **Light Mode:** `F59E0B` (Orange)
  - **Dark Mode:** `F59E0B` (Orange)
- **Variable:** `600`
  - **Type:** Color
  - **Light Mode:** `D97706` (Darker Orange)
  - **Dark Mode:** `D97706` (Darker Orange)
- **Variable:** `700`
  - **Type:** Color
  - **Light Mode:** `D45200` (Dark Orange)
  - **Dark Mode:** `D45200` (Dark Orange)
- **Variable:** `800`
  - **Type:** Color
  - **Light Mode:** `92400E` (Dark Orange/Brown)
  - **Dark Mode:** `92400E` (Dark Orange/Brown)
- **Variable:** `900`
  - **Type:** Color
  - **Light Mode:** `78350F` (Deepest Dark Brown/Orange)
  - **Dark Mode:** `78350F` (Deepest Dark Brown/Orange)

#### Group: `semantic-error-red` (10 variables)
- **Variable:** `50`
  - **Type:** Color
  - **Light Mode:** `FEF2F2` (Very Pale Pink)
  - **Dark Mode:** `FEF2F2` (Very Pale Pink)
- **Variable:** `100`
  - **Type:** Color
  - **Light Mode:** `FEE2E2` (Pale Pink)
  - **Dark Mode:** `FEE2E2` (Pale Pink)
- **Variable:** `200`
  - **Type:** Color
  - **Light Mode:** `FECACA` (Light Pink)
  - **Dark Mode:** `FECACA` (Light Pink)
- **Variable:** `300`
  - **Type:** Color
  - **Light Mode:** `FCA5A5` (Medium Light Pink)
  - **Dark Mode:** `FCA5A5` (Medium Light Pink)
- **Variable:** `400`
  - **Type:** Color
  - **Light Mode:** `F87171` (Light Red)
  - **Dark Mode:** `F87171` (Light Red)
- **Variable:** `500`
  - **Type:** Color
  - **Light Mode:** `EF4444` (Bright Red)
  - **Dark Mode:** `EF4444` (Bright Red)
- **Variable:** `600`
  - **Type:** Color
  - **Light Mode:** `DC2626` (Medium Red)
  - **Dark Mode:** `DC2626` (Medium Red)
- **Variable:** `700`
  - **Type:** Color
  - **Light Mode:** `B91C1C` (Dark Red)
  - **Dark Mode:** `B91C1C` (Dark Red)
- **Variable:** `800`
  - **Type:** Color
  - **Light Mode:** `991B1B` (Very Dark Red)
  - **Dark Mode:** `991B1B` (Very Dark Red)
- **Variable:** `900`
  - **Type:** Color
  - **Light Mode:** `7F1D1D` (Deepest Red/Maroon)
  - **Dark Mode:** `7F1D1D` (Deepest Red/Maroon)

#### Group: `semantic-info` (10 variables)
- **Variable:** `50`
  - **Type:** Color
  - **Light Mode:** `EFF6FF` (Very Light Blue)
  - **Dark Mode:** `EFF6FF` (Very Light Blue)
- **Variable:** `100`
  - **Type:** Color
  - **Light Mode:** `DBEAFE` (Light Blue)
  - **Dark Mode:** `DBEAFE` (Light Blue)
- **Variable:** `200`
  - **Type:** Color
  - **Light Mode:** `BFDBFE` (Light Blue)
  - **Dark Mode:** `BFDBFE` (Light Blue)
- **Variable:** `300`
  - **Type:** Color
  - **Light Mode:** `93C5FD` (Medium Light Blue)
  - **Dark Mode:** `93C5FD` (Medium Light Blue)
- **Variable:** `400`
  - **Type:** Color
  - **Light Mode:** `60A5FA` (Medium Blue)
  - **Dark Mode:** `60A5FA` (Medium Blue)
- **Variable:** `500`
  - **Type:** Color
  - **Light Mode:** `3B82F6` (Primary Blue)
  - **Dark Mode:** `3B82F6` (Primary Blue)
- **Variable:** `600`
  - **Type:** Color
  - **Light Mode:** `2563EB` (Darker Blue)
  - **Dark Mode:** `2563EB` (Darker Blue)
- **Variable:** `700`
  - **Type:** Color
  - **Light Mode:** `1D4ED8` (Dark Blue)
  - **Dark Mode:** `1D4ED8` (Dark Blue)
- **Variable:** `800`
  - **Type:** Color
  - **Light Mode:** `1E40AF` (Very Dark Blue)
  - **Dark Mode:** `1E40AF` (Very Dark Blue)
- **Variable:** `900`
  - **Type:** Color
  - **Light Mode:** `1E3A8A` (Deepest Dark Blue)
  - **Dark Mode:** `1E3A8A` (Deepest Dark Blue)

#### Group: `semantic-neutral` (10 variables)
- **Variable:** `50`
  - **Type:** Color
  - **Light Mode:** `FAFAFA` (Very Light Gray, Almost White)
  - **Dark Mode:** `FAFAFA` (Very Light Gray, Almost White)
- **Variable:** `100`
  - **Type:** Color
  - **Light Mode:** `F5F5F5` (Light Gray)
  - **Dark Mode:** `F5F5F5` (Light Gray)
- **Variable:** `200`
  - **Type:** Color
  - **Light Mode:** `E5E5E5` (Slightly Darker Light Gray)
  - **Dark Mode:** `E5E5E5` (Slightly Darker Light Gray)
- **Variable:** `300`
  - **Type:** Color
  - **Light Mode:** `D4D4D4` (Light Medium Gray)
  - **Dark Mode:** `D4D4D4` (Light Medium Gray)
- **Variable:** `400`
  - **Type:** Color
  - **Light Mode:** `A3A3A3` (Medium Gray)
  - **Dark Mode:** `A3A3A3` (Medium Gray)
- **Variable:** `500`
  - **Type:** Color
  - **Light Mode:** `737373` (Dark Gray)
  - **Dark Mode:** `737373` (Dark Gray)
- **Variable:** `600`
  - **Type:** Color
  - **Light Mode:** `525252` (Darker Gray)
  - **Dark Mode:** `525252` (Darker Gray)
- **Variable:** `700`
  - **Type:** Color
  - **Light Mode:** `262626` (Very Dark Gray, Almost Black)
  - **Dark Mode:** `262626` (Very Dark Gray, Almost Black)
- **Variable:** `800`
  - **Type:** Color
  - **Light Mode:** `171717` (Off-Black)
  - **Dark Mode:** `171717` (Off-Black)
- **Variable:** `900`
  - **Type:** Color
  - **Light Mode:** `0A0A0A` (Black)
  - **Dark Mode:** `0A0A0A` (Black)

#### Parent → Child Relationships
- **Parent Groups:** Act as semantic categories (e.g., `background`, `surface`, `text`, `button-primary`, `status-success`)
- **Child Variables:** Specific instances within each group (e.g., `background/primary`, `surface/default`, `button-primary/background`)
- **No visible aliasing:** Variables appear to be direct color definitions, not references to other variables
- **Brand Color Scales:** Brand and semantic color groups use numeric scales (50-900) to represent lightness/darkness progression

### Modes

Two modes are defined: **Light** and **Dark**.

#### Changes Across Modes

**Variables with Different Light/Dark Values:**
- **Background colors:** Invert between light and dark modes
  - Light mode uses light colors (whites, light grays)
  - Dark mode uses dark colors (dark grays, near-black)
  - `inverse` swaps values: dark in light mode, light in dark mode
- **Surface colors:** Follow similar inversion pattern as backgrounds
- **Text colors:** Invert for contrast (dark text on light backgrounds, light text on dark backgrounds)
- **Border colors:** Invert for visibility (light borders in light mode, dark borders in dark mode)
- **Button colors:** Background colors invert, text colors may remain consistent (e.g., white text on primary buttons)
- **Card colors:** Background and border colors invert
- **Input colors:** Background and border colors invert, text colors invert for contrast
- **Status colors:** Background, border, text, and icon colors invert to maintain visibility and semantic meaning
- **Habit colors:** Background colors invert dramatically, dot colors adjust for visibility

**Variables with Identical Light/Dark Values:**
- **Generic color:** `25` = `F6F9FC` (consistent across modes)
- **Brand color scales:** All `brand-primary-blue` and `brand-secondary-purple` variables (50-900) have identical values in both modes
- **Semantic color scales:** All `semantic-success-green`, `semantic-warning-yellow`, `semantic-error-red`, `semantic-info`, and `semantic-neutral` variables (50-900) have identical values in both modes
- **Card shadow:** `card/shadow` = `FFFFFF` (consistent across modes)

#### What Stays Consistent
- Variable names and group structure remain identical across modes
- Semantic meaning of variables (e.g., `primary` always represents the main color in its category)
- Group organization and hierarchy
- Brand and semantic color scale values (these scales are mode-agnostic and used as building blocks)

### Brand Colors vs Semantic Colors

**Brand Colors:**
- **`brand-primary-blue`:** 10-variable scale (50-900) representing the primary brand color in various intensities
  - Primary brand blue: `500` = `6366F1`
  - Scale ranges from very light (`50` = `EEF2FF`) to very dark (`900` = `312E81`)
- **`brand-secondary-purple`:** 10-variable scale (50-900) representing the secondary brand color
  - Scale ranges from very light (`50` = `F5F3FF`) to very dark (`900` = `4C1D95`)
- **Mode behavior:** Brand color scales have identical values in both Light and Dark modes

**Semantic Colors:**
- **Semantic color scales:** Five comprehensive scales for semantic purposes
  - `semantic-success-green`: 10 variables (50-900)
  - `semantic-warning-yellow`: 10 variables (50-900)
  - `semantic-error-red`: 10 variables (50-900)
  - `semantic-info`: 10 variables (50-900)
  - `semantic-neutral`: 10 variables (50-900)
- **Mode behavior:** Semantic color scales have identical values in both Light and Dark modes
- **Usage:** These scales serve as building blocks for status groups and other semantic color needs

**Generic Colors:**
- **`25`:** Generic color variable (`F6F9FC`) that may represent a brand-specific or neutral color not tied to semantic roles
- **Mode behavior:** Consistent across both modes

### Status Colors

Dedicated groups exist for status indicators, each containing 4 variables:
- **`status-success`:** `background`, `border`, `text`, `icon` for success states
- **`status-warning`:** `background`, `border`, `text`, `icon` for warning states
- **`status-error`:** `background`, `border`, `text`, `icon` for error states
- **`status-info`:** `background`, `border`, `text`, `icon` for informational states

Each status group provides complete styling for status indicators with distinct values for Light and Dark modes to ensure proper contrast and visibility.

### Habit Colors

Specialized color groups for habit tracking features:
- **`habit-blue`:** 3 variables (`background`, `dot`, `dot-completed`)
- **`habit-purple`:** 3 variables (`background`, `dot`, `dot-completed`)
- **`habit-orange`:** 3 variables (`background`, `dot`, `dot-completed`)
- **`habit-red`:** 3 variables (`background`, `dot`, `dot-completed`)

Each habit color group provides:
- **`background`:** Background color for habit containers (inverts dramatically between modes)
- **`dot`:** Color for incomplete habit indicators
- **`dot-completed`:** Color for completed habit indicators

### Naming and Scaling Patterns

**Hierarchical Naming:**
- **Background hierarchy:** `primary` → `secondary` → `tertiary` suggests visual depth or importance scaling
- **Surface elevation:** `default` → `raised` → `overlay` implies different visual elevations or z-index levels
- **Button types:** `primary`, `secondary`, `destructive` indicate different button purposes and visual weights
- **Button states:** `background`, `background-hover`, `background-active`, `background-disabled` provide interactive states

**Numeric Scaling:**
- **Brand and semantic scales:** Use numeric progression (50, 100, 200, 300, 400, 500, 600, 700, 800, 900)
  - Lower numbers (50-200) represent lighter tints
  - Mid-range (300-600) represent medium intensities
  - Higher numbers (700-900) represent darker shades
  - `500` typically represents the primary/base color in each scale

---

## Typography

### Purpose
The Typography variable group defines typographic properties including font families, weights, sizes, line heights, letter spacing, spacing, and text colors. These variables ensure consistent typography hierarchy and readability across the product.

### Naming Conventions
- **Variable Type Prefixes:**
  - `#` indicates a Number variable type
  - `T` indicates a Text/String variable type
- **Group-based organization:** Variables are grouped by typographic property type
- **Naming Pattern:** `[Group Name]/[Variable Name]`
- **Separator:** Forward slash (`/`) for group hierarchy
- **Font Family Naming:** `font-family-[semantic-name]` (e.g., `font-family-primary`)
- **Font Weight Naming:** `font-weight-[weight-name]` (e.g., `font-weight-regular`, `font-weight-medium`, `font-weight-bold`, `font-weight-black`)
- **Font Size Naming:** Uses semantic names (`h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `body-large`, `body`, `body-small`, `caption`, `overline`, `button`)
- **Line Height & Letter Spacing:** Share identical names with font-size variables (e.g., `h1`, `h2`, `body`, etc.)
- **Spacing Naming:** Uses numeric values as names (`0`, `4`, `8`, `12`, `16`, `20`, `24`, `28`, `32`, `40`, `48`, `56`, `64`, `80`, `96`, `160`)
- **Text Color Naming:** Uses hierarchy terms (`primary`, `secondary`, `tertiary`, `inverse`, `disabled`)

### Variable Structure

#### Group: `font-family`
- **Variable:** `T font-family-primary`
  - **Parent:** `font-family`
  - **Type:** Text/String
  - **Value:** `Satoshi`
  - **Purpose:** Defines the primary typeface for the design system

#### Group: `font-weight`
- **Variable:** `T font-weight-regular`
  - **Parent:** `font-weight`
  - **Type:** Text/String
  - **Value:** `400`
- **Variable:** `T font-weight-medium`
  - **Parent:** `font-weight`
  - **Type:** Text/String
  - **Value:** `500`
- **Variable:** `T font-weight-bold`
  - **Parent:** `font-weight`
  - **Type:** Text/String
  - **Value:** `700`
- **Variable:** `T font-weight-black`
  - **Parent:** `font-weight`
  - **Type:** Text/String
  - **Value:** `900`

#### Group: `font-size`
- **Variable:** `# h1`
  - **Parent:** `font-size`
  - **Type:** Number
  - **Value:** `48`
- **Variable:** `# h2`
  - **Parent:** `font-size`
  - **Type:** Number
  - **Value:** `36`
- **Variable:** `# h3`
  - **Parent:** `font-size`
  - **Type:** Number
  - **Value:** `28`
- **Variable:** `# h4`
  - **Parent:** `font-size`
  - **Type:** Number
  - **Value:** `24`
- **Variable:** `# h5`
  - **Parent:** `font-size`
  - **Type:** Number
  - **Value:** `20`
- **Variable:** `# h6`
  - **Parent:** `font-size`
  - **Type:** Number
  - **Value:** `18`
- **Variable:** `# body-large`
  - **Parent:** `font-size`
  - **Type:** Number
  - **Value:** `18`
- **Variable:** `# body`
  - **Parent:** `font-size`
  - **Type:** Number
  - **Value:** `16`
- **Variable:** `# body-small`
  - **Parent:** `font-size`
  - **Type:** Number
  - **Value:** `14`
- **Variable:** `# caption`
  - **Parent:** `font-size`
  - **Type:** Number
  - **Value:** `12`
- **Variable:** `# overline`
  - **Parent:** `font-size`
  - **Type:** Number
  - **Value:** `11`
- **Variable:** `# button`
  - **Parent:** `font-size`
  - **Type:** Number
  - **Value:** `16`

#### Group: `line-height`
- **Variable:** `# h1`
  - **Parent:** `line-height`
  - **Type:** Number
  - **Value:** `56`
- **Variable:** `# h2`
  - **Parent:** `line-height`
  - **Type:** Number
  - **Value:** `44`
- **Variable:** `# h3`
  - **Parent:** `line-height`
  - **Type:** Number
  - **Value:** `36`
- **Variable:** `# h4`
  - **Parent:** `line-height`
  - **Type:** Number
  - **Value:** `32`
- **Variable:** `# h5`
  - **Parent:** `line-height`
  - **Type:** Number
  - **Value:** `28`
- **Variable:** `# h6`
  - **Parent:** `line-height`
  - **Type:** Number
  - **Value:** `24`
- **Variable:** `# body-large`
  - **Parent:** `line-height`
  - **Type:** Number
  - **Value:** `28`
- **Variable:** `# body`
  - **Parent:** `line-height`
  - **Type:** Number
  - **Value:** `24`
- **Variable:** `# body-small`
  - **Parent:** `line-height`
  - **Type:** Number
  - **Value:** `20`
- **Variable:** `# caption`
  - **Parent:** `line-height`
  - **Type:** Number
  - **Value:** `16`
- **Variable:** `# overline`
  - **Parent:** `line-height`
  - **Type:** Number
  - **Value:** `16`
- **Variable:** `# button`
  - **Parent:** `line-height`
  - **Type:** Number
  - **Value:** `20`

#### Group: `letter-spacing`
- **Variable:** `# h1`
  - **Parent:** `letter-spacing`
  - **Type:** Number
  - **Value:** `-0.96`
- **Variable:** `# h2`
  - **Parent:** `letter-spacing`
  - **Type:** Number
  - **Value:** `-0.36`
- **Variable:** `# h3`
  - **Parent:** `letter-spacing`
  - **Type:** Number
  - **Value:** `-0.28`
- **Variable:** `# h4`
  - **Parent:** `letter-spacing`
  - **Type:** Number
  - **Value:** `0`
- **Variable:** `# h5`
  - **Parent:** `letter-spacing`
  - **Type:** Number
  - **Value:** `0`
- **Variable:** `# h6`
  - **Parent:** `letter-spacing`
  - **Type:** Number
  - **Value:** `0`
- **Variable:** `# body-large`
  - **Parent:** `letter-spacing`
  - **Type:** Number
  - **Value:** `0`
- **Variable:** `# body`
  - **Parent:** `letter-spacing`
  - **Type:** Number
  - **Value:** `0`
- **Variable:** `# body-small`
  - **Parent:** `letter-spacing`
  - **Type:** Number
  - **Value:** `0`
- **Variable:** `# caption`
  - **Parent:** `letter-spacing`
  - **Type:** Number
  - **Value:** `0.12`
- **Variable:** `# overline`
  - **Parent:** `letter-spacing`
  - **Type:** Number
  - **Value:** `0.88`
- **Variable:** `# button`
  - **Parent:** `letter-spacing`
  - **Type:** Number
  - **Value:** `0`

#### Group: `spacing`
- **Variable:** `# 0`
  - **Parent:** `spacing`
  - **Type:** Number
  - **Value:** `0`
- **Variable:** `# 4`
  - **Parent:** `spacing`
  - **Type:** Number
  - **Value:** `4`
- **Variable:** `# 8`
  - **Parent:** `spacing`
  - **Type:** Number
  - **Value:** `8`
- **Variable:** `# 12`
  - **Parent:** `spacing`
  - **Type:** Number
  - **Value:** `12`
- **Variable:** `# 16`
  - **Parent:** `spacing`
  - **Type:** Number
  - **Value:** `16`
- **Variable:** `# 20`
  - **Parent:** `spacing`
  - **Type:** Number
  - **Value:** `20`
- **Variable:** `# 24`
  - **Parent:** `spacing`
  - **Type:** Number
  - **Value:** `24`
- **Variable:** `# 28`
  - **Parent:** `spacing`
  - **Type:** Number
  - **Value:** `28`
- **Variable:** `# 32`
  - **Parent:** `spacing`
  - **Type:** Number
  - **Value:** `32`
- **Variable:** `# 40`
  - **Parent:** `spacing`
  - **Type:** Number
  - **Value:** `40`
- **Variable:** `# 48`
  - **Parent:** `spacing`
  - **Type:** Number
  - **Value:** `48`
- **Variable:** `# 56`
  - **Parent:** `spacing`
  - **Type:** Number
  - **Value:** `56`
- **Variable:** `# 64`
  - **Parent:** `spacing`
  - **Type:** Number
  - **Value:** `64`
- **Variable:** `# 80`
  - **Parent:** `spacing`
  - **Type:** Number
  - **Value:** `80`
- **Variable:** `# 96`
  - **Parent:** `spacing`
  - **Type:** Number
  - **Value:** `96`
- **Variable:** `# 160`
  - **Parent:** `spacing`
  - **Type:** Number
  - **Value:** `160`

#### Group: `color-text`
- **Variable:** `primary`
  - **Parent:** `color-text`
  - **Type:** Color
  - **Value:** `1A1A1A` (Black)
- **Variable:** `secondary`
  - **Parent:** `color-text`
  - **Type:** Color
  - **Value:** `666666` (Dark Gray)
- **Variable:** `tertiary`
  - **Parent:** `color-text`
  - **Type:** Color
  - **Value:** `999999` (Medium Gray)
- **Variable:** `inverse`
  - **Parent:** `color-text`
  - **Type:** Color
  - **Value:** `FFFFFF` (White)
- **Variable:** `disabled`
  - **Parent:** `color-text`
  - **Type:** Color
  - **Value:** `CCCCCC` (Light Gray)

#### Parent → Child Relationships
- **Parent Groups:** Typographic property categories (e.g., `font-family`, `font-weight`, `font-size`)
- **Child Variables:** Specific values within each category
- **Correspondence:** `font-size`, `line-height`, and `letter-spacing` each contain 12 variables with matching names (h1-h6, body-large, body, body-small, caption, overline, button), creating a coordinated scale where each size has corresponding line-height and letter-spacing values
- **Naming Pattern:** Font-size, line-height, and letter-spacing variables share identical names (e.g., `h1`, `h2`, `body`, etc.), indicating they are designed to work together as a typography system

### Typography Scale Reference

| Variable Name | Font Size | Line Height | Letter Spacing |
|---------------|-----------|-------------|----------------|
| `h1` | `48` | `56` | `-0.96` |
| `h2` | `36` | `44` | `-0.36` |
| `h3` | `28` | `36` | `-0.28` |
| `h4` | `24` | `32` | `0` |
| `h5` | `20` | `28` | `0` |
| `h6` | `18` | `24` | `0` |
| `body-large` | `18` | `28` | `0` |
| `body` | `16` | `24` | `0` |
| `body-small` | `14` | `20` | `0` |
| `caption` | `12` | `16` | `0.12` |
| `overline` | `11` | `16` | `0.88` |
| `button` | `16` | `20` | `0` |

### Modes
Typography variables appear to be **mode-agnostic** (no mode switching visible in the Typography collection view). Values are consistent across all contexts.

**Note:** The `color-text` group contains color values, but these are defined within the Typography collection rather than the Colors collection, suggesting they are specifically for text color usage.

### Typography Hierarchy and Intent

#### Font Size Scale
The 12 font-size variables create a hierarchical type scale:
- **Headings:** `h1` (48px) → `h2` (36px) → `h3` (28px) → `h4` (24px) → `h5` (20px) → `h6` (18px)
- **Body Text:** `body-large` (18px) → `body` (16px) → `body-small` (14px)
- **Supporting Text:** `caption` (12px), `overline` (11px)
- **Interactive:** `button` (16px)

#### Line Height System
Line-height values are paired with font sizes for optimal readability:
- **Headings:** Decreasing line-heights from `h1` (56) to `h6` (24)
- **Body Text:** `body-large` (28), `body` (24), `body-small` (20)
- **Supporting Text:** `caption` (16), `overline` (16)
- **Interactive:** `button` (20)

#### Letter Spacing System
Letter-spacing values enhance typography refinement:
- **Large Headings:** Negative letter-spacing for tighter appearance (`h1`: -0.96, `h2`: -0.36, `h3`: -0.28)
- **Smaller Text:** Zero letter-spacing for most body and supporting text
- **Special Cases:** `caption` (0.12), `overline` (0.88) use positive letter-spacing for emphasis

#### Spacing Scale
The 16 spacing variables provide a comprehensive spacing system:
- **Base Values:** 0, 4, 8, 12, 16, 20, 24, 28, 32
- **Extended Values:** 40, 48, 56, 64, 80, 96, 160
- **Pattern:** 4px base unit with larger increments for major spacing needs

#### Text Color Hierarchy
- **`primary`:** Main text color (`1A1A1A` - Black)
- **`secondary`:** Secondary text color (`666666` - Dark Gray)
- **`tertiary`:** Tertiary text color (`999999` - Medium Gray)
- **`inverse`:** Inverse text color (`FFFFFF` - White) for dark backgrounds
- **`disabled`:** Disabled text color (`CCCCCC` - Light Gray) for inactive states

### Relationship to Text Usage
- **Font Family:** `font-family-primary` (Satoshi) is the single typeface used throughout the system
- **Font Weights:** Four weight options (regular 400, medium 500, bold 700, black 900) provide visual hierarchy
- **Coordinated Typography:** Each text style (h1-h6, body variants, caption, overline, button) has matching font-size, line-height, and letter-spacing values
- **Spacing System:** The `spacing` group (16 variables) provides typography-related spacing values (e.g., paragraph spacing, heading margins, component spacing)
- **Text Colors:** The `color-text` group provides semantic color options specifically for text elements, separate from the main Colors collection, ensuring text-specific color needs are met

---

## Summary

### Collection Overview
- **Total Variables:** 220 variables across 3 main groups
  - Breakpoints: 12 variables
  - Typography: 62 variables
  - Colors (Light / Dark): 146 variables

### Key Patterns
1. **Semantic naming:** Variables use purpose-based names rather than literal descriptions
2. **Hierarchical grouping:** Clear parent → child relationships via group structure
3. **Mode-based theming:** Colors support Light/Dark modes; Breakpoints support Desktop/Tablet/Mobile modes
4. **Scalable systems:** Typography uses coordinated scales (12 font sizes with corresponding line-heights and letter-spacing)
5. **Responsive scaling:** Breakpoint values scale down from Desktop → Tablet → Mobile

### Implementation Notes
- All variable names use lowercase with hyphens or forward slashes for separation
- Color values are provided in hexadecimal format
- Numerical values for breakpoints and spacing are provided as text/string variables
- The system emphasizes semantic meaning over literal values for maintainability

