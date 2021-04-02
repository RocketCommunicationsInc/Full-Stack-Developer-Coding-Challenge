import React from "react";
import { Link } from "react-router-dom";

const Session = () => {
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
};

export default Session;
