import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import AlertsReducer from "./reducers/AlertsReducer";
import SatellitesReducer from "./reducers/SatellitesReducer";
import UsersReducer from "./reducers/UsersReducer";

const rootReducer = combineReducers({
	alerts: AlertsReducer,
	satellites: SatellitesReducer,
	users: UsersReducer,
});

const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(thunk, logger),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

export default store;
