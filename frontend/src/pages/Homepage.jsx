import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import AdDetailModal from "../components/AdDetailModal";
import AdFormModal from "../components/AdFormModal";
import { DeleteModal } from "../components/DeleteModal";
import { useSelector, useDispatch } from "react-redux";
import {
	loadAds,
	setPage,
	setFilters,
	createAdThunk,
	updateAdThunk,
	deleteAdThunk,
} from "../store/AdSlice";
import Modal from "../components/Modal";

const Homepage = () => {
	const username = useSelector((state) => state.auth.username);
	const [selectedAd, setSelectedAd] = useState(null);
	const [editAd, setEditAd] = useState(null);
	const [deleteAdId, setDeleteAdId] = useState(null);

	const dispatch = useDispatch();
	const {
		content: ads,
		page,
		size,
		totalPages,
		loading,
		error,
		filters,
	} = useSelector((state) => state.ads);

	const [title, setTitle] = useState("");
	const [category, setCategory] = useState("");
	const [minPrice, setMinPrice] = useState("");
	const [maxPrice, setMaxPrice] = useState("");
	const [mineOnly, setMineOnly] = useState(false);

	useEffect(() => {
		dispatch(loadAds({ ...filters, page, size }));
	}, [dispatch, filters, page, size]);

	if (loading) return <p>Loading ads...</p>;

	const handlePageChange = (newPage) => {
		if (newPage !== page) {
			dispatch(setPage(newPage));
		}
	};

	const handleCreateAd = async (adData) => {
		try {
			await dispatch(createAdThunk(adData)).unwrap();

			setEditAd(null);

			dispatch(loadAds({ ...filters, page, size }));
		} catch (err) {
			console.error("Failed to create ad:", err);
		}
	};

	const handleEditAd = async (adId, adData) => {
		try {
			await dispatch(updateAdThunk({ id: adId, adData })).unwrap();

			setEditAd(null);

			dispatch(loadAds({ ...filters, page, size }));
		} catch (err) {
			console.error("Failed to update ad:", err);
			alert("Error updating ad.");
		}
	};

	const handleFormSubmit = (adData) => {
		if (editAd?.id) {
			handleEditAd(editAd.id, adData);
		} else {
			handleCreateAd(adData);
		}
	};

	const handleDeleteAd = async (adId) => {
		try {
			await dispatch(deleteAdThunk(adId)).unwrap();
			setDeleteAdId(null);
			dispatch(loadAds({ ...filters, page, size }));
		} catch (err) {
			console.error("Failed to delete ad:", err);
			alert("Error deleting ad.");
		}
	};

	return (
		<div className='container mt-5 pt-4'>
			<Navbar onAddAd={() => setEditAd({})} />

			{/* Filters */}
			<div className='card p-3 my-4'>
				<form
					className='row g-2'
					onSubmit={(e) => {
						e.preventDefault();
						dispatch(
							setFilters({ title, category, minPrice, maxPrice, mineOnly })
						);
					}}>
					<div className='col-md-3'>
						<input
							type='text'
							className='form-control'
							placeholder='Search by title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div className='col-md-2'>
						<select
							className='form-select'
							value={category}
							onChange={(e) => setCategory(e.target.value)}>
							<option value='CLOTHING'>CLOTHING</option>
							<option value='TOOLS'>TOOLS</option>
							<option value='SPORTS'>SPORTS</option>
							<option value='ACCESSORIES'>ACCESSORIES</option>
							<option value='FURNITURE'>FURNITURE</option>
							<option value='PETS'>PETS</option>
							<option value='GAMES'>GAMES</option>
							<option value='BOOKS'>BOOKS</option>
							<option value='TECHNOLOGY'>TECHNOLOGY</option>
						</select>
					</div>
					<div className='col-md-2'>
						<input
							type='number'
							className='form-control'
							placeholder='Min price'
							value={minPrice}
							onChange={(e) => setMinPrice(e.target.value)}
						/>
					</div>
					<div className='col-md-2'>
						<input
							type='number'
							className='form-control'
							placeholder='Max price'
							value={maxPrice}
							onChange={(e) => setMaxPrice(e.target.value)}
						/>
					</div>
					<div className='col-md-2'>
						<div className='form-check'>
							<input
								className='form-check-input'
								type='checkbox'
								id='mineOnly'
								checked={mineOnly}
								onChange={(e) => setMineOnly(e.target.checked)}
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
									}}>
									{ad.title}
								</a>
							</td>
							<td>${ad.price}</td>
							<td>{ad.city}</td>
							<td>{ad.category}</td>
							<td>
								{username === ad.ownerUsername && (
									<>
										<button
											className='btn btn-warning btn-sm me-2'
											onClick={() => setEditAd(ad)}>
											Edit
										</button>

										<button
											className='btn btn-danger btn-sm'
											onClick={() => setDeleteAdId(ad.id)}>
											Delete
										</button>
									</>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{/* Modals */}
			<Modal
				isOpen={!!selectedAd}
				onClose={() => setSelectedAd(null)}>
				<AdDetailModal
					ad={selectedAd}
					isOwner={selectedAd?.ownerUsername === username}
					onEdit={() => {
						setEditAd(selectedAd);
						setSelectedAd(null);
					}}
					onDelete={() => {
						setDeleteAdId(selectedAd.id);
						setSelectedAd(null);
					}}
				/>
			</Modal>

			<Modal
				isOpen={!!editAd}
				onClose={() => setEditAd(null)}>
				<AdFormModal
					ad={editAd}
					onClose={() => setEditAd(null)}
					onSubmit={handleFormSubmit}
				/>
			</Modal>

			<Modal
				isOpen={!!deleteAdId}
				onClose={() => setDeleteAdId(null)}>
				<DeleteModal
					onClose={() => setDeleteAdId(null)}
					onConfirm={() => handleDeleteAd(deleteAdId)}
				/>
			</Modal>

			{/* Pagination */}
			<nav>
				<ul className='pagination justify-content-center'>
					{/* Previous */}
					<li className={`page-item ${page === 0 ? "disabled" : ""}`}>
						<a
							className='page-link'
							href='#'
							onClick={(e) => {
								e.preventDefault();
								handlePageChange(page - 1);
							}}>
							Previous
						</a>
					</li>

					{/* Page numbers */}
					{[...Array(totalPages).keys()].map((num) => (
						<li
							key={num}
							className={`page-item ${num === page ? "active" : ""}`}>
							<a
								className='page-link'
								href='#'
								onClick={(e) => {
									e.preventDefault();
									handlePageChange(num);
								}}>
								{num + 1}
							</a>
						</li>
					))}

					{/* Next */}
					<li
						className={`page-item ${page >= totalPages - 1 ? "disabled" : ""}`}>
						<a
							className='page-link'
							href='#'
							onClick={(e) => {
								e.preventDefault();
								handlePageChange(page + 1);
							}}>
							Next
						</a>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Homepage;
