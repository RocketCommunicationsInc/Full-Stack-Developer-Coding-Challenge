import { ADD_ERROR, CLEAR_ERROR, LOGOUT } from "../actionTypes";
import { AUTH_SUCCESS, AUTH_FAILURE } from "../actionTypes";

const URL =
	process.env.NODE_ENV === "production"
		? "https://lit-springs-86031.herokuapp.com/"
		: "http://localhost:3001/";

export const signup = (userData, handleSuccess) => {
	return (dispatch) => {
		fetch(URL + "users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
			body: JSON.stringify({ user: userData }),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.status && data.status !== 200) {
					dispatch({
						type: ADD_ERROR,
						errors: data.errors,
					});
				} else {
					dispatch({
						type: AUTH_SUCCESS,
						payload: {
							loggedIn: true,
							currentUser: data,
						},
					});
					dispatch({ type: CLEAR_ERROR });
					handleSuccess();
				}
			});
	};
};

export const login = (userData, handleSuccess) => {
	return (dispatch) => {
		fetch(URL + "login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
			body: JSON.stringify(userData),
		})
			.then((resp) => resp.json())
			.then((data) => {
				console.log(data);
				if (data.status && data.status !== 200) {
					dispatch({
						type: ADD_ERROR,
						payload: {
							errors: data.errors,
						},
					});
				} else {
					dispatch({
						type: AUTH_SUCCESS,
						payload: {
							loggedIn: true,
							currentUser: data,
						},
					});
					dispatch({ type: CLEAR_ERROR });
					handleSuccess();
				}
			});
	};
};

export const fetchLoginStatus = () => (dispatch) => {
	fetch(URL + "logged_in", { withCredentials: true })
		.then((resp) => resp.json())
		.then((data) => {
			if (data.status && data.status !== 200) {
				dispatch({
					type: ADD_ERROR,
					payload: {
						errors: "Oops, that didn't work.  Please try again.",
					},
				});
			} else {
				dispatch({
					type: AUTH_SUCCESS,
					payload: {
						loggedIn: true,
						currentUser: data,
					},
				});
				dispatch({ type: CLEAR_ERROR });
			}
		});
};

export const logout = () => {
	return (dispatch) => {
		fetch(URL + "logout", {
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((resp) => resp.json())
			.then((data) => {
				if (data.status && data.status !== 200) {
					dispatch({
						type: ADD_ERROR,
						payload: {
							errors: "Oops, that didn't work.  Please try again.",
						},
					});
				} else {
					dispatch({
						type: LOGOUT,
					});
					dispatch({ type: CLEAR_ERROR });
				}
			});
	};
};
