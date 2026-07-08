# XQ Learner Profile Quiz Design System

Last updated: 2026-07-07

This document captures the design system used in the current XQ Learner Profile quiz prototype through the final mobile summary page. It is written as a practical implementation reference for continuing the app, aligning new screens, and avoiding visual drift.

The current implementation lives primarily in `app/page.tsx` and uses a single component file with inline CSS in the `APP_STYLES` string.

## Product Shape

The experience is a kiosk-first and mobile-preview quiz that helps a user discover an XQ Learner Profile. The visual language blends:

- XQ Bus Tour activation styling: bold color, dark base, flat graphics, thick outlines.
- Game/kiosk interaction patterns: selectable cards, progress panels, carousel-style result reveals, token reward moment.
- Mobile collectible/card references: stamp cards, centered swipeable cards, simple reward animation, compact summary.

The flow covered by this design system is:

1. Welcome and quiz mode selection.
2. Quiz questions and answer selection.
3. Results radar chart.
4. Top learner profile reveal.
5. Top three strengths carousel.
6. Competency detail view.
7. Token earned moment.
8. Final summary page.

Explore-all screens exist after the summary page, but they are not the focus of this document.

## Design Principles

### Bright, Physical, Touchable

Primary interactions should feel like physical cards, tokens, panels, and stamps. Avoid soft SaaS cards, long paragraphs, or generic web-app layouts. Use hard edges, thick borders, bold color fields, and obvious tap targets.

### Mobile Screens Should Feel Like Game Cards

The mobile result flow is designed as a sequence of fixed-height screens inside a phone frame. Each step should have one dominant idea, one dominant visual, and a clear next/back path.

### Keep Competency Language Human First

Avoid leading with codes like `OT.Creat.1`. Codes can remain in data and documentation, but the user-facing interface should use labels like "Creative Process" and short plain-language descriptions.

### Color Carries Meaning, But Should Not Spoil Answers

Learner outcome colors are consistent in results, charts, and profile areas. Answer cards use randomized bright accents so users cannot reverse-engineer a learner outcome from color alone.

### Preserve Official XQ Outcome Language

Learner profile titles use the original XQ Learner Outcome names:

- Holders of Foundational Knowledge
- Masters of All Fundamental Literacies
- Original Thinkers for an Uncertain World
- Generous Collaborators for Tough Problems
- Learners for Life

## Color System

### Core Interface Palette

| Token | Hex | Use |
| --- | --- | --- |
| Black | `#0A0A0A` | Primary dark background, outlines, text on bright colors |
| True black | `#000000` | Kiosk shell background |
| Near black | `#050505` | Kiosk sidebar |
| Dark surface | `#101010` | Dark panels and results areas |
| Raised dark surface | `#121212` | Sidebar slots and dark mode panels |
| Charcoal | `#1A1A1A` | Legacy card/surface base |
| Border gray | `#2A2A2A` | Low-emphasis dark borders |
| Light gray | `#C8C8C8` | Secondary text on dark backgrounds |
| White | `#FFFFFF` | Main light surface, text on dark, card backgrounds |
| XQ Green | `#1FCC38` | Brand accent, progress, active states, default SVG background |

### Learner Outcome Colors

| Outcome | Profile Title | Color | Pair Color | Ink |
| --- | --- | --- | --- | --- |
| FK | Holders of Foundational Knowledge | `#E8C832` | `#FFF38F` | `#0A0A0A` |
| FL | Masters of All Fundamental Literacies | `#6B5BEB` | `#B7ACE3` | `#FFFFFF` |
| OT | Original Thinkers for an Uncertain World | `#3DBFB8` | `#55B9DF` | `#0A0A0A` |
| GC | Generous Collaborators for Tough Problems | `#E040A0` | `#E48AD1` | `#0A0A0A` |
| LL | Learners for Life | `#1FCC38` | `#0FAF2E` | `#0A0A0A` |

### Rotating Accent Pool

The answer-card accent pool is intentionally broad and high-energy:

`#1FCC38`, `#FFEA00`, `#00A3FF`, `#FF4D00`, `#FF2BD6`, `#00E5FF`, `#7CFF00`, `#E8C832`, `#3DBFB8`, `#E040A0`, `#F03040`, `#D8A8D8`, `#A8C43C`, `#E09550`, `#55B9DF`, `#FFF38F`, `#B7ACE3`, `#E48AD1`, `#EB5D4B`, `#7A9E9A`, `#C8B848`, `#5B7FB8`.

Use this pool for quiz answer cards and non-result decorative variety. Do not use it to replace the official result outcome colors.

### Derived Accent Utilities

The app includes two color utility behaviors:

- `getSoftAccent(hex)`: mixes a color toward white for light tile backgrounds.
- `getMutedAccent(hex)`: creates a darker, slightly desaturated hover color for light-mode answer hover states.

Use the soft accent for illustration tile backgrounds and the muted accent for hover states that need white text.

## Typography

The app imports:

```css
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@900&family=Inter:wght@400;500&display=swap');
```

### Display Typeface

Use `Barlow Condensed`, `Arial Narrow`, sans-serif at weight `900`.

Used for:

- Welcome headline.
- Start mode titles.
- Section titles.
- Result titles.
- Competency stamp titles.
- Sidebar values.
- Token/reward headlines.

Rules:

- Usually uppercase.
- Letter spacing remains `0`.
- Use tight line-height from `0.86` to `0.98` for large display titles.
- Mobile result titles use a clamp so long official profile names fit: approximately `clamp(22px, 6.5vw, 42px)`.

### Body Typeface

Use `Inter`, `Helvetica Neue`, sans-serif at weights `400` and `500`.

Used for:

- Body copy.
- Answer text.
- Buttons.
- Progress labels.
- Details and bullets.
- Attribution.

Rules:

- Keep body copy short.
- Prefer one or two short sentences over paragraph blocks.
- For question scenarios, use Inter rather than the condensed display font for readability.

## Layout System

### Kiosk Canvas

The kiosk shell is a full-size app surface with:

- Dark background.
- Left sidebar on wide screens.
- Main content region on the right.
- Sidebar width: about `300px`.
- Main panel padding: about `42px` on kiosk, reduced on smaller widths.

The kiosk view uses a flat visual language: no soft drop shadows except where intentionally used for mobile cards or reward objects.

### Desktop Mobile Preview

The preview toggle can switch the desktop preview into a fixed phone canvas.

Current phone preview:

- Width: `390px`.
- Height: `844px`.
- Outer border: `8px solid #181818`.
- Border radius: `30px`.
- The fixed height is stored as `--phone-preview-height: 844px`.
- The phone frame should not resize on result screens.

Actual narrow screens use `100dvh` rather than the fixed desktop-preview height.

### Mobile Result Viewport

Mobile results use `mobile-results-flow`, which is displayed only in mobile preview or true mobile width.

Rules:

- The result flow fills the phone frame.
- The old kiosk result content is hidden via `kiosk-results-content`.
- Each result step uses the shared `mobile-result-page` surface.
- Scroll is allowed inside detail and summary pages, not by resizing the phone frame.
- Results should feel like sequential screens in one fixed device, not separate web pages.

## Theming

The app supports dark and light mode.

### Dark Mode

Dark mode uses black and near-black shell surfaces with white text. Mobile result pages can still use white game-card surfaces where needed, especially token and stamp areas.

### Light Mode

Light mode uses:

- App background: `#F7F3E8`.
- Sidebar/panel surfaces: `#FFFFFF` or `#FBFAF4`.
- Main text: `#0A0A0A`.
- Secondary text: `#474747`.

### Theme Toggle

Kiosk sidebar uses a two-state display switch:

- Shows both light and dark options.
- Uses a sliding thumb.
- Selected state is visibly filled.

Mobile uses a circular icon button with sun/moon icon behavior.

## Core Components

### Buttons

Buttons use rounded pill shapes in current iterations.

Shared geometry:

- Use `.pill-button` for standard pill-shaped actions.
- Use `.icon-button` for circular icon-only controls.
- Use `.status-pill` for non-navigation status controls, including "Pick one to continue."
- Pill-shaped buttons use a fixed `46px` height via `--pill-button-height`.
- Circular icon buttons use a fixed `46px` width and height via `--icon-button-size`.
- Circular buttons must keep `border-radius: 50%`, `aspect-ratio: 1 / 1`, and centered icons.
- Button and status typography uses `Inter`, `Helvetica Neue`, sans-serif at `15px` / `500` unless a component has a deliberate non-button label style.

Primary button:

- Filled XQ Green.
- Black text.
- Border usually black on mobile/light contexts.
- Height: `46px`.

Secondary button:

- White or transparent depending on context.
- Black border in light/mobile result contexts.
- White border in kiosk dark contexts.

Mobile next/back navigation uses a two-column grid:

- Back: smaller column, roughly 42 percent.
- Next: larger column, fills remaining width.
- Height: `46px`.

### Sidebar Slots

Sidebar slots show quiz state in kiosk mode.

Structure:

- Small uppercase label.
- Large condensed value.
- Optional active accent strip.

Use active slot accent to reinforce current stage or top outcome.

### Preview Mode Toggle

Visible only on desktop-width previews.

Purpose:

- Switch between kiosk and mobile preview.
- Should not appear as part of actual kiosk/mobile user experience.

Location:

- Bottom right.

## Welcome Screen

The welcome screen centers attention through scale, spacing, and the two mode cards rather than a forced brand-color panel. The page should inherit the natural theme surface: cream/light in light mode and dark/black in dark mode.

Welcome text must stay theme-aware:

- Light mode: black primary text with dark gray supporting copy.
- Dark mode: white primary text with light gray supporting copy.
- The small "Your profile under 5" ticket should read as inline text, not a separate filled button.
- Content should align to the top of the available screen, using approximately the same padding rhythm as question screens.

Content hierarchy:

1. Tiny ticket: "Your profile under 5".
2. Headline: "Discover Your XQ Learner Profile".
3. Short subtitle.
4. Plain-language body copy.
5. Two mode cards.

Mode cards:

- Fast Mode: 5 questions.
- Detailed Mode: 10 questions. More accurate.
- Cards use thick black border, white base, display title, and colored bottom action strip.

Avoid adding extra audience-segment rows or explanatory panels below the main welcome area. The start screen should feel focused.

## Quiz Question Screen

### Structure

Kiosk:

- Left sidebar with brand, progress, current mode, display toggle, mini progress.
- Main area with navigation, progress bar, scenario, answer cards.

Mobile:

- Top controls include restart and theme toggle.
- Scenario and answer options are compressed to fit without scrolling.
- Bottom area contains back and next/status controls.

### Progress

Progress includes:

- "Question X of Y".
- Percentage.
- Thin progress bar with XQ Green fill.
- Mini progress dots on kiosk/sidebar.
- Completed dots should fill with the selected answer accent color.

### Scenario Text

Use Inter for readability.

Question scenario should be framed as a decision prompt where applicable, for example "Where would you start?" This helps users choose the first move rather than worrying that all answers are valid across a whole process.

### Answer Cards

Kiosk answer cards:

- Two-column grid.
- Large square competency asset area at top.
- White base card.
- Black text.
- Bright accent action strip.
- Hover/selected state uses dark or muted accent behavior.

Mobile answer cards:

- Single-column list.
- Fixed compact height.
- Square illustration thumbnail on the left.
- Text in the middle.
- Pick/check area on the right.
- Selected state uses checkmark rather than long selected text.

Accessibility and contrast:

- Hover text in light mode must be white.
- Hover background in light mode should be a darker, slightly desaturated version of the card accent.
- Pick area should preserve bright accent fill.

### Answer Assets

Answer cards use competency SVG assets from:

- `public/xq-competency-assets/square`
- `public/xq-competency-assets/hexagon`

The square assets are used for answer and stamp-like cards. Hexagon assets are used for detail/power views.

## Asset System

### Competency Assets

Each competency maps to a square and hexagon SVG.

The `CompetencyAsset` component:

- Loads SVG markup.
- Scopes SVG IDs so repeated gradients/clips do not collide.
- Applies accent replacement through `--svg-accent`.
- Can preserve the original SVG accent fallback when needed.
- Caches SVG markup.

The current top-three strength stamps derive a primary asset color through `COMPETENCY_ASSET_COLOR_CACHE` after fetching the SVG and extracting candidate hexes. This keeps the card accent closer to the illustration library rather than forcing every tile into an outcome color.

### Profile Characters

Profile characters live in:

`public/xq-profile-characters`

Current files:

- `foundational-knowledge.svg`
- `fundamental-literacies.svg`
- `original-thinkers.svg`
- `generous-collaborators.svg`
- `learners-for-life.svg`

Use profile characters for learner outcome reveal and summary areas. Character frames can use outcome gradients, but the current summary treatment removes extra fills and outlines so the character does not dominate the layout.

## Results Flow: Mobile Through Summary

### Step 1: Radar Chart

Purpose:

- Show the user's profile shape first.
- Display the top learner profile name as the title.

Visual:

- White/light chart surface.
- Grid background.
- Recharts radar chart.
- Outcome colors appear on axis labels and legend dots.
- No visible numeric score list below the chart.

Data:

- Radar values are normalized to the user's strongest outcome so the chart feels filled and affirming.
- This does not change quiz scoring; it changes chart display scale.

### Step 2: Top Learner Profile Reveal

Purpose:

- Celebrate the matched learner outcome.

Content:

- Kicker: "Congratulations!"
- Character illustration.
- Official XQ learner profile title.
- "New profile unlocked."
- Bullet list of strengths.

Visual:

- White/mobile result surface.
- Profile character should not overwhelm the screen.
- Text should remain readable and not rely only on condensed type for longer copy.

### Step 3: Top Three Strengths Carousel

Purpose:

- Let users inspect their top three competencies as collectible strengths.

Title:

- "Your top three strengths"

Interaction:

- Swipe left/right rotates cards.
- Arrow controls are also present to avoid relying on swipe only.
- Tap card opens competency detail.
- Users do not need to inspect all three before moving on.

Card styling:

- Stamp-like card.
- Thick accent border.
- Full-width square SVG art area.
- Artwork maintains aspect ratio and fills card width.
- Any remaining art-area background uses the SVG square library's own background/accent color.
- Card title uses condensed display type.
- Short source phrase is clamped to two lines.

### Step 4: Competency Detail

Purpose:

- Explain what a top competency means.

Content:

- Hexagon competency asset.
- Competency label.
- Short plain-language sentence from competency description.
- Component skills list based on the XQ competencies site.

Layout:

- Detail view may scroll if content exceeds the fixed phone viewport.
- Back returns to the top-three carousel or previous source context.
- Continue advances to token when coming from the top-three flow.

### Step 5: Token Earned

Purpose:

- Provide a short reward/reinforcement moment before summary.

Visual:

- Gold circular token.
- Star icon.
- Sparkle burst.
- White/light background.

Motion:

- Token flies up toward center.
- Sparkles burst outward.
- Animation is short, about `900ms`.

Copy:

- "Token earned"
- "Your XQ strengths are unlocked."

### Step 6: Final Summary Page

Purpose:

- Consolidate the user's result in one scrollable page.

Content:

- Summary header with learner profile character.
- Top learner profile short name.
- Description of learner profile.
- Top three competency stamps.
- Explore buttons:
  - Explore all XQ competencies
  - Explore all learner profiles
  - Why XQ competencies?
- Attribution:
  - "Based on the XQ Learner Outcomes framework - xqsuperschool.org"
- Full-width retake button.
- Back navigation.

Layout:

- Summary page is allowed to scroll inside the fixed phone frame.
- Restart/retake should not consume excessive vertical space.
- The top three competency stamps should stay visible as a compact row when possible.

## Motion

### Question Transition

Questions fade in with a subtle upward movement:

- Duration: about `200ms`.
- Use sparingly.

### Answer Card Entry

Kiosk answer cards use staggered entry:

- Duration: about `420ms`.
- Stagger from `--stagger`.

### Result Carousel

Top-three and profile carousels use transforms:

- Center card: full size, z-index high.
- Side cards: scaled to about `0.82`, slight rotation.
- Hidden cards: opacity `0`, scaled down.
- Transition: about `280ms` cubic-bezier.

### Token Animation

Token and sparkles animate with keyframes:

- `tokenFly`
- `sparkleBurst`

Keep this moment celebratory but brief.

## Accessibility and Usability Rules

- Do not rely on color alone for state.
- Selected mobile answer cards show a checkmark.
- Hover states must preserve contrast; in light mode, hover text should be white.
- Buttons should be at least about `44px` tall.
- Carousels include button controls in addition to swipe.
- Fieldsets/legends are used for carousel controls where appropriate.
- All decorative images should use empty `alt` and `aria-hidden` when they are redundant.
- Text should not be clipped in buttons or cards.

## Responsive Behavior

### Kiosk

- Uses sidebar plus main content.
- Results keep the kiosk radar/chart and sidebar available.
- Kiosk result redesign is intentionally less complete than the mobile flow and should be treated as a future approval pass.

### Mobile Preview on Desktop

- Uses fixed phone frame: `390px x 844px`.
- Mobile/kiosk preview toggle appears bottom right only on desktop.
- The fixed frame is scrollable from the outside if the browser window is shorter than the preview.

### Actual Mobile Width

- Uses `100dvh`.
- Hides kiosk sidebar.
- Uses single-column quiz answer list.
- Results use the mobile result flow.

## Content Voice

Tone:

- Direct.
- Affirming.
- Plain-language.
- More like "You make information click" than rubric language.

Avoid:

- Leading with competency codes.
- Long technical definitions.
- Explaining interaction mechanics in visible UI.
- Overly generic personality-test language.

Preferred patterns:

- "Your top three strengths"
- "Tap the card to learn more!"
- "New profile unlocked"
- "Token earned"
- "Your XQ strengths are unlocked."

## Implementation Notes

### Primary File

The UI is currently implemented in:

`app/page.tsx`

Major areas:

- Data maps and learner outcome metadata near the top.
- Asset mapping for competency and profile SVGs.
- `APP_STYLES` inline CSS block.
- `CompetencyAsset` for SVG loading/recoloring.
- `MobileResultsFlow` for the mobile result sequence.

### Key Public Assets

Competency assets:

- `public/xq-competency-assets/square`
- `public/xq-competency-assets/hexagon`

Profile characters:

- `public/xq-profile-characters`

### Libraries

- React hooks.
- Next.js app router.
- Recharts radar chart.
- Next Image for asset rendering.

## Known Design Debt

- Kiosk results need a dedicated redesign after mobile direction is approved.
- Explore-all screens exist but are beyond this "through summary page" design-system scope.
- Profile character art is placeholder-vector quality and should eventually be replaced with final commissioned illustrations.
- Older button overrides have been consolidated around `.pill-button`, `.icon-button`, and `.status-pill`; future controls should use those utilities before adding new one-off sizing rules.
- The current design should continue to be visually checked in both light and dark modes, especially answer hover states and mobile summary stamps.

## Do Not Drift Checklist

Before adding a new screen or component, check:

- Does it use the official learner outcome language?
- Does it use the correct outcome color only when the result is meant to be identifiable?
- Does it keep the mobile phone frame fixed in desktop preview?
- Does it avoid unnecessary explanatory UI copy?
- Does it keep button heights at the shared `46px` pill/circle size?
- Does it preserve text contrast in hover, selected, light, and dark states?
- Does it use existing competency/profile assets before adding new art?
- Does it feel like part of the kiosk/game system rather than a generic web dashboard?
