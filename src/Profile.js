import React, { Component } from 'react';

export default class Profile extends Component {

  render() {

    let data = this.props.userData;

    let followers = `${data.homeURL}/followers`;
    let following = `${data.homeURL}/following`;
    let repos = `${data.homeURL}/repositories`;

    if (data.notFound === "Not Found") {
      return(
        <div>
          <h1>User Not Found!</h1>
        </div>
      );
    } else {
      return(
        <div>
          <h1><a href={data.homeURL}>{data.name || data.username}</a></h1>
          <img src={data.avatar} width="250" />
          <h3><a href={followers} target="_blank">{data.followers} followers</a></h3>
          <h3><a href={following} target="_blank">{data.following} following</a></h3>
          <h4><a href={repos} target="_blank">Repos</a></h4>
        </div>
      );
    }
  }

}
