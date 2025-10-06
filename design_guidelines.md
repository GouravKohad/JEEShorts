# Design Guidelines: YouTube Playlist Shorts Viewer

## Design Approach
**Reference-Based:** Drawing inspiration from YouTube Shorts, TikTok, and Instagram Reels to create a familiar, engaging vertical video experience with modern mobile-first interaction patterns.

## Core Design Principles
1. **Video-First Philosophy:** Content dominates the viewport with minimal UI interference
2. **Gesture-Driven Navigation:** Swipe/scroll interactions for seamless browsing
3. **Instant Engagement:** Videos auto-play on view for immediate content consumption
4. **Responsive Excellence:** Seamless experience across mobile and desktop

---

## Color Palette

### Dark Mode (Primary)
- **Background:** 0 0% 8% (deep charcoal, full-screen video backdrop)
- **Surface:** 0 0% 12% (overlay backgrounds, input fields)
- **Text Primary:** 0 0% 95% (high contrast white text)
- **Text Secondary:** 0 0% 65% (muted metadata text)
- **Accent:** 0 85% 60% (YouTube red for active states, CTAs)
- **Border/Divider:** 0 0% 20% (subtle separators)

### Light Mode (Optional Toggle)
- **Background:** 0 0% 98%
- **Surface:** 0 0% 100%
- **Text Primary:** 0 0% 10%
- **Text Secondary:** 0 0% 45%

---

## Typography

**Font Stack:** 
- Primary: 'Inter', system-ui, -apple-system, sans-serif
- Fallback: System native fonts for performance

**Hierarchy:**
- **Video Title:** 18px/24px, font-semibold (mobile) | 20px/28px (desktop)
- **Metadata:** 14px/20px, font-normal, text-secondary
- **Input Labels:** 14px/20px, font-medium
- **Button Text:** 15px/20px, font-medium

---

## Layout System

**Spacing Primitives:** Tailwind units of **2, 4, 6, 8** (e.g., p-4, gap-6, m-8)

**Container Strategy:**
- Full viewport video containers: `w-screen h-screen`
- Input/control sections: `max-w-2xl mx-auto px-4`
- Overlay elements: Fixed positioning with safe padding (p-4 md:p-6)

**Grid System:**
- Video feed: Single column, snap-scroll vertical layout
- Settings panel: Single column stack on mobile, optional 2-column on desktop

---

## Component Library

### 1. Video Player Container
- Full-screen video display (100vw × 100vh on mobile)
- Aspect ratio preserved on desktop with max-width constraint
- Embedded YouTube iframe with custom controls overlay
- Smooth snap-scroll behavior between videos

### 2. Playlist Input Section
- Centered card layout with gradient border accent
- Text input with paste icon, clear validation feedback
- "Load Playlist" button with loading state animation
- Error messaging below input with slide-in animation

### 3. Video Overlay UI
- **Top Bar:** Semi-transparent gradient (top-down fade)
  - Back/Home button (top-left)
  - Playlist info (centered)
  - Settings icon (top-right)
  
- **Bottom Info Panel:** Gradient backdrop (bottom-up fade)
  - Video title (truncated with expand option)
  - Channel name and view count
  - Progress indicator (current video / total)

### 4. Navigation Controls
- **Swipe Indicators:** Subtle chevron hints on first load (fade after interaction)
- **Desktop Controls:** Left/right navigation arrows on hover
- **Progress Dots:** Bottom-center indicator showing video position in playlist

### 5. Empty/Loading States
- Skeleton loaders for video cards
- Animated pulse effect while fetching playlist
- Empty state illustration with clear CTA to add playlist

---

## Interaction Patterns

**Video Navigation:**
- Mobile: Swipe up/down or scroll to navigate videos
- Desktop: Mouse wheel scroll, arrow keys, or click next/prev buttons
- Snap-scroll to ensure one video per viewport

**Playback Controls:**
- Tap/click video to pause/play
- Volume control on right edge (vertical slider)
- Seek bar appears on tap with auto-hide (3s delay)

**Gestures:**
- Long-press for video options (share, save)
- Double-tap right to skip +10s, double-tap left to rewind -10s

---

## Responsive Breakpoints

**Mobile (<768px):**
- Full-screen immersive experience
- Gesture-primary navigation
- Minimal UI, focus on content

**Tablet (768px - 1024px):**
- Centered video with max-width 600px
- Side padding for breathing room
- Larger touch targets

**Desktop (>1024px):**
- Video centered with max-width 500px
- Keyboard navigation support
- Hover states for controls

---

## Animations

**Use Sparingly:**
- Video transition: 300ms ease-in-out snap
- Overlay fade: 200ms opacity transition
- Button states: 150ms transform scale (hover: 1.02)
- Progress bar: Smooth 100ms updates

**Avoid:**
- Auto-playing background animations
- Distracting particle effects
- Excessive loading spinners

---

## Accessibility Features

- High contrast text overlays with semi-transparent dark backgrounds
- Keyboard navigation (Space: play/pause, Arrow keys: navigate)
- Screen reader announcements for video changes
- Focus indicators on interactive elements
- ARIA labels for all icon-only buttons

---

## Images

**Hero/Input Section:**
- Background: Subtle gradient mesh pattern (dark to darker tones) OR solid dark background
- No large hero image needed - video content is the hero
- Optional: Small YouTube logo/icon near playlist input for brand recognition

**Empty State:**
- Illustration or icon representing video playlist (YouTube play button icon with playlist stack visual)
- Placement: Center of empty viewport with explanatory text below

---

## Key Design Decisions

✓ **Dark-first design** aligns with video consumption preferences
✓ **Minimalist overlays** ensure video content remains focus
✓ **Familiar gesture patterns** from TikTok/Shorts reduce learning curve
✓ **Snap-scroll mechanics** create satisfying, deliberate navigation
✓ **Performance-optimized** with lazy-loading and efficient video rendering