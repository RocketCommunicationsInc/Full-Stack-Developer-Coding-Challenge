import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { RuxModal } from "@astrouxds/rux-modal/rux-modal.js";

class Session extends Component {
	render() {
		console.log(this.props);
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

const mSTP = (state) => {
	return {
		loggedIn: state.users.loggedIn,
		errors: state.users.errors,
	};
};
export default connect(mSTP)(Session);
