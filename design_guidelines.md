# Design Guidelines: Cybersecurity Anti-Scam Web Application

## Design Approach
**Reference-Based**: Drawing from cybersecurity gaming aesthetics (similar to Hackmud, Hacknet) combined with educational platforms. The cyber-punk neon aesthetic creates an engaging gamified learning experience for security awareness.

## Core Design Elements

### A. Typography
- **Display Font**: Orbitron (weights: 400, 700, 900) - for headers, titles, and branding
- **Body Font**: Share Tech Mono - for all body text, maintaining the terminal/hacker aesthetic
- **Hierarchy**:
  - H1: 40px Orbitron, uppercase
  - H2: 28px Orbitron
  - H3: 20px Share Tech Mono
  - Body: 16px Share Tech Mono
  - Small text: 14px Share Tech Mono

### B. Layout System
**Spacing**: Use Tailwind units of 2, 4, 5, 8, 10, and 20 consistently (p-4, m-8, gap-5, etc.)

**Grid Structure**:
- Game Dashboard: 3-column layout (320px | 1fr | 300px) on desktop
- Mobile: Single column stack
- Maximum container width: 1400px

### C. Component Library

**Cyber Buttons**:
- Default: Transparent background, 2px neon blue border (#00f3ff), uppercase text
- Variants: Red (#ff0055), Green (#00ff9d), Gold (#ffd700)
- Padding: 15px horizontal, full width
- Hover: Fill with neon color, add glow shadow effect

**Glass Panels**:
- Background: rgba(10, 20, 30, 0.98)
- Border: 1px solid #333
- Border radius: 5px
- Box shadow: Large soft black shadow
- Padding: 20px

**Input Fields**:
- Background: rgba(0,0,0,0.5)
- Border: 1px solid neon blue
- Text: Centered, 20px
- Padding: 15px

**Progress Bars**:
- Container: 10px height, #333 background
- Fill: Neon green, smooth transition
- Timer bars: 6px height at top of sections

**Modals**:
- Overlay: rgba(0,0,0,0.95) full screen
- Box: 600px width, dark background (#0a0a10), 2px neon blue border
- Padding: 40px
- Center aligned content

**Cards/Tiles**:
- Shop items: Dark background (#111), 1px #444 border
- Hover: Border changes to neon gold, slightly lighter background
- Flex layout with icons and text

**Avatar System**:
- Circle: 100px diameter
- Border: 3px neon green
- Center large icon (50px)
- Black background

**Data Displays**:
- Tables: Full width, collapsed borders
- Headers: Neon green text, bottom border #444
- Rows: Bottom border #222, 10px padding
- Score columns: Right aligned, neon gold

### D. Visual Effects

**Animated Grid Background**:
- Fixed position covering viewport
- Perspective transform creating 3D depth
- Subtle cyan grid lines (5% opacity)
- Continuous vertical scroll animation
- Layer behind all content

**Neon Glow Effects**:
- Text shadows on key elements
- Box shadows on hover states
- Pulsing animations for alerts

**Screen Transitions**:
- Fade in animation (0.3s)
- Smooth opacity changes between screens

**Game States**:
- Boss mode: Red radial gradient with pulsing red glow
- Typing overlay: Full screen dark overlay with centered content

## Screen Layouts

### Login Screen
- Centered vertically and horizontally
- Large icon (80px gamepad)
- Title with subtitle
- Single input field
- Primary action button
- Maximum width: 450px

### Menu Screen
- Centered panel (500px width)
- Avatar at top
- Player stats row (trophy, cash)
- Primary action button (green)
- 2-column grid for secondary actions
- Tertiary buttons stacked
- All buttons full width within panel

### Game Dashboard
- Header bar with level and stats
- 3-column main area:
  - Left: Status panel (HP bar, inventory list)
  - Center: Simulation container (white background for content, answer buttons at bottom)
  - Right: Quick shop panel
- Full viewport height utilization

### Overlays
- Typing mini-game: Centered command prompt with input field
- Modals: Centered boxes with close button top-right

## Images
**No hero images** - This is a gaming interface focused on functional screens and data visualization. Visual interest comes from the animated grid background, neon effects, and dynamic content areas rather than photography.

**Icons**: Font Awesome 6.4.0 for all iconography (gamepad, user, shopping, trophies, etc.)

## Special Considerations
- Maintain high contrast for readability in dark theme
- Use neon colors sparingly for emphasis and calls-to-action
- Ensure all interactive elements have clear hover states
- Support for Vietnamese language text
- Audio integration for background music and sound effects
- Real-time data visualization (HP bars, timers, score counters)