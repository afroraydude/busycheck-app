import React, { Component } from "react";
import logo from "./../../assets/svg/default-monochrome-white.svg";
import openSocket from "socket.io-client";
import {
  Table,
  ProgressBar,
  Popover,
  OverlayTrigger,
  Button
} from "react-bootstrap";
import "./../../assets/css/style.css";
import fenwick1 from './../../assets/img/fenwickmap1.jpg'
import fenwick2 from './../../assets/img/fenwickmap2.jpg'
import fenwick3 from './../../assets/img/fenwickmap3.jpg'
import fenwick4 from './../../assets/img/fenwickmap4.jpg'
import fenwick5 from './../../assets/img/fenwickmap5.jpg'
import jcg from './../../assets/img/ground-floor.png'
import jc1 from './../../assets/img/first-floor.png'
import jc2 from './../../assets/img/second-floor.png'
import jc3 from './../../assets/img/third-floor.png'

let images = {
  "fenwick:1":fenwick1,
  "fenwick:2":fenwick2,
  "fenwick:3":fenwick3,
  "fenwick:4":fenwick4,
  "fenwick:5":fenwick5,
  "JC:1":jc1,
  "JC:2":jc2,
  "JC:3":jc3,
  "JC:Ground.Floor":jcg
}

let config = require("./../../Config");

export class TableView extends Component {
  constructor(props) {
    super(props);

    this.state = { tableData: false };

    fetch(`${config.url}/buildings/${this.props.area}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let innerHtml = data.data.map(obj => {
          let name = obj.key.split(":");
          console.log(name.length)
          name = name[name.length - 1];
          name = name.replace(/\./g, " ");
          name = name.charAt(0).toUpperCase() + name.substring(1);
          console.log(name.length)
          if (name.length <= 2 && obj.key.split(":").length > 2)
            name = "Zone " + name;
          else if (name.length <= 2 && obj.key.split(":").length === 2) {
            let url = "/#/buildings/" + this.props.area + name;
            name = "Floor " + name;
            name = <a href={url}>{name}</a>;
          } else if (obj.key.split(":").length === 2) {
            let url = "/#/buildings/" + this.props.area + obj.key.split(":")[1];
            name = <a href={url}>{name}</a>;
          } else if (obj.key.split(":").length === 1) {
            let url = "/#/buildings/" + obj.key.split(":")[0];
            name = <a href={url}>{name}</a>;
          }

          let val = obj.value * 100;
          let variant;
          if (val <= 33) variant = "success";
          else if (val <= 67) variant = "warning";
          else variant = "danger";

          

          return (
            <div class="row tableview" key={obj.key}>
                <div className="col-4">
                  <p>{name}</p>
                </div>
              <div className="col-8">
                <ProgressBar
                  variant={variant}
                  now={val}
                  animated
                  label={`${Math.floor(val)}% busy`}
                />
              </div>
            </div>
          );
        });

        this.setState({ tableData: <>{innerHtml}</> });
      });
  }

  backButton(event) {
    event.preventDefault()
    window.history.back()
  }

  render() {
    let image = this.props.area.replace('/', ':')
    image = images[image]
    let tableOutput;
    if (this.state.tableData) tableOutput = <>{this.state.tableData}<img src={image} style={{width: '100%'}} /></>;
    else
      tableOutput = (
        <p className="center-1" style={{ paddingTop: "5rem" }}>
          Loading realtime data...
        </p>
      );
    return (<>
    {tableOutput}
    <Button variant="link" onClick={this.backButton}>Go Back</Button>
    </>);
  }
}
