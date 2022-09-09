import React from 'react';
import { Form, Card } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './styleSheets/login.css';

export const Login = (loggedIn) => {
  //1. Create login form
  //2. POST request login with credentials in login form
  //3. Navigate to homepage
  return (
    <>
      <Card className="login-card">
        <Form.Group className="mx-3 my-3 p-1" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="Email" />
        </Form.Group>
        <Form.Group className="mx-3 mb-3 p-1">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
      </Card>
    </>
    // <div>
    //   <h1>Login</h1>
    // </div>
  );
};
