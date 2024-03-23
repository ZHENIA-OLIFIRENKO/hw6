import React from 'react';
import '../../styles/modalWrapper.scss';

const ModalWrapper = ({ children }) => {
    return <div className="modal-wrapper">{children}</div>;
};

export default ModalWrapper;