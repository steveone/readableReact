import React, { Component } from 'react';
//import { Link} from 'react-router-dom'
import '../App.css';
//import{ Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux'
import {  getCategories, getPosts, deletePost, changeVote, editPost } from '../actions'
import uniqid from 'uniqid'
import { FaChevronUp, FaChevronDown, FaCut, FaPencil} from 'react-icons/lib/fa'

class Post extends Component {

  sendToConsole(e) {
    console.log(e)
  }

render(props) {
  let posts = []
  if (this.props.posts){
    posts = this.props.posts
  }

return (
  <div key={uniqid()}>
  {
  (posts && Object.keys(posts)
    .filter(post => posts[post].id === this.props.id)
    .map((cur,val,arry) => {
    const {id,title,body,author,category,voteScore } = posts[cur]
         return <div className='post' key={'e'+id}>
                  <div className='leftPost'>
                    <div className='upPost'>
                      <a onClick={() => this.props.changeVote([id,"upVote"])}><FaChevronUp/> </a>
                        {voteScore}
                      <a onClick={() => this.props.changeVote([id,"downVote"])}><FaChevronDown/></a>
                    <br />
                    <a onClick={() => this.props.removePost(id)}><FaCut /></a>
                    </div>
                  </div>
                  <div className='postDisplay'>
                    <a onClick={() => this.props.editPost(id)}><FaPencil /></a>
                    <span className='title'> {title} </span>
                    <span className='smallDisplay'>Category: {category}</span>
                    <br/>
                    <span className='displayBody'>{body} <br />author: {author}</span>

                  </div>
                </div>

    })
  )
  }
  </div>
)}

componentDidMount() {
  console.log("componentdidmount Posts")
  this.props.getPosts()
  this.props.getCategories()
  }

componentDidUpdate(prevProps, prevState) {
    // One possible fix...
    console.log("Component did update Post")
  }


}


const mapStateToProps = ((state,ownProps) => (
  {
   posts: state.post,
   id: ownProps.id,
   currentlyEditing: state.editing
}));

function mapDispatchToProps(dispatch) {
  return{
    removePost: (data) => dispatch(deletePost(data)),
    changeVote: (data) => dispatch(changeVote(data)),
    getPosts: (data) => dispatch(getPosts(data)),
    getCategories: (data) => dispatch(getCategories(data)),
    editPost: (data) => dispatch(editPost(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Post)
