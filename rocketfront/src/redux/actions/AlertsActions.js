export const getAlerts = () => {
	return (dispatch) => {
		fetch("http://localhost:3000/alerts")
			.then((res) => res.json())
			.then((JSON) => {
				dispatch({ type: "SET_ALERTS", alerts: { data: JSON } });
			});
	};
};
