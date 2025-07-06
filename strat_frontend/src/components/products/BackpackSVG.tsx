import type { FC } from 'react';

interface BackpackSVGProps {
  className?: string;
}

const BackpackSVG: FC<BackpackSVGProps> = ({ className }) => {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      <rect x="16" y="20" width="32" height="32" rx="12" fill="#34D399"/>
      <rect x="24" y="36" width="16" height="12" rx="4" fill="#fff" opacity="0.7"/>
      <path d="M24 20v-4a8 8 0 0 1 16 0v4" stroke="#374151" strokeWidth="2"/>
    </svg>
  );
};

export default BackpackSVG;
