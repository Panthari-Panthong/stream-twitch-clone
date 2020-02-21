import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut} from '../actions';


class GoogleAuth extends Component {
  // Pure React
  // state = {
  //   isSignedIn: null
  // };

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: process.env.REACT_APP_API_KEY,
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();

          // React
          // this.setState({ isSignedIn: this.auth.isSignedIn.get() });

          // Redux
          this.onAuthChange(this.auth.isSignedIn.get());
          // 

          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  // Before turn to redux
  // onAuthChange = () => {
  //   this.setState({
  //     isSignedIn: this.auth.isSignedIn.get()
  //   })
  // }

  // Redux
  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon">Sign Out</i>
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon">Sign In with Google</i>
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}


const mapStateToProps = state => {
  return {
    isSignedIn : state.auth.isSignedIn
  }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);