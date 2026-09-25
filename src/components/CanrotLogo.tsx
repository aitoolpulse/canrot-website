import React from 'react';

interface CanrotLogoProps {
  variant?: 'badge' | 'wordmark' | 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const CanrotLogo: React.FC<CanrotLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
}) => {
  // Dimension tokens
  const badgeSizes = {
    sm: 'h-7 w-7 rounded-lg text-[9px]',
    md: 'h-8 w-8 rounded-lg text-[10px]',
    lg: 'h-11 w-11 rounded-xl text-xs',
    xl: 'h-16 w-16 rounded-2xl text-sm',
  };

  const wordmarkSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl',
  };

  // The official chic minimalist typographic badge matching the user's design
  const BadgeIcon = (
    <div
      className={`flex items-center justify-center font-bold bg-[#f4f3ef] text-[#18181b] shadow-sm transition-transform group-hover:scale-105 select-none shrink-0 ${badgeSizes[size]}`}
      style={{
        fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
        letterSpacing: '-0.06em',
      }}
    >
      <span className="font-extrabold tracking-tighter lowercase leading-none">canrot</span>
    </div>
  );

  if (variant === 'badge' || variant === 'icon') {
    return <div className={`inline-flex items-center ${className}`}>{BadgeIcon}</div>;
  }

  if (variant === 'wordmark') {
    return (
      <span
        className={`font-extrabold tracking-tight lowercase text-white transition-colors group-hover:text-pink-400 ${wordmarkSizes[size]} ${className}`}
        style={{
          fontFamily: "'Plus Jakarta Sans', 'Syne', system-ui, sans-serif",
          letterSpacing: '-0.04em',
        }}
      >
        canrot
      </span>
    );
  }

  // Full brand lockup (Badge + chic typographic wordmark)
  return (
    <div className={`group flex items-center gap-2.5 text-left focus-visible:outline-none ${className}`}>
      {BadgeIcon}
      <span
        className={`font-extrabold tracking-tight lowercase text-white transition-colors group-hover:text-pink-400 ${wordmarkSizes[size]}`}
        style={{
          fontFamily: "'Plus Jakarta Sans', 'Syne', system-ui, sans-serif",
          letterSpacing: '-0.05em',
        }}
      >
        canrot
      </span>
    </div>
  );
};
