import WeatherApi from 'api/Weather';
import Moment from 'moment';
import { CitiesConfig } from 'config/Cities';

const WEATHER_LOADING_START = 'WEATHER_LOADING_START';
const WEATHER_LOADING_OK = 'WEATHER_LOADING_OK';

export function getData(location) {
  return (dispatch/*, getState*/) => {
    dispatch({
      type: WEATHER_LOADING_START,
      location,
    });

    const weatherLocation = location + ',' + CitiesConfig[location].countryCode;

    WeatherApi.getCurrentWeather(weatherLocation).then((response) => {
      const timezone = CitiesConfig[location].timezone;

      dispatch({
        type: WEATHER_LOADING_OK,
        location,
        weatherData : {
          weather: response.weather[0].id,
          temp: response.main.temp.toFixed(1),
          humidity: response.main.humidity,
          description: response.weather[0].description,
          wind: (response.wind.speed * 3.6).toFixed(1),
          windDeg: Math.round(response.wind.deg),
          pressure: response.main.pressure.toFixed(1),
          cloudiness: response.clouds.all.toFixed(1),
          sunrise: Moment.tz(response.sys.sunrise*1000, timezone).format('HH:mm'),
          sunset: Moment.tz(response.sys.sunset*1000, timezone).format('HH:mm'),
        },
        timestamp: Moment().valueOf(),
      });

    });
  }
}

const initialState = {
  kosice : {},
  london : {},
  sydney : {},
};

/**
 * weather reducer
 * @param {Object} state - object holding weather state
 * @param {Object} action - action created by action creator
 * @returns {Object} new instance of state
 * @see http://redux.js.org/docs/basics/Reducers.html
 */
export default function weather(state = initialState, action) {

  switch (action.type) {
    case WEATHER_LOADING_START:
      return {
        ...state,
        [action.location] : {
          ...state[action.location],
          loading : true,   
        },
      };
    case WEATHER_LOADING_OK:
      return {
        ...state,
        [action.location] : {
          ...state[action.location],
          ...action.weatherData,
          loading : false,
          timestamp : action.timestamp,
        },
      };
    default:
      return state;
  }
}