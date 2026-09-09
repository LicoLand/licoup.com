---
name: LicoUp Website
description: A playful conversation magazine for a friendly local-agent client.
colors:
  conversation-orange: "#ff724e"
  grounded-orange: "#bc4123"
  paper: "#f8f9f5"
  white: "#fff"
  ink: "#252823"
  muted-ink: "#63685f"
  lilac: "#e3dcfb"
  mint: "#e5eddc"
  lime: "#d0ed86"
  line: "#d9ddd3"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "clamp(60px, 6.2vw, 88px)"
    fontWeight: 650
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Bricolage Grotesque, Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "clamp(40px, 4.65vw, 64px)"
    fontWeight: 650
    lineHeight: 1.06
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Bricolage Grotesque, Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "clamp(32px, 3.2vw, 46px)"
    fontWeight: 650
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Bricolage Grotesque, Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Bricolage Grotesque, Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "12px"
    fontWeight: 550
    lineHeight: 1.4
rounded:
  compact: "8px"
  card: "16px"
  feature: "23px"
  pill: "100px"
spacing:
  tight: "8px"
  compact: "16px"
  content: "23px"
  section-gap: "48px"
components:
  button-primary:
    backgroundColor: "{colors.conversation-orange}"
    textColor: "#29221d"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "8px 10px 8px 26px"
    height: "60px"
  button-primary-hover:
    backgroundColor: "#ff8868"
    textColor: "#29221d"
    rounded: "{rounded.pill}"
  button-compact:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "10px 19px"
    height: "44px"
  button-open-source:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "18px 26px"
  scenario-tab:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "13px 23px"
    height: "50px"
  scenario-tab-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
---

# Design System: LicoUp Website

## Overview

**Creative North Star: "The Playful Conversation Magazine"**

LicoUp presents a consumer-facing local-agent client as an inviting editorial conversation. Expansive grotesque headlines, generous paper-colored space, warm calls to action, and soft sculptural forms make the page lively without making it noisy. The experience draws on expressive showcase sites while keeping navigation, download actions, examples, and answers immediately legible.

The visual world alternates open editorial space with contained pastel scenes. Conversation slips, hand-placed rotations, orbital marks, and an original abstract sculpture give the page a tactile character; restrained borders and deep ink keep those gestures grounded. The three-line hero names Agent Collaboration before resolving to the user's agency, while the approved LicoUp logo remains the stable brand anchor. Search-oriented category and guide pathways extend this existing world rather than creating a separate visual system.

**Key Characteristics:**

- Oversized, tightly tracked bilingual headlines, including the category-led three-line hero.
- Warm paper and deep ink, activated by tangerine and softened by lilac, mint, lime, blue, and peach scene fields.
- Rounded cards and pill controls paired with slightly rotated paper-like inserts.
- Original abstract conversation imagery rather than screenshots presented as product UI.
- Open editorial link rows that move from recognizable questions into deeper category, use-case, security, and technical reading.
- Rich but coherent motion with a complete paused and reduced-motion state.

## Colors

The palette combines warm near-white paper and garden-dark ink with a concentrated tangerine action color and quiet pastel scene fields.

### Primary

- **Conversation Tangerine:** The high-energy fill for primary download controls and small illustrated accents.
- **Grounded Terracotta:** The stronger text accent used in the hero, logo punctuation, navigation feedback, and FAQ hover states.

### Secondary

- **Conversation Lilac:** A soft field for the hero artwork and agent-oriented details.
- **Fresh Mint:** A quiet hover and ambient surface color.
- **Optimistic Lime:** The open-source call to action, dark-section headline accent, and selection highlight.

### Neutral

- **Warm Paper:** The page canvas and the light text color on the open-source band.
- **Clear White:** Conversation windows and other clean foreground sheets.
- **Deep Garden Ink:** Primary text, selected scenario tabs, compact header actions, and the open-source band.
- **Muted Olive Ink:** Supporting copy, captions, notes, and secondary metadata.
- **Soft Botanical Line:** Dividers, FAQ rules, and low-emphasis outlines.

### Named Rules

**The Warm Action Rule.** Reserve tangerine for the main user action and small moments of emphasis; broad content surfaces stay neutral or pastel.

**The Pastel Scene Rule.** Lilac, mint, lime, pale blue, and peach belong to bounded illustration or demonstration fields, where they distinguish scenes without competing with the primary action.

## Typography

**Display Font:** Bricolage Grotesque (with Noto Sans SC and system sans-serif fallbacks)  
**Body Font:** Bricolage Grotesque (with Noto Sans SC and system sans-serif fallbacks)

**Character:** Bricolage Grotesque supplies broad, expressive shapes for the English voice, while the locally served Noto Sans SC subset keeps the Chinese experience equally clear. One shared stack and consistent weights make language changes feel like the same brand rather than a separate layout.

### Hierarchy

- **Display:** The three-line hero uses `clamp(60px, 6.2vw, 88px)`, a strong medium weight, tight tracking, and near-solid leading. Below 900px it contracts to `clamp(40px, 6.2vw, 57px)`; on phones it recomposes at `clamp(43px, 11.7vw, 66px)` for both languages so the category statement remains prominent without colliding with the artwork.
- **Headline:** Section statements use a fluid scale, balanced wrapping, tight tracking, and compact leading.
- **Title:** Feature headings use a smaller fluid scale with the same weight and tracking as section headings.
- **Body:** Supporting copy uses comfortable leading and constrained measures, typically around 425–500px, so the generous layout remains easy to scan.
- **Label:** Navigation, captions, release notes, annotations, and supporting metadata use compact sizes with medium emphasis rather than uppercase styling.

### Named Rules

**The Intentional Line Break Rule.** The category hero resolves in three short lines; major section headlines use two when the copy supports it. Color may shift one line, but type family, weight, and rhythm stay continuous.

**The One Bilingual Voice Rule.** English and Chinese use the same hierarchy and component geometry, with Noto Sans SC providing the Chinese glyph coverage inside the shared stack.

## Layout

The main content column is capped at 1328px with 48px desktop gutters. The hero is wider, capped at 1440px, and pairs copy with a near-equal artwork column; its asymmetric left inset lets the sculpture meet the viewport edge on ordinary desktop widths. Editorial sections use generous vertical spacing, alternating two-column headings, demonstration stages, and balanced feature rows.

At 1199px, gutters and hero spacing tighten. At 899px, navigation becomes a menu-controlled stacked region, the three-line hero contracts, and dense demonstration and reading content receives smaller internal padding. At 600px, the hero becomes a vertical sequence with copy before a contained artwork field, the value links wrap, question pathways and the guide spread become single columns, feature rows stack, the second feature reverses so its artwork still leads, the open-source band becomes a single-column composition, and the FAQ becomes one column. Mobile gutters settle at 23px while the hero art keeps a contained 12px outer margin.

The homepage reading path begins with a static three-link value strip, then pairs visible user questions with deep links to use cases, coding-agent interface guidance, and security. A pale-lilac category guide anchors the later reading spread beside a ruled list of coding-agent, orchestration, and architecture articles. A compact directory completes the path to product, use cases, security, and current availability. These are ordinary crawlable links and readable HTML rather than script-generated navigation.

Product guides use the same paper, ink, typography, rounded surfaces, and approved logo. Their document navigation wraps naturally on small screens, identifies the current page, and remains usable without JavaScript. Long tables scroll inside their own containers. The existing guide URLs and English factual content remain available. The compatibility overview combines the available download with one adapter table and practical setup requirements.

No-JavaScript rendering preserves the full navigation and first conversation example. Language, motion, menu, and scenario controls only appear when scripting makes them functional.

### Named Rules

**The Editorial Alternation Rule.** Move between generous text-led space and bounded visual scenes; avoid a continuous grid of identical cards.

**The Mobile Recomposition Rule.** Preserve the reading and action order by stacking whole compositions, not by merely shrinking the desktop columns.

## Elevation & Depth

Depth is selective and ambient. The page canvas, navigation, FAQ, and most editorial text remain flat; shadows appear under floating conversation slips, the white conversation window, the tilted logo core, local labels, and the choice card. Pastel background fields, clipping, overlap, and rotation provide most of the hierarchy before shadow is introduced.

### Shadow Vocabulary

- **Floating Slip** (`0 12px 32px -15px #412b6173`): A purple-tinted diffuse shadow supports message slips over the lilac hero field.
- **Conversation Window** (`0 26px 70px -38px #34432386`): A broad olive-tinted shadow separates the main white demonstration sheet from its pastel stage.
- **Object Lift** (`0 17px 35px -15px #576e7166`, `0 9px 22px -12px #52738b55`, and `0 23px 40px -25px #5b342d77`): Smaller blue-gray and warm-brown shadows lift illustrated labels, the logo core, and the choice card from their scenes.

### Named Rules

**The Flat Editorial Rule.** Keep structural content flat; use shadows only when an object is visibly floating inside an illustration or demonstration scene.

## Shapes

The base surface radius is a gently rounded 16px. Small interface layers range from 8px to 15px, while signature icon tiles reach 19px to 23px. Buttons, compact labels, language controls, scroll cues, status marks, avatars, and orbital forms use complete pills or circles. Conversation bubbles may use one tighter corner to suggest direction.

Slight rotations make selected cards and slips feel hand placed. Large decorative geometry uses open loops, quiet arcs, small divider dots, and rounded conversation sculpture. A small sparkle is reserved for the Make something scene and its idea card; it is not repeated as page decoration. These forms remain secondary to text and never replace the unchanged LicoUp logo.

### Named Rules

**The Soft Geometry Rule.** Combine rounded rectangles with circles and orbital marks; sharp rectangles are limited to divider lines and typographic alignment.

**The Stable Logo Rule.** Keep the approved LicoUp logo artwork unchanged. The browser favicon clips the same artwork to a rounded rectangle with transparent corners, using a radius of about 19% of its width. Expression comes from its surrounding scene, scale, and placement.

## Components

### Buttons

Buttons feel tactile, friendly, and decisive.

- **Shape:** Full capsule silhouette with a 60px minimum height for the main action; the embedded dark circular disc reinforces direction.
- **Primary:** Tangerine fill, deep ink text, asymmetric horizontal padding, and a separate dark arrow disc. It is used for the macOS download action in the hero and closing section.
- **Hover / Focus:** Hover lifts the capsule by 3px, warms the fill, and nudges the icon. Active returns it to the baseline with a slight scale compression. Keyboard focus uses a visible purple outline with generous offset.
- **Compact:** The header download action uses a 44px deep-ink capsule with white text.
- **Open Source:** The dark open-source band uses a lime capsule with deep ink text and paired icons.
- **Text Link:** Secondary actions use underlined text and a diagonal or forward icon nudge rather than a filled surface.

### Chips

Scenario controls behave like friendly segmented choices rather than utility filters.

- **Style:** Desktop tabs are outlined pills with icons and a 50px minimum height. Mobile tabs become compact rounded tiles with vertically stacked icon and label.
- **State:** The selected scenario fills with deep ink and white text. Hover introduces a light botanical surface and a small upward lift.

### Reading Pathways

The value strip is a static row of three icon-led links for conversation continuity, chosen context, and human decisions. Question pathways remain open ruled rows rather than boxed cards; each begins with a recognizable problem and links directly to the relevant anchored answer. The guide spread uses one pale-lilac primary guide beside a border-led reading list, followed by a compact directory of supporting pages.

### Cards / Containers

Cards resemble clean paper sheets inside softly colored editorial scenes.

- **Corner Style:** Main stages and conversation windows use the base 16px radius; nested callouts step down to 10–12px.
- **Background:** White is reserved for the primary conversation sheet and selected floating slips; pastel fields organize the surrounding scenes.
- **Shadow Strategy:** Use ambient shadow only for visibly floating layers, following the Flat Editorial Rule.
- **Border:** Dividers and quiet outlines use the botanical line color; card perimeters generally rely on contrast and clipping.
- **Internal Padding:** Desktop demonstration content is spacious, then tightens substantially below the tablet and phone breakpoints.

### Navigation

Desktop navigation is a single horizontal line of compact medium-weight links. Hover draws a terracotta underline from left to right. Below 900px, the menu control reveals a full-width vertical link list with quiet divider rules; Escape closes it and returns focus. The language control is a circular 44px target with a mint hover field.

### Conversation Stage

Three Make something, Learn something, and Pick it back up scenarios share one demonstration stage and one visual grammar. Selecting a scenario updates the tinted field and displayed conversation sheet; the panel enters with a short vertical fade. With JavaScript unavailable, the tabs remain hidden and the first illustrative conversation remains readable.

### FAQ

FAQ rows are full-width native disclosure elements separated by fine rules. The plus icon rotates 45 degrees when a row opens, the question shifts to terracotta on hover, and the answer stays in muted ink with relaxed leading. The entire summary remains a keyboard and touch target.

### Motion

Hero lines reveal once, content sections arrive once as they enter view, and scenario panels use a short transition on demand. Floating message slips move slowly and the open-source orbit turns over a long cycle. Pointer parallax is limited to fine-pointer devices and is scheduled with animation frames. The value strip and reading pathways remain static. A footer control pauses motion, hidden-page and paused states cancel transient work, and the system reduced-motion preference disables animation, transitions, smooth scrolling, and parallax.

## Do's and Don'ts

### Do:

- **Do** preserve the unchanged LicoUp logo as the stable brand anchor.
- **Do** pair expressive headlines with short line lengths, generous space, and restrained supporting copy.
- **Do** keep primary download actions tangerine and reserve lime for the open-source action on deep ink.
- **Do** use original abstract illustration and clearly illustrative conversation scenes.
- **Do** keep English and Chinese within one hierarchy and responsive composition.
- **Do** make motion optional, capability-aware, and absent under reduced-motion settings.

### Don't:

- **Don't** turn every section into the same card grid or apply shadow to structural content.
- **Don't** spread tangerine across large background fields or let pastel scenes compete with the primary action.
- **Don't** present the abstract sculpture or synthetic conversation as literal product UI.
- **Don't** replace, redraw, or embellish the LicoUp logo artwork.
- **Don't** depend on JavaScript for navigation, core copy, the first example, or download access.
- **Don't** run pointer-driven motion on coarse pointers or when motion is paused or reduced.
