import React from "react";
import { Link } from "react-router-dom";

export const SearchResult = ({result}) =>{
    return(
        <div className="result-wrapper">
            <Link className="result" to="/">{result.name}</Link>
        </div>
    )
}