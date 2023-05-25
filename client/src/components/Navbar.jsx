import React from 'react';
import { Navbar, Button } from 'react-bootstrap';

const MyNavbar = ({ heading, buttonRoute, buttonLabel }) => {
  return (
    <Navbar bg="light" expand="lg" style={{ width: '100%', height: '20%' }}>
      <div className="container d-flex justify-content-end align-items-center">
        <div className="mr-auto">
          <h3 className="mr-3">{heading}</h3>
        </div>
        <div className="Button" style={{ marginLeft: '10px' }}>
          <Button variant="primary" className="button" href={buttonRoute}>
            {buttonLabel}
          </Button>
        </div>
      </div>
    </Navbar>
  );
};

export default MyNavbar;
