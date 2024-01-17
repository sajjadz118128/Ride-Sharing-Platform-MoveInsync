import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand ><Link to="/" style={{textDecoration:"none", color : 'white'}}>MoveInSync</Link></Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link ><Link to="/"  style={{textDecoration:"none", color : 'white'}} > Home </Link></Nav.Link>
          <Nav.Link ><Link to="/rides" style={{textDecoration:"none", color : 'white'}} > My Rides </Link></Nav.Link>
          <Nav.Link ><Link to="/companion" style={{textDecoration:"none", color : 'white'}} > My Companion </Link></Nav.Link>
          <Nav.Link ><Link to="/admin" style={{textDecoration:"none", color : 'white'}} > Admin</Link></Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
