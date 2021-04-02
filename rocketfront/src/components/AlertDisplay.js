import React, { Component } from "react";
import { connect } from "react-redux";
import { getAlerts } from "../redux/actions/AlertsActions";
import { RuxStatus } from "@astrouxds/rux-status/rux-status.js";

class AlertDisplay extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: "",
		};
	}

	componentDidMount(prevProps) {
		if (this.props !== prevProps) {
			this.props.getAlerts();
		}
	}

	handleChange = (e) => {
		this.setState({
			search: e.target.value,
		});
	};

	handleSearch = (e) => {
		this.setState({
			search: e.target.value,
		});
		this.filterContacts();
	};

	findDistinctCategories() {
		let distinct = [...new Set(this.props.alerts.map((a) => a.errorCategory))];
		return distinct;
	}

	filterContacts() {
		if (this.state.search === "" || !this.state.search) {
			return this.props.alerts;
		}

		return this.props.alerts.filter((a) => {
			return a.errorCategory.includes(this.state.search);
		});
	}

	convertTime(time) {
		let convTime = new Intl.DateTimeFormat("en-US", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		}).format(time);
		return convTime;
	}

	render() {
		return (
			<div className="grid-zone grid-zone--sidebar">
				<div className="grid-zone-sidebar__subheader">
					<h2 className="alert-title">Alerts</h2>
					<div>
						<div className="alert-summary">
							<h1>{this.props.alerts.length}</h1> Total Alerts
						</div>
						{/* <div className="rux-form-field-div-search">
							<div className="rux-form-field search">
								<input
									className="rux-form-field__text-input search"
									placeholder="Search by category"
									type="search"
									onChange={this.handleChange}
								/>
							</div>
						</div> */}
						<div class="alert-filter">
							<label class="classy" for="categoryFilter">
								Category Filter
							</label>
							<select
								class="rux-select"
								id="category-filter"
								onChange={this.handleSearch}
							>
								<option value="">All</option>
								{this.findDistinctCategories().map((cat) => {
									return <option value={cat}>{cat}</option>;
								})}
							</select>
						</div>
					</div>
				</div>
				<table className="rux-table">
					<tr className="rux-table__column-head">
						<th>Category</th>
						<th>Status</th>
						<th>Message</th>
						<th>Time</th>
					</tr>
					{this.filterContacts().map((alert) => {
						return (
							<tr>
								<td>{alert.errorCategory}</td>
								<td>
									<rux-status status={alert.errorSeverity}></rux-status>
								</td>
								<td>{alert.errorMessage}</td>
								<td>{this.convertTime(alert.errorTime)}</td>
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
