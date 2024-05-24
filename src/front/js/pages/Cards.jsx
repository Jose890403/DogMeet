import React from "react";
import PropTypes from "prop-types";

const MyCard = (props) => {
    return (
        <div className="card mb-3">
            <h5 className="card-title">{props.username}</h5>
            <img className="card-img-top" src={props.img} alt="Card image cap" />
            <p className="card-text">{props.bodytext}</p>
            
        </div>
        
    );
}

MyCard.propTypes = {
    img: PropTypes.string,
    username: PropTypes.string,
    bodytext: PropTypes.string,
};

export default MyCard;