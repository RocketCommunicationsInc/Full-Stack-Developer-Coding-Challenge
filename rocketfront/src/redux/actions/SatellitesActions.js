const URL =
	process.env.NODE_ENV === "production"
		? "https://randirocket.herokuapp.com/satellites"
		: "http://localhost:3001/satellites";

export const getSatellites = () => {
	return (dispatch) => {
		dispatch({ type: "START_ADDING_SATELLITES" });
		fetch(URL)
			.then((res) => res.json())
			.then((JSON) => {
				dispatch({ type: "SET_SATELLITES", satellites: JSON });
			});
	};
};
