import React from 'react';

const ModalFooter = ({ firstText, secondaryText, firstClick, secondaryClick }) => {
    return (
        <div className="modal-footer">
            {firstText && <button onClick={firstClick}>{firstText}</button>}
            {secondaryText && <button onClick={secondaryClick}>{secondaryText}</button>}
        </div>
    );
};

export default ModalFooter;