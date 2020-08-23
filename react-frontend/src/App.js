import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import DeviceTable from "./components/DeviceTable"

class App extends React.Component {

    /**
     * Gets an specific device in the basis of the passed identifier
     * @param identifier - used to determine the entry
     */
    getDevice = (identifier) => {
        this.fetchAllDevices().then(() => {
            return this.getDeviceInState(identifier);
        });
    };

    /**
     * Fetches all devices from the backend and stores it in the state
     * @returns {Promise<void>}
     */
     fetchAllDevices = async () => {
        const response = await fetch("http://localhost:8080/devices",{
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
    };

    /**
     * Displays a single device
     * Gets the identifier from the user input and renders this specific element in a new table
     * @returns {Promise<void>}
     */
    displayDevice = async () => {
        await this.fetchAllDevices().then(() => {
            let identifier = document.getElementById("deviceUserInput").value;
            let elementToDisplay = this.getDeviceInState(identifier);
            let newClass = (
                <DeviceTable data={elementToDisplay}/>
            );
            ReactDOM.render(newClass, document.getElementById("devicesAnchor"));
        });
    };

    /**
     * Displays all devices
     */
    displayAllDevices = async () => {
        await this.fetchAllDevices().then(() => {
            let devices = (
                <div id="devices">
                    {this.state.devices.map((device) => (
                        <DeviceTable id={device.identifier} data={device}/>
                    ))}
                </div>
            );
            ReactDOM.render(devices, document.getElementById("devicesAnchor"));
        });
    };

    /**
     * Gets an entry on the basis of the passed identifier
     * @param identifier - used to determine the entry
     * @returns {undefined|*}
     */
    getDeviceInState = (identifier) => {
        for (let entry in this.state.devices) {
            if(identifier === this.state.devices[entry].identifier) {
                return this.state.devices[entry];
            }
        }
        return undefined;
    };

    render() {
        return (
            <div id="App">
                <h1>Home Automation</h1>
                <input type="text" id="deviceUserInput" defaultValue="samsung-tv"/>
                <button id="loadDeviceButton" onClick={this.displayDevice}>Load device</button>
                <button id="loadDevicesButton" onClick={this.displayAllDevices}>Load devices</button>
                <div id="devicesAnchor"/>
            </div>
        );
    };
}

export default App;
