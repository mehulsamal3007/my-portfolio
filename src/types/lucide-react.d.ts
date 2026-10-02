declare module 'lucide-react' {
  import type { ComponentType, SVGProps } from 'react'

  export interface LucideProps extends SVGProps<SVGSVGElement> {
    size?: number | string
    strokeWidth?: number | string
  }

  export type LucideIcon = ComponentType<LucideProps>

  export const ArrowRight: LucideIcon
  export const ArrowUpRight: LucideIcon
  export const Download: LucideIcon
  export const Github: LucideIcon
  export const Linkedin: LucideIcon
  export const Mail: LucideIcon
  export const Menu: LucideIcon
  export const Sparkles: LucideIcon
  export const X: LucideIcon
}
