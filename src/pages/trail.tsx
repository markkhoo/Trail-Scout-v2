import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

type TrailID = {
    trailsID: string
}

// type Coordinates = {
//     lat: number;
//     lng: number;
// }

type SingleTrail = {
    city?: string;
    country?: string;
    description?: string;
    difficulty?: string;
    features?: string;
    id?: number;
    lat: string | undefined;
    length?: string;
    lon: string | undefined;
    name?: string;
    rating?: number;
    region?: string;
    thumbnail?: string;
    url?: string
}

function TrailDetail() {
    const trailParam: TrailID = useParams()
    const trailID: string = trailParam.trailsID;

    // const [getCoord, setCoord] = useState<Coordinates>({ lat: 0, lng: 0 });
    const [getTrail, setTrail] = useState<SingleTrail>({
        city: "test",
        country: "test",
        description: "test",
        difficulty: "test",
        features: "test",
        id: 0,
        lat: "test",
        length: "test",
        lon: "test",
        name: "test",
        rating: 0,
        region: "test",
        thumbnail: "test",
        url: "test"
    });

    useEffect(() => {
        // console.log(trailParam)
        // console.log(trailID)
        searchTrailByID(trailID)
            .then(res => {
                setTrail(res);

                const lat:string | undefined = res.lat;
                const lng:string | undefined = res.lon;

                console.log(`lat: ${lat}; lon: ${lng}`)
            })
            .catch(err => {
                console.error(err);
                window.location.assign("../PageNotFound");
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log(getTrail)
    }, [getTrail])

    const searchTrailByID = (trailID: string): Promise<SingleTrail> => fetch(`https://trailapi-trailapi.p.rapidapi.com/trails/${trailID}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com",
            "x-rapidapi-key": `${'ab399b1f67mshf2552c3222ba6dfp1221c8jsn63f6ccf2572f'}`,
        }
    })
        .then((response) => response.json())
        .then(res => res.data[0] as SingleTrail)

    return (<>
        <p>Hello World</p>
        <p>{`Trail ID: ${trailID}`}</p>
        <Link to="/">Go Back Home</Link>
    </>)
}

export default TrailDetail