/**
 * @file RedberryLogo.tsx
 * @description Redberry-ის ოფიციალური ბრენდის ლოგო და წრიული ვარსკვლავის ბეჭედი (Badge).
 */

import React from 'react';

interface Props {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * REDBERRY-ის ტექსტური ლოგო გეომეტრიული ვარსკვლავით
 */
export const RedberryLogo: React.FC<Props> = ({ className = '', size = 'md' }) => {
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-3xl' : 'text-2xl';
  const starSize = size === 'sm' ? 14 : size === 'lg' ? 24 : 18;

  return (
    <div className={`inline-flex items-center gap-1.5 select-none ${className}`}>
      <span className={`font-black tracking-wider text-[#F93B1D] font-sans ${textSize}`}>
        REDBERRY
      </span>
      <svg
        width={starSize}
        height={starSize}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#F93B1D]"
      >
        <path
          d="M12 0L14.7 9.3L24 12L14.7 14.7L12 24L9.3 14.7L0 12L9.3 9.3L12 0Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
};

/**
 * წრიული წითელი ბეჭედი რეზიუმეს ქვედა მარცხენა კუთხისთვის
 */
export const RedberryBadge: React.FC<{ size?: number; className?: string }> = ({
  size = 42,
  className = '',
}) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`rounded-full bg-[#F93B1D] flex items-center justify-center text-white shadow-sm ${className}`}
    >
      <svg
        width={size * 0.55}
        height={size * 0.55}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 0L14.7 9.3L24 12L14.7 14.7L12 24L9.3 14.7L0 12L9.3 9.3L12 0Z" />
      </svg>
    </div>
  );
};
