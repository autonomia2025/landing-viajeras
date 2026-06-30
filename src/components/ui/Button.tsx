'use client'

import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'full'
  loading?: boolean
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none'

  const variants = {
    primary:
      'bg-[#E8336D] text-white hover:bg-[#C42059] hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-[0_4px_16px_rgb(232_51_109/0.35)]',
    secondary:
      'bg-transparent text-[#E8336D] border-2 border-[#E8336D] hover:bg-[#fff0f5] hover:scale-[1.02] active:scale-[0.98]',
    ghost:
      'bg-transparent text-[#2D2D2D] hover:bg-[#FFF8FA] hover:text-[#E8336D]',
    danger:
      'bg-red-500 text-white hover:bg-red-600 hover:scale-[1.02] active:scale-[0.98]',
  }

  const sizes = {
    sm: 'text-sm px-4 py-2',
    md: 'text-[0.9375rem] px-6 py-3',
    lg: 'text-base px-8 py-3.5',
    full: 'text-[0.9375rem] px-6 py-3.5 w-full',
  }

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : null}
      {children}
    </button>
  )
}
