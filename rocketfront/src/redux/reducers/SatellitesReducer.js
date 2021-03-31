import { SET_SATELLITES } from "../actionTypes";

export default function SatellitesReducer(state = { satellites: [] }, action) {
	switch (action.type) {
		case SET_SATELLITES:
			return {
				...state,
				satellites: action.satellites,
			};
		default:
			return state;
	}
}
