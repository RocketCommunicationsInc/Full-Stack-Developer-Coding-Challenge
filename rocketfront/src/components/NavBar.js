import React, { Component } from "react";
import { RuxClock } from "@astrouxds/rux-clock/rux-clock.js";
import { RuxGlobalStatusBar } from "@astrouxds/rux-global-status-bar/rux-global-status-bar.js";
import { connect } from "react-redux";

class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			time: new Date().toLocaleString(),
		};
	}

	componentDidMount() {
		this.intervalID = setInterval(() => this.tick(), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.intervalID);
	}

	tick() {
		this.setState({
			time: new Date().toLocaleString(),
		});
	}

	render() {
		return (
			<div className="grid-zone grid-zone--header">
				<rux-global-status-bar
					className="rux-global-staus-bar"
					appname="The Final Frontier"
					theme="dark"
				>
					<rux-clock class="dark-theme" small>
						{this.state.time}
					</rux-clock>

					<div>
						{this.props.user.username ? this.props.user.username : "Human"}
						<br />
						<a href="/logout">Log Out</a>
					</div>
				</rux-global-status-bar>
			</div>
		);
	}
}

// const mSTP = (state) => {
// 	return {
// 		user: state.users.currentUser,
// 	};
// };
export default NavBar;
// export default connect(mSTP)(NavBar);
