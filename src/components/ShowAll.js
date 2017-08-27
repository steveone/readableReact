import React, { Component } from 'react';
//import { BrowserRouter, Route, Switch} from 'react-router-dom'
import '../App.css';
import{ Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux'
import { addPost, removePost, getPosts, getCategories, deletePost } from '../actions'
import uniqid from 'uniqid'

class ShowAll extends Component {

  sendToConsole(e) {
    console.log(e)
  }


render(props) {
  let categories = []
  if (this.props.categories) {
      categories = this.props.categories
    }
  let posts = []
  if (this.props.post){
    posts = this.props.post
    }
console.log("next is posts")
console.log(posts)
  return (

   <div className="showAll">
    <Button bsSize="small" bsStyle="primary" key={uniqid()}>ShowAll</Button>
    <ButtonToolbar>
     <ButtonGroup vertical>
    {categories.map((cur,val,arry)=> {
      return <Button bsSize="small" bsStyle="primary" key={uniqid()}
      id = {val}
        onClick={() => this.sendToConsole({val})}>{cur}</Button>
    })}
     </ButtonGroup>
     </ButtonToolbar>
     <ButtonToolbar>
      <ButtonGroup vertical>
     {
posts.map((cur,val,arry) => {
  console.log(val);
  const stateKey = cur;
  console.log("stateKey " + stateKey)
  const {id, timestamp,title,body,author,category,voteScore,deleted } = posts[cur]
  console.log(id + timestamp + title + body)
   return <div key={'d'+ id}>
          {timestamp} <br/> {title} <br/> {body} <br/>
          {voteScore} <br/> {deleted} <br/> {author <br/}
          <Button bsSize="small" bsStyle="primary" key={uniqid()}
          id = {'c' + id}
            onClick={() => this.props.removePost(id)}
          >Delete {id}</Button>
        </div>


})}
</ButtonGroup>
</ButtonToolbar>
   </div>
   );}

componentDidMount() {
//  console.log("componentdidmount")
  this.props.getPosts()
  this.props.getCategories()
  this.props.deletePost()
  }

componentDidUpdate(prevProps, prevState) {
    // One possible fix...
    console.log("Component did update")
  }

}

function mapStateToProps(state,props){
  return {
    posts: state.post,
    categories: state.categories[0]
//    state
  }
}




function mapDispatchToProps(dispatch) {
  return{
    addPost: (data) => dispatch(addPost(data)),
    removePost: (data) => dispatch(deletePost(data)),
    getPosts: (data) => dispatch(getPosts(data)),
    getCategories: (data) => dispatch(getCategories(data)),

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(ShowAll)


//export default showAll
