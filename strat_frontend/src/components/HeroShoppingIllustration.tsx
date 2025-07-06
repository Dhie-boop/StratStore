import type { FC } from 'react';

interface HeroShoppingIllustrationProps {
  className?: string;
}

const HeroShoppingIllustration: FC<HeroShoppingIllustrationProps> = ({ className }) => {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Background and device screens */}
      <rect x="30" y="80" width="340" height="180" rx="24" fill="#F3F4F6"/>
      <rect x="60" y="110" width="120" height="80" rx="16" fill="#60A5FA"/>
      <rect x="220" y="120" width="100" height="60" rx="12" fill="#FBBF24"/>
      <circle cx="110" cy="200" r="24" fill="#34D399"/>
      <circle cx="270" cy="190" r="20" fill="#F472B6"/>
      <ellipse cx="200" cy="250" rx="60" ry="12" fill="#E5E7EB"/>
      {/* Devices and happy shoppers */}
      <circle cx="90" cy="140" r="18" fill="#fff"/>
      <rect x="80" y="155" width="20" height="30" rx="6" fill="#fff"/>
      <circle cx="250" cy="150" r="16" fill="#fff"/>
      <rect x="240" y="162" width="20" height="28" rx="6" fill="#fff"/>
    </svg>
  );
};

export default HeroShoppingIllustration;