import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css';
import Nav from './components/Nav';
import ShowAll from './components/ShowAll'
import{ Button } from 'react-bootstrap';
import { connect } from 'react-redux'
import { addPost, removePost } from './actions'
import CreateEdit from './components/CreateEdit'
import ShowPosts from './components/ShowPosts'

class App extends Component {
  render() {
    return (
   <BrowserRouter>
   <div className="App">
    <Nav/>
    <Switch>
    <Route path="/category" render={() =>
      <div>category go to Home
      </div>
  		} />
    <Route path="/postDetail" render={() =>
          <div>
          PostDetail
          </div>
        } />
    <Route exact path="/createEdit" render={() =>
          <div>
          <CreateEdit/>
          <br />
            <Button type="submit" onClick={() =>  {this.props.addPost({id:Date.now(),author:'steve',text:'whtever',category:'react'})}} bsSize="small" bsStyle="primary">Create Post</Button>
            <Button type="submit" onClick={() =>  {this.props.addPost({id:Date.now(),author:'steve',text:'whtever',category:'redux'})}} bsSize="small" bsStyle="primary">Create Post</Button>

          </div>
          } />
    <Route exact path="/" render={() =>
      <ShowPosts/>
    		} />
        </Switch>
        </div>
    </BrowserRouter>
   );
  }
}

function mapStateToProps({posts}){
  return {
    posts
  }
}


function mapDispatchToProps(dispatch) {
  return{
    addPost: (data) => dispatch(addPost(data)),
    removePost: (data) => dispatch(removePost(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(App)
