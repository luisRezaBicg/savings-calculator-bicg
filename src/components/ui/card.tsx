import * as React from 'react'

type DivProps = React.HTMLAttributes<HTMLDivElement>

export const Card: React.FC<DivProps> = ({ className = '', ...props }) => (
  <div className={['rounded-xl border border-slate-200 bg-white', className].join(' ')} {...props} />
)
export const CardHeader: React.FC<DivProps> = ({ className = '', ...props }) => (
  <div className={['p-4 border-b border-slate-200', className].join(' ')} {...props} />
)
export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ className = '', ...props }) => (
  <h3 className={['text-lg font-semibold', className].join(' ')} {...props} />
)
export const CardDescription: React.FC<DivProps> = ({ className = '', ...props }) => (
  <p className={['text-sm text-slate-600', className].join(' ')} {...props} />
)
export const CardContent: React.FC<DivProps> = ({ className = '', ...props }) => (
  <div className={['p-4', className].join(' ')} {...props} />
)
export const CardFooter: React.FC<DivProps> = ({ className = '', ...props }) => (
  <div className={['p-4 border-t border-slate-200', className].join(' ')} {...props} />
)
