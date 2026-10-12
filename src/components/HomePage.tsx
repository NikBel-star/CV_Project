import React from 'react';

interface Props {
  onStart: () => void;      // ფორმის შევსების დაწყების ფუნქცია
  hasDraft: boolean;        // არსებობს თუ არა შენახული მონახაზი
}

export const HomePage: React.FC<Props> = ({ onStart, hasDraft }) => {
  return (
    <div className="flex-1 relative overflow-hidden" style={{ minHeight: 'calc(100vh - 56px)' }}>
      {/* სრული ეკრანის გრადიენტული ფონი (Figma-ს ზუსტი სტილი) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 75% 20%, #F4A498 0%, transparent 60%),' +
            'radial-gradient(ellipse 55% 55% at 25% 30%, #C9A8F5 0%, #9B79EF 20%, transparent 60%),' +
            'radial-gradient(ellipse 50% 50% at 80% 80%, #B8D4F5 0%, #8BB8F0 20%, transparent 55%),' +
            'linear-gradient(135deg, #F0EBF8 0%, #EDE8F6 40%, #EBF1FA 70%, #EEF4F9 100%)',
        }}
      />

      {/* ვარსკვლავის/grain ტექსტურა (რბილი) */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* Redberry Stamp Badge - ქვემო მარჯვნივ */}
      <div className="absolute right-[8%] bottom-[18%] pointer-events-none select-none">
        <svg
          width="180"
          height="180"
          viewBox="0 0 180 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.22 }}
        >
          {/* გარე წრე */}
          <circle cx="90" cy="90" r="85" stroke="#1A1A1A" strokeWidth="1.5" fill="none" />
          {/* შიდა წრე */}
          <circle cx="90" cy="90" r="70" stroke="#1A1A1A" strokeWidth="1" fill="none" />

          {/* ვარსკვლავი ცენტრში */}
          <path
            d="M90 58 L93.5 79.5 L115 75 L100 90 L115 105 L93.5 100.5 L90 122 L86.5 100.5 L65 105 L80 90 L65 75 L86.5 79.5 Z"
            fill="#1A1A1A"
          />

          {/* ირგვლივი ტექსტი (ზემოდან) */}
          <path
            id="topArc"
            d="M 90,90 m -72,0 a 72,72 0 1,1 144,0"
            fill="none"
          />
          <text fontSize="9" letterSpacing="3.5" fill="#1A1A1A" fontFamily="Arial, sans-serif" fontWeight="600">
            <textPath href="#topArc" startOffset="2%">
              DIGITAL TRANSFORMATION AGENCY • REDBERRY •
            </textPath>
          </text>

          {/* ქვედა ტექსტი */}
          <path
            id="bottomArc"
            d="M 90,90 m -72,0 a 72,72 0 0,0 144,0"
            fill="none"
          />
          <text fontSize="9" letterSpacing="3.5" fill="#1A1A1A" fontFamily="Arial, sans-serif" fontWeight="600">
            <textPath href="#bottomArc" startOffset="5%">
              • 4050608419 •
            </textPath>
          </text>
        </svg>
      </div>

      {/* ცენტრალური მოქმედების ღილაკი */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full" style={{ minHeight: 'calc(100vh - 56px)', paddingTop: '40px' }}>
        <div className="flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={onStart}
            style={{
              padding: '0 48px',
              height: '60px',
              borderRadius: '8px',
              background: '#1A1A1A',
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: '500',
              letterSpacing: '0.01em',
              cursor: 'pointer',
              border: 'none',
              outline: 'none',
              transition: 'transform 0.15s, box-shadow 0.15s',
              boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.03)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 28px rgba(0,0,0,0.22)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.18)';
            }}
            onMouseDown={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.98)';
            }}
            onMouseUp={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.03)';
            }}
          >
            {hasDraft ? 'მონახაზის გაგრძელება' : 'რეზიუმეს დამატება'}
          </button>

          {hasDraft && (
            <span
              className="text-xs font-medium"
              style={{
                background: 'rgba(255,255,255,0.65)',
                backdropFilter: 'blur(8px)',
                padding: '4px 14px',
                borderRadius: '999px',
                border: '1px solid rgba(0,0,0,0.1)',
                color: '#555',
              }}
            >
              შენახული გაქვთ დაუსრულებელი მონახაზი
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
