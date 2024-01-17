import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import RideTable from "../Components/Table";
import AnimatedMap from "../Components/AnimatedMap";

const Companion = () => {
  const { tripId } = useParams();
  const [tripDetails, setTripDetails] = useState(null);

  const fetchData = async () => {
    try {
      const apiUrl = `http://localhost:5000/getRideWithId/${tripId}`;

      const response = await axios.get(apiUrl);
      const rideDetails = response.data[0];
      console.log(rideDetails);
      setTripDetails(rideDetails);
    } catch (error) {
      console.log(
        "There was an error getting the ride with the given id",
        error
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, [tripId]);

  return (
    <Container style={{ marginTop: "20px" }}>
      <h4>Ride details for {tripId}</h4>
      {tripDetails && <RideTable rideDetails={tripDetails} />}
      {tripDetails && (
        <AnimatedMap
          startLatitude={tripDetails.startLatitude || -122.414}
          startLongitude={tripDetails.startLongitude || 37.776}
          endLatitude={tripDetails.endLatitude || -77.032}
          endLongitude={tripDetails.endLongitude || 38.913}
        />
      )}
    </Container>
  );
};

export default Companion;
