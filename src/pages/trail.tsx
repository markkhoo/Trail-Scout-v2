import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

type TrailID = {
    trailID: string
}

function TrailDetail() {
    const trailParam: TrailID = useParams()
    const trailID: string = trailParam.trailID;

    useEffect(()=>{
        console.log(trailID)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (<>
        <p>Hello World</p>
        <p>{`Trail ID: ${trailID}`}</p>
        <Link to="/">Go Back Home</Link>
    </>)
}

export default TrailDetail