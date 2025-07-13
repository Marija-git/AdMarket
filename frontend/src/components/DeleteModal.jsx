import React from "react";

const DeleteModal = ({ onClose, onConfirm }) => {
	return (
		<div>
			<h5 className='mb-3'>Confirm Delete</h5>
			<p>Are you sure you want to delete this ad?</p>
			<div className='d-flex justify-content-end mt-4'>
				<button
					className='btn btn-danger me-2'
					onClick={onConfirm}>
					Delete
				</button>
				<button
					className='btn btn-secondary'
					onClick={onClose}>
					Cancel
				</button>
			</div>
		</div>
	);
};

export { DeleteModal };
