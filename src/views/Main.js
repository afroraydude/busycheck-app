import React, { Component } from "react";
import logo from "./../assets/svg/default-monochrome-white.svg";
import openSocket from "socket.io-client";
import { Container, Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import "./../assets/css/style.css";
import { TableView } from "./templates/TableView";

export class Main extends Component {
  render() {
    return (
      <>
      {
        <>
        <Navbar variant="dark" bg="dark" expand="lg">
          <Navbar.Brand  href="#home"><img src={logo} alt="" height="30" className="d-inline-block align-top" /></Navbar.Brand>
        </Navbar>
        <Container>
          <h1>Buildings</h1>
          <TableView area="buildings"/>
        </Container>
        </>
      }
      </>
    );
  }
}
