import { LOGOUT } from "../actionTypes";
import { AUTH_SUCCESS } from "../actionTypes";
import { RuxModal } from "@astrouxds/rux-modal/rux-modal.js";

export const signup = (userData) => {
	return (dispatch) => {
		fetch("http://localhost:3001/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({ user: userData }),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error && data.error !== "") {
					return (
						<div>
							<rux-modal
								title="error"
								message={data.error}
								confirmText="Ok"
								denyText="Cancel"
							></rux-modal>
						</div>
					);
				} else {
					dispatch({
						type: AUTH_SUCCESS,
						payload: {
							loggedIn: true,
							currentUser: data.user,
						},
					});
				}
			});
	};
};

export const login = (userData) => {
	return (dispatch) => {
		fetch("http://localhost:3001/user", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(userData),
		})
			.then((resp) => resp.json())
			.then((data) => {
				console.log(data);
				if (data.error && data.error !== "") {
					return (
						<div>
							<rux-modal
								title="error"
								message={data.error}
								confirmText="Ok"
								denyText="Cancel"
							></rux-modal>
						</div>
					);
				} else {
					dispatch({
						type: AUTH_SUCCESS,
						payload: {
							loggedIn: true,
							currentUser: data.user,
						},
					});
				}
			});
	};
};

export const checkLoggedIn = () => {
	return (dispatch) => {
		fetch(`http://localhost:3001/logged_in`, {
			credentials: "include",
		})
			.then((res) => res.json())

			.then((data) => {
				if (data.error && data.error !== "") {
					return (
						<div>
							<rux-modal
								title="error"
								message={data.error}
								confirmText="Ok"
								denyText="Cancel"
							></rux-modal>
						</div>
					);
				} else {
					dispatch({
						type: AUTH_SUCCESS,
						payload: {
							loggedIn: data.logged_in,
							currentUser: data.user,
						},
					});
				}
			});
	};
};

export const logout = () => {
	return (dispatch) => {
		dispatch({
			type: LOGOUT,
			payload: {
				loggedIn: false,
				currentUser: {},
			},
		});
	};
};
