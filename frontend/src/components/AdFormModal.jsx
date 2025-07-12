import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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
		<div
			className='modal fade'
			id='adFormModal'
			tabIndex='-1'>
			<div className='modal-dialog'>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title'>{ad ? "Edit Ad" : "Add New Ad"}</h5>
						<button
							type='button'
							className='btn-close'
							data-bs-dismiss='modal'
							onClick={onClose}></button>
					</div>
					<form
						onSubmit={handleSubmit}
						className='modal-body'>
						<input
							type='text'
							className='form-control mb-2'
							name='title'
							placeholder='Title'
							value={formData.title}
							onChange={handleChange}
							required
						/>
						<textarea
							className='form-control mb-2'
							name='description'
							placeholder='Description'
							value={formData.description}
							onChange={handleChange}
							required
						/>
						<input
							type='url'
							className='form-control mb-2'
							name='imageUrl'
							placeholder='Image URL'
							value={formData.imageUrl}
							onChange={handleChange}
						/>
						<input
							type='number'
							className='form-control mb-2'
							name='price'
							placeholder='Price'
							value={formData.price}
							onChange={handleChange}
							required
						/>
						<select
							className='form-select mb-2'
							name='category'
							value={formData.category}
							onChange={handleChange}
							required>
							<option value=''>Select category</option>
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
						<input
							type='text'
							className='form-control mb-2'
							name='city'
							placeholder='City'
							value={formData.city}
							onChange={handleChange}
							required
						/>
						<div className='modal-footer'>
							<button
								type='submit'
								className='btn btn-primary'>
								{ad ? "Update" : "Add"}
							</button>
							<button
								type='button'
								className='btn btn-secondary'
								data-bs-dismiss='modal'
								onClick={onClose}>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AdFormModal;
