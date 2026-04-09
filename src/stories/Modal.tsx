import React from "react";
import clsx from "clsx";
import close_icon from "../static/close.svg";

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
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
    ...props
}: ModalProps) => {
    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-body"
            className={clsx("flex flex-col gap-6 p-6 bg-white rounded-lg shadow-lg max-w-[500px]", (cancelButton || confirmButton) && "justify-between", className)}
            {...props}
        >
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                    <h2 id="modal-title" className="font-bold text-4xl">{title}</h2>
                    {showCloseIcon && (
                        <button
                            type="button"
                            aria-label="Close"
                            onClick={onClose}
                            className="text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer"
                        >
                            <img src={close_icon} alt="" />
                        </button>
                    )}
                </div>

                <p id="modal-body" className="text-sm text-neutral-600">{bodyText}</p>
            </div>

            {(cancelButton || confirmButton) && (
                <div className="flex justify-between">
                    {cancelButton && (
                        <button
                            type="button"
                            className="bg-neutral-400 text-white font-light py-2 px-4 rounded-md cursor-pointer hover:bg-neutral-700 transition-colors"
                            onClick={onCancel}
                        >
                            {cancelButtonText || "Cancel"}
                        </button>
                    )}
                    {confirmButton && (
                        <button
                            type="button"
                            className="bg-error-700 font-semibold text-neutral-50 py-2 px-4 rounded-md cursor-pointer hover:bg-error-800 transition-colors"
                            onClick={onConfirm}
                        >
                            {confirmButtonText || "Confirm"}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};
