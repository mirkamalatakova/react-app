import React from 'react';
import Clock from 'components/widgets/Clock';
import Weather from 'containers/widgets/WeatherContainer';
import Info from 'containers/widgets/InfoContainer';

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-4">
            <section>
              <Weather location="kosice" />
            </section>
          </div>
          <div className="col-sm-4">
            <section>
              <Weather location="london" />
            </section>
          </div>
          <div className="col-sm-4">
            <section>
              <Weather location="sydney" />
            </section>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <Info />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;