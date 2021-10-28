import React, { FC, useEffect, useState } from 'react';
import TrailCard from '../components/trailCard';
import service from '../utils/localStorageHelper';
import GoogleMapReact from 'google-map-react';
import { Icon } from '@iconify/react';
import arrowUpLeft from '@iconify/icons-akar-icons/arrow-up-left';
import "./home.css";

type PinPoint = {
    lat: number;
    lng: number;
    text?: string;
}

type TrailData = {
    city?: string;
    country?: string;
    description?: string;
    difficulty: string;
    directions?: string;
    features?: string;
    id: number;
    lat: string;
    length?: string;
    lon: string;
    name: string;
    rating: number;
    region?: string;
    thumbnail?: string;
    url?: string
}

const LocationPin: FC<PinPoint> = ({ text }) => (
    <div className="pin">
        <Icon icon={arrowUpLeft} className="pin-icon" />
        <p className="pin-text">{text}</p>
    </div>
)

function Home() {
    const [getCoord, setCoord] = useState<PinPoint>({ lat: 37.42216, lng: -122.08427 });
    const [getTimer, setTimer] = useState<NodeJS.Timeout>(setTimeout(() => { }, 0));
    const [getTrail, setTrail] = useState<TrailData[]>([{ id: -1, lat: '0', lon: '0', name: '', difficulty: "", rating: 0 }]);
    const [getShown, setShown] = useState<TrailData[]>([{ id: -1, lat: '0', lon: '0', name: '', difficulty: "", rating: 0 }]);
    const [getPages, setPages] = useState<number[]>([1]);
    const [getPageN, setPageN] = useState<number>(1);

    useEffect(() => {
        if (!localStorage.getItem("TrailApp_lat") || !localStorage.getItem("TrailApp_lng")) {
            service.setItem('TrailApp_lat', getCoord.lat);
            service.setItem('TrailApp_lng', getCoord.lng);
            service.setItem('TrailApp_zoom', 12);
        };

        const lat: number = service.getItem<number>('TrailApp_lat', 0);
        const lng: number = service.getItem<number>('TrailApp_lng', 0);

        setCoord({ lat: lat, lng: lng });

        searchTrails(lat, lng).then(res => {
            if (res) {
                setTrail(res)
            }
        }).catch(err => console.error(err))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const maxPages: number = Math.ceil(getTrail.length / 8);
        let pageNumbers: number[] = [];
        for (let i = 1; i <= maxPages; i++) {
            pageNumbers.push(i)
        };
        setPages(pageNumbers);
        setPageN(1);
    }, [getTrail]);

    useEffect(() => {
        const currentPageNumber: number = getPageN;
        let displayTrails: TrailData[] = [];
        for (let j = (currentPageNumber - 1) * 8; j < currentPageNumber * 8; j++) {
            if (getTrail[j]) {
                displayTrails.push(getTrail[j])
            }
        }
        setShown(displayTrails);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getPages, getPageN]);

    const goToPage = (input: number) => {
        setPageN(input)
        return
    };

    const pagePrev = () => {
        const currentPageNumber: number = getPageN;
        if (getPageN > 1) {
            setPageN(currentPageNumber - 1)
        };
        return
    };

    const pageNext = () => {
        const maxPage: number = getPages.length;
        const currentPageNumber: number = getPageN;
        if (getPageN < maxPage) {
            setPageN(currentPageNumber + 1)
        };
        return
    };

    const clearSearchAfterTime = () => {
        // console.log(typeof getTimer, getTimer);
        clearTimeout(getTimer)
        return
    }

    const searchTrails = (
        lat: number,
        lng: number
    ): Promise<TrailData[]> => fetch(`https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=${lat}&lon=${lng}&per_page=${64}&radius=${100}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com",
            "x-rapidapi-key": `${'ab399b1f67mshf2552c3222ba6dfp1221c8jsn63f6ccf2572f'}`
        }
    })
        .then((response) => response.json())
        .then((res) => res.data as TrailData[]);

    const searchAfterTime = () => {
        let timer: NodeJS.Timeout = setTimeout(() => {

            searchTrails(getCoord.lat, getCoord.lng).then(res => {
                if (res) {
                    setTrail(res)
                }
            }).catch(err => console.error(err))

        }, 2250);
        setTimer(timer);
        return
    };

    return (<>
        <div className="MapContainer">
            <GoogleMapReact
                bootstrapURLKeys={{ key: `${'AIzaSyDTHB9JTUl-71YWUybeheSoTwrLN8X82ok'}` }}
                defaultCenter={{ lat: 37.42216, lng: -122.08427 }}
                center={{ lat: getCoord.lat, lng: getCoord.lng }}
                defaultZoom={12}
                zoom={service.getItem('TrailApp_zoom', 12)}
                onDragEnd={(map) => {
                    setCoord({
                        lat: parseFloat(map.center.lat().toFixed(5)),
                        lng: parseFloat(map.center.lng().toFixed(5))
                    });
                    service.setItem('TrailApp_lat', parseFloat(map.center.lat().toFixed(5)));
                    service.setItem('TrailApp_lng', parseFloat(map.center.lng().toFixed(5)));

                    clearSearchAfterTime();
                    searchAfterTime();

                }}
                onZoomAnimationEnd={(map) => {
                    service.setItem('TrailApp_zoom', map)
                }}
            >
                {getTrail &&
                    getTrail.map(item => {
                        return (
                            <LocationPin
                                lat={parseFloat(item.lat)}
                                lng={parseFloat(item.lon)}
                                text={item.name}
                            />
                        )
                    })

                }
            </GoogleMapReact>
        </div>
        <div className="resultParent">
            <div className="resultHeader">
                <h2>Results</h2>
            </div>
            <div className="resultContainer">
                {getShown &&
                    getShown.map(item => {
                        return (
                            <TrailCard
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                difficulty={item.difficulty}
                                rating={item.rating}
                            />
                        )
                    })
                }
            </div>
            <div className="resultPagination">
                <button
                    className="resultButton buttonPrev"
                    onClick={() => { pagePrev() }}
                >PREV</button>
                {getPages &&
                    getPages.map(item => {
                        return (
                            <button
                                key={item}
                                className={`resultButton ${(item === getPageN) ? "buttonCurrent": ""}`}
                                onClick={() => { goToPage(item) }}
                            >{`${item}`}</button>
                        )
                    })
                }
                <button
                    className="resultButton buttonNext"
                    onClick={() => { pageNext() }}
                >NEXT</button>
            </div>
        </div>
    </>);
}

export default Home