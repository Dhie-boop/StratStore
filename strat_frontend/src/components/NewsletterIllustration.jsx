export default function NewsletterIllustration({ className }) {
  return (
    <svg viewBox="0 0 400 200" fill="none" className={className}>
      {/* ...existing code... */}
      <rect x="40" y="60" width="320" height="80" rx="24" fill="#F3F4F6"/>
      <rect x="60" y="80" width="280" height="40" rx="12" fill="#60A5FA"/>
      <path d="M60 80l140 40 140-40" stroke="#fff" strokeWidth="4"/>
      <circle cx="340" cy="100" r="12" fill="#FBBF24"/>
      <circle cx="60" cy="100" r="12" fill="#34D399"/>
      {/* ...existing code... */}
    </svg>
  );
}