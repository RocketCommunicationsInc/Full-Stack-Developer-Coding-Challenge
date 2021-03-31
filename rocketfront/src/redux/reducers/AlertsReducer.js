import { SET_ALERTS } from "../actionTypes";

export default function AlertsReducer(state = { alerts: [] }, action) {
	switch (action.type) {
		case SET_ALERTS:
			return {
				...state,
				alerts: action.alerts,
			};
		default:
			return state;
	}
}
