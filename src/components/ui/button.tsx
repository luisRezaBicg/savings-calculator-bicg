import * as React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button: React.FC<ButtonProps> = ({ className = '', variant = 'default', size = 'md', ...props }) => {
  const base = 'inline-flex items-center justify-center rounded-2xl font-medium transition focus:outline-none focus:ring disabled:opacity-50 disabled:pointer-events-none'
  const variants: Record<string, string> = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-200',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-900',
  }
  const sizes: Record<string, string> = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4',
    lg: 'h-11 px-5 text-base',
  }
  const cls = [base, variants[variant] ?? variants.default, sizes[size] ?? sizes.md, className].join(' ')
  return <button className={cls} {...props} />
}
