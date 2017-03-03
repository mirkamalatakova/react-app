import React from 'react';
import Moment from 'moment';
import 'moment-timezone';

class Clock extends React.Component {
  
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    
    this.state = {
    	timestamp : Moment().valueOf(), // timestamp in miliseconds
    };
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    this.setState({
      timestamp: this.state.timestamp + 1000,
    });
  }

  render() {
    const date = Moment.tz(this.state.timestamp, this.props.timezone);

  	return (
      <div className="widget-clock">
        <span className="date">{date.format('dddd, MMMM D')}</span>,&nbsp;
        <span className="time">{date.format('HH')}<span className="delimiter blink">:</span>{date.format('mm')}</span>
      </div>
  	)
  }

}

export default Clock;