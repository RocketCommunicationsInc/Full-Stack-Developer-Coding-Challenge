export const getAlerts = () => {
	return (dispatch) => {
		dispatch({ type: "START_ADDING_ALERTS" });
		fetch("http://localhost:3001/alerts")
			.then((res) => res.json())
			.then((JSON) => {
				dispatch({ type: "SET_ALERTS", alerts: JSON });
			})
			.catch((error) => {
				throw error;
			});
	};
};
