import type { FC } from 'react';

interface ReturnsIconProps {
  className?: string;
}

const ReturnsIcon: FC<ReturnsIconProps> = ({ className }) => {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="10" y="18" width="28" height="14" rx="4" fill="#34D399"/>
      <path d="M24 32c4 0 8-3 8-8s-4-8-8-8-8 3-8 8" stroke="#fff" strokeWidth="2"/>
      <path d="M16 24l-4 4 4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default ReturnsIcon;