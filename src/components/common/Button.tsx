import { Slot } from '@radix-ui/react-slot'
import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  asChild?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  asChild,
  className,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      className={clsx(
        'inline-flex items-center rounded-md border border-transparent font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
        {
          'bg-indigo-600 text-white hover:bg-indigo-700': variant === 'primary',
          'bg-indigo-100 text-indigo-700 hover:bg-indigo-200':
            variant === 'secondary',
          'px-6 py-3 text-base': size === 'xl',
          'px-4 py-2 text-base': size === 'lg',
          'px-4 py-2 text-sm': size === 'md',
          'px-3 py-2 text-sm leading-4': size === 'sm',
          'px-2.5 py-1.5 text-xs': size === 'xs',
        },
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}
