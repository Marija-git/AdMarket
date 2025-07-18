import React, { useState } from "react";
import { loginUser, registerUser } from "../store/AuthSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const LoginSignupPage = () => {
	const [isLogin, setIsLogin] = useState(true); // da li je trenutno prikazan Login ili Sign Up
	const [form, setForm] = useState({ username: "", password: "", phone: "" });

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { loading, error } = useSelector((state) => state.auth);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (isLogin) {
			try {
				await dispatch(
					loginUser({ username: form.username, password: form.password })
				).unwrap();
				navigate("/homepage");
			} catch (err) {
				console.error("Login failed:", err);
			}
		} else {
			try {
				await dispatch(
					registerUser({
						username: form.username,
						password: form.password,
						phone: form.phone,
					})
				).unwrap();
				navigate("/homepage");
			} catch (err) {
				console.error("Registration failed:", err);
			}
		}
	};

	return (
		<div className='container d-flex flex-column align-items-center justify-content-center mt-5 pt-5'>
			<h2>{isLogin ? "Login" : "Sign Up"}</h2>
			<form
				className='w-50'
				onSubmit={handleSubmit}>
				<div className='mb-3'>
					<label className='form-label'>Username</label>
					<input
						type='text'
						name='username'
						className='form-control'
						value={form.username}
						onChange={handleChange}
						required
					/>
				</div>
				<div className='mb-3'>
					<label className='form-label'>Password</label>
					<input
						type='password'
						name='password'
						className='form-control'
						value={form.password}
						onChange={handleChange}
						required
					/>
				</div>
				{!isLogin && (
					<div className='mb-3'>
						<label className='form-label'>Phone</label>
						<input
							type='text'
							name='phone'
							className='form-control'
							value={form.phone}
							onChange={handleChange}
							required
							placeholder='Enter 9 to 10 digits, numbers only (e.g. 0641234567)'
						/>
					</div>
				)}
				<button
					type='submit'
					className='btn btn-primary w-100'>
					{isLogin ? "Login" : "Register"}
				</button>
			</form>
			{loading && (
				<div className='text-info mt-2'>
					{isLogin ? "Logging in..." : "Signing up..."}
				</div>
			)}
			{error && <div className='text-danger mt-2'>{error}</div>}

			<button
				className='btn btn-link mt-3'
				onClick={() => setIsLogin(!isLogin)}>
				{isLogin
					? "Don't have an account? Sign up"
					: "Already have an account? Login"}
			</button>
		</div>
	);
};

export default LoginSignupPage;
