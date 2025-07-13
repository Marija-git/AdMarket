import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, signup } from "../services/AuthService";

export const loginUser = createAsyncThunk(
	"auth/loginUser",
	async ({ username, password }, thunkAPI) => {
		try {
			const { token, username: extractedUsername } = await login(
				username,
				password
			);

			localStorage.setItem("authToken", token);
			localStorage.setItem("username", extractedUsername);

			return { token, username: extractedUsername };
		} catch (err) {
			return thunkAPI.rejectWithValue(
				"Invalid or incomplete input. Please check your fields "
			);
		}
	}
);

export const registerUser = createAsyncThunk(
	"auth/registerUser",
	async ({ username, password, phone }, thunkAPI) => {
		try {
			const { token, username: extractedUsername } = await signup(
				username,
				password,
				phone
			);

			localStorage.setItem("authToken", token);
			localStorage.setItem("username", extractedUsername);

			return { token, username: extractedUsername };
		} catch (err) {
			return thunkAPI.rejectWithValue(
				"Invalid or incomplete input. Please check your fields"
			);
		}
	}
);

const initialState = {
	token: localStorage.getItem("authToken") || null,
	username: localStorage.getItem("username") || "",
	loading: false,
	error: null,
	isAuthenticated: !!localStorage.getItem("authToken"),
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout(state) {
			localStorage.removeItem("authToken");
			localStorage.removeItem("username");
			window.location.href = "/";
			state.token = null;
			state.username = "";
			state.isAuthenticated = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				const { token, username } = action.payload;
				localStorage.setItem("authToken", token);
				localStorage.setItem("username", username);
				state.token = token;
				state.username = username;
				state.isAuthenticated = true;
				state.loading = false;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(registerUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				const { token, username } = action.payload;
				localStorage.setItem("authToken", token);
				localStorage.setItem("username", username);
				state.token = token;
				state.username = username;
				state.isAuthenticated = true;
				state.loading = false;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
