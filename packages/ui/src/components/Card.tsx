import React from 'react'
import { clsx } from 'clsx'

interface CardProps {
  children: React.ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  shadow?: 'none' | 'sm' | 'md' | 'lg'
}

export function Card({ 
  children, 
  className,
  padding = 'md',
  shadow = 'md'
}: CardProps) {
  const cardClasses = clsx(
    'bg-white rounded-xl border border-gray-200',
    {
      'p-0': padding === 'none',
      'p-4': padding === 'sm',
      'p-6': padding === 'md',
      'p-8': padding === 'lg',
      'shadow-none': shadow === 'none',
      'shadow-sm': shadow === 'sm',
      'shadow-md': shadow === 'md',
      'shadow-lg': shadow === 'lg',
    },
    className
  )

  return (
    <div className={cardClasses}>
      {children}
    </div>
  )
}
