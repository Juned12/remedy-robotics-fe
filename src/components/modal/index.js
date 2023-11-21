
import React from "react";
import classNames from "classnames";
import "./index.scss"
 
const Modal = ({ 
    isOpen, 
    onClose, 
    children,
    className,
    title
}) => {
        

    if (!isOpen) return null;
 
    return (
        <div
            className={classNames("modal-outer-wrap")}
        >
            <div className={classNames("modal-wrap", className)}>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="fw-bold modal-title">{title}</div>
                    <i className="fa fa-times cursor-pointer fa-lg" aria-hidden="true" onClick={onClose}></i>
                </div>
                {children}
            </div>
        </div>
    );
};
 
export default Modal;