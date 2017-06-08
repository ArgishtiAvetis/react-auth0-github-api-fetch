import React, { Component } from 'react';

export default class Search extends Component {

  submitForm(e) {
    e.preventDefault();
    var username = this.refs.username.value;
    this.props.searchProfile(username);
    this.refs.username.value = '';
  }

  render() {
    return(
      <div>
        <form onSubmit={this.submitForm.bind(this)}>
          <input type="text" ref="username" placeholder="username" />
        </form>
      </div>
    )
  }
}
