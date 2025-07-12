import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AdDetailsModal = ({ ad, isOwner, onEdit, onDelete }) => {
	if (!ad || !ad.title) return null;

	return (
		<div
			className='modal fade'
			id='adDetailsModal'
			tabIndex='-1'>
			<div className='modal-dialog'>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title'>Ad Details</h5>
						<button
							type='button'
							className='btn-close'
							data-bs-dismiss='modal'></button>
					</div>
					<div className='modal-body'>
						<img
							src={ad.imageUrl}
							className='img-fluid mb-3'
							alt='ad'
						/>
						<p>
							<strong>Title:</strong> {ad.title}
						</p>
						<p>
							<strong>Description:</strong> {ad.description}
						</p>
						<p>
							<strong>Price:</strong> ${ad.price}
						</p>
						<p>
							<strong>Category:</strong> {ad.category}
						</p>
						<p>
							<strong>City:</strong> {ad.city}
						</p>
						<p>
							<strong>Posted by:</strong> {ad.username}
						</p>
						<p>
							<strong>Phone:</strong> {ad.phone}
						</p>
						<p>
							<strong>Date Posted:</strong> {ad.datePosted}
						</p>
					</div>
					{isOwner && (
						<div className='modal-footer'>
							<button
								className='btn btn-warning'
								onClick={onEdit}>
								Edit
							</button>
							<button
								className='btn btn-danger'
								onClick={onDelete}>
								Delete
							</button>
							<button
								className='btn btn-secondary'
								data-bs-dismiss='modal'>
								Close
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default AdDetailsModal;
