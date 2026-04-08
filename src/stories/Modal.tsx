import React from "react";
import close_icon from "../static/close.svg"

export interface ModalProps {
    title: string;
    bodyText: string;
    closeIcon?: React.ReactNode;
    cancelButton?: React.ReactNode;
    cancelButtonText?: string;
    confirmButton? : React.ReactNode;
    confirmButtonText?: string;
    onClose: () => void;
    onConfirm: () => void;
    onCancel: () => void;
}


export const Modal = ({
    title,
    bodyText,
    closeIcon,
    cancelButton,
    cancelButtonText,
    confirmButton,
    confirmButtonText,
    onClose,
    onConfirm,
    onCancel,
    ...props
}: ModalProps) => {
    return (
        <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg w-full h-full " {...props}>
            <div className="flex justify-between">
                <h2 className="font-bold text-4xl">{title}</h2>
                {
                    closeIcon && (
                        <img src={close_icon} alt="Close" className="cursor-pointer" onClick={onClose}/>
                    )
                }
            </div>

            <p className="text-text-base text-neutral-600 font-font-weight-normal">{bodyText}</p>

            <div className="flex justify-between mt-8">
                {
                    cancelButton && (
                        <button className="bg-error-700 text-white font-light py-2 px-4 rounded-md cursor-pointer" onClick={onCancel}>{cancelButtonText || "Cancel"}</button>
                    )
                }

                {
                    confirmButton && (
                        <button className="bg-neutral-950 font-semibold text-neutral-50 py-2 px-4 rounded-md cursor-pointer" onClick={onConfirm}>{confirmButtonText || "Confirm"}</button>
                    )
                }

            </div>

        </div>
    )
}