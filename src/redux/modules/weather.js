import WeatherApi from 'api/Weather';
import Moment from 'moment';

const WEATHER_LOADING_START = 'WEATHER_LOADING_START';
const WEATHER_LOADING_OK = 'WEATHER_LOADING_OK';
const WEATHER_UNMOUNT = 'WEATHER_UNMOUNT';

export function unmountWidget(location) {
  return (dispatch , getState) => {
    const state = getState();
    clearInterval(state.weathers[location].fromNowInterval);

    dispatch({
      type: WEATHER_UNMOUNT,
      location,
    }); 
  }
}

const updateFromNow = (location)  => {
  return (dispatch, getState) => {
    const state = getState();

    dispatch({
      type: WEATHER_LAST_UPDATE,
      location,
      date: Moment(state.weathers[location].timestamp).fromNow(),
    });    
  } 
}

export function getData(location) {
  return (dispatch, getState) => {
    dispatch({
      type: WEATHER_LOADING_START,
      location,
    });
    
    const state = getState();
    const timestamp = Moment().valueOf();

    clearInterval(state.weathers[location].fromNowInterval);

    WeatherApi.getCurrentWeather(location).then((response) => {
      const fromNowInterval = setInterval(updateFromNow(location), 1000*60);

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
          sunrise: Moment.tz(response.sys.sunrise*1000, this.getTimezone()).format('HH:mm'),
          sunset: Moment.tz(response.sys.sunset*1000, this.getTimezone()).format('HH:mm'),
        },
        fromNowInterval,
        timestamp,
        date: Moment(timestamp).fromNow(),
      });

    });
  }
}

const initialState = {
  weathers : {
    'Kosice' : {},
    'London' : {},
    'Sydney' : {},
  }
};

/**
 * user reducer
 * @param {Object} state - object holding user state
 * @param {Object} action - action created by action creator
 * @returns {Object} new instance of state
 * @see http://redux.js.org/docs/basics/Reducers.html
 */
export default function user(state = initialState, action) {
  switch (action.type) {
    case WEATHER_LOADING_START:
      return {
        ...state,
        weathers : {
            ...state.weathers,
            [action.location] : {
              ...state.weathers[action.location],
              loading : true,    
            },
        },
      };
    case WEATHER_LOADING_OK:
      return {
        ...state,
        weathers : {
            ...state.weathers,
            [action.location] : {
              ...action.weatherData,
              loading : false,
              timestamp : action.timestamp,
              date : action.date,
            },
        },
      };
    case WEATHER_LAST_UPDATE:
      return {
        ...state,
        weathers : {
            ...state.weathers,
            [action.location] : {
              ...state.weathers[action.location],
              date : action.date,
            },
        }, 
      };
    case WEATHER_UNMOUNT:
      return {
        ...state,
        weathers : {
            ...state.weathers,
            [action.location] : {},
        },
      };
    default:
      return state;
  }
}