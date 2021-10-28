import React, { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import GoogleMapReact from 'google-map-react';
import { Icon } from '@iconify/react';
import arrowUpLeft from '@iconify/icons-akar-icons/arrow-up-left';
import "./trail.css";

type TrailID = {
    trailsID: string
};

type SingleTrail = {
    city?: string;
    country?: string;
    description?: string;
    difficulty?: string;
    directions?: string;
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

type PinPoint = {
    lat: number;
    lng: number;
    text?: string;
}

const LocationPin: FC<PinPoint> = ({ text }) => (
    <div className="pin">
        <Icon icon={arrowUpLeft} className="pin-icon" />
        <p className="pin-text">{text}</p>
    </div>
)

function TrailDetail() {
    const trailParam: TrailID = useParams()
    const trailID: string = trailParam.trailsID;

    const [getTrail, setTrail] = useState<SingleTrail>({
        city: undefined,
        country: "test",
        description: "",
        difficulty: undefined,
        directions: undefined,
        features: undefined,
        id: 0,
        lat: "0",
        length: "test",
        lon: "0",
        name: "",
        rating: 0,
        region: undefined,
        thumbnail: undefined,
        url: undefined
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

    // useEffect(() => {
    //     console.log(getTrail)
    // }, [getTrail])

    // useEffect(() => {
    //     console.log(getWeather)
    // }, [getWeather])

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

    const stringReplaceBrake = (x: string | undefined) => {
        if (x === undefined) {
            return
        } else {
            let output: string = x as string;
            return output.replace(/<br \/>/g, "").replace(/ {2}/g, " ");
        }
    }

    const timeConverter = (UNIX_timestamp: number) => {
        const a = new Date(UNIX_timestamp * 1000);
        // const year = a.getFullYear();
        // const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        // const month = months[a.getMonth()];
        const date = a.getDate();
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
        const day = days[a.getDay()];
        // const hour = a.getHours();
        // const min = a.getMinutes();
        // const sec = a.getSeconds();
        return `${day} ${date}`;
    }

    return (<>
        <div className="MapContainer">
            <GoogleMapReact
                bootstrapURLKeys={{ key: `${''}` }}
                defaultCenter={{ lat: 37.42216, lng: -122.08427 }}
                center={{ lat: parseFloat(getTrail.lat as string), lng: parseFloat(getTrail.lon as string) }}
                defaultZoom={12}
            >
                <LocationPin
                    lat={parseFloat(getTrail.lat as string)}
                    lng={parseFloat(getTrail.lon as string)}
                    text={getTrail.name}
                />
            </GoogleMapReact>
        </div>
        <div className="resultParent bottom-container">
            <div className="resultHeader">
                <h2>{getTrail.name}</h2>
            </div>
            <div className="resultInformation font-white">
                <div style={{ padding: "0.75em" }}>
                    {(getTrail.thumbnail) ? <img
                        src={getTrail.thumbnail}
                        alt={`Thumbnail for ${getTrail.name}`}
                        width="100%"
                        height="auto"
                    /> : <></>}
                    {getTrail.city ? <p className="infolet"><strong>Nearest City: </strong>{getTrail.city}</p> : <></>}
                    {getTrail.region ? <p className="infolet"><strong>Region: </strong>{getTrail.region}</p> : <></>}
                    {getTrail.difficulty ? <p className="infolet"><strong>Difficulty: </strong>{getTrail.difficulty}</p> : <></>}
                </div>
                <div style={{ display: "inline-block" }}>
                    <h3 className="margin-2">Description</h3>
                    <p className="margin-1">{stringReplaceBrake(getTrail.description)}</p>
                    {(getTrail.directions) ? <>
                        <h3 className="margin-2">Where is the trail head?</h3>
                        <p className="margin-1">{stringReplaceBrake(getTrail.directions)}</p>
                    </> : <></>}
                    {(getTrail.features) ? <>
                        <h3 className="margin-2">Features</h3>
                        <p className="margin-1">{stringReplaceBrake(getTrail.features)}</p>
                    </> : <></>}
                </div>

            </div>
            {getTrail.url ?
                <div style={{ textAlign: "center" }}>
                    <a
                        href={getTrail.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="resultButton button-tweaks"
                    >More Information</a>
                </div>
                : <></>}
        </div>
        <div className="resultParent bottom-container">
            <div className="resultHeader">
                <h2>Weather Forecast</h2>
            </div>
            <div className="resultContainer">
                {(getWeather.daily.length > 0) ? getWeather.daily.map(item => {
                    return (
                        <div className="weather-card">
                            <p
                                style={{ fontSize: "1.25em" }}
                            ><strong>{timeConverter(item.dt)}</strong></p>
                            <img
                                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                alt={item.weather[0].description}
                                height="100px"
                                width="100px"
                            />
                            <p><strong>{Math.ceil(item.temp.max)}°F</strong> <span>{Math.floor(item.temp.min)}°F</span></p>
                        </div>
                    )
                }) : <></>}
            </div>
        </div>
        <div style={{ padding: "0.5em 0 1.5em 0" }}>
            <Link className="resultButton button-tweaks" to="/">Go Back Home</Link>
        </div>
    </>)
}

export default TrailDetail