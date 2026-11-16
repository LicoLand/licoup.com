---
name: LicoUp Website
description: A modern, bright product site for a messenger shared by people and AI agents.
colors:
  ink: "#15120f"
  ink-2: "#3b352f"
  paper: "#fbfaf8"
  white: "#ffffff"
  muted: "#736d66"
  line: "#ebe6df"
  violet: "#6a4ce0"
  violet-deep: "#2a1d66"
  violet-ink: "#4f36c4"
  violet-soft: "#f1edff"
  gold: "#d6a43c"
  gold-light: "#f2d38b"
  gold-ink: "#8a6114"
  gold-soft: "#fbf3df"
  green: "#17a664"
  mint: "#e8f6ee"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "clamp(42px, 6vw, 84px)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Bricolage Grotesque, Noto Sans SC, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "clamp(34px, 4.4vw, 60px)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  body:
    fontFamily: "-apple-system, SF Pro Text, Segoe UI, PingFang SC, Noto Sans SC, Microsoft YaHei, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  control: "999px"
  card: "24px"
  window: "22px"
  inner: "12px"
components:
  button-primary:
    backgroundColor: "linear-gradient({colors.violet-deep}, {colors.violet})"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    height: "50px"
  button-quiet:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    borderColor: "{colors.line}"
    rounded: "{rounded.control}"
    height: "50px"
---

# Design System: LicoUp Website

## Overview

**North star: "Where people and agents talk."** LicoUp is presented as a
communication product, not a developer tool. The page leads with a messenger in
which people, agents and channels share one conversation, results arrive as
content that can be passed on, and the person keeps control of context and
approvals. The design language is modern, premium, concise and energetic:
warm white space, confident type, deep and light violet with gold accents
("purple clouds from the east, floating light and glinting gold"), soft
layered depth and purposeful motion.

The mascot is the friendly face of the brand, not the theme of the page. Copy
does not lean on dessert wordplay; it describes user-experience capability.

## Brand mark

The mascot is **Lico**, LicoUp's resident agent: a smooth milk-white ice-cream
scoop that glows softly like a small moon, with glossy navy eyes, a small smile
and blush, two soft arms resting on the rim of a silicone-like waffle cup, and
a lavender star worn as a hair clip. The material is a soft matte vinyl-toy
finish without outlines or surface texture.

- `lico.js` renders Lico as a layered SVG character (head, eyes, brows, mouths,
  blush, arms, clip and cup) and `lico.css` drives its moods: neutral, happy,
  listening, thinking, speaking, sorry and sleepy. Idle breathing, blinking and
  pointer-following eyes respect the pause control and reduced motion.
  Flavour skins change only the scoop colours and accessories only the head
  decoration; the face, arms and waffle cup stay the same. Shading uses
  gradients rather than SVG filters so exports render the same in Flutter.
- The same template renders the client's static expressions and square
  avatar tiles; that preset pack and its export pipeline are owned and
  distributed by the LicoUp client repository, not by this site.
- On the homepage, Lico opens the introduction conversation and cheers when
  clicked; its avatar marks Lico's messages.

**The One Mascot Rule.** Use the mascot as a single, deliberate presence per
view. Never tile it, scatter it as decoration, or replace UI with it.

## Colors

Warm near-white paper and white surfaces carry the page; deep ink is used for
text. Violet is the brand accent: the primary button (a deep-violet gradient
with a gold sheen on hover), your own messages, badges, selections and links.
Gold is the glint: eyebrows, attention states such as approvals, the "Next"
roadmap tag and the "Today" marker. Green signals available or completed
states. Approval surfaces carry a fine waffle lattice over cream, the cup that
holds a decision. There are no blurred halos or decorative backgrounds.

**The Violet and Gold Rule.** Violet leads, gold highlights. Keep gold small
and luminous; never use orange or large saturated fields.

## Typography

Bricolage Grotesque sets display type at a medium weight with moderate
tracking; Chinese headlines use slightly open tracking and more leading so
large type stays comfortable. Body copy uses the platform UI font for crisp
reading. The locally served Noto Sans SC subset
provides Chinese display glyphs and is refreshed whenever Chinese copy adds
characters. English and Chinese share one hierarchy and composition.

## Layout

The homepage is the client. `client.css` and `app.js` draw a light desktop
messenger that fills the page: the conversation list is a rounded card on the
left, and the conversation and the details pane share the page ground,
separated by hairlines. Conversation content is capped at 760px. Below 1180px
the details pane becomes a drawer; below 720px the conversation list becomes a
drawer.

The conversations are the site's sections: Lico (introduction, questions and
download), Launch crew (a labelled concept preview), Features, Roadmap, Guides
and Agents. Every control works: search filters conversations, the language
button switches Chinese and English, chips and typed messages get answers,
approvals can be allowed or denied, documents can be edited and shared, and
visibility switches change what an agent can read.

Without JavaScript the same content is served as a plain document (`.static`),
which is also the indexed content. Guide pages share the tokens, the mark and
neutral white cards through `content.css` and `styles.css`.

**The Honest Preview Rule.** Replies are scripted. The Launch crew conversation
is labelled a concept preview, and the introduction states that today's release
connects local agents and that messaging with people is roadmap work.

## Depth and shape

Structural content is flat with 1px warm hairlines. Floating layers (the
messenger window, popovers, cards on hover) use layered, low-contrast shadows.
Controls are full pills; cards use 24px radii, the window 22px, nested elements
10–14px.

## Motion

Messages rise in once, typing dots precede a reply, controls answer presses
with a small spring, and Lico breathes, blinks and follows the pointer. The
reduced-motion preference disables animation and transitions.

## Do's and Don'ts

- **Do** lead with communication: people, agents, shared results and control.
- **Do** keep copy short and capability-led; let the preview show the product.
- **Do** label concepts and roadmap items honestly.
- **Don't** use orange accents, sprinkles, stickers, heavy outlines or hard offset shadows.
- **Don't** frame LicoUp as a pure coding tool or lean on "sweet" wordplay.
- **Don't** depend on JavaScript for navigation, copy, the FAQ or downloads.
