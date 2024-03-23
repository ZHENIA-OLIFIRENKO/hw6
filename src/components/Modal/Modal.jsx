import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/modalWrapper.scss';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-wrapper" onClick={onClose}>
            <div className="modal" onClick={(event) => event.stopPropagation()}>

                {children}

                <span className="modal-close" onClick={onClose}>
                    &times;
                </span>

            </div>
        </div>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default Modal;
