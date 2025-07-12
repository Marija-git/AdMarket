import React from "react";
import useAuthUI from "../scripts/useAuthUI";

const Navbar = ({ onAddAd }) => {
	const { isLoggedIn, username } = useAuthUI();
	return (
		<>
			{/* Navbar */}
			<nav className='navbar navbar-expand-lg navbar-dark bg-dark fixed-top'>
				<div className='container-fluid'>
					<a
						className='navbar-brand'
						href='#'>
						AdMarket
					</a>
					<div>
						{isLoggedIn ? (
							<>
								<span className='navbar-text text-white me-2'>{username}</span>
								<button
									className='btn btn-outline-light'
									data-bs-toggle='modal'
									data-bs-target='#adFormModal'
									onClick={onAddAd}>
									Add Ad
								</button>
								<button
									className='btn btn-light ms-1'
									onClick={() => {
										localStorage.removeItem("authToken");
										localStorage.getItem("username");
										window.location.href = "/"; // Redirect to login
									}}>
									Logout
								</button>
							</>
						) : (
							<>
								<button className='btn btn-outline-light me-2'>Login</button>
								<button className='btn btn-light'>Sign Up</button>
							</>
						)}
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
