export const getSatellites = () => {
	return (dispatch) => {
		fetch("http://localhost:3000/satellites")
			.then((res) => res.json())
			.then((JSON) => {
				dispatch({ type: "SET_SATELLITES", alerts: { data: JSON } });
			});
	};
};
