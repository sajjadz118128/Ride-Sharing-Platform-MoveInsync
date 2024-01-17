import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import axios from "axios";

const Admin = () => {
  const [allCustomerRidesData, setAllCustomerRidesData] = useState('');
  useEffect(() => {
    try{
      let response; 
      const f = async () => {
        response = await axios.get('http://localhost:5000/getRides');
        console.log("entered f", {response});
        setAllCustomerRidesData(response?.data);
      }
      f();
    } catch(e){
      console.log("Error",{e});
    }
  },[]);
  if(!allCustomerRidesData) return "";
  return (
    <Container>
      <Row style={{fontSize : '40px', fontWeight : 'bold'}}> Admin Page </Row> 
      <Row style={{fontSize : '20px', fontWeight : 'bold'}}> All Ride Data </Row>
      <Table striped bordered hover >
        <thead>
          <tr>
            <th>Trip Id</th>
            <th>Customer Id</th>
            <th>Driver Name</th>
            <th>Driver Phone Number</th>
            <th>Cab Number</th>
            <th>Start {"{latitude , longitude}"}</th>
            <th>End {"{latitude , longitude}"}</th>
          </tr>
        </thead>
        <tbody>
          {allCustomerRidesData.map((ride) => {
            console.log({ride});
            return (
              <tr>
                <td>{ride.tripId}</td>
                <td>{ride.customerId}</td>
                <td>{ride.driverName}</td>
                <td>{ride.driverPhoneNumber}</td>
                <td>{ride.cabNumber}</td>
                <td>{`{${ride.startLatitude} , ${ride.startLongitude}}`}</td>
                <td>{`{${ride.endLatitude} , ${ride.endLongitude}}`}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <Row style={{fontSize : '20px', fontWeight : 'bold'}}> Table Title 2 </Row>
      <Table striped bordered hover >
        <thead>
          <tr>
            <th>No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default Admin;
