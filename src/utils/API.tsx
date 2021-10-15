import axios from "axios";

const dontTakeMe1:string = '';
const dontTakeMe2:string = '';

const API = {
    searchTrails: (lat: number, lng: number) => {
        return axios.request({
            method: 'GET',
            url: 'https://trailapi-trailapi.p.rapidapi.com/trails/explore/',
            params: {lat: `${lat}`, lon: `${lng}`},
            headers: {
              'x-rapidapi-host': 'trailapi-trailapi.p.rapidapi.com',
              'x-rapidapi-key': `${dontTakeMe1}`
            }
        })
    },
    searchWeather: (lat: number, lng: number, unit: string) => {
        return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=${unit}&exclude=minutely,hourly&appid=${dontTakeMe2}`)
    }
}

export default API; 