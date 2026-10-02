type IconProps = {
  size?: number
  className?: string
}

function IconBase({ size = 16, className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export function MenuIcon({ size = 18, className }: IconProps) {
  return (
    <IconBase size={size} className={className}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </IconBase>
  )
}

export function CloseIcon({ size = 18, className }: IconProps) {
  return (
    <IconBase size={size} className={className}>
      <path d="M6 6l12 12M18 6L6 18" />
    </IconBase>
  )
}

export function SparklesIcon({ size = 12, className }: IconProps) {
  return (
    <IconBase size={size} className={className}>
      <path d="M12 2l1.7 5.3L19 9l-5.3 1.7L12 16l-1.7-5.3L5 9l5.3-1.7L12 2z" />
      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
    </IconBase>
  )
}

export function ArrowRightIcon({ size = 16, className }: IconProps) {
  return (
    <IconBase size={size} className={className}>
      <path d="M5 12h14" />
      <path d="M13 5l7 7-7 7" />
    </IconBase>
  )
}

export function DownloadIcon({ size = 16, className }: IconProps) {
  return (
    <IconBase size={size} className={className}>
      <path d="M12 4v10" />
      <path d="M8 20l4 4 4-4" />
      <path d="M4 20h16" />
    </IconBase>
  )
}

export function ArrowUpRightIcon({ size = 16, className }: IconProps) {
  return (
    <IconBase size={size} className={className}>
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </IconBase>
  )
}

export function GithubIcon({ size = 16, className }: IconProps) {
  return (
    <IconBase size={size} className={className}>
      <path d="M9 19c-4 1.3-4-2.1-5-2.6M15 21v-3.9a3.3 3.3 0 0 0-.9-2.6c3-.3 6.1-1.5 6.1-7A5.4 5.4 0 0 0 20 5.5 5 5 0 0 0 19.8 2S18.7 2 16.4 3.8A14.8 14.8 0 0 0 12 3.5a14.8 14.8 0 0 0-4.4 0C5.3 2 4.2 2 4.2 2A5 5 0 0 0 4 5.5 5.4 5.4 0 0 0 3.5 9c0 5.4 3.1 6.7 6.1 7A3.3 3.3 0 0 0 8.7 17.1V21" />
    </IconBase>
  )
}

export function LinkedinIcon({ size = 16, className }: IconProps) {
  return (
    <IconBase size={size} className={className}>
      <path d="M8 10v8M8 6h.01M12 18v-4a3 3 0 0 1 6 0v4M12 10v8M4 4h16v16H4z" />
    </IconBase>
  )
}

export function PhoneIcon({ size = 16, className }: IconProps) {
  return (
    <IconBase size={size} className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3.08 4.18 2 2 0 0 1 5.06 2h3a2 2 0 0 1 2 1.72c.13.99.36 1.96.68 2.9a2 2 0 0 1-.45 2.11L9 9.91a16 16 0 0 0 6.09 6.09l1.18-1.29a2 2 0 0 1 2.11-.45c.94.32 1.91.55 2.9.68A2 2 0 0 1 22 16.92Z" />
    </IconBase>
  )
}

export function MailIcon({ size = 16, className }: IconProps) {
  return (
    <IconBase size={size} className={className}>
      <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z" />
      <path d="M4 8l8 6 8-6" />
    </IconBase>
  )
}
