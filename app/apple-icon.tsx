import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 180,
  height: 180,
}

export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0F1923 0%, #1A2332 100%)',
          borderRadius: 36,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 120,
            height: 120,
          }}
        >
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Hexagon Background */}
            <path
              d="M60 10L102 30V90L60 110L18 90V30L60 10Z"
              fill="rgba(255, 70, 85, 0.1)"
              stroke="#FF4655"
              strokeWidth="3"
            />
            
            {/* Crosshair Lines */}
            <g stroke="#FF4655" strokeWidth="6" strokeLinecap="square">
              {/* Top Line */}
              <line x1="60" y1="25" x2="60" y2="42" />
              {/* Bottom Line */}
              <line x1="60" y1="78" x2="60" y2="95" />
              {/* Left Line */}
              <line x1="25" y1="60" x2="42" y2="60" />
              {/* Right Line */}
              <line x1="78" y1="60" x2="95" y2="60" />
            </g>
            
            {/* Center Dot */}
            <circle cx="60" cy="60" r="6" fill="#FF4655" />
            
            {/* Corner Accents */}
            <g fill="#FF4655" opacity="0.5">
              <rect x="35" y="35" width="6" height="6" />
              <rect x="79" y="35" width="6" height="6" />
              <rect x="35" y="79" width="6" height="6" />
              <rect x="79" y="79" width="6" height="6" />
            </g>
          </svg>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}