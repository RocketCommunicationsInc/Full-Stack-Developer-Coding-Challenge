import React, { Component } from "react";
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
	componentDidMount = () => {
		console.log(this.props.errors);
	};

	render() {
		if (this.props.errors) {
			this.props.errors.map((e) => {
				return (
					<div className="rux-modal-container">
						<rux-modal
							title="error"
							message={e}
							confirmText="Ok"
							denyText="Cancel"
							customEvent="listen-for-me"
						>
							<div className="rux-modal__titlebar">
								<h1>Error</h1>
							</div>
							<div className="rux-modal__content">
								<div className="rux-modal__message">{e}</div>
								<div className="rux-button-group">
									<rux-button data-value="false" tabindex="-1">
										Cancel
									</rux-button>
									<rux-button data-value="true" tabindex="0">
										OK
									</rux-button>
								</div>
							</div>
						</rux-modal>
					</div>
				);
			});
		}
		return (
			<div className="app-grid">
				<NavBar />
				<AlertDisplay />
				<SatDisplay />
			</div>
		);
	}
}

const mSTP = (state) => {
	return {
		loggedIn: state.users.loggedIn,
		errors: state.users.errors,
	};
};
export default connect(mSTP)(Main);
