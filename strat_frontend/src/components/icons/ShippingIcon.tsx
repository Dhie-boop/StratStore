import type { FC } from 'react';

interface ShippingIconProps {
  className?: string;
}

const ShippingIcon: FC<ShippingIconProps> = ({ className }) => {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="6" y="18" width="28" height="14" rx="4" fill="#60A5FA"/>
      <rect x="34" y="22" width="8" height="10" rx="2" fill="#FBBF24"/>
      <circle cx="14" cy="36" r="3" fill="#6EE7B7"/>
      <circle cx="36" cy="36" r="3" fill="#6EE7B7"/>
    </svg>
  );
};

export default ShippingIcon;