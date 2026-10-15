import React, { useState } from 'react';

interface RspLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  interactiveSound?: boolean;
}

export const playBellSound = () => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    
    // Fundamental bell frequencies
    const fundamental = 880; // A5
    const partials = [
      { freq: fundamental * 0.5, gain: 0.35, decay: 1.8 },
      { freq: fundamental * 1.0, gain: 0.6, decay: 1.5 },
      { freq: fundamental * 1.5, gain: 0.4, decay: 1.2 },
      { freq: fundamental * 2.0, gain: 0.3, decay: 0.9 },
      { freq: fundamental * 2.76, gain: 0.25, decay: 0.7 },
      { freq: fundamental * 4.07, gain: 0.15, decay: 0.5 },
    ];

    const now = ctx.currentTime;

    partials.forEach((p) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(p.freq, now);

      gainNode.gain.setValueAtTime(p.gain * 0.25, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + p.decay);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + p.decay + 0.1);
    });
  } catch {
    // AudioContext blocked or not supported
  }
};

export const RspLogo: React.FC<RspLogoProps> = ({
  className = '',
  size = 56,
  showText = false,
  interactiveSound = true,
}) => {
  const [isRinging, setIsRinging] = useState(false);

  const handleClick = () => {
    if (interactiveSound) {
      setIsRinging(true);
      playBellSound();
      setTimeout(() => setIsRinging(false), 800);
    }
  };

  return (
    <div
      onClick={handleClick}
      title={interactiveSound ? 'घण्टी बजाउनुहोस् (Click to ring the bell)' : undefined}
      className={`inline-flex items-center gap-2 select-none ${interactiveSound ? 'cursor-pointer group' : ''} ${className}`}
    >
      <div
        className={`relative rounded-full transition-transform duration-300 ease-out shadow-sm flex items-center justify-center ${
          isRinging ? 'scale-110 -rotate-12' : interactiveSound ? 'group-hover:scale-105' : ''
        }`}
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circular outer blue ring */}
          <circle cx="50" cy="50" r="48" fill="#0052CC" stroke="#FFFFFF" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="44.5" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />

          {/* Inner ring */}
          <circle cx="50" cy="50" r="39" fill="#0066FF" />

          {/* Top Hanging Ring */}
          <path
            d="M 50 18 C 45 18 45 25 50 25 C 55 25 55 18 50 18 Z"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Bell Top Mount */}
          <rect x="46" y="24" width="8" height="5" rx="1.5" fill="#FFFFFF" />

          {/* Bell Body */}
          <path
            d="M 50 29
               C 42 29 36 34 35 45
               C 34 54 31 61 24 67
               L 76 67
               C 69 61 66 54 65 45
               C 64 34 58 29 50 29 Z"
            fill="#FFFFFF"
          />

          {/* Bell Rim Base */}
          <ellipse cx="50" cy="67" rx="27" ry="4" fill="#FFFFFF" />
          <ellipse cx="50" cy="67.5" rx="25" ry="2.5" fill="#0052CC" opacity="0.3" />

          {/* Clapper (लोलाक) */}
          <circle cx="50" cy="73" r="5" fill="#FFFFFF" />
          <path d="M 50 67 L 50 71" stroke="#FFFFFF" strokeWidth="3" />

          {/* Reflection highlight */}
          <path
            d="M 40 36 C 38 43 37 52 32 60"
            stroke="#0052CC"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.25"
          />
        </svg>

        {/* Ringing waves indicator */}
        {isRinging && (
          <span className="absolute -inset-1 rounded-full border-2 border-blue-400 animate-ping pointer-events-none opacity-75" />
        )}
      </div>

      {showText && (
        <div className="flex flex-col leading-tight">
          <span className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
            राष्ट्रिय स्वतन्त्र पार्टी
            <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
              रास्वपा
            </span>
          </span>
          <span className="text-xs font-medium text-slate-600">
            फिदिम-१२ (नांगीन पलभञ्याङ्ग) वडा समिति
          </span>
        </div>
      )}
    </div>
  );
};
