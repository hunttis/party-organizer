import React from 'react';
import { render } from 'react-dom';
// import { Provider } from 'react-redux';
 
// import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Questions } from './Components/Questions/Questions';
import firebase from 'firebase/app';
// import { ReactReduxFirebaseProvider, getFirebase, firebaseReducer } from 'react-redux-firebase'
import 'firebase/database';
import 'bulma/css/bulma.css';
import './mystyle.css';

import firebaseConfig from '../config.js';

// const rrfConfig = {
//   userProfile: 'users',
// }

firebase.initializeApp(firebaseConfig)

// const rootReducer = combineReducers({
//   firebase: firebaseReducer
// })

// const initialState = {}
// const store = createStore(
//   rootReducer,
//   initialState
//   )


// const rrfProps = {
//   firebase,
//   config: rrfConfig,
//   dispatch: store.dispatch
// }

const App = () => (
  <Questions/>
);
 
render(<App/>, document.getElementById('app'));
