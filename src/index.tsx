import React from 'react';
import { render } from 'react-dom';
import { MainPage } from './Components/MainPage';
import firebase from 'firebase/app';
import 'firebase/database';
import 'bulma/css/bulma.css';
import './mystyle.css';
import firebaseConfig from '../config.js';

firebase.initializeApp(firebaseConfig)

const App = () => (
  <MainPage/>
);
 
render(<App/>, document.getElementById('app'));
