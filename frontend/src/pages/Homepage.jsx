import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import useAuthUI from "../scripts/useAuthUI";
import Navbar from "../components/Navbar";
import AdDetailModal from "../components/AdDetailModal";
import AdFormModal from "../components/AdFormModal";
import { DeleteModal } from "../components/DeleteModal";

const Homepage = () => {
	const { isLoggedIn, username } = useAuthUI();
	const [selectedAd, setSelectedAd] = useState(null);
	const [editAd, setEditAd] = useState(null); // za AdFormModal
	const [deleteAdId, setDeleteAdId] = useState(null); // za DeleteConfirmModal

	const ads = [
		{
			id: 1,
			title: "Mountain Bike",
			description: "Very fast and light.",
			imageUrl: "https://via.placeholder.com/300",
			price: 120,
			category: "Sports",
			city: "New York",
			username: "user123",
			phone: "060123456",
			datePosted: "2025-07-12",
		},
	];

	return (
		<div className='container mt-5 pt-4'>
			<Navbar onAddAd={() => setEditAd(null)} />

			{/* Filters */}
			<div className='card p-3 my-4'>
				<form className='row g-2'>
					<div className='col-md-3'>
						<input
							type='text'
							className='form-control'
							placeholder='Search by title'
						/>
					</div>
					<div className='col-md-2'>
						<select className='form-select'>
							<option value=''>Category</option>
							<option value='clothing'>Clothing</option>
							<option value='tools'>Tools</option>
							<option value='sports'>Sports</option>
							<option value='accessories'>Accessories</option>
							<option value='furniture'>Furniture</option>
							<option value='pets'>Pets</option>
							<option value='games'>Games</option>
							<option value='books'>Books</option>
							<option value='technology'>Technology</option>
						</select>
					</div>
					<div className='col-md-2'>
						<input
							type='number'
							className='form-control'
							placeholder='Min price'
						/>
					</div>
					<div className='col-md-2'>
						<input
							type='number'
							className='form-control'
							placeholder='Max price'
						/>
					</div>
					<div className='col-md-2'>
						<div className='form-check'>
							<input
								className='form-check-input'
								type='checkbox'
								id='mineOnly'
							/>
							<label
								className='form-check-label'
								htmlFor='mineOnly'>
								Show mine only
							</label>
						</div>
					</div>
					<div className='col-md-1'>
						<button
							type='submit'
							className='btn btn-primary w-100'>
							Filter
						</button>
					</div>
				</form>
			</div>

			{/* Ads Table */}
			<table className='table table-striped'>
				<thead>
					<tr>
						<th>Image</th>
						<th>Title</th>
						<th>Price</th>
						<th>City</th>
						<th>Category</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{ads.map((ad) => (
						<tr key={ad.id}>
							<td>
								<img
									src={ad.imageUrl}
									className='img-thumbnail'
									alt='ad'
									style={{ maxWidth: "60px" }}
								/>
							</td>
							<td>
								<a
									href='#'
									onClick={(e) => {
										e.preventDefault();
										setSelectedAd(ad);
										const modal = new window.bootstrap.Modal(
											document.getElementById("adDetailsModal")
										);
										modal.show();
									}}>
									{ad.title}
								</a>
							</td>
							<td>${ad.price}</td>
							<td>{ad.city}</td>
							<td>{ad.category}</td>
							<td>
								<button
									className='btn btn-warning btn-sm me-2'
									data-bs-toggle='modal'
									data-bs-target='#adFormModal'
									onClick={() => setEditAd(ad)}>
									Edit
								</button>
								<button
									className='btn btn-danger btn-sm'
									data-bs-toggle='modal'
									data-bs-target='#deleteConfirmModal'
									onClick={() => setDeleteAdId(ad.id)}>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{/* Modals */}
			<AdDetailModal
				ad={selectedAd}
				isOwner={true}
				onEdit={() => {}}
				onDelete={() => {}}
			/>
			<AdFormModal
				ad={editAd}
				onClose={() => setEditAd(null)}
				onSubmit={(data) => console.log("Submitted:", data)}
			/>
			<DeleteModal
				onClose={() => setDeleteAdId(null)}
				onConfirm={() => console.log("Delete ID:", deleteAdId)}
			/>

			{/* Pagination */}
			<nav>
				<ul className='pagination justify-content-center'>
					<li className='page-item disabled'>
						<a className='page-link'>Previous</a>
					</li>
					<li className='page-item active'>
						<a
							className='page-link'
							href='#'>
							1
						</a>
					</li>
					<li className='page-item'>
						<a
							className='page-link'
							href='#'>
							2
						</a>
					</li>
					<li className='page-item'>
						<a
							className='page-link'
							href='#'>
							Next
						</a>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Homepage;
