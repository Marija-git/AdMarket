const useAuthUI = () => {
	// Fake auth state — zameni sa pravom autentifikacijom kad povežeš backend
	const isLoggedIn = true; // promeni u false da testiraš
	const username = "user123";
	return { isLoggedIn, username };
};

export default useAuthUI;

// const useAuthUI = () => {
// 	const token = localStorage.getItem("authToken");
// 	const username = localStorage.getItem("username");

// 	const isLoggedIn = !!token;

// 	return { isLoggedIn, username };
// };

// export default useAuthUI;
