// import { createStore } from 'redux';
// import authReducer from './authReducer';


// const loggedinState = {
//     isLoggedin : true,
//     username: "user1",
//     image: null,
//     password: "pass1"
//   };

//   const configureStore =  () =>{
//       return createStore(authReducer,loggedinState);
//   }

//   export default configureStore;

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './authReducer';
import SecureLS from 'secure-ls';
import { setAuthorizationHeader } from '../api/apiCalls';

const secureLs = new SecureLS();

const getStateFromStorage = () => {
  const hoaxAuth = secureLs.get('hoax-auth');

  let stateInLocalStorage = {
    isLoggedin: false,
    username: undefined,
    image: undefined,
    password: undefined
  };

  if (hoaxAuth) {
    return hoaxAuth;
  }
  return stateInLocalStorage;
};

const updateStateInStorage = newState => {
  secureLs.set('hoax-auth', newState);
};

const configureStore = () => {
  const initialState = getStateFromStorage();
  setAuthorizationHeader(initialState);
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(authReducer, initialState, composeEnhancers(applyMiddleware(thunk)));

  store.subscribe(() => {
    updateStateInStorage(store.getState());
    setAuthorizationHeader(store.getState());
  });

  return store;
};

export default configureStore;
