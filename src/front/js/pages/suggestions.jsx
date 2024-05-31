import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/suggestion.css";
const Suggestions = () => {
    const { store, actions } = useContext(Context);
    const [suggestionText, setSuggestionText] = useState("");
    useEffect(() => {
        actions.getSuggestions();
        console.log(store.suggestions)
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (suggestionText.trim() === "") {
            return;
        }
        actions.createSuggestion(suggestionText);
        setSuggestionText("");
    };
    return (
        <div className="suggestions-container">
            <h1>Suggestions from Users</h1>
            <ul className=" suggestions-list">
                {store.suggestions?.map((suggestion, index) => (
                    <li key={index} className="list-group-item suggestion-item">
                        {suggestion.suggestion}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit} className="mb-5">
                <div className="form-suggestion">
                    <label htmlFor="suggestion">New Suggestion:</label>
                    <input type= "textarea"
                        className="textarea"
                        id="suggestion"
                        rows="3"
                        value={suggestionText}
                        onChange={(e) => setSuggestionText(e.target.value)}
                    />
                </div>
                <button type="submit" className= "btn-primary">
                    Add Suggestion
                </button>
            </form>
        </div>
    );
};
export default Suggestions;