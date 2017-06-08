import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './Navbar';
import Auth0Lock from 'auth0-lock';
import Github from './Github';


const options = {
  theme: {
    logo: 'https://challer.co/img/logo.jpg'
  },
  languageDictionary: {
    emailInputPlaceholder: "something@youremail.com",
    title: "Log in to continue"
  },
};

class App extends Component {

  constructor() {
    super();

    //this.showLock = this.showLock.bind(this);

    this.state = {
      idToken: '',
      profile: {}
    }
  }

  static defaultProps = {
    clientID: 'oDlPY0acdZoCeZLHI4TcUnTGDkYrRyS2',
    domain: 'argiii.auth0.com'
  }



  componentWillMount() {
    this.lock = new Auth0Lock(this.props.clientID, this.props.domain, options);

    this.lock.on('authenticated', (authResult) => {
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          console.log(error);
          return;
        }
        //console.log(profile);
        this.setProfile(authResult.idToken, profile);
      });
    });
    this.getProfile();
  }

  setProfile(idToken, profile) {
    localStorage.setItem('idToken', idToken);
    localStorage.setItem('profile', JSON.stringify(profile));

    this.setState({
      idToken: localStorage.getItem('idToken'),
      profile: JSON.parse(localStorage.getItem('profile'))
    });
  }

  getProfile() {
    if (localStorage.getItem('idToken') != null) {
      this.setState({
        idToken: localStorage.getItem('idToken'),
        profile: JSON.parse(localStorage.getItem('profile'))
      }, () => {
        console.log(this.state);
      });
    }
  }

  showLock() {
    this.lock.show();
  }

  logout() {
    this.setState({
      idToken: '',
      profile: {}
    }, () => {
      localStorage.removeItem('idToken');
      localStorage.removeItem('profile');
    });
  }

  render() {

    let gitty;

    if (this.state.idToken) {
      gitty =
      <div>
          <h1>Welcome Back!</h1>
          <Github />
      </div>;
    } else {
      gitty = "Log in to continue";
    }

    return (
      <div className="container">
        <Navbar
          lock={this.lock}
          idToken={this.state.idToken}
          onLogin={this.showLock.bind(this)}
          onLogout={this.logout.bind(this)}
        />
        <div className="panel panel-primary">
          <div className="panel-body">
            {gitty}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
