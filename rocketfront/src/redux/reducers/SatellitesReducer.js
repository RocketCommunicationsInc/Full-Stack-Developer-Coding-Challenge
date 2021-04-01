import { SET_SATELLITES } from "../actionTypes";
import { START_ADDING_SATELLITES } from "../actionTypes";

export default function SatellitesReducer(
	state = { satellites: [], requesting: false },
	action
) {
	switch (action.type) {
		case START_ADDING_SATELLITES:
			return {
				...state,
				requesting: true,
			};

		case SET_SATELLITES:
			return {
				...state,
				satellites: action.satellites,
				requesting: false,
			};

		default:
			return state;
	}
}
