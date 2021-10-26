import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {


    return (<>
        <p>Page not Found</p>
        <Link to="/">Go Back Home</Link>
    </>)
}

export default PageNotFound