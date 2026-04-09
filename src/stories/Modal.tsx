import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import close_icon from "../static/close.svg";

export interface ModalProps {
    isOpen?: boolean;
    title: string;
    bodyText: string;
    showCloseIcon?: boolean;
    cancelButton?: boolean;
    cancelButtonText?: string;
    confirmButton?: boolean;
    confirmButtonText?: string;
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

export const Modal = ({
    isOpen = true,
    title,
    bodyText,
    showCloseIcon,
    cancelButton,
    cancelButtonText,
    confirmButton,
    confirmButtonText,
    onClose,
    onConfirm,
    onCancel,
    className,
}: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

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

        // Auto-focus: confirm button first, then cancel, then first focusable
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
                if (document.activeElement === first) {
                    e.preventDefault();
                    last?.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first?.focus();
                }
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
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-start">
                                <h2 id="modal-title" className="font-bold text-4xl">{title}</h2>
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
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="bg-error-700 font-semibold text-neutral-50 py-2 px-4 rounded-md cursor-pointer hover:bg-error-800 transition-colors focus-visible:outline-black"
                                        onClick={onConfirm}
                                    >
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
