import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';

class App extends React.Component{

    retrieveDevice = () => {
        let identifier = document.getElementById("deviceUserInput").value;
        fetch("http://localhost:8080/device/"+identifier,{
            method: "GET",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                'Accept':'application/json',
                "Content-Type": "application-json"
            }
        }).then(response => response.json()).then(data => {
            ReactDOM.render(this.forgeIntoTable(data), document.getElementById("devices"));
        });
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
                <button id="loadDeviceButton" onClick={this.retrieveDevice}>Load device</button>
                <div id="devices"/>
            </div>
        )
    }
}

export default App;
