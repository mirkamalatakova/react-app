import React from 'react';
import { default as WeatherApi } from 'api/Weather';
import Moment from 'moment';
import 'moment-timezone';
import Clock from 'components/widgets/Clock';

class Weather extends React.Component {
  
  constructor(props) {
    super(props);

    this.city = this.props.location.split(',')[0];
    this.backgroundImage = this.getBackgroundImage();
    this.timezone = this.getTimezone();

    this.state = {
      weather: '',
      temp : '',
      humidity: '',
      wind: '',
      windDeg: '',
      pressure: ' ',
      cloudiness: '',
      sunrise: '',
      sunset: '',
      timestamp: '',
      date: '',
      dataLoaded: false,
    };

    this.fetchData = this.fetchData.bind(this);
    this.updateFromNow = this.updateFromNow.bind(this);
  }

  fetchData() {
    const timestamp = Moment().valueOf();

    this.setState({dataLoaded : false});

    clearInterval(this.fromNowInterval);

    WeatherApi.getCurrentWeather(this.props.location).then((response) => {
      this.setState({
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
        timestamp: timestamp,
        date: Moment(timestamp).fromNow(),
        dataLoaded: true
      });

      this.fromNowInterval = setInterval(this.updateFromNow, 1000*60);
    });
  }

  updateFromNow() {
    this.setState({
      date: Moment(this.state.timestamp).fromNow()
    });
  }

  componentWillMount() {
    this.fetchData();
  }

  componentWillUnmount() {
    clearInterval(this.fromNowInterval);
  }

  getBackgroundImage() {
    switch (this.city) {
      case 'Sydney' : return 'http://www.hdwallpapers.in/walls/downtown_sydney_australia-wide.jpg';
      case 'Kosice' : return 'http://www.visitslovakia.com/data/usr_044_naj_slovenska/dom_sv._alzbety.jpg';
      case 'London' : return 'http://tremendouswallpapers.com/wp-content/uploads/2014/12/London-wallpaper-30.jpg';
    }
  }

  getTimezone() {
    switch (this.city) {
      case 'Sydney' : return 'Australia/Sydney';
      case 'Kosice' : return 'Europe/Bratislava';
      case 'London' : return 'Europe/London';
    }
  }


  render() {
    const backgroundStyle = {
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(' + this.backgroundImage + ')'
    };

  	return (
      <div>
        <section className="weather-details">
          <div className="current-weather">
            <div className="background" style={backgroundStyle}></div>
            <div className="details">
              <h1 className="location">{this.city}</h1>
              <Clock timezone={this.timezone} />
              <div className="current-weather-details">
                <i className={'weather-icon wi wi-owm-' + this.state.weather}></i>
                <div className="weather-data">
                  <div className="temp"><span className="temp-number">{this.state.temp}</span><i className="degrees wi wi-celsius"></i></div>
                  <span className="">{this.state.description}</span>
                </div>
              </div>
              <div className="last-update">
                <span className="date">{this.state.dataLoaded ? this.state.date : 'fetching data'}</span>
                <i className="reload wi wi-refresh" onClick={this.fetchData}></i>
              </div>
            </div>
          </div>
          <div className="current-conditions">
            <div className="item humidity">
              <div className="title">Humidity</div>
              <div className="value">{this.state.humidity}%</div>
              <i className="wi wi-raindrop"></i></div>
            <div className="item cloudiness">
              <div className="title">Cloudiness</div>
              <div className="value">{this.state.cloudiness}%</div>
              <i className="wi wi-cloud"></i>
            </div>
            <div className="item pressure">
              <div className="title">Pressure</div>
              <div className="value">{this.state.pressure} hpa</div>
              <i className="wi wi-barometer"></i>
            </div>
            <div className="item wind">
              <div className="title">Wind</div>
              <div className="value">{this.state.wind} km/h</div>
              <i className={'wi wi-wind towards-' + this.state.windDeg + '-deg'}></i>
            </div>
            <div className="item sunrise">
              <div className="title">Sunrise</div>
              <div className="value">{this.state.sunrise}</div>
              <i className="wi wi-sunrise"></i>
            </div>
            <div className="item sunset">
              <div className="title">Sunset</div>
              <div className="value">{this.state.sunset}</div>
              <i className="wi wi-sunset"></i>
            </div>
          </div>
        </section>
      </div>
  	)
  }

}

export default Weather;