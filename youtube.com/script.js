/*
--> CSS
*/

// Minimal seed — YouTube ships a capable native dark theme, so this only declares
// the unified palette for consistency with the other userscripts. Extend as needed.
const theme = `
/* Unified palette — sub.ryuo.to "OLED Black" (change --accent to re-brand) */
:root {
  --bg:   #000000;
  --bg2:  #0c0c0e;
  --bg3:  #17171b;
  --fg:   #f2f2f3;
  --dim:  #8a8a92;
  --accent:      #3b82f6;
  --accent-ink:  #ffffff;
  --accent-soft: rgba(59, 130, 246, 0.16);
}
`;

// eslint-disable-next-line
GM_addStyle(theme);
