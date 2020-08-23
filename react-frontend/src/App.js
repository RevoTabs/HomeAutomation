import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import DeviceDataItem from "./components/DeviceDataItem"

class App extends React.Component{

    setDevices (state) {
        this.setState({
            devices: state.devices
        });
    }

    getDevice = (identifier) => {
        this.fetchDevices().then(() => {
            return this.getDeviceInState(identifier);
        });
    }

    async fetchDevices() {
        let response = await fetch("http://localhost:8080/devices",{
            method: "GET",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                'Accept':'application/json',
                "Content-Type": "application-json"
            }
        });
        let data = await response.json();
        this.setState({
            devices: data.devices
        });
    }

    displayDevice = () => {
        this.fetchDevices().then(() => {
            console.log(this.state);
            let identifier = document.getElementById("deviceUserInput").value;
            let elementToDisplay = this.getDeviceInState(identifier);
            ReactDOM.render(this.forgeIntoTable(elementToDisplay), document.getElementById("devices"));
            });
    }

    displayAllDevices = () => {
        this.fetchDevices().then(() => {
            console.log("TBD");
        });
    }


    getDeviceInState = (identifier) => {
        for (let entry in this.state.devices) {
            if(identifier === this.state.devices[entry].identifier) {
                return this.state.devices[entry];
            }
        }
        return undefined;
    }

    forgeIntoTable = (data) => {
    return (
        <table>
            <thead>
            </thead>
            <tbody>
            <tr>
                <td>Identifier:</td>
                <td>{data.identifier}</td>
            </tr>
            <tr>
                <td>Name:</td>
                <td>{data.name}</td>
            </tr>
            <tr>
                <td>Device type:</td>
                <td>{data.device_type}</td>
            </tr>
            <tr>
                <td>Gateway address:</td>
                <td>{data.gateway_address}</td>
            </tr>
            </tbody>
            <tfoot>
            </tfoot>
        </table>
    );
}

    render() {
        return (
            <div className="App">
                <h1>Hallo Moritzlein</h1>
                <p>Kleiner Test für dich Pupsi :3</p>
                <input type="text" id="deviceUserInput" defaultValue="samsung-tv"/>
                <button id="loadDeviceButton" onClick={this.displayDevice}>Load device</button>
                <button id="loadDevicesButton" onClick={this.displayAllDevices}>Load devices</button>
                <DeviceDataItem data={this.state}></DeviceDataItem>
                <div id="devices"/>
            </div>
        )
    }
}

export default App;

