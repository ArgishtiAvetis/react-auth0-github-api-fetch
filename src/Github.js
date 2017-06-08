import React, { Component } from 'react';
import Profile from './Profile';
import Search from './Search';

const API = 'https://api.github.com/users';
export default class Github extends Component {

  constructor() {
    super();

    this.state = {
      username: 'Argishtiavetis',
      name: '',
      avatar: '',
      repos: '',
      followers: '',
      following: '',
      homeURL: '',
      notFound: ''
    }
  }

  getProfile(username) {
    let finalURL = `${API}/${username}`;

    fetch(finalURL)
    .then((res) => res.json())
    .then((data) => {
      this.setState({
        username: data.login,
        name: data.name,
        avatar: data.avatar_url,
        repos: data.public_repo,
        followers: data.followers,
        following: data.following,
        homeURL: data.html_url,
        notFound: data.message
      })
    })
    .catch((err) => {
      console.log("Probleeeeeeeeeeem!");
    });
  }

  componentDidMount() {
    this.getProfile(this.state.username);
  }

  render() {
    return(
      <div>
        {/* <h1>{this.state.name}</h1> */}
        <Search searchProfile={this.getProfile.bind(this)} />
        <Profile userData={this.state} />
      </div>
    )
  }
}
