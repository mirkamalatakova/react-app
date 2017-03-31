import React from 'react';
import Clock from 'components/widgets/Clock';
import Weather from 'containers/widgets/WeatherContainer';

class Home extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-sm-4">
          <section>
            <Weather location="Kosice,SK" />
          </section>
        </div>
        <div className="col-sm-4">
          <section>
            <Weather location="London,UK" />
          </section>
        </div>
        <div className="col-sm-4">
          <section>
            <Weather location="Sydney,AU" />
          </section>
        </div>
      </div>
    );
  }
}

export default Home;