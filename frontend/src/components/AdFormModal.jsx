import React, { useState, useEffect } from "react";

const AdFormModal = ({ ad, onClose, onSubmit }) => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		imageUrl: "",
		price: "",
		category: "",
		city: "",
	});

	useEffect(() => {
		if (ad) {
			setFormData(ad);
		} else {
			setFormData({
				title: "",
				description: "",
				imageUrl: "",
				price: "",
				category: "",
				city: "",
			});
		}
	}, [ad]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<form onSubmit={handleSubmit}>
			<h4 className='mb-3'>{ad?.id ? "Edit Ad" : "Add New Ad"}</h4>

			<input
				type='text'
				name='title'
				className='form-control mb-2'
				placeholder='Title'
				value={formData.title}
				onChange={handleChange}
				required
			/>

			<textarea
				name='description'
				className='form-control mb-2'
				placeholder='Description'
				value={formData.description}
				onChange={handleChange}
				required
			/>

			<input
				type='url'
				name='imageUrl'
				className='form-control mb-2'
				placeholder='Image URL'
				value={formData.imageUrl}
				onChange={handleChange}
			/>

			<input
				type='number'
				name='price'
				className='form-control mb-2'
				placeholder='Price'
				value={formData.price}
				onChange={handleChange}
				required
			/>

			<select
				name='category'
				className='form-select mb-2'
				value={formData.category}
				onChange={handleChange}
				required>
				<option value=''>Select category</option>
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

			<input
				type='text'
				name='city'
				className='form-control mb-2'
				placeholder='City'
				value={formData.city}
				onChange={handleChange}
				required
			/>

			<div className='d-flex justify-content-end mt-3'>
				<button
					type='submit'
					className='btn btn-primary me-2'>
					{ad?.id ? "Update" : "Add"}
				</button>
				<button
					type='button'
					className='btn btn-secondary'
					onClick={onClose}>
					Cancel
				</button>
			</div>
		</form>
	);
};

export default AdFormModal;
