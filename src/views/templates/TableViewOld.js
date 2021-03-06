import React, { Component } from "react";
import logo from "./../../assets/svg/default-monochrome-white.svg";
import openSocket from "socket.io-client";
import { Table, ProgressBar } from "react-bootstrap";
import "./../../assets/css/style.css";
let config = require("./../../Config");

export class TableView extends Component {
  constructor(props) {
    super(props);

    this.state = { tableData: false }

    fetch(`${config.url}/buildings/${this.props.area}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let innerHtml = data.data.map(obj => {
          let name = obj.key.split(":");
          name = name[name.length - 1];
          name = name.replace(/\./g, " ");
          name = name.charAt(0).toUpperCase() + name.substring(1);
          if (name.length < 3 && obj.key.split(':').length > 2) name = "Zone " + name;
          else if (name.length < 3 && obj.key.split(':').length ===  2) {
            let url = '/#/buildings/' + this.props.area + name 
            name = "Floor " + name;
            name = <a href={url}>{name}</a>
          } else if (obj.key.split(':').length ===  1) {
            let url = '/#/buildings/' + obj.key.split(":")[0]
            name = <a href={url}>{name}</a>
          }

          let val = obj.value * 100;
          let variant;
          if (val <= 33) variant = "success";
          else if (val <= 66) variant = "warning";
          else variant = "danger";

          /*
                    onMouseEnter
                    onMouseLeave
                */
          return (
            <tr key={obj.key}>
              <td>{name}</td>
              <td>
                <ProgressBar
                  variant={variant}
                  now={val}
                  label={`${Math.floor(val)}% busy`}
                />
              </td>
            </tr>
          );
        });

        this.setState({ tableData: innerHtml });
      });
  }

  render() {
    return (
      <Table borderless hover responsive>
        <thead>
          <tr>
            <th>Area</th>
            <th>Busyness</th>
          </tr>
        </thead>
        <tbody>
        {this.state.tableData}
        </tbody>
      </Table>
    )
  }
}
