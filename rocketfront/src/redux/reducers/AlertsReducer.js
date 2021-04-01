import { SET_ALERTS } from "../actionTypes";
import { START_ADDING_ALERTS } from "../actionTypes";

export default function AlertsReducer(
	state = { alerts: [], requesting: false },
	action
) {
	switch (action.type) {
		case START_ADDING_ALERTS:
			return {
				...state,
				requesting: true,
			};

		case SET_ALERTS:
			return {
				...state,
				alerts: action.alerts,
				requesting: false,
			};

		default:
			return state;
	}
}
