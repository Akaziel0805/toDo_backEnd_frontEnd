import React, { Component } from "react";
import axios from "axios";

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  login(e) {
    e.preventDefault();
    axios
      .post("http://localhost:4001/login", {
        username: e.target.username.value,
        password: e.target.password.value,
      })
      .then((response) => {
        console.log(response);
        document.cookie =
          response.data.length > 0 ? `user=${response.data[0].id}` : "";
        console.log(document.cookie);
        window.location.href = response.data.length > 0 ? "/todo" : "/";
        // if (response.data.length > 0) {
        //   window.location.href = "/todo";
        // } else {
        //   window.location.href = "/";
        // }
        // response.data.length > 0
        //   ? (window.location.href = "/todo")
        //   : (window.location.href = "/");
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.login}>
          <label htmlFor="username">Username</label>
          <input name="username" type="text"></input>
          <label htmlFor="password">Password</label>
          <input name="password" type="password"></input>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}
