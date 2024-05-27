import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const Inicio = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getPosts();  
    }, []);

    console.log(store.posts)
    return (
        <div className="container suggestions-container"  style={{width:"400px"}}>
            <h1>Post from Users</h1>
            <ul className="list-group suggestions-list">
                {store.posts.bodytext?.length > 0 ? (
                    store.posts.bodytext?.map((post, index) => (
                        <li key={index} className="list-group-item suggestion-item">
                            <p>{post.bodytext}</p>
                            {post.img && <img src={post.img} style={{width:"300px", maxHeight:"300px"}} alt="Post" />}
                        </li>
                    ))
                ) : (
                    <li className="list-group-item suggestion-item">No posts available</li>
                )}
            </ul>
        </div>
    );
};