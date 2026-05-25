import React, { useState } from 'react'
import clsx from 'clsx'

export interface InputProps {
    label?: string;
    value?: string;
    placeholder?: string;
    type?: 'text' | 'password' | 'number'
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    maxLength?: number;
    loading?: boolean;
    helperText?: string;
    error?: string;
    success?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
    label,
    value,
    placeholder = 'Search...',
    type = 'text',
    iconLeft,
    iconRight,
    maxLength,
    loading,
    helperText,
    error,
    success,
    onChange,
    ...props
}: InputProps) => {
    const [focused, setFocused] = useState(false)
    const [internalValue, setInternalValue] = useState(value || '')

    const hasValue = internalValue.length > 0
    const charPercent = maxLength ? (internalValue.length / maxLength) * 100 : 0

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInternalValue(e.target.value)
        onChange?.(e)
    }

    return (
        <div className='flex flex-col gap-1 w-full'>
            <div className='relative'>
                {/* Floating label */}
                {label && (
                    <label
                        className={clsx(
                            'absolute left-4 pointer-events-none transition-all duration-200 origin-left',
                            focused || hasValue
                                ? '-top-2 text-xs px-1 bg-white text-primary-900 scale-90'
                                : 'top-1/2 -translate-y-1/2 text-sm text-neutral-400'
                        )}
                    >
                        {label}
                    </label>
                )}

                {/* Input container */}
                <div
                    key={error}
                    className={clsx(
                        'flex items-center gap-2 border rounded-lg px-4 py-2 overflow-hidden transition-all duration-200',
                        focused ? 'border-primary-900 shadow-[0_0_0_3px_rgba(var(--color-primary-900)/0.15)]' : 'border-neutral-300',
                        error && '!border-error-600 animate-shake',
                        success && '!border-success-600',
                    )}>
                    {iconLeft && (
                        <span className='flex items-center shrink-0 text-neutral-400'>{iconLeft}</span>
                    )}
                    <input
                        type={type}
                        placeholder={focused || !label ? placeholder : ''}
                        value={internalValue}
                        maxLength={maxLength}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        onChange={handleChange}
                        {...props}
                        className='flex-1 bg-transparent !outline-none !border-0 !shadow-none appearance-none text-sm'
                    />
                    {loading ? (
                        <span className='flex items-center shrink-0'>
                            <svg className='animate-spin text-neutral-400' width='18' height='18' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='3' />
                                <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z' />
                            </svg>
                        </span>
                    ) : iconRight && (
                        <span className='flex items-center shrink-0 text-neutral-400'>{iconRight}</span>
                    )}
                </div>
            </div>

            {/* Character count fill bar */}
            {maxLength && (
                <div className='flex flex-col gap-0.5'>
                    <div className='h-1 bg-neutral-200 rounded-full overflow-hidden'>
                        <div
                            className={clsx(
                                'h-full rounded-full transition-all duration-300',
                                charPercent >= 90 ? 'bg-error-600' : charPercent >= 70 ? 'bg-warning-500' : 'bg-primary-900'
                            )}
                            style={{ width: `${charPercent}%` }}
                        />
                    </div>
                    <span className='text-xs text-neutral-400 text-right'>
                        {internalValue.length}/{maxLength}
                    </span>
                </div>
            )}

            {/* Helper / error / success text */}
            {helperText && <span className='text-neutral-500 text-xs'>{helperText}</span>}
            {error && <span className='text-error-600 text-xs'>{error}</span>}
            {success && <span className='text-success-600 text-xs'>{success}</span>}
        </div>
    )
}
