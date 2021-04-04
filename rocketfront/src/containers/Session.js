import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { RuxModal } from "@astrouxds/rux-modal/rux-modal.js";
import { fetchLoginStatus } from "../redux/actions/UsersActions";

class Session extends Component {
	render() {
		// if (this.props.errors.length !== 0) {
		// 	// this.props.errors.map((e) => {
		// 	return (
		// 		<div className="rux-modal-container">
		// 			<rux-modal
		// 				title="error"
		// 				message={this.props.errors}
		// 				confirmText="Ok"
		// 				denyText="Cancel"
		// 				customEvent="listen-for-me"
		// 			>
		// 				<div className="rux-modal__titlebar">
		// 					<h1>Error</h1>
		// 				</div>
		// 				<div className="rux-modal__content">
		// 					<div className="rux-modal__message">{this.props.errors}</div>
		// 					<div className="rux-button-group">
		// 						<rux-button data-value="false" tabindex="-1">
		// 							Cancel
		// 						</rux-button>
		// 						<rux-button data-value="true" tabindex="0">
		// 							OK
		// 						</rux-button>
		// 					</div>
		// 				</div>
		// 			</rux-modal>
		// 		</div>
		// 	);
		// 	// });
		// }
		if (this.props.errors.length !== 0) {
			return (
				<rux-modal
					title="Error"
					message={this.props.errors[0]}
					confirmText="Ok"
				>
					// denyText="Cancel" // customEvent="listen-for-me">
				</rux-modal>
			);
		} else {
			return (
				<div className="home">
					<div className="hbo">
						<h3>
							Are you a <Link to="/Login">returning</Link> user?
						</h3>
						<br />
						<h3>
							Or <Link to="/Signup">new</Link> to the site?
						</h3>
					</div>
				</div>
			);
		}
	}
}

const mSTP = (state) => {
	return {
		loggedIn: state.users.loggedIn,
		errors: state.users.errors,
	};
};

const mDTP = (dispatch) => {
	return {
		fetchLoginStatus: () => {
			dispatch(fetchLoginStatus());
		},
	};
};

export default connect(mSTP, mDTP)(Session);
