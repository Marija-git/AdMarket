import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSignupPage from "./pages/LoginSignupPage";
import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path='/'
					element={<LoginSignupPage />}
				/>
				<Route
					path='/homepage'
					element={
						<ProtectedRoute>
							<Homepage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='*'
					element={<NotFound />}
				/>
			</Routes>

			<ToastContainer
				position='top-right'
				autoClose={3000}
			/>
		</Router>
	);
}

export default App;
