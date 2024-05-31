import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import Logo from "../../img/logo.png";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	return (

		<nav className="nav">

			<div className="container-fluid">
			<img src={Logo}  className="logoNav"/>
				<div className="botonesNav">
				

					<Link to="/private">
						<button className="btnPost">Post</button>
					</Link>

					<Link to="/suggestion">
						<button className="suggestion">Suggestion</button>
					</Link>
					<Link to="/api">
						<button className="api">Dog Breed</button>
					</Link>


					<Link to={"/login"}>
						{store.isLoggedIn ? (
							<button className="logout1" onClick={() => actions.setLogout()}>LogOut</button>
						) : (
							<p></p>
						)}
					</Link>
				</div>
			</div>
		</nav>
	);
};
