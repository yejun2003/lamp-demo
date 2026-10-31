import type { ReactNode } from 'react'

type IconName = 'sun' | 'moon' | 'eye' | 'eye-off' | 'arrow' | 'diagonal' | 'close'
export function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  const paths: Record<IconName, ReactNode> = {
    sun: (
      <>
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 1v3m0 16v3M1 12h3m16 0h3M4.2 4.2l2.1 2.1m11.4 11.4 2.1 2.1m0-15.6-2.1 2.1M6.3 17.7l-2.1 2.1" />
      </>
    ),
    moon: <path d="M20 14.2A8.6 8.6 0 0 1 9.8 4 8.6 8.6 0 1 0 20 14.2Z" />,
    eye: (
      <>
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
    'eye-off': (
      <>
        <path d="m3 3 18 18M9.5 6.3A12 12 0 0 1 12 6c6.5 0 10 6 10 6a19 19 0 0 1-3.2 3.6M6.2 7.6A19 19 0 0 0 2 12s3.5 6 10 6a12 12 0 0 0 4-.7" />
      </>
    ),
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
    diagonal: <path d="M6 18 18 6M6 6h12v12" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
  }
  return (
    <svg
      className={`icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}
