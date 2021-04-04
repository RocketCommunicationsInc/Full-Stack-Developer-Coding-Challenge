import { ADD_ERROR, CLEAR_ERROR } from "../actionTypes";

export default function ErrorsReducer(state = [], action) {
	switch (action.type) {
		case ADD_ERROR:
			return [action.payload.errors];
		case CLEAR_ERROR:
			return [];
		default:
			return state;
	}
}
