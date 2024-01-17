import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import Map from "../Components/Maps";
import FormGroup from "../Components/Form";

import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const Home = ({handlCustomerId}) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLatitude(latitude);
          setLongitude(longitude);
        },
        function (error) {
          console.log("There has been an error in fetching the location");
        }
      );
    } else {
      console.log("Geolocation is not supported");
    }
  }, []);

  return (
    <div>
      <Container style={{ marginTop: "5vh" }}>
        <h5>Hello Traveller!</h5>
        <Row>
          <Col>
            {latitude && <Map latitude={latitude} longitude={longitude} />}
          </Col>
          <Col>
            {latitude && (
              <FormGroup latitude={latitude} longitude={longitude} handlCustomerId={handlCustomerId}/>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
