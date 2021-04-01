import React, { Component } from "react";
import { RuxGlobalStatusBar } from "@astrouxds/rux-global-status-bar/rux-global-status-bar.js";
import { connect } from "react-redux";

class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentDateTime: Date().toLocaleString(),
		};
	}

	render() {
		return (
			<header className="header">
				<rux-global-status-bar appname="The Final Frontier" theme="dark">
					<div>
						{this.props.user.username}
						<br />
						<a href="/logout">Log Out</a>
					</div>
					<rux-clock class="dark-theme">{this.state.currentDateTime}</rux-clock>
				</rux-global-status-bar>
			</header>
		);
	}
}

const mSTP = (state) => {
	return {
		user: state.users.currentUser,
	};
};

export default connect(mSTP)(NavBar);
