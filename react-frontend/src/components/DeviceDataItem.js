import React from "react";

export default class DeviceDataItem extends React.Component{

    forgeIntoTable = (data) => {
        return (
            <table>
                <thead>
                <th>Hallo</th>
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
        let { data } = this.props;
        return (
            <p>DEVICE DATA ITEM PLACEHOLDER</p>
        )
    }
}
