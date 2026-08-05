export const gridPattern = `
  background-image: 
    linear-gradient(rgba(20, 19, 16, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(20, 19, 16, 0.08) 1px, transparent 1px);
  background-size: 24px 24px;
`;

export const gridPatternDark = `
  background-image: 
    linear-gradient(rgba(242, 236, 222, 0.12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(242, 236, 222, 0.12) 1px, transparent 1px);
  background-size: 24px 24px;
`;

export const getStickerRotation = (index: number, total: number): number => {
  const baseRotation = -8;
  const step = 16 / Math.max(total - 1, 1);
  return baseRotation + index * step;
};

export const getRandomRotation = (seed: number): number => {
  const random = Math.sin(seed * 12345.6789) * 10000;
  return (random - Math.floor(random)) * 16 - 8;
};

export const accentColors = [
  { name: 'teal', value: '#3CBAAE', textColor: '#141310' },
  { name: 'yellow', value: '#F2C94C', textColor: '#141310' },
  { name: 'orange', value: '#EF7B3C', textColor: '#F2ECDE' },
  { name: 'pink', value: '#EF4B82', textColor: '#F2ECDE' },
  { name: 'green', value: '#A3D65C', textColor: '#141310' },
] as const;

export type AccentColor = (typeof accentColors)[number];

export const badgeShapes = ['circle', 'rotated-rect', 'notched-seal', 'scalloped-stamp'] as const;

export type BadgeShape = (typeof badgeShapes)[number];
