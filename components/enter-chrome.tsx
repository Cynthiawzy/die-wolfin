import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type EnterButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string
  icon?: ReactNode
  textClassName?: string
}

export function EnterChrome({
  label = 'ENTER',
  icon,
  textClassName,
  className,
  ...props
}: EnterButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'group relative inline-flex items-center gap-3 bg-transparent pb-2 focus-visible:outline-none',
        className,
      )}
    >
      <span
        className={cn(
          'text-sm font-medium uppercase tracking-[0.4em] text-primary transition-colors duration-300 group-hover:text-rose',
          textClassName,
        )}
      >
        <span className="pl-[0.5em]">{label}</span>
      </span>
      {icon && (
        <span className="text-silver transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-rose">
          {icon}
        </span>
      )}
      <span className="absolute bottom-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-silver/70 to-transparent transition-all duration-500 group-hover:via-rose" />
    </button>
  )
}
