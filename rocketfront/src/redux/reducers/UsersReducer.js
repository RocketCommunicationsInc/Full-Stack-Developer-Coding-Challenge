import { AUTH_SUCCESS, AUTH_FAILURE } from "../actionTypes";
import { LOGOUT } from "../actionTypes";

export default function UsersReducer(
	state = {
		loggedIn: false,
		currentUser: {},
		errors: [],
	},
	action
) {
	switch (action.type) {
		case AUTH_FAILURE:
			return {
				...state,
				loggedIn: false,
				errors: action.payload.errors,
			};
		case AUTH_SUCCESS:
			return {
				...state,
				loggedIn: true,
				currentUser: action.payload.currentUser,
			};

		case LOGOUT:
			return {
				...state,
				loggedIn: false,
				currentUser: {},
			};

		default:
			return state;
	}
}
