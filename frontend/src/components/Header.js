import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { ReactComponent as Logo } from '../images/logo.svg';
import { ReactComponent as TLogo } from '../images/Search-Gallery.svg';

const navbarStyle = {
  backgroundColor: '#F5Fabc',
};

const Header = ({ title }) => {
  return (
    <Navbar style={navbarStyle} variant="light">
      <Container>
        <Logo alt={title} style={{ maxWidth: '12rem', maxHeight: '3rem' }} />
        <TLogo style={{ maxWidth: '12rem', maxHeight: '3rem' }} />
      </Container>
    </Navbar>
  );
};

export default Header;
