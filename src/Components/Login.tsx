import React from 'react';
import firebase from 'firebase/app';
import _ from 'lodash';
import 'firebase/auth';
import 'firebase/database';

interface Props {
  userId: string;
  setUserId: (userId: string) => void;
}

export class Login extends React.Component<Props> {

  async loginWithGoogle() {
    const { setUserId } = this.props;
    const result = await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    console.log(result);
    const signinresult = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
    console.log(signinresult);
    const userId = _.get(firebase.auth(), 'currentUser.uid', false);
    setUserId(userId);
  }

  render() {
    const { userId } = this.props;
    console.log('Current user is:', userId);

    return (
      <div className="section">
        <h1>Login</h1>
        {!userId && 
          <div className="button is-info" onClick={() => this.loginWithGoogle()}>Login with google</div>
        }
        {userId && 
          <div>
            Logged in as: {firebase.auth().currentUser?.displayName}
          </div>
        }
      </div>
    );
  }
}