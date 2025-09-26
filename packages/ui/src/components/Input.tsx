import React from 'react'
import { clsx } from 'clsx'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  variant?: 'default' | 'error'
}

export function Input({ 
  label, 
  error, 
  variant = 'default',
  className, 
  ...props 
}: InputProps) {
  const inputClasses = clsx(
    'w-full px-3 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
    {
      'border-gray-300 focus:ring-barowa-500 focus:border-transparent': variant === 'default' && !error,
      'border-red-300 focus:ring-red-500 focus:border-transparent': variant === 'error' || error,
      'opacity-50 cursor-not-allowed': props.disabled
    },
    className
  )

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className={inputClasses}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
