import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import 'firebase/auth';
import { Questions } from './Questions';


export default compose(
  firebaseConnect([
    '/questions',
    '/answers'
  ]),
  connect((state: any) => {
    console.log(state)
    return  {
      questions: state.firebase.data.questions,
      answers: state.firebase.data.answers,
      auth: state.firebase.auth,
      profile: state.firebase.profile,
    };
})
)(Questions) as React.ComponentType<any>;
