import { Backdrop } from '@/ui';;
import { FC, HTMLAttributes, ReactNode } from "react";
import classes from './modal.module.scss'

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    close?: () => void;
}

const Modal: FC<ModalProps> = ({children, close, className}) => {
    return (
        <div className={`${classes.modal}`}>
            <Backdrop onClick={() => close && close()} />
            <div className={`${classes.modal__content} ${className || ''}`}>
                {children}
            </div>
        </div>
    )
}

export default Modal;