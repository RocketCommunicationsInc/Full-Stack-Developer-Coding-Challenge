const URL =
	process.env.NODE_ENV === "production"
		? "https://lit-springs-86031.herokuapp.com/"
		: "http://localhost:3001/";

export const getAlerts = () => {
	return (dispatch) => {
		dispatch({ type: "START_ADDING_ALERTS" });
		fetch(URL + "alerts")
			.then((res) => res.json())
			.then((JSON) => {
				dispatch({ type: "SET_ALERTS", alerts: JSON });
			})
			.catch((error) => {
				throw error;
			});
	};
};
