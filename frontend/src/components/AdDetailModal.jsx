import React from "react";

const AdDetailModal = ({ ad, isOwner, onEdit, onDelete }) => {
	if (!ad || !ad.title) return null;

	return (
		<div>
			<h4 className='mb-3'>Ad Details</h4>
			<img
				src={ad.imageUrl}
				className='img-fluid mb-3'
				alt='ad'
				style={{ maxHeight: "250px", objectFit: "cover" }}
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
				<strong>Posted by:</strong> {ad.ownerUsername}
			</p>
			<p>
				<strong>Phone:</strong> {ad.phone}
			</p>
			<p>
				<strong>Date Posted:</strong> {ad.datePosted}
			</p>

			{isOwner && (
				<div className='d-flex justify-content-end mt-3'>
					<button
						className='btn btn-warning me-2'
						onClick={onEdit}>
						Edit
					</button>
					<button
						className='btn btn-danger'
						onClick={onDelete}>
						Delete
					</button>
				</div>
			)}
		</div>
	);
};

export default AdDetailModal;
