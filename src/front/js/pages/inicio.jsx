import React from "react";
import MyCard from "../pages/Cards.jsx";
import "../../styles/index.css";


export const Inicio = () => {
	


	return (
		<div className="">
			
			{/* <div className="background">
				<img src={image}/>
				
			</div> */}
			
			<div className="content">
			<h1 className="inicio">DogMeet</h1>
				<MyCard
					username={"Name usuario"}
					img={"https://www.terranea.es/assets/images/razas/pastor_aleman2.jpg"}
					bodytext={"bendita la luzzzz uuuu bendita la luz de tu mirada"}
				/>
				
			</div>
		</div>
	);
};