import React from 'react';
import Modal from './Modal';
import ModalFooter from './ModalFooter';
import PropTypes from 'prop-types';

const ModalText = ({ isOpen, onClose, title, content, onConfirm }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div>
                <h2>{title}</h2>
                <p>{content}</p>
                <ModalFooter
                    firstText="Cancel"
                    firstClick={onClose}
                    secondaryText="Confirm"
                    secondaryClick={onConfirm}
                />
            </div>
        </Modal>
    );
};

ModalText.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
};

ModalText.defaultProps = {
    title: 'Default Title',
    content: 'Default Content',
};

export default ModalText;
