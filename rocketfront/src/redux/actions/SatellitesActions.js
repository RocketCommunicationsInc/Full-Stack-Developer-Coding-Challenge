export const getSatellites = () => {
	return (dispatch) => {
		dispatch({ type: "START_ADDING_SATELLITES" });
		fetch("http://localhost:3001/satellites")
			.then((res) => res.json())
			.then((JSON) => {
				dispatch({ type: "SET_SATELLITES", satellites: JSON });
			});
	};
};
