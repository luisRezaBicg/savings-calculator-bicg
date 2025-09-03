import * as React from 'react'

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'default' | 'secondary'
}
export const Badge: React.FC<BadgeProps> = ({ className = '', variant = 'default', ...props }) => {
  const variants: Record<string, string> = {
    default: 'bg-blue-600 text-white',
    secondary: 'bg-slate-200 text-slate-900',
  }
  const base = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium'
  return <span className={[base, variants[variant] ?? variants.default, className].join(' ')} {...props} />
}
