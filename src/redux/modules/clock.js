const USER_LOGIN_START = 'USER_LOGIN_START';
const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';

/**
 * send login data to login proxy
 * @param {string} username - username
 * @param {string} password - password
 * @param {Function} successClbk - called in case of succesfull login
 * @param {Function} errorClbk - called in case of login error
 * @returns {dispatchable} function which can be passed to dispatch
 * @see http://redux.js.org/docs/basics/Actions.html
 * @see https://github.com/gaearon/redux-thunk
 */
export function loginUser(username, password, successClbk = () => {}, errorClbk = () => {}) {
  return (dispatch/* , getState */) => {
    dispatch({
      type: USER_LOGIN_START,
    });

    Fetch.post(
      '/login.php',
      {
        dataType: 'json',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
        credentials: 'same-origin', // crendetials: 'include' for cross-domain
      },
    ).then(
      (response) => {
        const parsedResponse = userHelper.processLoginResponse(response);
        if (parsedResponse.error) {
          dispatch({
            type: USER_LOGIN_ERROR,
            error: parsedResponse.error,
          });
          errorClbk();
        } else {
          dispatch({
            type: USER_LOGIN_SUCCESS,
          });
          successClbk();
        }
      },
    ).catch(
      (response) => {
        dispatch({
          type: USER_LOGIN_ERROR,
          error: `Unexpected login error (${response.message})`,
        });
        errorClbk();
      },
    );
  };
}

const initialState = {
  loginInProgress: false,
  loginError: '',
};

/**
 * user reducer
 * @param {Object} state - object holding user state
 * @param {Object} action - action created by action creator
 * @returns {Object} new instance of state
 * @see http://redux.js.org/docs/basics/Reducers.html
 */
export default function user(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN_START:
      return {
        ...state,
        loginInProgress: true,
        loginError: '',
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loginInProgress: false,
      };
    case USER_LOGIN_ERROR:
      return {
        ...state,
        loginInProgress: false,
        loginError: action.error,
      };
    default:
      return state;
  }
}