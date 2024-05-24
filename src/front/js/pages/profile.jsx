import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const Profile = () => {
    const { store, actions } = useContext(Context);
    const [img, setImg] = useState("");
    const [bodytext, setBodytext] = useState("");

    const handlePostSubmit = (e) => {
        e.preventDefault();
        actions.createPost( img, bodytext );
        setImg("");
        setBodytext("");
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <h1>Profile</h1>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Nombre del Animal: {store.user.name}</h5>
                            <p className="card-text">Edad: {store.user.age}</p>
                            <p className="card-text">Raza: {store.user.breed}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h2>Create a Post</h2>
                    <form onSubmit={handlePostSubmit}>
                        <div className="form-group">
                            <label htmlFor="img">Image URL</label>
                            <input
                                type="text"
                                className="form-control"
                                id="img"
                                value={img}
                                onChange={(e) => setImg(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="bodytext">Body Text</label>
                            <textarea
                                className="form-control"
                                id="bodytext"
                                value={bodytext}
                                onChange={(e) => setBodytext(e.target.value)}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">
                            Submit Post
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};


