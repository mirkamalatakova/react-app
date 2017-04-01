import { connect } from 'react-redux';
import Weather from 'components/widgets/Weather';
import { getData, unmountWidget } from 'redux/modules/weather';

/**
 * mapStateToProps
 * @param {Object} state - state object constructed by Redux
 * @param {Object} ownProps - props object containing props
 * @returns {Object} props which will be passed to actual Component
 * @see https://github.com/reactjs/react-redux/blob/master/docs/api.md
 */
const mapStateToProps = (state, ownProps) => {
  return {
    ...state.weather[ownProps.location],
  };
}

/**
 * mapDispatchToProps
 * @param {callback} dispatch - redux dispatch function used for dispatching redux actions
 * @see https://github.com/reactjs/react-redux/blob/master/docs/api.md
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchData : function() {
      dispatch(getData(ownProps.location));
    },
  };
}

const WeatherContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Weather);

export default WeatherContainer;