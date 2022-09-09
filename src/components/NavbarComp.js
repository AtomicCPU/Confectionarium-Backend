// import 'bootstrap/dist/css/bootstrap.min.css';

import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export const NavbarComp = ({ loggedIn }) => {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/home">Confectionarium</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-begin flex-grow-1 pe-3">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/about">Our Story</Nav.Link>
              <NavDropdown
                href="/products"
                title="Products"
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="/products">
                  All Products
                </NavDropdown.Item>
                <NavDropdown.Item href="/dark-chocolate">
                  Dark Chocolate
                </NavDropdown.Item>
                <NavDropdown.Item href="/chocolate-truffles">
                  Artisan Chocolate Truffles
                </NavDropdown.Item>
                <NavDropdown.Item href="/macarons">Macarons</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link href={`${loggedIn ? '/logout' : '/login'}`}>
                {loggedIn ? 'Logout' : 'Login'}
              </Nav.Link>
              <Nav.Link href={`${loggedIn ? '/cart' : '/signup'}`}>
                {loggedIn ? 'Cart' : 'Sign Up'}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};
