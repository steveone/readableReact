import React, { Component } from 'react';
import{ Button, ButtonToolbar, ButtonGroup} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import uniqid from 'uniqid';

class Nav extends Component {
  render() {
    return (
   <ButtonToolbar>
    <ButtonGroup vertical>
      <LinkContainer to="/">
        <Button bsSize="small" bsStyle="primary" key={uniqid()}>Home</Button>
      </LinkContainer>
      <LinkContainer  to="/category">
        <Button bsSize="small" bsStyle="success" key={uniqid()}>Category</Button>
      </LinkContainer>
      <LinkContainer to="/postDetail">
        <Button bsSize="small" bsStyle="info" key={uniqid()}>Post Detail</Button>
      </LinkContainer>
      <LinkContainer to="/createEdit">
        <Button bsSize="small" bsStyle="warning" key={uniqid()}>Create Edit</Button>
      </LinkContainer>
        </ButtonGroup>
    </ButtonToolbar>
   );
  }
}

export default Nav;
