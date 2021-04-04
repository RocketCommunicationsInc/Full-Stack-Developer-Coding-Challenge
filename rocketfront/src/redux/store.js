import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import AlertsReducer from "./reducers/AlertsReducer";
import SatellitesReducer from "./reducers/SatellitesReducer";
import UsersReducer from "./reducers/UsersReducer";
import ErrorsReducer from "./reducers/ErrorsReducer";

const rootReducer = combineReducers({
	alerts: AlertsReducer,
	satellites: SatellitesReducer,
	users: UsersReducer,
	errors: ErrorsReducer,
});

const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(thunk, logger),
		window.__REDUX_DEVTOOLS_EXTENSION__
			? window.__REDUX_DEVTOOLS_EXTENSION__()
			: (f) => f
	)
);

export default store;
