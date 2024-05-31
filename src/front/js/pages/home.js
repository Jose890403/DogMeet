import React from "react";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import Logo from "../../img/logo.png";

export const Home = () => {

	return (
		<div className="text-center">
			<div className="video-background">
					<video autoPlay loop muted>
						<source src="https://videos.pexels.com/video-files/5473828/5473828-hd_1280_720_24fps.mp4" type="video/mp4" />
						Your browser does not support the video tag.
					</video>
				</div>
			<div className="logo-content-boton">
				<div className="d-flex">
					<img src={Logo} className="logo"/>
					<h1 className="nameLog"> Dog Meet</h1>
					<p>UNO MAS DE LA FAMILIA</p>
				</div>
				
				<div className="buttons">
					<Link to={"/signup"}>
						<button className="btn btn-success">Sign Up</button>
					</Link>
					
					<Link to={"/login"}>
						<button className="btn btn-success">LogIn</button>
					</Link>
				</div>
				
			</div>
		</div>

			);
};

