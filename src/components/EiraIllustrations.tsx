import React, { useState } from 'react';

/**
 * Circular tropical landscape symbol + custom EIRA wordmark inspired directly
 * by /public/assets/aistudio/EIRA_logo_83e64182.pdf (reversed E and leaf-crossbar A).
 */
export const EiraLogoMark: React.FC<{
  color?: string;
  showCrest?: boolean;
  className?: string;
}> = ({ color = '#252B2D', showCrest = true, className = '' }) => {
  return (
    <span className={`inline-flex items-center gap-3 whitespace-nowrap shrink-0 ${className}`}>
      {showCrest && (
        <svg
          width="30"
          height="30"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="shrink-0"
        >
          <circle cx="18" cy="18" r="16.5" stroke={color} strokeWidth="1.15" strokeOpacity="0.85" />
          <path
            d="M13.5 16.2C13.9 13.7 16.0 11.8 18.6 11.8C21.1 11.8 23.1 13.6 23.6 16.0"
            stroke={color}
            strokeWidth="1.15"
            strokeLinecap="round"
          />
          <path
            d="M5.5 22.2C8.8 20.6 11.5 16.5 14.0 16.2C15.8 16.0 17.2 17.8 18.5 18.2C19.8 17.5 20.8 16.7 22.0 16.8C24.2 17.0 26.8 20.5 30.5 21.8"
            stroke={color}
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.4 24.4C17.8 22.8 18.3 20.9 18.3 19.2"
            stroke={color}
            strokeWidth="1.15"
            strokeLinecap="round"
          />
          <path
            d="M18.3 19.2C16.7 18.5 15.4 19.2 14.8 20.1M18.3 19.2C19.9 18.5 21.2 19.2 21.8 20.1M18.3 19.2C16.9 17.8 15.8 17.8 15.1 18.3M18.3 19.2C19.7 17.8 20.8 17.8 21.5 18.3"
            stroke={color}
            strokeWidth="1.05"
            strokeLinecap="round"
          />
          <path
            d="M11.5 25.0C14.8 23.8 17.6 24.1 20.5 24.8C22.6 25.3 24.5 25.1 26.2 24.3"
            stroke={color}
            strokeWidth="1.15"
            strokeLinecap="round"
          />
        </svg>
      )}
      <svg
        width="86"
        height="24"
        viewBox="0 0 132 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M5 4.5H25.5V31.5H5M12.5 17.8H24.5"
          stroke={color}
          strokeWidth="2.4"
          strokeLinecap="square"
        />
        <path d="M23 4.5H27.5M23 31.5H27.5" stroke={color} strokeWidth="1.6" />
        <path d="M48 4.5V31.5" stroke={color} strokeWidth="3.2" />
        <path d="M44.8 4.5H51.2M44.8 31.5H51.2" stroke={color} strokeWidth="1.5" />
        <path d="M70 4.5V31.5" stroke={color} strokeWidth="3.1" />
        <path
          d="M67 4.5H78.5C84.5 4.5 88.5 7.4 88.5 12.0C88.5 16.4 84.4 19.2 78.0 19.4H70.5"
          stroke={color}
          strokeWidth="2.2"
        />
        <path
          d="M77.5 19.4L88.5 31.5"
          stroke={color}
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M103 31.5L115.5 5L128 31.5"
          stroke={color}
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M108.5 24.5C111.2 20.6 115.2 19.2 119.5 19.5C116.5 22.2 112.8 23.6 108.5 24.5Z"
          fill={color}
        />
      </svg>
      <span className="sr-only">EIRA</span>
    </span>
  );
};

/**
 * Large subtle coastal landscape line-art illustration
 * used in the Welcome, Dining, and Footer sections.
 */
export const CoastalLandscapeLineArt: React.FC<{
  strokeColor?: string;
  className?: string;
}> = ({ strokeColor = '#252B2D', className = '' }) => {
  return (
    <svg
      viewBox="0 0 640 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    >
      <path
        d="M262 128C262 94.8629 288.863 68 322 68C355.137 68 382 94.8629 382 128C382 135.2 380.7 142.1 378.4 148.5"
        stroke={strokeColor}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M68 206C116 184 152 158 188 122C206 104 220 96 234 96C250 96 272 118 302 136C318 124 334 114 348 114C364 114 384 138 412 152C446 169 488 194 568 208"
        stroke={strokeColor}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M302 224C311 206 318 184 319 156"
        stroke={strokeColor}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M319 156C301 148 284 156 274 170M319 156C337 148 354 156 364 170M319 156C298 138 282 140 272 148M319 156C340 138 356 140 366 148M319 156C310 134 298 128 288 131M319 156C328 134 340 128 350 131"
        stroke={strokeColor}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M214 236C256 216 306 218 356 231C398 242 438 238 474 220"
        stroke={strokeColor}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M140 254C210 242 284 246 360 254C424 260 486 254 532 244"
        stroke={strokeColor}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeDasharray="4 6"
      />
    </svg>
  );
};

/**
 * Resilient Image component that enforces Zero-Broken-Image Policy
 * with referrerPolicy="no-referrer" and an architectural coastal fallback.
 */
export const ResilientImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}> = ({ src, alt, className = '', imgClassName = '', priority = false }) => {
  const [hasError, setHasError] = useState(false);
  const positionClass = /\b(absolute|fixed|sticky)\b/.test(className) ? '' : 'relative';

  if (hasError) {
    return (
      <div
        className={`${positionClass} flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#D7E4E1] via-[#F4F6F3] to-[#80B8B4]/40 text-[#252B2D] p-6 ${className}`}
        role="img"
        aria-label={alt}
      >
        <CoastalLandscapeLineArt strokeColor="#252B2D" className="w-48 h-24 opacity-40 mb-2" />
        <span className="font-serif-editorial italic text-sm text-[#252B2D]/75 text-center">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <div className={`${positionClass} overflow-hidden bg-[#D7E4E1]/50 ${className}`}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading={priority ? 'eager' : 'lazy'}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover ${imgClassName}`}
      />
    </div>
  );
};
