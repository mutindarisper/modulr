import { useEffect, useRef } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import close_icon from "../../static/close.svg";

export type ModalVariant = "default" | "danger" | "warning" | "info";

export interface ModalProps {
    isOpen?: boolean;
    variant?: ModalVariant;
    icon?: React.ReactNode;
    title: string;
    bodyText: string;
    showCloseIcon?: boolean;
    cancelButton?: boolean;
    cancelButtonText?: string;
    confirmButton?: boolean;
    confirmButtonText?: string;
    confirmLoading?: boolean;
    onClose?: () => void;
    onConfirm?: () => void;
    onCancel?: () => void;
    className?: string;
}

const FOCUSABLE = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
].join(',');

const variantStyles: Record<ModalVariant, { header: string; title: string }> = {
    default: { header: "", title: "text-neutral-900" },
    danger:  { header: "bg-error-50 -mx-6 -mt-6 px-6 pt-6 pb-4 rounded-t-lg", title: "text-error-700" },
    warning: { header: "bg-warning-50 -mx-6 -mt-6 px-6 pt-6 pb-4 rounded-t-lg", title: "text-warning-700" },
    info:    { header: "bg-primary-50 -mx-6 -mt-6 px-6 pt-6 pb-4 rounded-t-lg", title: "text-primary-700" },
};

const Spinner = () => (
    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
);

export const Modal = ({
    isOpen = true,
    variant = "default",
    icon,
    title,
    bodyText,
    showCloseIcon,
    cancelButton,
    cancelButtonText,
    confirmButton,
    confirmButtonText,
    confirmLoading = false,
    onClose,
    onConfirm,
    onCancel,
    className,
}: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const styles = variantStyles[variant];

    // Close on Escape
    useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose?.();
        };
        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [isOpen, onClose]);

    // Focus trap + auto-focus
    useEffect(() => {
        if (!isOpen || !modalRef.current) return;

        const focusable = Array.from(
            modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
        );

        const autoFocusTarget =
            focusable.find(el => el.getAttribute('data-autofocus') === 'true') ??
            focusable[0];
        autoFocusTarget?.focus();

        const handleTab = (e: KeyboardEvent) => {
            if (e.key !== 'Tab' || !modalRef.current) return;
            const focusableNow = Array.from(
                modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
            );
            const first = focusableNow[0];
            const last = focusableNow[focusableNow.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
            } else {
                if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
            }
        };

        document.addEventListener('keydown', handleTab);
        return () => document.removeEventListener('keydown', handleTab);
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        aria-hidden="true"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                    />

                    {/* Modal */}
                    <motion.div
                        ref={modalRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                        aria-describedby="modal-body"
                        initial={{ opacity: 0, scale: 0.95, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 8 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={clsx(
                            "fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                            "flex flex-col gap-6 p-6 bg-white rounded-lg shadow-lg w-full max-w-[500px]",
                            (cancelButton || confirmButton) && "justify-between",
                            className
                        )}
                    >
                        {/* Header */}
                        <div className={clsx("flex flex-col gap-2", styles.header)}>
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    {icon && <span className="text-2xl">{icon}</span>}
                                    <h2 id="modal-title" className={clsx("font-bold text-4xl", styles.title)}>
                                        {title}
                                    </h2>
                                </div>
                                {showCloseIcon && (
                                    <motion.button
                                        type="button"
                                        aria-label="Close"
                                        onClick={onClose}
                                        whileHover={{ rotate: 90 }}
                                        transition={{ duration: 0.2 }}
                                        className="text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer focus-visible:outline-black"
                                    >
                                        <img src={close_icon} alt="" />
                                    </motion.button>
                                )}
                            </div>
                            <p id="modal-body" className="text-sm text-neutral-600">{bodyText}</p>
                        </div>

                        {/* Actions */}
                        {(cancelButton || confirmButton) && (
                            <div className="flex justify-between">
                                {cancelButton && (
                                    <motion.button
                                        type="button"
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="bg-neutral-400 text-white font-light py-2 px-4 rounded-md cursor-pointer hover:bg-neutral-700 transition-colors focus-visible:outline-black"
                                        onClick={onCancel}
                                    >
                                        {cancelButtonText || "Cancel"}
                                    </motion.button>
                                )}
                                {confirmButton && (
                                    <motion.button
                                        type="button"
                                        data-autofocus="true"
                                        disabled={confirmLoading}
                                        whileHover={confirmLoading ? {} : { scale: 1.03 }}
                                        whileTap={confirmLoading ? {} : { scale: 0.97 }}
                                        className="flex items-center gap-2 bg-error-700 font-semibold text-neutral-50 py-2 px-4 rounded-md cursor-pointer hover:bg-error-800 transition-colors focus-visible:outline-black disabled:opacity-60 disabled:cursor-not-allowed"
                                        onClick={onConfirm}
                                    >
                                        {confirmLoading && <Spinner />}
                                        {confirmButtonText || "Confirm"}
                                    </motion.button>
                                )}
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
