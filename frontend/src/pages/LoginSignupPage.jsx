import React, { useState } from "react";

const LoginSignupPage = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [form, setForm] = useState({ username: "", password: "", phone: "" });

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Simulacija backenda — ovde ide tvoj API poziv
		const fakeToken = "sampleToken123";

		if (isLogin) {
			// Login
			if (form.username && form.password) {
				localStorage.setItem("authToken", fakeToken);
				localStorage.setItem("username", form.username);
				window.location.href = "/homepage";
			}
		} else {
			// Signup
			if (form.username && form.password && form.phone) {
				localStorage.setItem("authToken", fakeToken);
				localStorage.setItem("username", form.username);
				window.location.href = "/homepage";
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
						/>
					</div>
				)}
				<button
					type='submit'
					className='btn btn-primary w-100'>
					{isLogin ? "Login" : "Register"}
				</button>
			</form>
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
