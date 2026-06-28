import { cn } from '@/lib/utils'

interface LogoProps {
  /** Size + color via Tailwind classes, e.g. "h-7 w-7 text-primary". */
  className?: string
}

/**
 * Brand mark (Anopheles mosquito) rendered as a CSS mask so it inherits the
 * current text color — it adapts automatically to light/dark themes.
 * Source: public/logo.svg.
 */
export function Logo({ className }: LogoProps) {
  return (
    <span
      role="img"
      aria-label="MalariaScope logo"
      className={cn('inline-block shrink-0 bg-current', className)}
      style={{
        WebkitMaskImage: 'url(/logo.svg)',
        maskImage: 'url(/logo.svg)',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
      }}
    />
  )
}
