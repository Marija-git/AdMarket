import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAds, createAd, updateAd, deleteAd } from "../services/AdService";
import { toast } from "react-toastify";

export const loadAds = createAsyncThunk(
	"ads/loadAds",
	async (params, thunkAPI) => {
		try {
			const state = thunkAPI.getState();
			const token = state.auth.token; // uzmi token iz Redux state-a

			const data = await fetchAds(params, token);
			return data;
		} catch (err) {
			if (err.response?.status === 401) {
				toast.error("Unauthorized.");
			} else {
				toast.error("Failed to load ads.");
			}

			return thunkAPI.rejectWithValue(err.response?.data || "Unknown error");
		}
	}
);

export const createAdThunk = createAsyncThunk(
	"ads/createAd",
	async (adData, thunkAPI) => {
		try {
			const state = thunkAPI.getState();
			const token = state.auth.token;

			const createdAd = await createAd(adData, token);
			return createdAd;
		} catch (err) {
			toast.error("Failed to create ad.");
			return thunkAPI.rejectWithValue("Failed to create ad");
		}
	}
);

export const updateAdThunk = createAsyncThunk(
	"ads/updateAd",
	async ({ id, adData }, thunkAPI) => {
		try {
			const state = thunkAPI.getState();
			const token = state.auth.token;

			const updatedAd = await updateAd(id, adData, token);
			return updatedAd;
		} catch (err) {
			toast.error("Failed to update ad.");
			return thunkAPI.rejectWithValue("Failed to update ad");
		}
	}
);

export const deleteAdThunk = createAsyncThunk(
	"ads/deleteAd",
	async (adId, thunkAPI) => {
		try {
			const state = thunkAPI.getState();
			const token = state.auth.token;
			await deleteAd(adId, token);
		} catch (err) {
			toast.error("Failed to delete ad.");
			return thunkAPI.rejectWithValue("Failed to delete ad");
		}
	}
);

export const adInitialState = {
	content: [],
	page: 0,
	size: 20,
	totalPages: 0,
	totalElements: 0,
	loading: false,
	error: null,
	filters: {
		title: "",
		category: "",
		minPrice: "",
		maxPrice: "",
		mineOnly: false,
	},
};

const adSlice = createSlice({
	name: "ads",
	initialState: adInitialState,
	reducers: {
		setPage(state, action) {
			state.page = action.payload;
		},
		resetAds(state) {
			return { ...adInitialState }; // reset (later)
		},
		setFilters(state, action) {
			state.filters = { ...state.filters, ...action.payload };
			state.page = 0; // reset to first page when filters change
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadAds.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loadAds.fulfilled, (state, action) => {
				const data = action.payload;
				state.content = data.content;
				state.page = data.number;
				state.size = data.size;
				state.totalPages = data.totalPages;
				state.totalElements = data.totalElements;
				state.loading = false;
			})
			.addCase(loadAds.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(createAdThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createAdThunk.fulfilled, (state, action) => {
				state.loading = false;
				state.content.unshift(action.payload); //new add at the beginning of list
			})
			.addCase(createAdThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(updateAdThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateAdThunk.fulfilled, (state, action) => {
				state.loading = false;

				// change existing ad with a new one
				const updatedAd = action.payload;
				const index = state.content.findIndex((ad) => ad.id === updatedAd.id);
				if (index !== -1) {
					state.content[index] = updatedAd;
				}
			})
			.addCase(updateAdThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(deleteAdThunk.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteAdThunk.fulfilled, (state, action) => {
				state.loading = false;

				// delete ad from list immediately
				const deletedId = action.meta.arg;
				state.content = state.content.filter((ad) => ad.id !== deletedId);
			})
			.addCase(deleteAdThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const { setPage, resetAds, setFilters } = adSlice.actions;

export default adSlice.reducer;
