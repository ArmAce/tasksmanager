import React, { useState } from "react";

import { useAuth } from "../../hooks";

import {
  Collapse,
  Navbar as Navbar_,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';


const Navbar = () => {

  const {userLogOut, user, storedUser} = useAuth();
  const username = user.username||storedUser.username;
  const [isOpen, setIsOpen] = useState(false);


  const toggle = () => setIsOpen(!isOpen);

  const logOut = (e) => {
      e.preventDefault();
      userLogOut();
  }

  


  return <>
    <Navbar_ color="dark" dark={true} expand="md">
        <NavbarBrand href="/">TasksManager</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/tasks">Tutti i tasks</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="" onClick={logOut}>
                Logout
              </NavLink>
            </NavItem>
            {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
          </Nav>
          <NavbarText>Benvenuto { username }</NavbarText>
        </Collapse>
      </Navbar_>
  </>

};

export default Navbar;