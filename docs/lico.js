/* Lico mascot: layered SVG character with live moods, flavours, accessories
   and static expressions. Shading uses gradients only (no SVG filters) so
   renders look the same in browsers and Flutter. */
(() => {
  "use strict";

  const MOODS = ["neutral", "happy", "listening", "thinking", "speaking", "sorry", "sleepy"];

  const FLAVORS = {
    vanilla: ["#fffefb", "#f8f3eb", "#e2d7ca", "#bfae9b"],
    strawberry: ["#fff4f5", "#ffdfe4", "#f4b9c3", "#d88d9b"],
    matcha: ["#f7fbef", "#e3efcf", "#c3d6a4", "#95ab76"],
    taro: ["#fbf7ff", "#ebe1fb", "#cdbbef", "#9f8bc9"],
    caramel: ["#fff8ef", "#f8e3c6", "#e6c296", "#bf9366"],
    chocolate: ["#fbf1e8", "#edd6c2", "#d3ae8e", "#a47a57"],
    mint: ["#f4fffa", "#dbf5e9", "#b0e0c9", "#7db79b"],
    blueberry: ["#f6f8ff", "#e1e7ff", "#bcc8f4", "#8a99d0"],
    peach: ["#fff8f2", "#ffe5d5", "#f6c4a6", "#d89b7a"],
    lemon: ["#fffef3", "#fdf6cc", "#efdc92", "#c7ae5e"],
  };

  const INK = "#1a1f3f";
  const BROW = "#6b5a55";
  const LIP = "#7a4636";
  const MOUTH = "#6e2f2a";
  const TONGUE = "#ff8e8e";
  const CUP = "M40 142H160L148 201Q146 209 138 209H62Q54 209 52 201Z";

  const f = (n) => Math.round(n * 100) / 100;

  const waffle = () => {
    let lines = "";
    for (let x = -60; x <= 230; x += 23) {
      lines += `M${x} 140 l70 72 M${x + 70} 140 l-70 72 `;
    }
    return lines;
  };

  const soft = (id, color, opacity, from = 0) =>
    `<radialGradient id="${id}"><stop offset="${from}" stop-color="${color}" stop-opacity="${opacity}"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient>`;
  const linear = (id, stops, [x1, y1, x2, y2] = [0, 0, 0, 1]) =>
    `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stops.map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}"${a === 1 ? "" : ` stop-opacity="${a}"`}/>`).join("")}</linearGradient>`;
  const radial = (id, stops, cx = "38%", cy = "30%", r = "80%") =>
    `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join("")}</radialGradient>`;

  const heart = (x, y, s) =>
    `M${f(x)} ${f(y + s * .95)}C${f(x - s * 1.45)} ${f(y + s * .05)} ${f(x - s * 1.05)} ${f(y - s * 1.15)} ${f(x)} ${f(y - s * .38)}C${f(x + s * 1.05)} ${f(y - s * 1.15)} ${f(x + s * 1.45)} ${f(y + s * .05)} ${f(x)} ${f(y + s * .95)}Z`;
  const star = (x, y, outer, inner, turn = 0) => {
    let d = "";
    for (let i = 0; i < 10; i += 1) {
      const r = i % 2 ? inner : outer;
      const a = ((-90 + turn + i * 36) * Math.PI) / 180;
      d += `${i ? "L" : "M"}${f(x + r * Math.cos(a))} ${f(y + r * Math.sin(a))}`;
    }
    return `${d}Z`;
  };
  const sparkle = (x, y, r) =>
    `M${x} ${f(y - r)}Q${x} ${y} ${f(x + r)} ${y}Q${x} ${y} ${x} ${f(y + r)}Q${x} ${y} ${f(x - r)} ${y}Q${x} ${y} ${x} ${f(y - r)}Z`;
  const drop = (x, y, s) =>
    `M${x} ${f(y - 1.7 * s)}C${f(x + .5 * s)} ${f(y - .8 * s)} ${f(x + s)} ${f(y - .3 * s)} ${f(x + s)} ${f(y + .25 * s)}A${s} ${s} 0 0 1 ${f(x - s)} ${f(y + .25 * s)}C${f(x - s)} ${f(y - .3 * s)} ${f(x - .5 * s)} ${f(y - .8 * s)} ${x} ${f(y - 1.7 * s)}Z`;
  const crescent = (x, y, R, dx, dy, r) => {
    const d = Math.hypot(dx, dy);
    const a = (R * R - r * r + d * d) / (2 * d);
    const h = Math.sqrt(R * R - a * a);
    const [ux, uy] = [dx / d, dy / d];
    const [px, py] = [x + a * ux, y + a * uy];
    const [x1, y1, x2, y2] = [px - h * uy, py + h * ux, px + h * uy, py - h * ux];
    return `M${f(x1)} ${f(y1)}A${R} ${R} 0 1 1 ${f(x2)} ${f(y2)}A${r} ${r} 0 1 0 ${f(x1)} ${f(y1)}Z`;
  };
  const clipBar = (color, light) =>
    `<rect x="128" y="38.5" width="30" height="6" rx="3" fill="${color}" transform="rotate(26 143 41.5)"/>
        <rect x="129" y="38.5" width="26" height="2" rx="1" fill="${light}" opacity=".8" transform="rotate(26 143 41.5)"/>`;
  const shine = (x, y, rx, ry, turn = -30) =>
    `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#fff" opacity=".75" transform="rotate(${turn} ${x} ${y})"/>`;

  /* Head accessories. `wiggle` accessories are hair clips that get the idle
     clip wiggle; `back` renders behind the head. */
  const ACCESSORIES = {
    none: () => ({}),
    star: (p, { compact }) => ({
      wiggle: true,
      defs: { [`${p}-star`]: linear(`${p}-star`, [[0, "#e2d6ff"], [.5, "#bba5fb"], [1, "#9a80ee"]], [0, 0, 1, 1]) },
      front: `${compact ? "" : clipBar("#8f78e0", "#d8ccff")}
        <path d="M138 16.5l4.3 9.2 10 1.2-7.4 6.9 1.9 9.9-8.8-4.9-8.8 4.9 1.9-9.9-7.4-6.9 10-1.2Z" fill="url(#${p}-star)" stroke="#8f78e0" stroke-width="1.2" stroke-linejoin="round" transform="rotate(12 138 30)"/>
        ${shine(134, 24.5, 3.6, 2)}`,
    }),
    bow: (p) => ({
      wiggle: true,
      defs: {
        [`${p}-bow`]: linear(`${p}-bow`, [[0, "#ffc4d1"], [1, "#f07f9b"]]),
        [`${p}-bowknot`]: linear(`${p}-bowknot`, [[0, "#f59ab0"], [1, "#e0647f"]]),
      },
      front: `<g transform="rotate(18 136 32)" stroke="#d9637f" stroke-width="1.2" stroke-linejoin="round">
          <path d="M133 34L126.5 47Q130 46 132.4 48.6L136.4 35Z" fill="url(#${p}-bowknot)"/>
          <path d="M139 34L145.5 47Q142 46 139.6 48.6L135.6 35Z" fill="url(#${p}-bowknot)"/>
          <path d="M136 32C130 21 116.5 20.5 115.6 28C114.8 35.5 126 37.5 136 32Z" fill="url(#${p}-bow)"/>
          <path d="M136 32C142 21 155.5 20.5 156.4 28C157.2 35.5 146 37.5 136 32Z" fill="url(#${p}-bow)"/>
          <rect x="131.5" y="26.8" width="9" height="10.4" rx="4.2" fill="url(#${p}-bowknot)"/>
        </g>
        ${shine(122, 25.5, 3.4, 1.8, -20)}${shine(146, 21.5, 3.2, 1.7, 30)}`,
    }),
    sprout: (p) => ({
      wiggle: false,
      defs: { [`${p}-leaf`]: linear(`${p}-leaf`, [[0, "#d3ef9c"], [1, "#84bb4d"]], [0, 0, .4, 1]) },
      front: `<path d="M100 27C100 19 101 13 104 8.5" fill="none" stroke="#78ad45" stroke-width="3.2" stroke-linecap="round"/>
        <g stroke="#6c9d3d" stroke-width="1.1" stroke-linejoin="round">
          <path d="M103 10.5C96 2.5 85.5 3.5 83.5 10C91.5 15.5 99 15 103 10.5Z" fill="url(#${p}-leaf)"/>
          <path d="M104.5 9C110.5 .5 121.5 1 123.5 7.5C116.5 13.5 108.5 13.5 104.5 9Z" fill="url(#${p}-leaf)"/>
        </g>
        <path d="M100.5 10.5Q93 8.5 87 10M107 8.5Q114 5.8 120 7" fill="none" stroke="#f1fbdc" stroke-width="1.2" stroke-linecap="round" opacity=".85"/>`,
    }),
    moon: (p) => ({
      wiggle: true,
      defs: { [`${p}-moon`]: linear(`${p}-moon`, [[0, "#fff1c4"], [.5, "#f2d38b"], [1, "#d6a43c"]], [0, 0, 1, 1]) },
      front: `${clipBar("#c99a3c", "#f7e2ae")}
        <path d="${crescent(137, 29, 13, 5.5, -4.5, 11)}" fill="url(#${p}-moon)" stroke="#b98a2a" stroke-width="1.1" stroke-linejoin="round"/>
        ${shine(130.5, 26, 3, 1.7, -60)}
        <path d="${sparkle(153, 17, 3.6)}" fill="#f2c75e"/>`,
    }),
    cherry: (p) => ({
      wiggle: false,
      defs: { [`${p}-cherry`]: radial(`${p}-cherry`, [[0, "#ff9aa3"], [.55, "#e3445d"], [1, "#b52a45"]], "36%", "30%", "75%") },
      front: `<path d="M111 12Q113 5 121 2.5" fill="none" stroke="#7a5a2e" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M117.5 4.5C121 .8 127.5 1.2 130 4.2C126.5 7.8 120.5 8 117.5 4.5Z" fill="#8cc152" stroke="#6c9d3d" stroke-width="1"/>
        <circle cx="110" cy="20.5" r="10" fill="url(#${p}-cherry)" stroke="#a8263f" stroke-width="1"/>
        ${shine(106.2, 16.4, 3.4, 2.1, -35)}`,
    }),
    headphones: (p) => ({
      wiggle: false,
      defs: {
        [`${p}-band`]: linear(`${p}-band`, [[0, "#a58bff"], [1, "#6a4ce0"]], [0, 0, 1, 0]),
        [`${p}-cupL`]: linear(`${p}-cupL`, [[0, "#7b5ff0"], [1, "#3b2a8f"]]),
      },
      front: `<path d="M29 92A71 71 0 0 1 171 92" fill="none" stroke="url(#${p}-band)" stroke-width="7" stroke-linecap="round"/>
        <path d="M37 72A66 66 0 0 1 72 30" fill="none" stroke="#e6ddff" stroke-width="1.8" stroke-linecap="round" opacity=".8"/>
        <rect x="20" y="74" width="19" height="35" rx="9.5" fill="url(#${p}-cupL)"/>
        <rect x="161" y="74" width="19" height="35" rx="9.5" fill="url(#${p}-cupL)"/>
        <rect x="33.5" y="78" width="7" height="27" rx="3.5" fill="#c9b8ff"/>
        <rect x="159.5" y="78" width="7" height="27" rx="3.5" fill="#c9b8ff"/>
        <circle cx="27" cy="91.5" r="3.6" fill="#f2d38b"/><circle cx="173" cy="91.5" r="3.6" fill="#f2d38b"/>`,
    }),
    beret: (p) => ({
      wiggle: false,
      defs: { [`${p}-beret`]: linear(`${p}-beret`, [[0, "#8a6ff2"], [1, "#3b2a8f"]]) },
      front: `<g transform="rotate(-13 98 30)">
          <path d="M100 10Q101 4 105 2.5" fill="none" stroke="#3b2a8f" stroke-width="3.2" stroke-linecap="round"/>
          <path d="M55 35C56 17 79 9 100 9.5C124 10 142 20 140 33C121 40.5 75 41.5 55 35Z" fill="url(#${p}-beret)"/>
          <path d="M55.5 35C75 41.5 121 40.5 140 33" fill="none" stroke="#2a1d66" stroke-width="3.2" stroke-linecap="round"/>
          ${shine(80, 18.5, 9, 3.2, -8)}
        </g>`,
    }),
    glasses: () => ({
      wiggle: false,
      front: `<g fill="none" stroke="#2a1d66" stroke-width="3" stroke-linecap="round">
          <circle cx="78" cy="98" r="14" fill="#fff" fill-opacity=".14"/>
          <circle cx="122" cy="98" r="14" fill="#fff" fill-opacity=".14"/>
          <path d="M92 96.5Q100 91.5 108 96.5M64 95.5L50 91.5M136 95.5L150 91.5"/>
        </g>
        <path d="M69 91.5Q72 87.5 77 87M113 91.5Q116 87.5 121 87" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".85"/>`,
    }),
    flower: (p) => ({
      wiggle: true,
      defs: { [`${p}-petal`]: radial(`${p}-petal`, [[0, "#fff4f7"], [.6, "#ffd0dc"], [1, "#ff9fb8"]], "50%", "80%", "90%") },
      front: `${clipBar("#f08aa6", "#ffe1e8")}
        <g stroke="#f08aa6" stroke-width=".9">${[0, 72, 144, 216, 288].map((a) => `<ellipse cx="137" cy="23.5" rx="5.6" ry="7.6" fill="url(#${p}-petal)" transform="rotate(${a} 137 31)"/>`).join("")}</g>
        <circle cx="137" cy="31" r="3.8" fill="#f2c75e" stroke="#d6a43c" stroke-width=".8"/>`,
    }),
    crown: (p) => ({
      wiggle: false,
      defs: { [`${p}-crown`]: linear(`${p}-crown`, [[0, "#fff0bf"], [.45, "#f2d38b"], [1, "#d6a43c"]]) },
      front: `<g transform="rotate(12 112 24)" stroke="#b98a2a" stroke-width="1.2" stroke-linejoin="round">
          <path d="M95 27L93 11L103 18L111 7L119 18L129 11L127 27Q111 31 95 27Z" fill="url(#${p}-crown)"/>
          <circle cx="93" cy="10.5" r="2.4" fill="#fff1c4"/><circle cx="111" cy="6.5" r="2.6" fill="#fff1c4"/><circle cx="129" cy="10.5" r="2.4" fill="#fff1c4"/>
          <circle cx="111" cy="22" r="2.9" fill="#8d6dff" stroke="#6a4ce0"/>
        </g>`,
    }),
    planet: (p) => ({
      wiggle: true,
      defs: { [`${p}-planet`]: radial(`${p}-planet`, [[0, "#e2d6ff"], [.55, "#9f84f7"], [1, "#6a4ce0"]], "36%", "30%", "80%") },
      front: `${clipBar("#8f78e0", "#d8ccff")}
        <g transform="rotate(-18 138 29)">
          <ellipse cx="138" cy="29" rx="17.5" ry="5.6" fill="none" stroke="#d6a43c" stroke-width="2.6"/>
          <circle cx="138" cy="29" r="9.5" fill="url(#${p}-planet)"/>
          <path d="M120.5 29A17.5 5.6 0 0 0 155.5 29" fill="none" stroke="#f2d38b" stroke-width="2.6" stroke-linecap="round"/>
        </g>
        ${shine(134.5, 24.5, 2.8, 1.6)}`,
    }),
    catears: (p) => ({
      wiggle: false,
      back: `<path d="M48 52C42 32 44 17 51 12C60 14 73 25 81 35Z" fill="url(#${p}-head)"/>
        <path d="M152 52C158 32 156 17 149 12C140 14 127 25 119 35Z" fill="url(#${p}-head)"/>
        <path d="M54 43C51 31 52 23 55.5 20.5C61 23.5 68.5 29.5 73 35Z" fill="#ffc1cc" opacity=".85"/>
        <path d="M146 43C149 31 148 23 144.5 20.5C139 23.5 131.5 29.5 127 35Z" fill="#ffc1cc" opacity=".85"/>`,
    }),
  };

  /* Face parts share one coordinate system; eyes sit inside the look group. */
  const FACE = (p) => ({
    "eyes-open": `<ellipse cx="78" cy="98" rx="8.2" ry="10" fill="url(#${p}-eye)"/>
            <ellipse cx="122" cy="98" rx="8.2" ry="10" fill="url(#${p}-eye)"/>
            <circle cx="81.2" cy="93.2" r="3.1" fill="#fff"/><circle cx="125.2" cy="93.2" r="3.1" fill="#fff"/>
            <circle cx="75.4" cy="103" r="1.4" fill="#fff" opacity=".8"/><circle cx="119.4" cy="103" r="1.4" fill="#fff" opacity=".8"/>`,
    "eyes-wide": `<ellipse cx="78" cy="97" rx="9.6" ry="12" fill="url(#${p}-eye)"/>
            <ellipse cx="122" cy="97" rx="9.6" ry="12" fill="url(#${p}-eye)"/>
            <circle cx="81.8" cy="91.6" r="3.6" fill="#fff"/><circle cx="125.8" cy="91.6" r="3.6" fill="#fff"/>
            <circle cx="75" cy="103" r="1.6" fill="#fff" opacity=".8"/><circle cx="119" cy="103" r="1.6" fill="#fff" opacity=".8"/>`,
    "eyes-happy": `<path d="M69 100q9-10 18 0M113 100q9-10 18 0" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`,
    "eyes-closed": `<path d="M69 98q9 7 18 0M113 98q9 7 18 0" fill="none" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"/>`,
    "eyes-laugh": `<path d="M71 91.5L84 98.5L71 105.5M129 91.5L116 98.5L129 105.5" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`,
    "eyes-heart": `<path d="${heart(78, 98, 9.5)}M${heart(122, 98, 9.5).slice(1)}" fill="url(#${p}-heart)" stroke="#d93d63" stroke-width="1"/>
            ${shine(73.5, 94, 2.6, 1.6, -35)}${shine(117.5, 94, 2.6, 1.6, -35)}`,
    "eyes-star": `<path d="${star(78, 98, 12, 5.4)}M${star(122, 98, 12, 5.4).slice(1)}" fill="url(#${p}-stareye)" stroke="#c08a1e" stroke-width="1.1" stroke-linejoin="round"/>
            ${shine(75, 93, 2.4, 1.4, -35)}${shine(119, 93, 2.4, 1.4, -35)}`,
    "eyes-wink": `<ellipse cx="78" cy="98" rx="8.2" ry="10" fill="url(#${p}-eye)"/>
            <circle cx="81.2" cy="93.2" r="3.1" fill="#fff"/><circle cx="75.4" cy="103" r="1.4" fill="#fff" opacity=".8"/>
            <path d="M113 100q9-10 18 0" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`,
    "eyes-teary": `<ellipse cx="78" cy="98" rx="8.6" ry="10.4" fill="url(#${p}-eye)"/>
            <ellipse cx="122" cy="98" rx="8.6" ry="10.4" fill="url(#${p}-eye)"/>
            <circle cx="81.4" cy="92.8" r="3.9" fill="#fff"/><circle cx="125.4" cy="92.8" r="3.9" fill="#fff"/>
            <circle cx="75" cy="102.6" r="2.2" fill="#fff" opacity=".9"/><circle cx="119" cy="102.6" r="2.2" fill="#fff" opacity=".9"/>
            <path d="M70.5 106.5q7.5 4.5 15 0M114.5 106.5q7.5 4.5 15 0" fill="none" stroke="#bfe3ff" stroke-width="2.2" stroke-linecap="round"/>`,
    "brows-worried": `<path d="M70 84.5l15-4.5M130 84.5l-15-4.5" fill="none" stroke="${BROW}" stroke-width="2.6" stroke-linecap="round"/>`,
    "brows-raised": `<path d="M69 80q8-6 16-2M131 80q-8-6-16-2" fill="none" stroke="${BROW}" stroke-width="2.6" stroke-linecap="round"/>`,
    "brows-determined": `<path d="M70 80.5l15 4.5M130 80.5l-15 4.5" fill="none" stroke="${BROW}" stroke-width="2.8" stroke-linecap="round"/>`,
    "brows-quizzical": `<path d="M69 79q8-6 16-2M115 84.5h15" fill="none" stroke="${BROW}" stroke-width="2.6" stroke-linecap="round"/>`,
    blush: `<ellipse cx="62" cy="113" rx="14" ry="9" fill="url(#${p}-blush)"/><ellipse cx="138" cy="113" rx="14" ry="9" fill="url(#${p}-blush)"/>`,
    "blush-strong": `<ellipse cx="62" cy="112" rx="18" ry="11.5" fill="url(#${p}-blushstrong)"/><ellipse cx="138" cy="112" rx="18" ry="11.5" fill="url(#${p}-blushstrong)"/>`,
    "mouth-smile": `<path d="M94 111.5q6 5.5 12 0" fill="none" stroke="${LIP}" stroke-width="2.6" stroke-linecap="round"/>`,
    "mouth-open": `<path d="M91.5 109.5q8.5 13 17 0q-8.5 2.6-17 0Z" fill="${MOUTH}" stroke="${MOUTH}" stroke-width="1.4" stroke-linejoin="round"/>
          <ellipse cx="100" cy="116.5" rx="4.6" ry="2.6" fill="${TONGUE}"/>`,
    "mouth-frown": `<path d="M94.5 116q5.5-4.6 11 0" fill="none" stroke="${LIP}" stroke-width="2.6" stroke-linecap="round"/>`,
    "mouth-o": `<ellipse cx="100" cy="113" rx="3.2" ry="3.8" fill="${MOUTH}"/>`,
    "mouth-laugh": `<path d="M88.5 108.5H111.5Q110 123.5 100 123.5T88.5 108.5Z" fill="${MOUTH}" stroke="${MOUTH}" stroke-width="1.4" stroke-linejoin="round"/>
          <path d="M92.5 119.5Q100 114 107.5 119.5Q104 123 100 123T92.5 119.5Z" fill="${TONGUE}"/>`,
    "mouth-wow": `<ellipse cx="100" cy="115" rx="5.4" ry="6.6" fill="${MOUTH}"/><ellipse cx="100" cy="119" rx="3.2" ry="1.8" fill="${TONGUE}"/>`,
    "mouth-wavy": `<path d="M90.5 114q2.4-3.2 4.75 0t4.75 0t4.75 0t4.75 0" fill="none" stroke="${LIP}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`,
    "mouth-cat": `<path d="M91.5 110.5q4.25 5 8.5 0q4.25 5 8.5 0" fill="none" stroke="${LIP}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`,
    "mouth-tongue": `<path d="M96.6 113.2v2.6a3.4 3.4 0 0 0 6.8 0v-2.6Z" fill="${TONGUE}" stroke="#d9656b" stroke-width="1"/>
          <path d="M93.5 111q6.5 5.5 13 0" fill="none" stroke="${LIP}" stroke-width="2.6" stroke-linecap="round"/>`,
    "mouth-pout": `<path d="M96 115.5q4-3.4 8 0" fill="none" stroke="${LIP}" stroke-width="2.6" stroke-linecap="round"/>`,
  });

  /* Extras: `head` extras move with the head; the rest float around Lico. */
  const EXTRAS = (p) => ({
    tears: { head: true, svg: `<path d="${drop(67, 116, 3.4)}M${drop(133, 116, 3.4).slice(1)}" fill="url(#${p}-tear)"/>` },
    sweat: { head: true, svg: `<path d="${drop(147, 62, 4.8)}" fill="url(#${p}-tear)"/>${shine(145.6, 61, 1.4, 2.4, 0)}` },
    thought: { svg: `<g fill="#b9a5ff"><circle cx="160" cy="62" r="3.4"/><circle cx="170" cy="50" r="4.4"/><circle cx="182" cy="36" r="5.6"/></g>` },
    zzz: { svg: `<path d="M150 42h9l-9 11h9M163 22h12l-12 14.5h12" fill="none" stroke="#9d8ae8" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>` },
    hearts: { svg: `<path d="${heart(162, 44, 6.5)}" fill="url(#${p}-heart)" transform="rotate(14 162 44)"/><path d="${heart(180, 24, 4.6)}" fill="#ffb3c4" transform="rotate(-10 180 24)"/>` },
    sparkles: { svg: `<g fill="#f2c75e"><path d="${sparkle(30, 42, 9)}"/><path d="${sparkle(170, 30, 7.5)}"/><path d="${sparkle(182, 70, 4.8)}"/><path d="${sparkle(20, 76, 4.2)}"/></g>` },
    confetti: { svg: `<g><rect x="24" y="30" width="7" height="12" rx="2" fill="#8d6dff" transform="rotate(-24 27.5 36)"/><rect x="164" y="18" width="7" height="12" rx="2" fill="#f2c75e" transform="rotate(28 167.5 24)"/><rect x="178" y="62" width="6" height="10" rx="2" fill="#ff9fb3" transform="rotate(-18 181 67)"/><rect x="12" y="78" width="6" height="10" rx="2" fill="#7fd1a8" transform="rotate(20 15 83)"/><circle cx="52" cy="14" r="3.4" fill="#f2c75e"/><circle cx="148" cy="8" r="3" fill="#8d6dff"/><circle cx="188" cy="40" r="2.6" fill="#b9a5ff"/><path d="${sparkle(38, 58, 5)}" fill="#f2c75e"/></g>` },
    question: { svg: `<path d="M158 36.5q0-10.5 11-10.5t11 9.5q0 6-7 9q-4 1.8-4 7" fill="none" stroke="#8d6dff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="169" cy="61" r="3.3" fill="#8d6dff"/>` },
    check: { svg: `<circle cx="165" cy="44" r="15" fill="url(#${p}-badge)" stroke="#c08a1e" stroke-width="1.2"/><path d="M157.5 44.5l5 5 9.5-10.5" fill="none" stroke="#fff" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>` },
    bubble: { svg: `<path d="M150 22h36a10 10 0 0 1 10 10v8a10 10 0 0 1-10 10h-24l-9 7 1.5-7h-4.5a10 10 0 0 1-10-10v-8a10 10 0 0 1 10-10Z" fill="#fff" stroke="#d9ceff" stroke-width="1.6" stroke-linejoin="round"/><g fill="#8d6dff"><circle cx="157" cy="36" r="3.2"/><circle cx="168" cy="36" r="3.2" opacity=".7"/><circle cx="179" cy="36" r="3.2" opacity=".45"/></g>` },
    waves: { svg: `<path d="M172 80q7 10 0 20M181 73q12 17 0 34" fill="none" stroke="#b9a5ff" stroke-width="3.2" stroke-linecap="round"/>` },
  });

  const wave = { l: "translate(-2 -10) rotate(24 84 130)", r: "translate(2 -10) rotate(-24 116 130)" };
  const raised = { l: "translate(-31 -21) rotate(78 69 131)", r: "translate(31 -21) rotate(-78 131 131)" };
  const tucked = { l: "translate(6 2) rotate(8 84 130)", r: "translate(-6 2) rotate(-8 116 130)" };

  const EXPRESSIONS = {
    neutral: { en: "Smile", zh: "微笑", face: ["eyes-open", "blush", "mouth-smile"] },
    happy: { en: "Happy", zh: "开心", face: ["eyes-happy", "blush", "mouth-open"], armL: wave.l, armR: wave.r },
    laugh: { en: "Laugh", zh: "大笑", face: ["eyes-laugh", "blush", "mouth-laugh"], head: "rotate(-4 100 150)" },
    hi: { en: "Hi", zh: "你好", face: ["eyes-happy", "blush", "mouth-open"], head: "rotate(-5 100 150)", armR: raised.r, behind: ["r"] },
    love: { en: "Love it", zh: "喜欢", face: ["eyes-heart", "blush-strong", "mouth-smile"], extras: ["hearts"] },
    starstruck: { en: "Can't wait", zh: "期待", face: ["eyes-star", "blush", "mouth-open"], extras: ["sparkles"] },
    wink: { en: "Wink", zh: "俏皮", face: ["eyes-wink", "blush", "mouth-tongue"], head: "rotate(-6 100 150)" },
    surprised: { en: "Surprised", zh: "惊讶", face: ["eyes-wide", "brows-raised", "blush", "mouth-wow"], head: "translate(0 -2)" },
    thinking: { en: "Thinking", zh: "思考", face: ["eyes-open", "blush", "mouth-o"], look: [4, -5], head: "rotate(5 100 150)", armR: "translate(-22 -12) rotate(-38 116 130)", extras: ["thought"] },
    confused: { en: "Confused", zh: "疑惑", face: ["eyes-open", "brows-quizzical", "blush", "mouth-wavy"], head: "rotate(-8 100 150)", extras: ["question"] },
    focused: { en: "On it", zh: "专注", face: ["eyes-open", "brows-determined", "blush", "mouth-smile"] },
    speaking: { en: "Typing", zh: "输入中", face: ["eyes-open", "blush", "mouth-open"], extras: ["bubble"] },
    listening: { en: "Listening", zh: "倾听", face: ["eyes-open", "blush", "mouth-smile"], head: "rotate(-9 100 150)", armR: "translate(2 -3) rotate(-6 116 130)", extras: ["waves"] },
    approve: { en: "Done", zh: "搞定", face: ["eyes-happy", "blush", "mouth-smile"], extras: ["check"] },
    celebrate: { en: "Celebrate", zh: "庆祝", face: ["eyes-laugh", "blush", "mouth-laugh"], armL: raised.l, armR: raised.r, behind: ["l", "r"], extras: ["confetti"] },
    shy: { en: "Shy", zh: "害羞", face: ["eyes-happy", "blush-strong", "mouth-cat"], head: "rotate(6 100 150)", armL: tucked.l, armR: tucked.r },
    sweat: { en: "Awkward", zh: "尴尬", face: ["eyes-open", "blush", "mouth-wavy"], look: [-3, 0], extras: ["sweat"] },
    sorry: { en: "Sorry", zh: "抱歉", face: ["eyes-open", "brows-worried", "blush", "mouth-frown"], look: [-1, 3], head: "translate(0 4) rotate(5 100 150)", armL: tucked.l, armR: tucked.r },
    sad: { en: "Sad", zh: "难过", face: ["eyes-teary", "brows-worried", "blush", "mouth-frown"], head: "translate(0 4)", extras: ["tears"] },
    pout: { en: "Hmph", zh: "哼", face: ["eyes-open", "brows-determined", "blush-strong", "mouth-pout"], look: [-3, 1], head: "rotate(-6 100 150)" },
    sleepy: { en: "Sleepy", zh: "困了", face: ["eyes-closed", "blush", "mouth-o"], head: "rotate(7 100 150)", extras: ["zzz"] },
  };

  const LIVE_FACE = ["eyes-open", "eyes-happy", "eyes-closed", "brows-worried", "blush", "mouth-smile", "mouth-open", "mouth-frown", "mouth-o"];
  const LIVE_CLASS = { "brows-worried": "lico-brows" };
  const liveClass = (name) => LIVE_CLASS[name] ?? (name.startsWith("mouth-") ? `lico-mouth lico-${name}` : `lico-${name}`);

  const inner = (p, options = {}) => {
    const { compact = false, flavor = "vanilla", accessory = "star", expression = null, glow = false, shadow = true } = options;
    const live = !expression;
    const exp = live ? {} : EXPRESSIONS[expression] ?? EXPRESSIONS.neutral;
    const [c0, c1, c2, c3] = FLAVORS[flavor] ?? FLAVORS.vanilla;
    const acc = (ACCESSORIES[accessory] ?? ACCESSORIES.star)(p, { compact });
    const face = FACE(p);
    const extras = EXTRAS(p);
    const cls = (name) => (live ? ` class="${name}"` : "");
    const at = (transform) => (transform ? ` transform="${transform}"` : "");
    const part = (name) => (live ? `<g class="${liveClass(name)}">${face[name]}</g>` : `<g>${face[name]}</g>`);

    const names = live ? LIVE_FACE : exp.face;
    const eyes = names.filter((name) => name.startsWith("eyes-")).map(part).join("\n          ");
    const rest = names.filter((name) => !name.startsWith("eyes-")).map(part).join("\n        ");
    const extraNames = live ? ["thought", "zzz"] : exp.extras ?? [];
    const headExtras = extraNames.filter((name) => extras[name].head).map((name) => extras[name].svg).join("");
    const floatExtras = extraNames
      .filter((name) => !extras[name].head)
      .map((name) => (live ? `<g class="lico-${name}">${extras[name].svg}</g>` : extras[name].svg))
      .join("\n  ");
    const arm = (side, cx, rot, pose) => `<g${cls(`lico-arm lico-arm-${side}`)}${at(pose)}>
      ${pose ? "" : `<ellipse cx="${side === "l" ? 72 : 128}" cy="139" rx="20" ry="7.5" fill="url(#${p}-armshadow)"/>`}
      <ellipse cx="${cx}" cy="131" rx="20" ry="12.5" fill="url(#${p}-arm)" transform="rotate(${rot} ${cx} 131)"/>
    </g>`;
    const behind = exp.behind ?? [];
    const arms = {
      l: arm("l", 69, -8, exp.armL),
      r: arm("r", 131, 8, exp.armR),
    };
    const armsBehind = behind.map((side) => arms[side]).join("\n    ");
    const armsFront = ["l", "r"].filter((side) => !behind.includes(side)).map((side) => arms[side]).join("\n    ");
    const accessoryFront = acc.front ? `<g${cls(acc.wiggle ? "lico-clip" : "lico-acc")}>
        ${acc.front}
      </g>` : "";

    const body = `
  ${live || glow ? `<circle${cls("lico-halo")} cx="100" cy="98" r="100" fill="url(#${p}-halo)"/>` : ""}
  ${shadow ? `<ellipse${cls("lico-shadow")} cx="100" cy="212" rx="64" ry="9" fill="url(#${p}-ground)"/>` : ""}

  <g${cls("lico-body")}>
    <g${cls("lico-head")}${at(exp.head)}>
      ${acc.back ?? ""}
      <circle cx="100" cy="90" r="66" fill="url(#${p}-head)"/>
      <ellipse cx="100" cy="150" rx="78" ry="34" fill="url(#${p}-occlusion)" clip-path="url(#${p}-headclip)"/>
      <circle cx="100" cy="90" r="64.8" fill="none" stroke="url(#${p}-rimlight)" stroke-width="2.6"${live ? ' class="lico-rimlight"' : ` opacity="${glow ? 1 : .55}"`}/>
      <ellipse cx="76" cy="50" rx="24" ry="14" fill="url(#${p}-highlight)" transform="rotate(-28 76 50)"/>

      <g${cls("lico-face")}>
        <g${cls("lico-look")}${at(exp.look && `translate(${exp.look[0]} ${exp.look[1]})`)}>
          ${eyes}
        </g>
        ${rest}
      </g>
      ${headExtras}
      ${accessoryFront}
    </g>

    ${armsBehind}
    <g${cls("lico-cup")}>
      <path d="${CUP}" fill="url(#${p}-cup)"/>
      ${compact ? "" : `<g clip-path="url(#${p}-cupclip)" fill="none" stroke-linecap="round">
        <path d="${waffle()}" stroke="#b9854f" stroke-width="3.2" opacity=".35" transform="translate(0 1.4)"/>
        <path d="${waffle()}" stroke="#f0d0a2" stroke-width="2.8" opacity=".9"/>
      </g>`}
      <path d="${CUP}" fill="url(#${p}-cupside)"/>
      <rect x="30" y="121" width="140" height="27" rx="13.5" fill="url(#${p}-rim)"/>
      <path d="M44 126.5h112" stroke="#fbead0" stroke-width="3" stroke-linecap="round" opacity=".9"/>
      <ellipse cx="100" cy="150" rx="66" ry="7" fill="url(#${p}-rimshadow)" clip-path="url(#${p}-cupclip)"/>
    </g>

    ${armsFront}
  </g>

  ${floatExtras}`;

    const defs = {
      [`${p}-head`]: radial(`${p}-head`, [[0, c0], [.55, c1], [1, c2]]),
      [`${p}-arm`]: radial(`${p}-arm`, [[0, c0], [.6, c1], [1, c2]], "40%", "28%", "85%"),
      [`${p}-occlusion`]: soft(`${p}-occlusion`, c3, .5, .15),
      [`${p}-highlight`]: soft(`${p}-highlight`, "#ffffff", .95, .3),
      [`${p}-blush`]: soft(`${p}-blush`, "#ffadb5", .95, .25),
      [`${p}-blushstrong`]: soft(`${p}-blushstrong`, "#ff9aa8", 1, .35),
      [`${p}-ground`]: soft(`${p}-ground`, "#2a2140", .24, .2),
      [`${p}-armshadow`]: soft(`${p}-armshadow`, "#6d4a2a", .3, .2),
      [`${p}-rimshadow`]: soft(`${p}-rimshadow`, "#8a5a33", .32, .2),
      [`${p}-rim`]: linear(`${p}-rim`, [[0, "#f3dcb8"], [.55, "#e6c595"], [1, "#d3a877"]]),
      [`${p}-cup`]: linear(`${p}-cup`, [[0, "#e2bb8b"], [1, "#cf9f6c"]]),
      [`${p}-cupside`]: linear(`${p}-cupside`, [[0, "#8a5a33", .28], [.22, "#8a5a33", 0], [.75, "#8a5a33", 0], [1, "#8a5a33", .32]], [0, 0, 1, 0]),
      [`${p}-eye`]: radial(`${p}-eye`, [[0, "#3b4580"], [.7, "#1a1f3f"], [1, "#11142b"]], "42%", "34%", "75%"),
      [`${p}-heart`]: linear(`${p}-heart`, [[0, "#ff9db3"], [1, "#ef4f72"]]),
      [`${p}-stareye`]: linear(`${p}-stareye`, [[0, "#fff1c4"], [.5, "#f2d38b"], [1, "#d6a43c"]], [0, 0, 1, 1]),
      [`${p}-badge`]: linear(`${p}-badge`, [[0, "#f6dc9c"], [1, "#d6a43c"]]),
      [`${p}-tear`]: linear(`${p}-tear`, [[0, "#e3f3ff"], [1, "#8cc6f5"]]),
      [`${p}-halo`]: `<radialGradient id="${p}-halo" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#d9ccff" stop-opacity=".55"/><stop offset=".55" stop-color="#b9a3ff" stop-opacity=".18"/><stop offset="1" stop-color="#b9a3ff" stop-opacity="0"/></radialGradient>`,
      [`${p}-rimlight`]: linear(`${p}-rimlight`, [[0, "#c9b8ff", 0], [.55, "#c9b8ff", 0], [1, "#b8a2ff", .75]], [0, 0, 1, 1]),
      [`${p}-cupclip`]: `<clipPath id="${p}-cupclip"><path d="${CUP}"/></clipPath>`,
      [`${p}-headclip`]: `<clipPath id="${p}-headclip"><circle cx="100" cy="90" r="66"/></clipPath>`,
      ...acc.defs,
    };
    const used = Object.entries(defs).filter(([id]) => body.includes(`url(#${id})`)).map(([, markup]) => markup);
    return `
  <defs>
    ${used.join("\n    ")}
  </defs>${body}`;
  };

  const template = (p, options = {}) =>
    options.expression
      ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 220" width="200" height="220" role="img" aria-label="Lico">${inner(p, options)}\n</svg>`
      : `<svg class="lico-svg" viewBox="0 0 200 220" role="img" aria-label="Lico">${inner(p, options)}\n</svg>`;

  let count = 0;
  const mount = (element) => {
    count += 1;
    element.classList.add("lico");
    if (!element.dataset.mood) element.dataset.mood = "neutral";
    element.innerHTML = template(`lico${count}`, {
      compact: element.hasAttribute("data-compact"),
      flavor: element.dataset.flavor,
      accessory: element.dataset.accessory,
    });
    return element;
  };

  const lookers = new Set();
  let frame = 0;
  let pointer = null;
  const render = () => {
    frame = 0;
    for (const element of lookers) {
      const svg = element.querySelector(".lico-svg");
      if (!svg) continue;
      if (!pointer || document.body.classList.contains("motion-paused")) {
        svg.style.setProperty("--lx", "0");
        svg.style.setProperty("--ly", "0");
        continue;
      }
      const rect = svg.getBoundingClientRect();
      const dx = Math.max(-1, Math.min(1, (pointer.x - (rect.left + rect.width / 2)) / 360));
      const dy = Math.max(-1, Math.min(1, (pointer.y - (rect.top + rect.height * 0.45)) / 360));
      svg.style.setProperty("--lx", (dx * 4.5).toFixed(2));
      svg.style.setProperty("--ly", (dy * 3.5).toFixed(2));
    }
  };

  const api = { mount, template, MOODS, FLAVORS, ACCESSORIES, EXPRESSIONS };

  if (typeof window !== "undefined") {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    window.addEventListener("pointermove", (event) => {
      if (reduced.matches) return;
      pointer = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(render);
    }, { passive: true });
    document.addEventListener("pointerleave", () => {
      pointer = null;
      render();
    });
    const init = () => {
      for (const element of document.querySelectorAll("[data-lico]")) {
        mount(element);
        if (element.hasAttribute("data-look")) lookers.add(element);
      }
    };
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
    else init();
    window.Lico = api;
  }
  if (typeof module !== "undefined") module.exports = api;
})();
