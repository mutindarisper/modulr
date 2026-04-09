import React from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import close_icon from "../static/close.svg";

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
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
}

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
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                    aria-describedby="modal-body"
                    initial={{ opacity: 0, scale: 0.95, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className={clsx(
                        "flex flex-col gap-6 p-6 bg-white rounded-lg shadow-lg max-w-[500px]",
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
                                    className="text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer"
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
                                    className="bg-neutral-400 text-white font-light py-2 px-4 rounded-md cursor-pointer hover:bg-neutral-700 transition-colors"
                                    onClick={onCancel}
                                >
                                    {cancelButtonText || "Cancel"}
                                </motion.button>
                            )}
                            {confirmButton && (
                                <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="bg-error-700 font-semibold text-neutral-50 py-2 px-4 rounded-md cursor-pointer hover:bg-error-800 transition-colors"
                                    onClick={onConfirm}
                                >
                                    {confirmButtonText || "Confirm"}
                                </motion.button>
                            )}
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};
