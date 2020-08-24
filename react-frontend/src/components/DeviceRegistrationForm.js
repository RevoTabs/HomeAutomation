import '../App.css'
import React from "react";

export default class DeviceRegistrationForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            identifier: '',
            name: '',
            device_type: '',
            gateway_address: ''
        };
    };

    handleIdentifierChange = (event) => {
        this.setState({
            identifier: event.target.value
        });
    };

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        });
    };

    handleDeviceTypeChange = (event) => {
        this.setState({
            device_type: event.target.value
        });
    };

    handleGatewayAddressChange = (event) => {
        this.setState({
            gateway_address: event.target.value
        });
    };

    handleSubmit = (event) => {
        alert(`Register a new device with identifier: ${this.state.identifier}`)
        event.preventDefault();
    };


    render() {
        let { identifier, name, device_type, gateway_address } = this.state;
        return(
            <div id="deviceRegistrationWrapper">
                <p id="deviceRegistrationFormHeadline">Register a new device</p>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Identifier:
                        <input
                            id="deviceRegistrationFormIdentifierUserInput"
                            value={identifier}
                            onChange={this.handleIdentifierChange}
                            type="text"
                        />
                    </label> <br/>
                    <label>
                        Name:
                        <input
                            id="nameUserInputForm"
                            value={name}
                            onChange={this.handleNameChange}
                            type="text"
                        />
                    </label> <br/>
                    <label>
                        Device type:
                        <input
                            id="deviceTypeInputForm"
                            value={device_type}
                            onChange={this.handleDeviceTypeChange}
                            type="text"
                        />
                    </label> <br/>
                    <label>
                        Gateway Address:
                        <input
                            id="gatewayAddressInputForm"
                            value={gateway_address}
                            onChange={this.handleGatewayAddressChange}
                            type="text"
                        />
                    </label> <br/>
                    <button type="submit">Send</button>
                </form>
            </div>
        )
    };
};