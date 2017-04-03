import React from 'react';
import Moment from 'moment';
import 'moment-timezone';
import { CitiesConfig } from 'config/Cities';
import Clock from 'components/widgets/Clock';

class Weather extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      timeAgo : '',
    }

    this.backgroundImage = this.getBackgroundImage();
    this.fromNowInterval = null;

    this.updateFromNow = this.updateFromNow.bind(this);
  }

  componentDidMount() {
    this.props.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (typeof this.props.timestamp !== 'undefined' && prevProps.timestamp !== this.props.timestamp) {
      clearInterval(this.fromNowInterval);
      this.updateFromNow();
      this.fromNowInterval = setInterval(this.updateFromNow, 1000*5);
    }
  }

  updateFromNow() {
    this.setState({
      timeAgo: Moment(this.props.timestamp).fromNow()
    });
  }

  getBackgroundImage() {
    switch (this.props.location) {
      case 'sydney' : return 'http://www.hdwallpapers.in/walls/downtown_sydney_australia-wide.jpg';
      case 'kosice' : return 'http://www.visitslovakia.com/data/usr_044_naj_slovenska/dom_sv._alzbety.jpg';
      case 'london' : return 'http://tremendouswallpapers.com/wp-content/uploads/2014/12/London-wallpaper-30.jpg';
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
              <h1 className="location">{CitiesConfig[this.props.location].name}</h1>
              <Clock timezone={CitiesConfig[this.props.location].timezone} />
              <div className="current-weather-details">
                <i className={'weather-icon wi wi-owm-' + this.props.weather}></i>
                <div className="weather-data">
                  <div className="temp"><span className="temp-number">{this.props.temp}</span><i className="degrees wi wi-celsius"></i></div>
                  <span className="">{this.props.description}</span>
                </div>
              </div>
              <div className="last-update">
                <span className="date">{this.props.loading ? 'fetching data' : this.state.timeAgo}</span>
                <i className="reload wi wi-refresh" onClick={this.props.fetchData}></i>
              </div>
            </div>
          </div>
          <div className="current-conditions">
            <div className="item humidity">
              <div className="title">Humidity</div>
              <div className="value">{this.props.humidity}%</div>
              <i className="wi wi-raindrop"></i></div>
            <div className="item cloudiness">
              <div className="title">Cloudiness</div>
              <div className="value">{this.props.cloudiness}%</div>
              <i className="wi wi-cloud"></i>
            </div>
            <div className="item pressure">
              <div className="title">Pressure</div>
              <div className="value">{this.props.pressure} hpa</div>
              <i className="wi wi-barometer"></i>
            </div>
            <div className="item wind">
              <div className="title">Wind</div>
              <div className="value">{this.props.wind} km/h</div>
              <i className={'wi wi-wind towards-' + this.props.windDeg + '-deg'}></i>
            </div>
            <div className="item sunrise">
              <div className="title">Sunrise</div>
              <div className="value">{this.props.sunrise}</div>
              <i className="wi wi-sunrise"></i>
            </div>
            <div className="item sunset">
              <div className="title">Sunset</div>
              <div className="value">{this.props.sunset}</div>
              <i className="wi wi-sunset"></i>
            </div>
          </div>
        </section>
      </div>
  	)
  }

}

export default Weather;