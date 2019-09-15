import React, { Component } from "react";
import logo from "./../assets/svg/default.svg";
import openSocket from "socket.io-client";
import { Button, ProgressBar } from "react-bootstrap";
import "./../assets/css/style.css";

let config = require("./../Config");

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apiStatus: false
    };

    fetch(`${config.url}`)
      .then(response => {
        if (!response.ok)
          this.setState({
            apiStatus: "fail-1"
          });
        return response.json();
      })
      .then(data => {
        if (data.status === true) {
          this.setState({
            apiStatus: "success"
          });
          setTimeout(this.goSomewhere, 1000)
          
        } else {
          this.setState({
            apiStatus: "fail-2"
          });
        }
      });
  }

  goSomewhere() {
    window.location.hash = '/app'
  }

  render() {
    let output;
    switch (this.state.apiStatus) {
      case "success":
        output = 'Entering app...'
        break;
      case "fail-1":
        output = 'Failed to connect to BusyCheck servers'
        break;
      case "fail-2":
        output = 'Technical difficulties with BusyCheck servers'
        break;
      default:
        output = 'Loading...'
        break;
    }
    return (
      <div className="center-1">
        <img src={logo} style={{ height: window.innerHeight * 0.6 }} />
        <br />
        <i>{output}</i>
      </div>
    );
  }
}
