import { AUTH_SUCCESS } from "../actionTypes";
import { LOGOUT } from "../actionTypes";

export default function UsersReducer(
	state = { loggedIn: false, currentUser: {} },
	action
) {
	switch (action.type) {
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
