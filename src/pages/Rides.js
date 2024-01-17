import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import { PersonCircle } from 'react-bootstrap-icons'
import axios from "axios";


const Rides = ({customerId}) => {
  const [ridesData, setRidesData] = useState("");
  
  console.log("Id from rides", {customerId});
  useEffect(() => {
    try{
      let response; 
      const f = async () => {
        response = await axios.get(`http://localhost:5000/getRides/${customerId}`);
        console.log("entered f", {response});
        setRidesData(response?.data);
      }
      f();
    } catch(e){
      console.log("Error",{e});
    }
  },[]);
  useEffect(() => {
    console.log({customerId}, "from effect")
  },[customerId])
  console.log({ridesData})
  if(!customerId) return <h5>Enter Customer Id on home page</h5>;
  if(!ridesData) return "";
  return (
    <Container>
      <Row style={{fontSize : '45px', fontWeight : 'bold'}}> My Rides </Row> 
      <Row style={{height : "60px",  margin : "10px auto", alignItems : "center"}}>
        <Col md="1"  xs = "2">< PersonCircle size={'50px'}/></Col>
        <Col md="11" xs="10">
          <Row>
            <Col style={{fontSize : '25px'}} md="12"> Greetings!! </Col>
          </Row>
          <Row>
            <Col md = "12">{(customerId == "") ? "default" : customerId}</Col>
          </Row>
        </Col>
      </Row>
      <Table striped bordered hover >
        <thead>
          <tr>
            <th>Trip Id</th>
            <th>Driver Name</th>
            <th>Driver Phone Number</th>
            <th>Cab Number</th>
            <th>Start {"{latitude , longitude}"}</th>
            <th>End {"{latitude , longitude}"}</th>
          </tr>
        </thead>
        <tbody>
          {ridesData.map((ride) => {
            console.log({ride});
            return (
              <tr>
                <td>{ride.tripId}</td>
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
    </Container>
  );
};

export default Rides;
