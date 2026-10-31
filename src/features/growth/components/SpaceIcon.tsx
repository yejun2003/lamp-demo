import type { ReactNode } from 'react'
export type SpaceIconName =
  | 'overview'
  | 'journal'
  | 'goals'
  | 'reading'
  | 'skills'
  | 'habits'
  | 'memories'
  | 'plus'
  | 'arrow'
  | 'back'
  | 'pause'
  | 'play'
  | 'close'
  | 'edit'
  | 'search'
  | 'download'
  | 'upload'
  | 'logout'
  | 'menu'
  | 'check'
  | 'storage'
const paths: Record<SpaceIconName, ReactNode> = {
  overview: (
    <>
      <circle cx="12" cy="12" r="6" />
      <ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(-35 12 12)" />
    </>
  ),
  journal: (
    <>
      <path d="M12 5C8 2 4 3 2 4v16c4-2 7-2 10 0 3-2 6-2 10 0V4c-2-1-6-2-10 1Z" />
      <path d="M12 5v15" />
    </>
  ),
  goals: (
    <>
      <circle cx="11" cy="13" r="8" />
      <circle cx="11" cy="13" r="4" />
      <path d="m11 13 9-10m-4 0h4v4" />
    </>
  ),
  reading: (
    <>
      <rect x="5" y="3" width="15" height="18" rx="2" />
      <path d="M5 7H2v14h14M9 3v18" />
    </>
  ),
  skills: (
    <>
      <circle cx="12" cy="5" r="3" />
      <circle cx="5" cy="18" r="3" />
      <circle cx="19" cy="18" r="3" />
      <path d="m10 8-4 7m8-7 4 7M8 18h8" />
    </>
  ),
  habits: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M7 2v6m10-6v6m-10 7 3 3 6-7" />
    </>
  ),
  memories: <path d="m12 2 3 6 7 1-5 5 1 8-6-4-6 4 1-8-5-5 7-1Z" />,
  plus: <path d="M12 4v16M4 12h16" />,
  arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
  back: <path d="M20 12H4m6-6-6 6 6 6" />,
  pause: <path d="M8 4v16M16 4v16" />,
  play: <path d="m7 3 14 9-14 9Z" />,
  close: <path d="m5 5 14 14M5 19 19 5" />,
  edit: (
    <>
      <path d="m14 4 6 6M3 21l5-1L21 7a2 2 0 0 0-5-5L3 15Z" />
    </>
  ),
  search: (
    <>
      <circle cx="10" cy="10" r="7" />
      <path d="m15 15 6 6" />
    </>
  ),
  download: (
    <>
      <path d="M12 2v14m-5-5 5 5 5-5M3 16v6h18v-6" />
    </>
  ),
  upload: (
    <>
      <path d="M12 17V3m-5 5 5-5 5 5M3 16v6h18v-6" />
    </>
  ),
  logout: (
    <>
      <path d="M9 3H3v18h6m5-15 6 6-6 6M8 12h12" />
    </>
  ),
  menu: <path d="M3 5h18M3 12h18M3 19h18" />,
  check: <path d="m5 12 4 4L20 5" />,
  storage: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0" />
    </>
  ),
}
export function SpaceIcon({ name, size = 20 }: { name: SpaceIconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}
