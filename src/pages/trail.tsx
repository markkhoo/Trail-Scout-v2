import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

type TrailID = {
    trailsID: string
};

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
};

type WeatherSub = {
    description: string;
    icon: string;
    id: number;
    main: string
};

type DailyWeather = {
    clouds: number;
    dew_point: number;
    dt: number;
    feels_like: {
        day: number,
        eve: number,
        morn: number,
        night: number
    };
    humidity: number;
    moon_phase: number;
    moonrise: number;
    moonset: number;
    pop: number;
    pressure: number;
    sunrise: number;
    sunset: number;
    temp: {
        day: number;
        eve: number;
        max: number;
        min: number;
        morn: number; 
        night: number;
    };
    uvi: number;
    weather: WeatherSub[];
    wind_deg: number;
    wind_gust: number;
    wind_speed: number
};

type Weather = {
    daily: DailyWeather[];
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number
}

function TrailDetail() {
    const trailParam: TrailID = useParams()
    const trailID: string = trailParam.trailsID;

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
    const [getWeather, setWeather] = useState<Weather>({
        daily: [],
        lat: 0,
        lon: 0,
        timezone: "",
        timezone_offset: 0
    })

    useEffect(() => {
        searchTrailByID(trailID)
            .then(res => {
                setTrail(res);

                const lat: string = res.lat as string;
                const lng: string = res.lon as string;

                searchWeather(lat, lng)
                    .then(res => setWeather(res))
                    .catch(err => console.error(err))

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

    useEffect(() => {
        console.log(getWeather)
    }, [getWeather])

    const searchTrailByID = (trailID: string): Promise<SingleTrail> => fetch(`https://trailapi-trailapi.p.rapidapi.com/trails/${trailID}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com",
            "x-rapidapi-key": `${'ab399b1f67mshf2552c3222ba6dfp1221c8jsn63f6ccf2572f'}`,
        }
    })
        .then((response) => response.json())
        .then(res => res.data[0] as SingleTrail);

    const searchWeather = (lat: string = "0", lon: string = "0"): Promise<Weather> => fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${'current,minutely,hourly,alerts'}&units=${'imperial'}&appid=${'22bb6e2db366aab8539ac22df7b32d3a'}`)
        .then((response) => response.json())
        .then(res => res as Weather);

    return (<>
        <p>Hello World</p>
        <p>{`Trail ID: ${trailID}`}</p>
        <Link to="/">Go Back Home</Link>
    </>)
}

export default TrailDetail