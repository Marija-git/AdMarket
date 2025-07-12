import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSignupPage from "./pages/LoginSignupPage";
import Homepage from "./pages/Homepage";
import NotFound from "./pages/NotFound";

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
					element={<Homepage />}
				/>
				<Route
					path='*'
					element={<NotFound />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
