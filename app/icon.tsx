import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 32,
  height: 32,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0F1923',
          borderRadius: 4,
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="#FF4655" strokeWidth="1.5" strokeLinecap="square">
            <line x1="12" y1="4" x2="12" y2="8" />
            <line x1="12" y1="16" x2="12" y2="20" />
            <line x1="4" y1="12" x2="8" y2="12" />
            <line x1="16" y1="12" x2="20" y2="12" />
          </g>
          <circle cx="12" cy="12" r="1" fill="#FF4655" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}