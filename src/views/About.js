import React, {Component} from 'react'
import { Container, Col, Navbar, Row } from 'react-bootstrap'
import logo from "./../assets/svg/default-monochrome-white.svg";

export default class About extends Component {
  render() {
    return (
      <>
      <Navbar variant="dark" bg="dark" expand="lg">
          <Navbar.Brand  href="#/"><img src={logo} alt="" height="30" className="d-inline-block align-top" /></Navbar.Brand>
        </Navbar>
      <Container className="about-page">
        <Row>
          <h1>About</h1>
        </Row>
        <Row>
          <h2>What is BusyCheck?</h2>
          <p>BusyCheck is a full stack application that </p>
        </Row>
        <Row>
          <h2>How does BusyCheck work?</h2>
        </Row>
        <Row>
          <h2>Any future plans for BusyCheck?</h2>
        </Row>
      </Container>
      </>
    )
  }
}