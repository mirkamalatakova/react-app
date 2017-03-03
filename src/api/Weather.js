import Fetch from 'api/Fetch';

function fetchData (location, type) {
  const urlPrefix = 'http://api.openweathermap.org/data/2.5/' + type + '?q=';
  const urlSuffix = '&APPID=df85fee35d7ca52cf46de8ce123951ec&units=metric';
  const url = urlPrefix + encodeURIComponent(location) + urlSuffix;

  return Fetch.get(url, { dataType: 'json' });
};

function getCurrentWeather (location) {
  return fetchData(location, 'weather');
};

export default {
	getCurrentWeather: (location) => getCurrentWeather(location),
}