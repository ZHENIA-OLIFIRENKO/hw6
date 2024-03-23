import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';

test('calls onClose when close button is clicked', async () => {
    const onClose = jest.fn();
    render(
        <Modal isOpen={true} onClose={onClose} title="Test Modal" content="This is a test modal.">
            <div>Modal Content</div>
        </Modal>
    );

    const closeButton = screen.getByText('×');
    userEvent.click(closeButton);

    await waitFor(() => {
        expect(onClose).toHaveBeenCalledTimes(1);
    });
});
