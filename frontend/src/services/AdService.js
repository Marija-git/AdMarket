import axios from "axios";

const BASE_URL = "http://localhost:8080/api/ads";

export const fetchAds = async (params = {}, token = null) => {
	try {
		const response = await axios.get(BASE_URL, {
			params,
			headers: token //zbog mineOnly
				? {
						Authorization: `Bearer ${token}`,
				  }
				: {},
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching ads:", error);
		throw error;
	}
};

export const createAd = async (adData, token) => {
	try {
		const response = await axios.post(BASE_URL, adData, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error creating ad:", error);
		throw error;
	}
};

export const updateAd = async (id, adData, token) => {
	const response = await axios.put(`${BASE_URL}/${id}`, adData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
};

export const deleteAd = async (adId, token) => {
	return await axios.delete(`${BASE_URL}/${adId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};
