import React from 'react';
import { Spinner as Loader } from 'react-bootstrap';

const Spinner = () => {
  return (
    <Loader
      style={{
        position: 'absolute',
        left: 'calc(50% - 1rem)',
        top: 'calc(50% - 1rem)',
      }}
      animation="border"
      role="status"
      variant="primary"
    ></Loader>
  );
};

export default Spinner;
