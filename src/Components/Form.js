import React, { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

const FormGroup = ({ latitude, longitude ,handlCustomerId}) => {
  const [formData, setFormData] = useState({
    tripId: "",
    driverName: "",
    driverPhoneNumber: "",
    cabNumber: "",
    startLatitude: latitude,
    startLongitude: longitude,
    endLatitude: latitude + 0.04,
    endLongitude: longitude + 0.04,
    customerId: "",
    isActive: true,
  });

  const [shareDisabled, setShareDisabled] = useState(true);

  const handleShare = () => {
    const companionLink = `http://localhost:5000/companion/${formData.tripId}`;
    const whatsappLink = `https://api.whatsapp.com/send?text=${companionLink}`;
    window.open(whatsappLink, "_blank");
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      const createRideApiUrl = "http://localhost:5000/createRide";
      const response = await axios.post(createRideApiUrl, formData);
      handlCustomerId(formData.customerId);
      console.log(response);
      console.log("Post request is successful");
      setShareDisabled(false);
    } catch (error) {
      console.log("Error in the post request", error);
    }
  };

  const handleCompanionClick = () => {
    const urlToOpen = `http://localhost:3000/companion/${formData.tripId}`;

    window.open(urlToOpen, "_blank");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          name="tripId"
          placeholder="Enter Trip Id"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          name="customerId"
          placeholder="Enter Customer Id"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          name="driverName"
          placeholder="Driver Name"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          name="driverPhoneNumber"
          placeholder="Driver Phone"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          name="cabNumber"
          placeholder="Cab Number"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          name="endLatitude"
          placeholder="End Location Latitude"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          name="endLongitude"
          placeholder="End Location Longitude"
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit" style={{ marginRight: "20px" }}>
        Start Trip
      </Button>

      <Button
        variant="secondary"
        disabled={shareDisabled}
        onClick={handleShare}
        style={{ marginLeft: "20px", marginRight: "20px" }}
      >
        Share Ride
      </Button>

      <Button
        variant="info"
        disabled={shareDisabled}
        // href={`/companion/${formData.tripId}`}
        onClick={handleCompanionClick}
        style={{ marginLeft: "20px", marginRight: "20px" }}
      >
        Companion
      </Button>

      <Button
        variant="danger"
        disabled={shareDisabled}
        style={{ marginLeft: "20px" }}
      >
        End Ride
      </Button>
    </Form>
  );
};

export default FormGroup;
