import axios from "axios";

const BASE_URL = "http://localhost:8080/api/auth";

export const login = async (username, password) => {
	try {
		const response = await axios.post(`${BASE_URL}/login`, {
			username,
			password,
		});

		const token = response.data.token;
		const payload = parseJwt(token);
		const extractedUsername = payload?.sub || "";

		return { token, username: extractedUsername };
	} catch (error) {
		console.error("Login failed:", error);
		throw error;
	}
};

export const signup = async (username, password, phone) => {
	try {
		const response = await axios.post(`${BASE_URL}/signup`, {
			username,
			password,
			phone,
		});
		const token = response.data.token;

		const extractedUsername = parseJwt(token)?.sub || username;

		return { token, username: extractedUsername };
	} catch (error) {
		console.error("Registration failed:", error);
		throw error;
	}
};

function parseJwt(token) {
	if (!token) return null;

	try {
		const base64Url = token.split(".")[1];
		const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		const jsonPayload = decodeURIComponent(
			atob(base64)
				.split("")
				.map((c) => {
					return `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`;
				})
				.join("")
		);
		return JSON.parse(jsonPayload);
	} catch (e) {
		console.error("Invalid token", e);
		return null;
	}
}
