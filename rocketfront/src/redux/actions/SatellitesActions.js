const URL =
	process.env.NODE_ENV === "production"
		? "https://randirocket.herokuapp.com/"
		: "http://localhost:3001/";

export const getSatellites = () => {
	return (dispatch) => {
		dispatch({ type: "START_ADDING_SATELLITES" });
		fetch(URL + "satellites")
			.then((res) => res.json())
			.then((JSON) => {
				dispatch({ type: "SET_SATELLITES", satellites: JSON });
			});
	};
};
