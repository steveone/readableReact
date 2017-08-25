import React, { Component } from 'react';
//import { BrowserRouter, Route, Switch} from 'react-router-dom'
import '../App.css';
import{ Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux'
import { addPost, removePost, getPosts, getCategories } from '../actions'
import uniqid from 'uniqid'

class ShowPosts extends Component {

  sendToConsole(e) {
    console.log(e)
  }

render(props) {
  let posts = []
  let categories = []
  if (this.props.posts){
    posts = this.props.posts
  }
  if (this.props.categories){
    categories = this.props.categories
    }

//console.log(this.props.posts)
//console.log(this.props.categories)
  
  return (
    
   <div className="showAll">
    <Button bsSize="small" bsStyle="primary" key={uniqid()}>ShowAll</Button>
    <ButtonToolbar>
     <ButtonGroup vertical>
    {categories && Object.keys(categories).map((cur,val,arry) => {
         const {name} = categories[cur]
         return <div key={'d'+cur}>
                <Button bsSize="small" bsStyle="primary" key={uniqid()}
                id = {'c'+ cur}
                  onClick={() => this.props.removePost(cur)}
                >{name}</Button>
              </div>
     }
   )}

     </ButtonGroup>
     </ButtonToolbar>
     {
      
posts && Object.keys(posts).map((cur,val,arry) => {
  const {id,body, title,category} = posts[cur]
         return <div key={'e'+id}>
                {body} <br/> {title} <br/> {category} <br/>
                <Button bsSize="small" bsStyle="primary" key={uniqid()}
                id = {'rp' + id}
                  onClick={() => this.props.removePost(cur)}
                >Delete {id}</Button>
              </div>
     })}
   </div>
   );}

componentDidMount() {
  console.log("componentdidmount")
  this.props.getPosts()
  this.props.getCategories()
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
   categories: state.categories,
}));

function mapDispatchToProps(dispatch) {
  return{
    addPost: (data) => dispatch(addPost(data)),
    removePost: (data) => dispatch(removePost(data)),
    getPosts: (data) => dispatch(getPosts(data)),
    getCategories: (data) => dispatch(getCategories(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(ShowPosts)


//export default showAll
