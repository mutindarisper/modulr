import type { Meta, StoryObj } from '@storybook/react'
import { ToastProvider, useToast } from './Toast'
import type { ToastVariant, ToastPosition } from './Toast'

const meta = {
    title: 'Overlays/Toast',
    component: ToastProvider,
    parameters: {
        layout: 'centered',
    },
    args: {
        children: null,
    },
} satisfies Meta<typeof ToastProvider>

export default meta
type Story = StoryObj<typeof meta>

const variants: ToastVariant[] = ['success', 'error', 'warning', 'info']

const messages: Record<ToastVariant, string> = {
    success: 'Changes saved successfully.',
    error: 'Something went wrong. Please try again.',
    warning: 'Your session is about to expire.',
    info: 'A new update is available.',
}

const TriggerButtons = ({ position }: { position?: ToastPosition }) => {
    const { addToast } = useToast()
    return (
        <div className="flex flex-col items-center gap-3">
            <p className="text-sm text-neutral-500 mb-1">Click to trigger a toast</p>
            <div className="flex flex-wrap justify-center gap-2">
                {variants.map(variant => (
                    <button
                        key={variant}
                        type="button"
                        onClick={() => addToast({ message: messages[variant], variant, duration: 4000 })}
                        className="capitalize bg-neutral-950 text-white text-sm font-medium py-2 px-4 rounded-md cursor-pointer hover:bg-neutral-700 transition-colors"
                    >
                        {variant}
                    </button>
                ))}
            </div>
            {position && (
                <p className="text-xs text-neutral-400 mt-1">Position: <span className="font-mono">{position}</span></p>
            )}
        </div>
    )
}

export const TopRight: Story = {
    render: () => (
        <ToastProvider position="top-right">
            <TriggerButtons position="top-right" />
        </ToastProvider>
    ),
}

export const TopCenter: Story = {
    render: () => (
        <ToastProvider position="top-center">
            <TriggerButtons position="top-center" />
        </ToastProvider>
    ),
}

export const BottomRight: Story = {
    render: () => (
        <ToastProvider position="bottom-right">
            <TriggerButtons position="bottom-right" />
        </ToastProvider>
    ),
}

const PersistentDemo = () => {
    const { addToast } = useToast()
    return (
        <div className="flex flex-col items-center gap-3">
            <p className="text-sm text-neutral-500 mb-1">Persistent toasts — must be dismissed manually</p>
            <div className="flex flex-wrap justify-center gap-2">
                {variants.map(variant => (
                    <button
                        key={variant}
                        type="button"
                        onClick={() => addToast({ message: messages[variant], variant, duration: 0 })}
                        className="capitalize bg-neutral-950 text-white text-sm font-medium py-2 px-4 rounded-md cursor-pointer hover:bg-neutral-700 transition-colors"
                    >
                        {variant}
                    </button>
                ))}
            </div>
        </div>
    )
}

export const Persistent: Story = {
    render: () => (
        <ToastProvider position="top-right">
            <PersistentDemo />
        </ToastProvider>
    ),
}

const AllAtOnceDemo = () => {
    const { addToast } = useToast()
    const fireAll = () => {
        variants.forEach((variant, i) => {
            setTimeout(() => addToast({ message: messages[variant], variant, duration: 5000 }), i * 120)
        })
    }
    return (
        <div className="flex flex-col items-center gap-3">
            <p className="text-sm text-neutral-500 mb-1">Show all variants at once</p>
            <button
                type="button"
                onClick={fireAll}
                className="bg-neutral-950 text-white text-sm font-semibold py-2 px-6 rounded-md cursor-pointer hover:bg-neutral-700 transition-colors"
            >
                Show all
            </button>
        </div>
    )
}

export const AllVariants: Story = {
    render: () => (
        <ToastProvider position="top-right">
            <AllAtOnceDemo />
        </ToastProvider>
    ),
}
