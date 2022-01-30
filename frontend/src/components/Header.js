import React from 'react'
import { Navbar } from 'react-bootstrap'

const Header = ({title}) => {
    return (
        <Navbar bg="warning" variant="light">
            <Navbar.Brand href="/">{title}</Navbar.Brand>
        </Navbar>
    )
};

export default Header;