import { configureStore } from "@reduxjs/toolkit";
import adReducer from "./AdSlice";
import authReducer from "./AuthSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		ads: adReducer,
	},
});

export default store;
