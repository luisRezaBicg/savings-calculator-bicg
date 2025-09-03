import * as React from 'react'

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className = '', ...props }, ref) => {
    const base = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200'
    return <input ref={ref} className={[base, className].join(' ')} {...props} />
  }
)
Input.displayName = 'Input'
