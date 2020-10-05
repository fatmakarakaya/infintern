import * as ACTIONS from './Constants';

const defaultState = {
  isLoggedin: false,
  username: undefined,
  image: undefined,
  password: undefined,
};

const authReducer = (state, action) => {
  if (action.type === ACTIONS.LOGOUT_SUCCESS) {
    return defaultState;
  } else if (action.type === ACTIONS.LOGIN_SUCCESS) {
    return {
      ...action.payload,
      isLoggedin: true,
    };
  }
  return state;
};
export default authReducer;

// import * as ACTIONS from './constants';

// const defaultState = {
//   isLoggedin: false,
//   username: undefined,
//   image: undefined,
//   password: undefined
// };

// const authReducer = (state = { ...defaultState }, action) => {
//   if (action.type === ACTIONS.LOGOUT_SUCCESS) {
//     return defaultState;
//   } else if (action.type === ACTIONS.LOGIN_SUCCESS) {
//     return {
//       ...action.payload,
//       isLoggedin: true
//     };
//   } else if (action.type === ACTIONS.UPDATE_SUCCESS) {
//     return {
//       ...state,
//       ...action.payload
//     };
//   }
//   return state;
// };

// export default authReducer;
