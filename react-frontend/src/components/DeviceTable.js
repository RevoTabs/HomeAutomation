import React from "react";

export default class DeviceTable extends React.Component {

    render() {
        const { data } = this.props;
        return (
            <table id={data.identifier}>
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
    };
}
