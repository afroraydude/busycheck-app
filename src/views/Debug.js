import React, {Component} from 'react';
import logo from './../assets/svg/default.svg'
import openSocket from 'socket.io-client';
import {Button, ProgressBar, Container} from 'react-bootstrap'

let config = require('./../Config')

export default class Debug extends Component {
    constructor(props) {
        super(props)
        
        const socket = openSocket(`${config.url}`);
        this.state = { apiStatus: false, socket, wsStatus: false, serverInfo: false, floorData: false, floorDataUi: false }
        socket.on('welcome', () => {
            this.setState({wsStatus: true})
        })
        fetch(`${config.url}`).then(response => response.json())
        .then(data => {
            if (data.status === true) {
                this.setState({apiStatus: true})
                fetch(`${config.url}/about`).then(response => response.json())
                .then(data => {
                    let x = <><p>Server Info:</p><code>{JSON.stringify(data)}</code></>
                    this.setState({serverInfo: x})
                })
            }
        })

        this.sendDataRequest = this.sendDataRequest.bind(this)
        this.sendDataRequestUi = this.sendDataRequestUi.bind(this)
    }

    sendDataRequest(event) {
        event.preventDefault();
        let floor = ''
        if (this.floor.value !== 'Average') floor =  this.floor.value
        let dataToGrab = this.building.value + '/' + floor

        fetch(`${config.url}/buildings/${dataToGrab}`).then((res) => {
            return res.json()
        }).then((data) => {
            this.setState({ floorData: <pre>{JSON.stringify(data, null, 2)}</pre>})
        })
    }

    sendDataRequestUi(event) {
        event.preventDefault();
        this.setState({ floorDataUi: false })
        let floor = ''
        if (this.floor.value !== 'Average') floor =  this.floor.value
        let dataToGrab = this.building.value + '/' + floor

        fetch(`${config.url}/buildings/${dataToGrab}`).then((res) => {
            return res.json()
        }).then((data) => {
            console.log(data)
            let innerHtml = data.data.map((obj) => {
                let name = obj.key.split(':')
                name = name[name.length - 1]
                name = name.replace(/\./g, ' ')

                if (name.length < 3) name = "Zone " + name

                let val = obj.value * 100;
                let variant;
                if (val <= 33) variant = "success"
                else if (val <= 66) variant = "warning"
                else variant = "danger"

                /*
                    onMouseEnter
                    onMouseLeave
                */
                return (
                    <div className="row">
                    <div className="col-4">
                        <p key={obj.key}>{name}:</p>
                    </div>
                    <div className="col-8">
                    <ProgressBar variant={variant} now={val} label={`${Math.floor(val)}% busy`} />
                    </div>
                    </div>
                )
            })
            let out = <>{innerHtml}</>

            this.setState({ floorDataUi: out })
        })
    }
    
    render() {
        /** ex */
        let connectionTest;
        if (this.state.apiStatus) {
            connectionTest = <p>API Connection Status: <span style={{color: "green"}}>Connected</span></p>
        } else {
            connectionTest = <p>API Connection Status: <span style={{color: "red"}}>Disconnected</span></p>
        }
        return (
            <>
                <img src={logo} style={{height: 100}} />
                <h1>Debug Console</h1>
                <p>API Connection Status: {
                    this.state.apiStatus ? 
                        <span style={{color: "green"}}>Connected</span> : 
                        <span style={{color: "red"}}>Disconnected</span>
                }</p>
                
                <p>Websocket Connection Status: {
                    this.state.apiStatus ? 
                        <span style={{color: "green"}}>Connected</span> : 
                        <span style={{color: "red"}}>Disconnected</span>
                }</p>

                {this.state.serverInfo}

                <p>
                    Pick building:&nbsp;
                    <select ref={(building) => this.building = building}>
                        <option value='fenwick'>Fenwick</option>
                    </select> 
                    <br/>
                    And Floor:&nbsp;
                    <select ref={(floor) => this.floor = floor}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>Average</option>
                    </select>
                </p>

                <p><Button onClick={this.sendDataRequest}>Get Data (Raw)</Button>&nbsp;<Button onClick={this.sendDataRequestUi}>Get Data (UI)</Button></p>
                
                <br/>

                <br/>

                <Container>
                    {this.state.floorDataUi}
                </Container>
                
                {this.state.floorData}

                <br/>

                <progress value={0.27}/> {/* limit of green */}
                <progress value={0.45}/> {/* limit of yellow */}
                <progress value={0.73}/> {/* limit of orange */}
                <progress value={1.00}/> {/* limit of red */}

                <ProgressBar variant="success" now={33}/> {/* limit of green */}
                <ProgressBar variant="warning" now={66}/> {/* limit of orange */}
                <ProgressBar variant="danger" now={100}/> {/* limit of red */}
            </>
        ) 
    }
}