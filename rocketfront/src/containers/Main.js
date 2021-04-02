import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import NavBar from "../components/NavBar.js";
import AlertDisplay from "../components/AlertDisplay.js";
import SatDisplay from "../components/SatDisplay.js";
import { connect } from "react-redux";

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
		};
	}

	render() {
		if (!this.props.loggedIn) {
			return <Redirect to="/login" />;
		} else {
			return (
				<div className="app-grid">
					<NavBar />
					<AlertDisplay />
					<SatDisplay />
				</div>
			);
		}
	}
}

const mSTP = (state) => {
	return {
		loggedIn: state.users.loggedIn,
	};
};
export default connect(mSTP)(Main);
