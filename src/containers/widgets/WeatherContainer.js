import { connect } from 'react-redux';
import Clock from 'components/widgets/Weather';
import { getData, unmountWidget } from 'redux/modules/weather';

/**
 * mapStateToProps
 * @param {Object} state - state object constructed by Redux
 * @param {Object} state.user - redux user store
 * @param {number} state.user.loginInProgress - true while request is being sent to API
 * @param {string} state.user.loginError - login error message
 * @param {Object} ownProps - props object containing props
 *                            passed to to container in regular React way
 * @param {Object} ownProps.location - router location object
 * @param {Object} ownProps.location.state - router location state
 * @param {Object} ownProps.location.nextPathname - path where user should be redirected after login
 * @param {Object} ownProps.location.nextQuery - query where user should be redirected after login
 * @param {Object} ownProps.location.query - current query object
 * @returns {Object} props which will be passed to actual Component
 * @see https://github.com/reactjs/react-redux/blob/master/docs/api.md
 */
const mapStateToProps = (state, ownProps) => {
  return {
    data: state.weathers[ownProps.location],
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
    unmount : function() {
      dispatch(unmountWidget(ownProps.location));
    }
  };
}

const WeatherContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Weather);

export default WeatherContainer;