import * as React from 'react'

export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ className = '', ...props }) => (
  <label className={['mb-1 block text-sm font-medium text-slate-700', className].join(' ')} {...props} />
)
