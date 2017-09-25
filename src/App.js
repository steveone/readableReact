import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css';
import Nav from './components/Nav';
//import ShowAll from './components/ShowAll'
import{ Button } from 'react-bootstrap';
import { connect } from 'react-redux'
//import { addPost, setCategory, removePost } from './actions'
import CreateEdit from './components/CreateEdit'
import ShowPosts from './components/ShowPosts'
class App extends Component {


componentDidUpdate(prevProps, prevState) {
    // One possible fix...
//    console.log("Component did update in app.js")
  }

  shouldComponentUpdate(prevProps, prevState){
  //  console.log("should component update")
    return true
  }

  render(props) {


    return (
   <BrowserRouter>



   <div className="App">
    <Nav/>
    <Switch>
    <Route exact path="/createEdit" render={() =>
          <div>
          <CreateEdit/>
          <br />
            <Button type="submit modal" onClick={() =>  {
              this.props.addPost({id:Date.now(),author:'steve',text:'whtever',category:'react'})}}>bsSize="small" bsStyle="primary">

            create Post</Button>
            <Button type="submit" onClick={() =>  {this.props.addPost({id:Date.now(),author:'steve',text:'whtever',category:'redux'})}} bsSize="small" bsStyle="primary">Create Post</Button>

          </div>
          } />
    <Route path="/:category/:postId" component={Category}/>
    <Route path="/:category" component={Category}/>
    <Route path="/postDetail" render={() =>
          <div>
          PostDetail
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


const Category = ({ match },props) => {
  return <ShowPosts/>
}

const mapStateToProps = ((state) => (
  {
   posts: state.post,
   categories: state.categories,

}));


function mapDispatchToProps(dispatch) {
  return{
    //addPost: (data) => dispatch(addPost(data)),
    //removePost: (data) => dispatch(removePost(data)),
    //setCategory: (data) => dispatch(setCategory(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(App)
