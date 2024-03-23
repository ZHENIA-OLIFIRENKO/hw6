import React from 'react';

const ModalClose = ({ onClick }) => {
    return (
        <button className="modal-close-button" onClick={onClick}></button>
    );
};

export default ModalClose;