import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css';
import { connect } from 'react-redux'
import ShowPosts from './components/ShowPosts'
class App extends Component {


componentDidUpdate(prevProps, prevState) {
  }

  shouldComponentUpdate(prevProps, prevState){
    return true
  }

  render(props) {


    return (
   <BrowserRouter>
   <div className="App">
    <Switch>
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
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(App)
