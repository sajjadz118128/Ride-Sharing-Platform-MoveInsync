import React from "react";
import Table from "react-bootstrap/Table";

const RideTable = ({ rideDetails }) => {
  const {
    tripId,
    customerId,
    driverName,
    driverPhoneNumber,
    cabNumber,
    startLatitude,
    startLongitude,
    endLatitude,
    endLongitude,
  } = rideDetails;
  console.log(rideDetails);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Trip Id</th>
          <th>Customer Id</th>
          <th>Driver Name</th>
          <th>Driver Phone</th>
          <th>Cab Number</th>
          <th>Start Location</th>
          <th>End Location</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{tripId}</td>
          <td>{customerId}</td>
          <td>{driverName}</td>
          <td>{driverPhoneNumber}</td>
          <td>{cabNumber}</td>
          <td>{"{" + startLatitude + ", " + startLongitude + "}"}</td>
          <td>{"{" + endLatitude + ", " + endLongitude + "}"}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default RideTable;
