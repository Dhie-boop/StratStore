import type { FC } from 'react';

interface HeadphonesSVGProps {
  className?: string;
}

const HeadphonesSVG: FC<HeadphonesSVGProps> = ({ className }) => {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className}>
      <rect x="16" y="36" width="8" height="16" rx="4" fill="#60A5FA"/>
      <rect x="40" y="36" width="8" height="16" rx="4" fill="#60A5FA"/>
      <path d="M16 36a16 16 0 0 1 32 0" stroke="#374151" strokeWidth="4"/>
    </svg>
  );
};

export default HeadphonesSVG;
