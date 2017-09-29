import React, { Component } from 'react';
//import { Link} from 'react-router-dom'
import '../App.css';
//import{ Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux'
import uuid from 'uuid';
import { getPostsAndComments,
  //addPost,
  addPostToServer,
  getPosts,
  getCategories,
  deletePost,
  changeVote } from '../actions'
import uniqid from 'uniqid'
//import { FaChevronUp, FaChevronDown, FaCut} from 'react-icons/lib/fa'
import Post from './Post'
import CreateEdit from './CreateEdit'
import Modal from 'react-modal';

import { Link, withRouter} from 'react-router-dom'
import {  //getComments,
          //saveEdit,
          //cancelEdit,
          //getCategories,
          //getPosts,
          //deletePost,
          //changeVote,
          //changeCommentVote,
          //saveNewComment,
          //editPost,
          cancelNewPost,
          openModal,
          closeModal,
          changeSort,
          //updateEditCommentField,
          //cancelEditCommentField
          } from '../actions'
import{
        //MenuItem,
        //FormGroup,
        //FormControl,
        //Form,
        //ControlLabel,
        //SplitButton,
        Button,
        //ButtonToolbar,
        //ButtonGroup
        //ControlID
      } from 'react-bootstrap';
class ShowPosts extends Component {

  changeSort(){
    let sort = (this.props.sortMethod === 'voteScore') ? 'timestamp' : 'voteScore'
    this.props.changeSort({sortMethod:sort})
  }

  newPost() {
    this.props.openModal({modal:'post'})
  }

  saveNewPost() {
    let post = []
    const myuuid = uuid()
    console.log("in save new post")
    post = post[myuuid] = {
      id: myuuid,
      timestamp: Math.floor(Date.now()),
      body: this.props.writingPost.body,
      author: this.props.writingPost.author,
      title: this.props.writingPost.title,
      category: this.props.writingPost.category,
      voteScore: 1,
      deleted: false,
    }
    console.log(post)
    this.props.addPostToServer(post)
    this.props.cancelNewPost()
    this.props.getPosts()
    this.props.closeModal(false)
  }

  closeNewPost() {
    this.props.cancelNewPost()
    this.props.closeModal(false)

  }

  sendToConsole(e) {
    console.log(e)
  }

render(props) {
  let posts = []
  let categories = []
  let showComments = false
  //let postId = []
  let showCategory = []
  let showPosts = []
  if (this.props.posts){
    posts = this.props.posts
  }
  if (this.props.categories){
    categories = this.props.categories
    }

  let modalIsOpen = this.props.modalIsOpen.status
  let modal = (modalIsOpen) ? this.props.modalIsOpen.modal : null

  showPosts = (this.props.postId) ? this.props.postId : 'all'
  showComments = (this.props.postId) ? true : false
  showCategory = (this.props.showCategory) ? this.props.showCategory : 'all'
//  console.log(showPosts)

//console.log(this.props.posts)
//console.log(this.props.categories)
//console.log("this.props.posts is ")
//console.log(this.props.post)
  return (
   <div className="showAll">
   Show Categories:
    <Link to="/"> All, </Link>
    {categories && Object.keys(categories).map((cur,val,arry) => {
         const {name} = categories[cur]
         const link = `/${name}`
         return (
  <Link to={link} className="close-search" key={uniqid()}>{name}, </Link>
)
           /*<a key={uniqid()}
                id = {'c'+ cur}
                  onClick={() => this.props.removePost(cur)}
                >{name}, </a>)*/
     }
   )}
<br/>
Sorted by: {(this.props.sortMethod !== 'voteScore') ? "TimeStamp" : "voteScore"}
&nbsp; change to: <a onClick={(e)=>this.changeSort()}>
{(this.props.sortMethod === 'voteScore') ? "TimeStamp" : "voteScore"}
</a>
<br/>
<a onClick={(e)=>this.newPost()}>Create New Post</a>

{
posts && Object.keys(posts)
.filter(post => posts[post].deleted !== true)
.filter(post => {return ((posts[post].category === showCategory) || (showCategory === 'all'))})
.filter(post => {return ((posts[post].id === showPosts) || (showPosts === 'all'))})
.sort((a,b)=> {
  if (this.props.sortMethod === 'voteScore')
    return posts[a].voteScore < posts[b].voteScore
  else return posts[a].timestamp < posts[b].timestamp
})
.map((cur,val,arry) => {
  const {id} = posts[cur];
  return  <Post key={'p' + id} id={id} showComments={showComments}/>
   })
}

<Modal
isOpen={modalIsOpen && modal === 'post'}
/*  onAfterOpen={aferOpenFn}
  closeTimeoutMS={n}
  style={customStyle}
  */
  //onRequestClose={this.closeNewComment()}
  contentLabel="Modal">
  <CreateEdit />

  <Button bsStyle="primary" onClick={(e)=>this.saveNewPost()}>Save</Button>
  <Button bsStyle="primary" onClick={(e)=>this.closeNewPost()}>Close</Button>

  </Modal>

</div>
)}

shouldComponentUpdate(prevProps, prevState){
//  console.log("should component update")
  //console.log("in shouldcomponentupdate in showpost")
  return true
}

componentWillMount() {
//  console.log("componentdidmount Post")
  this.props.getCategories()
  //this.props.getPosts()
this.props.getPosts()
  }

componentDidUpdate(prevProps, prevState) {
    // One possible fix...
//    console.log("Component did update")
//console.log("prevstate")
//console.log(prevState)
//console.log("prevprops")
//console.log(prevProps)
  }

componentWillReceiveProps(nextProps){
  //console.log("component will receive new props")
  //console.log(nextProps)
  }
}


const mapStateToProps = ((state,ownProps) => (
  {
   posts: state.post,
   categories: state.categories,
   showCategory: ownProps.match.params.category,
   postId: ownProps.match.params.postId,
   modalIsOpen: state.modalIsOpen,
   writingPost: state.writingPost,
   sortMethod: state.sortMethod.sortMethod,
}));

function mapDispatchToProps(dispatch) {
  return{
    addPostToServer: (data) => dispatch(addPostToServer(data)),
    getPosts: (data) => dispatch(getPosts(data)),
    getPostsAndComments: (data) => dispatch(getPostsAndComments(data)),
    getCategories: (data) => dispatch(getCategories(data)),
    removePost: (data) => dispatch(deletePost(data)),
    changeVote: (data) => dispatch(changeVote(data)),
    openModal: (data) =>dispatch(openModal(data)),
    closeModal: (data) =>dispatch(closeModal(data)),
    cancelNewPost: () => dispatch(cancelNewPost()),
    changeSort: (data) => dispatch(changeSort(data)),
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps)(ShowPosts))


//export default showAll
