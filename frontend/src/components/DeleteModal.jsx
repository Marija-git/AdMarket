import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const DeleteModal = ({ onClose, onConfirm }) => {
	return (
		<div
			className='modal fade'
			id='deleteConfirmModal'
			tabIndex='-1'>
			<div className='modal-dialog modal-sm'>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title'>Confirm Delete</h5>
						<button
							type='button'
							className='btn-close'
							data-bs-dismiss='modal'
							onClick={onClose}></button>
					</div>
					<div className='modal-body'>
						<p>Are you sure you want to delete this ad?</p>
					</div>
					<div className='modal-footer'>
						<button
							className='btn btn-danger'
							onClick={onConfirm}>
							Delete
						</button>
						<button
							className='btn btn-secondary'
							data-bs-dismiss='modal'
							onClick={onClose}>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export { DeleteModal };
