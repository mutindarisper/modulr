import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

export type ToastVariant = 'success' | 'error' | 'warning' | 'info'
export type ToastPosition = 'top-right' | 'top-center' | 'bottom-right'

export interface ToastProps {
    message: string
    variant?: ToastVariant
    /** Duration in ms. Pass 0 to disable auto-dismiss. Default: 4000 */
    duration?: number
}

interface ToastItem {
    id: string
    message: string
    variant: ToastVariant
    duration: number
}

interface ToastContextValue {
    addToast: (toast: Omit<ToastItem, 'id'>) => void
    removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const SuccessIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

const ErrorIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 6l6 6M12 6l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
)

const WarningIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 2L16.5 15H1.5L9 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 7v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9" cy="12.5" r="0.75" fill="currentColor" />
    </svg>
)

const InfoIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 8v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9" cy="5.5" r="0.75" fill="currentColor" />
    </svg>
)

const CloseIcon = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M11 3L3 11M3 3l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
)

const variantConfig: Record<ToastVariant, { container: string; icon: string; text: string; iconEl: React.ReactNode }> = {
    success: {
        container: 'bg-success-50 border border-success-200',
        icon: 'text-success-600',
        text: 'text-success-900',
        iconEl: <SuccessIcon />,
    },
    error: {
        container: 'bg-error-50 border border-error-200',
        icon: 'text-error-600',
        text: 'text-error-900',
        iconEl: <ErrorIcon />,
    },
    warning: {
        container: 'bg-warning-50 border border-warning-200',
        icon: 'text-warning-600',
        text: 'text-warning-900',
        iconEl: <WarningIcon />,
    },
    info: {
        container: 'bg-blue-50 border border-blue-200',
        icon: 'text-blue-600',
        text: 'text-blue-900',
        iconEl: <InfoIcon />,
    },
}

const positionStyles: Record<ToastPosition, string> = {
    'top-right':    'top-4 right-4 items-end',
    'top-center':   'top-4 left-1/2 -translate-x-1/2 items-center',
    'bottom-right': 'bottom-4 right-4 items-end',
}

const getAnimation = (position: ToastPosition) =>
    position === 'top-center'
        ? { initial: { opacity: 0, y: -12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -12 } }
        : { initial: { opacity: 0, x: 40 },  animate: { opacity: 1, x: 0 },  exit: { opacity: 0, x: 40 } }

interface ToastItemProps extends ToastItem {
    onRemove: (id: string) => void
    position: ToastPosition
}

const ToastItemComponent = ({ id, message, variant, duration, onRemove, position }: ToastItemProps) => {
    useEffect(() => {
        if (duration === 0) return
        const timer = setTimeout(() => onRemove(id), duration)
        return () => clearTimeout(timer)
    }, [id, duration, onRemove])

    const config = variantConfig[variant]
    const animation = getAnimation(position)

    return (
        <motion.div
            layout
            role="alert"
            aria-live="polite"
            {...animation}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className={clsx(
                'flex items-start gap-3 p-4 rounded-lg shadow-md w-[340px]',
                config.container
            )}
        >
            <span className={clsx('mt-0.5 shrink-0', config.icon)}>{config.iconEl}</span>
            <p className={clsx('text-sm font-medium flex-1 leading-snug', config.text)}>{message}</p>
            <button
                type="button"
                aria-label="Dismiss notification"
                onClick={() => onRemove(id)}
                className="shrink-0 text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer focus-visible:outline-black rounded"
            >
                <CloseIcon />
            </button>
        </motion.div>
    )
}

export interface ToastProviderProps {
    children: React.ReactNode
    /** Where toasts appear on screen. Default: 'top-right' */
    position?: ToastPosition
}

export const ToastProvider = ({ children, position = 'top-right' }: ToastProviderProps) => {
    const [toasts, setToasts] = useState<ToastItem[]>([])

    const addToast = useCallback((toast: Omit<ToastItem, 'id'>) => {
        const id = Math.random().toString(36).slice(2, 9)
        setToasts(prev => [...prev, { ...toast, id }])
    }, [])

    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id))
    }, [])

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            {createPortal(
                <div
                    aria-label="Notifications"
                    className={clsx('fixed z-50 flex flex-col gap-2', positionStyles[position])}
                >
                    <AnimatePresence initial={false}>
                        {toasts.map(toast => (
                            <ToastItemComponent
                                key={toast.id}
                                {...toast}
                                onRemove={removeToast}
                                position={position}
                            />
                        ))}
                    </AnimatePresence>
                </div>,
                document.body
            )}
        </ToastContext.Provider>
    )
}

export const useToast = (): ToastContextValue => {
    const ctx = useContext(ToastContext)
    if (!ctx) throw new Error('useToast must be used within a ToastProvider')
    return ctx
}
