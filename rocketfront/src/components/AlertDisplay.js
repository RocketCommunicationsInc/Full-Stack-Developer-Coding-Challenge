import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAlerts } from "../redux/actions/AlertsActions";
import AlertInfo from "./AlertInfo";
import { RuxLog } from "@astrouxds/rux-log/rux-log.js";

class AlertDisplay extends Component {
	constructor(props) {
		super(props);
		this.state = {
			alerts: [],
		};
	}

	componentDidMount(prevProps) {
		if (this.props !== prevProps) {
			this.props.getAlerts();
		}
		this.updateAlerts();
	}

	updateAlerts() {
		const { alert } = this.props;
		this.setState({
			alerts: [
				{
					message: alert.errorMessage,
					category: alert.errorCategory,
					status: alert.errorSeverity,
					time: new Date(alert.errorTime),
				},
			],
		});
	}

	render() {
		// return <div id="alerts">{this.renderAlerts()}</div>;
		return (
			<div>
				<table className="rux-table">
					<tr className="rux-table__column-head">
						<th>Category</th>
						<th>Status</th>
						<th>Message</th>
						<th>Time</th>
					</tr>
					{this.props.alerts.map((alert) => {
						return (
							<tr>
								<td>{alert.errorCategory}</td>
								<td>{alert.errorSeverity}</td>
								<td>{alert.errorMessage}</td>
								<td>{alert.time}</td>
							</tr>
						);
					})}
				</table>
			</div>
		);
	}
}

const mSTP = (state) => {
	return {
		alerts: state.alerts.alerts,
	};
};

const mDTP = (dispatch) => {
	return {
		getAlerts: (info) => dispatch(getAlerts(info)),
	};
};

export default connect(mSTP, mDTP)(AlertDisplay);
