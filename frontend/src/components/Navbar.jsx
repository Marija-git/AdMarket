import React from "react";
import { logout } from "../store/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = ({ onAddAd }) => {
	const dispatch = useDispatch();
	const { isAuthenticated, username } = useSelector((state) => state.auth);

	const handleLogout = () => {
		dispatch(logout());
	};
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
						{isAuthenticated ? (
							<>
								<span className='navbar-text text-white me-2'>
									{username || "unknown user"}
								</span>
								<button
									className='btn btn-outline-light'
									onClick={onAddAd}>
									Add Ad
								</button>
								<button
									className='btn btn-light ms-1'
									onClick={handleLogout}>
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
