import type { FC } from 'react';

interface SmartwatchSVGProps {
  className?: string;
}

const SmartwatchSVG: FC<SmartwatchSVGProps> = ({ className }) => {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      <rect x="20" y="20" width="24" height="24" rx="8" fill="#FBBF24"/>
      <rect x="28" y="8" width="8" height="12" rx="4" fill="#F472B6"/>
      <rect x="28" y="44" width="8" height="12" rx="4" fill="#F472B6"/>
      <circle cx="32" cy="32" r="6" fill="#fff"/>
    </svg>
  );
};

export default SmartwatchSVG;
