import React from 'react';
import { Link } from 'react-router';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';

import { RouteMap } from 'config/Routes';

const ACTIVE_CLASS = 'active';

class HeaderLinks extends React.Component {
  render() {
    const links = [];

    Object.keys(RouteMap).forEach((route, index) => {
      if (RouteMap[route].menuItem) {
        
        if (RouteMap[route].path === '/') {
          links.push(
            <IndexLinkContainer to="/" key={index}>
              <NavItem eventKey={index}>{RouteMap[route].name}</NavItem>
            </IndexLinkContainer>
          );
        } else {
          links.push(
            <LinkContainer to={RouteMap[route].path} key={index}>
              <NavItem eventKey={index}>{RouteMap[route].name}</NavItem>
            </LinkContainer>
          );
        }

        
      } 
    });

    return (
      <Navbar.Collapse>
        <Nav>
          {links}
        </Nav>
      </Navbar.Collapse>
    )
  }
};

class Header extends React.Component {
  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={RouteMap.Home.path}>My React App</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <HeaderLinks />
      </Navbar>
    );
  }
}

export default Header;