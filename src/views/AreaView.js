import React, { Component } from "react";
import logo from "./../assets/svg/default-monochrome-white.svg";
import openSocket from "socket.io-client";
import { Container, Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import "./../assets/css/style.css";
import { TableView } from "./templates/TableView";

export class AreaView extends Component {
  constructor(props) {
    super(props)

    let building = this.props.match.params.building,
    params = new URLSearchParams(window.location.search),
    floor = this.props.match.params.floor
    floor = floor ? floor : ''
    let name = building.charAt(0).toUpperCase() + building.substring(1),
    url = building + '/' + floor

    name += floor ? ' Floor #' + floor : ''

    this.state = {name: name, area: url}
  }

  componentWillMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      window.location.reload()
    });
  }
  componentWillUnmount() {
      this.unlisten();
  }
  render() {
     return (
         <div>{this.props.children}</div>
      );
  }

  render() {
    return (
      <>
      {
        <>
        <Navbar variant="dark" bg="dark" expand="lg">
          <Navbar.Brand  href="#home"><img src={logo} alt="" height="30" className="d-inline-block align-top" /></Navbar.Brand>
        </Navbar>
        <Container>
          <h1>{this.state.name}</h1>
          <TableView area={this.state.area} />
          <a href="javascript:history.back()">Go Back</a>
        </Container>
        </>
      }
      </>
    );
  }
}
