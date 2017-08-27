import React, { Component } from 'react';
import{  ButtonToolbar, ButtonGroup} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import uniqid from 'uniqid';

class Nav extends Component {
  render() {
    return (
   <ButtonToolbar>
    <ButtonGroup vertical>
      <LinkContainer to="/">
        <a key={uniqid()}>Home </a>
      </LinkContainer>
      <LinkContainer  to="/category">
        <a key={uniqid()}>Category </a>
      </LinkContainer>
      <LinkContainer to="/postDetail">
        <a key={uniqid()}>Post Detail </a>
      </LinkContainer>
      <LinkContainer to="/createEdit">
          <a key={uniqid()}>Create Edit </a>
      </LinkContainer>
        </ButtonGroup>
    </ButtonToolbar>
   );
  }
}

export default Nav;
