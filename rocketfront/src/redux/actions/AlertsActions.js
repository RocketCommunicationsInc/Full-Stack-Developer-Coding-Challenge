// const URL =
// 	process.env.NODE_ENV === "production"
// 		? "https://randirocket.herokuapp.com/alerts"
// 		: "http://localhost:3001/alerts";

export const getAlerts = () => {
	return (dispatch) => {
		dispatch({ type: "START_ADDING_ALERTS" });
		fetch("https://randirocket.herokuapp.com/alerts")
			.then((res) => res.json())
			.then((JSON) => {
				dispatch({ type: "SET_ALERTS", alerts: JSON });
			})
			.catch((error) => {
				throw error;
			});
	};
};
