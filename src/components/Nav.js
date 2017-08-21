import React, { Component } from 'react';
import{ Button, ButtonToolbar, ButtonGroup} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class Nav extends Component {
  render() {
    return (
   <ButtonToolbar>
    <ButtonGroup vertical>
      <LinkContainer to="/">
        <Button bsSize="small" bsStyle="primary">Home</Button>
      </LinkContainer>
      <LinkContainer  to="/category">
        <Button bsSize="small" bsStyle="success">Category</Button>
      </LinkContainer>
      <LinkContainer to="/postDetail">
        <Button bsSize="small" bsStyle="info">Post Detail</Button>
      </LinkContainer>
      <LinkContainer to="/createEdit">
        <Button bsSize="small" bsStyle="warning">Create Edit</Button>
      </LinkContainer>
        </ButtonGroup>
    </ButtonToolbar>
   );
  }
}

export default Nav;
