import React, {useState} from "react";
import {NavLink} from 'react-router-dom';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem} from "reactstrap";

const Navigation = () => {

  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

    return(

        <div>
            <Navbar color="faded" light>
                <NavbarBrand className="navbar-brand">
                </NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse isOpen={!collapsed} navbar>
                    <Nav navbar className="align-center">
                        <NavItem>
                            <NavLink to="/" onClick={toggleNavbar}>Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/searchBook" onClick={toggleNavbar} >Search Book</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/myLibrary" onClick={toggleNavbar} >My Library</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>

    );
}

export default Navigation



