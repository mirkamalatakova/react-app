import React from 'react';
import { CitiesConfig } from 'config/Cities';

class Info extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    const statsToRender = [
      { 
        key: 'temp',
        title: 'Highest temperature',
        unit: (<i className="degrees wi wi-celsius"></i>),
        spaceBetweenUnits: false,
      },
      {
        key: 'wind',
        title: 'Strongest wind',
        unit: 'km/h',
        spaceBetweenUnits: true,
      },
      {
        key: 'pressure',
        title: 'Highest pressure',
        unit: 'hpa',
        spaceBetweenUnits: true,
      },
      {
        key: 'humidity',
        title: 'Highest humidity',
        unit: '%',
        spaceBetweenUnits: false,
      },
    ];
    const data = this.props.weatherData;
    const cities = Object.keys(data);
    let statsRendered = [];

    const dataLoaded = cities.filter((location) => {
      return data[location].loading === false;  
    }).length === cities.length;
    
    statsToRender.map((stat) => {
      const winningCity = cities.reduce((a, b) => { return data[a][stat.key] > data[b][stat.key] ? a : b });
      const spacebetweenUnits = stat.spaceBetweenUnits ? ' ' : '';
      statsRendered.push(
        <div className="stat-item" key={stat.key}>
          <span className="stat">{stat.title}:</span>
          <span className="value">
            {(() => {
              if (dataLoaded) {
                return (
                  <span>{data[winningCity][stat.key]}{spacebetweenUnits}{stat.unit} in {CitiesConfig[winningCity].name}</span>
                );
              } else {
                return (
                  <span>calculating data</span>
                );
              }
            })()}
          </span>
        </div>
      );

    });

  	return (

      <div className="widget-info">
        {statsRendered}
      </div>
  	)
  }

}

export default Info;