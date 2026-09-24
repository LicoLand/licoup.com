# Website assets

- `licoup-mark.svg` is the LicoUp mark: the Lico mascot rendered by the
  character template in `/lico.js`. It is the transparent master for
  navigation, footers, guide heroes and the share card.
- The root `favicon.svg` is a compact Lico on a rounded night tile.
  `apple-touch-icon.png`, `icon-192.png` and `icon-512.png` are PNG renders
  of that favicon for platforms that need raster icons.
- `og-card.png` is the 1200×630 social preview card, rendered from the mark and
  the site's display type.
- `fonts/bricolage-grotesque.woff2` is Bricolage Grotesque, sourced from Google
  Fonts. Its SIL Open Font License is in `fonts/OFL-Bricolage-Grotesque.txt`.
- `fonts/noto-sans-sc.woff2` is a Google Fonts Noto Sans SC subset containing the
  Chinese and full-width punctuation characters used by this site. Its SIL Open
  Font License is in `fonts/OFL-Noto-Sans-SC.txt`. If Chinese copy adds characters,
  refresh the subset from the font's official distribution.

All served assets are local to this site. The Lico client's avatar and
expression preset pack, its manifest and the export/render pipeline live in
the LicoUp client repository; this site keeps only the assets it renders.
Design explorations, reference images and review screenshots are development
material and are not published.
