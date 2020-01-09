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
          
        } else {
          this.setState({
            apiStatus: "fail-2"
          });
        }
      });
  }

  goSomewhere(event) {
    event.preventDefault()
    window.location.hash = '/buildings'
  }

  goSomewhereElse(event) {
    event.preventDefault()
    window.location.hash = '/about'
  }

  render() {
    let output;
    switch (this.state.apiStatus) {
      case "success":
        output = (
          <div className="row">
            <div className='center-1'><Button variant='success' onClick={this.goSomewhere}>Enter app</Button> <Button onClick={this.goSomewhereElse} variant='info'>About Us</Button></div>
          </div>
        )
        break;
      case "fail-1":
        output = <i>{'Failed to connect to BusyCheck servers'}</i>
        break;
      case "fail-2":
        output = <i>{'Technical difficulties with BusyCheck servers'}</i>
        break;
      default:
        output = <i>{'Connecting to the BusyCheck servers...'}</i>
        break;
    }
    return (
      <div className="container">
      <div className="center-1">
        <img src={logo} style={{ height: window.innerHeight * 0.6 }} />
        <br />
        {output}
      </div>
      </div>
    );
  }
}
