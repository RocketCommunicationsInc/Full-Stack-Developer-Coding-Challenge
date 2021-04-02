import React, { Component } from "react";
import { connect } from "react-redux";
import { getSatellites } from "../redux/actions/SatellitesActions";
import { RuxStatus } from "@astrouxds/rux-status/rux-status.js";

class SatDisplay extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: "",
			filtered: "",
		};
	}

	componentDidMount(prevProps) {
		if (this.props !== prevProps) {
			this.props.getSatellites();
		}
	}

	handleChange = (e) => {
		this.setState({
			search: e.target.value,
		});
	};

	handleSearch = (e) => {
		this.setState({
			filtered: e.target.value,
		});
		console.log(this.state);
		this.filterContacts();
	};

	filterContacts() {
		// if (this.state.search === "" || !this.state.search) {
		// 	return this.props.satellites;
		// }

		return this.props.satellites.filter((s) => {
			return (
				s.contactName.toString().includes(this.state.search) &&
				s.contactState.includes(this.state.filtered)
			);
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

	findDistinctStates() {
		let distinct = [
			...new Set(this.props.satellites.map((s) => s.contactState)),
		];
		return distinct;
	}
	countStates = (st) => {
		let sum = this.props.satellites.filter((s) => s.contactState === st);
		return sum.length;
	};

	render() {
		return (
			<div className="grid-zone grid-zone--main">
				<div className="grid-zone-main__subheader">
					<h2 className="contact-title">Contacts</h2>
					<div>
						<div className="contact-summary">
							<h1>{this.props.satellites.length}</h1> Total Contacts
						</div>

						{this.findDistinctStates().map((ds) => {
							return (
								<div className="contact-summary" id={ds}>
									<h1>{this.countStates(ds)}</h1>
									{ds}
								</div>
							);
						})}

						{/* <div className="contact-summary">
							<h1>{this.findDistinctStates()}</h1> Contact States
						</div> */}
						<div className="rux-form-field-div-search">
							<div className="rux-form-field search">
								<input
									className="rux-form-field__text-input search"
									placeholder="Search by name"
									type="search"
									onChange={this.handleChange}
								/>
							</div>
						</div>
						<div class="alert-filter">
							<label class="classy" for="stateFilter">
								State Filter
							</label>
							<select
								class="rux-select"
								id="state-filter"
								onChange={this.handleSearch}
							>
								<option value="">All</option>
								{this.findDistinctStates().map((st) => {
									return <option value={st}>{st}</option>;
								})}
							</select>
						</div>
					</div>
				</div>

				<table className="rux-table">
					<tr className="rux-table__column-head">
						<th>Name</th>
						<th>Status</th>
						<th>Begin</th>
						<th>End</th>
					</tr>

					{this.filterContacts().map((sat) => {
						return (
							<tr>
								<td>{sat.contactName}</td>
								<td>
									<rux-status status={sat.contactStatus}></rux-status>
								</td>
								<td>{this.convertTime(sat.contactBeginTimestamp)}</td>
								<td>{this.convertTime(sat.contactEndTimestamp)}</td>
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
		satellites: state.satellites.satellites,
	};
};

const mDTP = (dispatch) => {
	return {
		getSatellites: (info) => dispatch(getSatellites(info)),
	};
};

export default connect(mSTP, mDTP)(SatDisplay);
