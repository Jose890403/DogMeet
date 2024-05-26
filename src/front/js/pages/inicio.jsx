import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
export const Inicio = () => {
	const { store, actions } = useContext(Context);


    return (
        <div className="container suggestions-container">
            <h1>Post from Users</h1>
            <ul className="list-group suggestions-list">
                {store.post?.map((post, index) => (
                    <li key={index} className="list-group-item suggestion-item">
                        {post.post}
                    </li>
                ))}
            </ul>
        </div>
    )
};