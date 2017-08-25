import React, { Component } from 'react';
//import { BrowserRouter, Route, Switch} from 'react-router-dom'
import '../App.css';
import{ Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux'
import { addPost, removePost, getPosts } from '../actions'
import uniqid from 'uniqid'

class ShowPosts extends Component {

  sendToConsole(e) {
    console.log(e)
  }

render(props) {
  let posts = []
  console.log("in render props")
  console.log (this.props.posts)
  if (this.props.posts){
    posts = this.props.posts
    console.log("we set posts to")
    console.log(posts)
    }
console.log(posts)
  return (
   <div className="showAll">
    <Button bsSize="small" bsStyle="primary" key={uniqid()}>ShowAll</Button>
    <ButtonToolbar>
     <ButtonGroup vertical>
{/*    {posts.map((cur,val,arry)=> {

      return  <Button bsSize="small" bsStyle="primary" key={uniqid()}
      id = {val}
        onClick={() => this.sendToConsole({val})}
      >{cur}</Button>

    })}*/}
     </ButtonGroup>
     </ButtonToolbar>
     {
      
posts && Object.keys(posts).map((cur,val,arry) => {
  //posts.map((cur,val,arry) => {
        console.log("val is")
        console.log(val);
        const stateKey = cur;
        console.log("stateKey " + stateKey + " " + cur)
        console.log(posts)
        const {id,body, title,category} = posts[cur]
        console.log(posts)
        console.log(`${id}  body + title  + category`)
         return <div key={'d'+id}>
                {body} <br/> {title} <br/> {category} <br/>
                <Button bsSize="small" bsStyle="primary" key={uniqid()}
                id = {id}
                  onClick={() => this.props.removePost(cur)}
                >Delete {id}</Button>
              </div>
     })}
   </div>
   );}

componentDidMount() {
  console.log("componentdidmount")
  this.props.getPosts()
  }

componentDidUpdate(prevProps, prevState) {
    // One possible fix...
    console.log("Component did update")
  }

}

/*function mapStateToProps(state,props){
  console.log("state is going to be")
  console.log(state)
  console.log(state.post)
  return {
    post:  posts,
    categories: state.categories[0]
//    state
  }
}
*/

const mapStateToProps = ((state) => (
  {
   posts: state.post,

}));

function mapDispatchToProps(dispatch) {
  return{
    addPost: (data) => dispatch(addPost(data)),
    removePost: (data) => dispatch(removePost(data)),
    getPosts: (data) => dispatch(getPosts(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(ShowPosts)


//export default showAll
