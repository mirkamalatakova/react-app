import { connect } from 'react-redux';
import Info from 'components/widgets/Info';

/**
 * mapStateToProps
 * @param {Object} state - state object constructed by Redux
 * @param {Object} ownProps - props object containing props
 * @returns {Object} props which will be passed to actual Component
 * @see https://github.com/reactjs/react-redux/blob/master/docs/api.md
 */
const mapStateToProps = (state/*, ownProps*/) => {
  return {
    weatherData : {
      ...state.weather
    },
  };
}

/**
 * mapDispatchToProps
 * @param {callback} dispatch - redux dispatch function used for dispatching redux actions
 * @see https://github.com/reactjs/react-redux/blob/master/docs/api.md
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
}

const InfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Info);

export default InfoContainer;