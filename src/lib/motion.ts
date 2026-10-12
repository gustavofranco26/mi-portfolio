export const EASE_SOFT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const REVEAL_DURATION = 0.6;
const REVEAL_OFFSET = 24;

export const STAGGER = 0.1;

export function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: REVEAL_OFFSET },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: { duration: REVEAL_DURATION, delay, ease: EASE_SOFT },
    },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.25, ease: EASE_SOFT },
  };
}
