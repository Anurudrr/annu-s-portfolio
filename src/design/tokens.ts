export const designTokens = {
  colors: {
    // Neutrals - EXACT from reference
    base: '#141310', // Near-black - Hero bg, nav, footer, card container
    paper: '#F2ECDE', // Warm off-white/cream - Primary light text, hero bg panels
    panel: '#EDE5D6', // Cream beige - Grid-textured panels

    // Accent colors (5 rotating accents) - EXACT from reference
    teal: '#3CBAAE', // Teal
    yellow: '#F2C94C', // Mustard yellow
    orange: '#EF7B3C', // Burnt orange
    pink: '#EF4B82', // Hot pink/magenta
    green: '#A3D65C', // Lime/sage green

    // Presentation only
    canvas: '#8C8C8C', // Neutral grey (outer canvas only)
  },

  typography: {
    // Display: heavy, condensed, uppercase grotesk, tight letter-spacing, high x-height
    display: {
      fontFamily: '"Clash Display", "Anton", "Bebas Neue", "Owners Wide", Impact, sans-serif',
      fontWeight: 700,
      letterSpacing: '0',
      textTransform: 'uppercase',
    },
    displayCondensed: {
      fontFamily: '"Clash Display", "Anton", "Bebas Neue", "Owners Wide", Impact, sans-serif',
      fontWeight: 700,
      letterSpacing: '0',
      textTransform: 'uppercase',
    },
    // Body: clean neutral grotesk sans, regular weight, small size (13-15px)
    body: {
      fontFamily: '"General Sans", "Neue Haas Grotesk", Inter, system-ui, sans-serif',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: 1.6,
    },
    bodySmall: {
      fontFamily: '"General Sans", "Neue Haas Grotesk", Inter, system-ui, sans-serif',
      fontWeight: 400,
      fontSize: '13px',
      lineHeight: 1.5,
    },
    // Badge: same family as display but smaller and bolder, all caps, playful kerning
    badge: {
      fontFamily: '"Clash Display", "Anton", "Bebas Neue", Impact, sans-serif',
      fontWeight: 700,
      fontSize: '12px',
      letterSpacing: '0.02em',
      textTransform: 'uppercase',
    },
    // Nav: letter-spaced and uppercase
    nav: {
      fontFamily: '"General Sans", "Neue Haas Grotesk", Inter, system-ui, sans-serif',
      fontWeight: 600,
      fontSize: '12px',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
    },
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px',
  },

  borderRadius: {
    card: '24px',
    cardLarge: '32px',
    badge: '6px',
    badgeCircle: '50%',
    pill: '9999px',
    // Asymmetric: sharp left, pill right
    asymmetric: '0 32px 32px 0',
  },

  shadows: {
    sticker: '4px 4px 0 rgba(20, 19, 16, 0.84)',
    stickerHover: '6px 6px 0 rgba(20, 19, 16, 0.84)',
    card: '0 22px 70px rgba(20, 19, 16, 0.18)',
    cardHover: '0 30px 90px rgba(20, 19, 16, 0.22)',
  },

  transitions: {
    fast: '150ms ease',
    normal: '250ms ease',
    slow: '400ms ease',
  },

  zIndex: {
    sticker: 4,
    nav: 10,
    modal: 100,
  },
} as const;

export type DesignTokens = typeof designTokens;
