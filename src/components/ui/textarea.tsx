import * as React from 'react'

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className = '', ...props }, ref) => {
    const base = 'w-full min-h-[120px] rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200'
    return <textarea ref={ref} className={[base, className].join(' ')} {...props} />
  }
)
Textarea.displayName = 'Textarea'
