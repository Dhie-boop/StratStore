import type { FC } from 'react';

interface PaymentIconProps {
  className?: string;
}

const PaymentIcon: FC<PaymentIconProps> = ({ className }) => {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="8" y="16" width="32" height="20" rx="4" fill="#F472B6"/>
      <rect x="14" y="24" width="20" height="6" rx="2" fill="#fff" opacity="0.7"/>
      <circle cx="24" cy="26" r="2" fill="#FBBF24"/>
      <path d="M24 16v-4a4 4 0 0 1 8 0v4" stroke="#60A5FA" strokeWidth="2"/>
    </svg>
  );
};

export default PaymentIcon;