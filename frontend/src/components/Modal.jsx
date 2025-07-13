import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	return (
		<div
			className='modal-backdrop'
			onClick={onClose}>
			<div
				className='modal-container'
				onClick={(e) => e.stopPropagation()}>
				<div className='modal-header'>
					<button
						className='close-btn'
						onClick={onClose}>
						&times;
					</button>
				</div>
				<div className='modal-body'>{children}</div>
			</div>

			<style jsx>{`
				.modal-backdrop {
					position: fixed;
					top: 0;
					left: 0;
					width: 100vw;
					height: 100vh;
					background: rgba(0, 0, 0, 0.5);
					display: flex;
					justify-content: center;
					align-items: center;
					z-index: 9999;
				}
				.modal-container {
					background: white;
					border-radius: 8px;
					max-width: 600px;
					width: 90%;
					box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
				}
				.modal-header {
					text-align: right;
					padding: 10px;
				}
				.close-btn {
					border: none;
					background: none;
					font-size: 1.5rem;
					cursor: pointer;
				}
				.modal-body {
					padding: 20px;
				}
			`}</style>
		</div>
	);
};

export default Modal;
