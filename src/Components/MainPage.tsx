import React, { Fragment, Component } from 'react';
import firebase from 'firebase/app';
import _ from 'lodash';
import 'firebase/auth';
import 'firebase/database';
import { Questions } from './Questions/Questions';
import { Login } from './Login';

interface State {
  userId: string;
}

export class MainPage extends React.Component<any, Partial<State>> {

  state = { userId: '' }

  setUserId(userId: string) {
    this.setState({ userId });
  }

  render() {
    const { userId } = this.state;
    console.log('MAINPAGE: ', userId);

    return (
      <div>
        <Login userId={userId} setUserId={(loginId) => this.setUserId(loginId)} />
        {userId && <Questions userId={userId} />}
      </div>
    );
  }
}