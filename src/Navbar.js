import React, { Component } from 'react';

export default class Navbar extends Component {

  onLogin() {
    this.props.onLogin();
  }

  onLogout() {
    this.props.onLogout();
  }

    render() {

      let page;
      if (this.props.idToken) {
        page = <a onClick={this.onLogout.bind(this)} href="#">Log out</a>;
      } else {
        page = <a onClick={this.onLogin.bind(this)} href="#">Log in</a>;
      }

      return(
        <div>
          {page}
        </div>
      )
    }
}
