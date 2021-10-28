import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {


    return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
            <p style={{ color: "white", fontWeight: 600 }} >Page not Found</p>
            <Link style={{color: "white"}} to="/">Go Back Home</Link>
        </div>
    )
}

export default PageNotFound