export interface FestivalData {
  gradientText: string;
  gradientBg: string;
  glow: string;
  text: string;
}

export type FestivalType = 'Diwali' | 'Holi' | 'Onam';

export const festivals: Record<FestivalType, FestivalData> = {
  Diwali: {
    gradientText: 'from-orange-500 to-amber-500',
    gradientBg: 'from-orange-500 to-yellow-400',
    glow: 'rgba(249, 115, 22, 0.15)',
    text: 'The Festival of Lights'
  },
  Holi: {
    gradientText: 'from-rose-500 to-fuchsia-500',
    gradientBg: 'from-pink-500 to-purple-500',
    glow: 'rgba(244, 63, 94, 0.15)',
    text: 'The Festival of Colors'
  },
  Onam: {
    gradientText: 'from-emerald-500 to-green-500',
    gradientBg: 'from-emerald-500 to-green-400',
    glow: 'rgba(16, 185, 129, 0.15)',
    text: 'The Harvest Festival'
  }
};
