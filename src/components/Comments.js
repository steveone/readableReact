import React, { Component } from 'react';
import uuid from 'uuid';
//import { Link} from 'react-router-dom'
import '../App.css';
//import{ Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux'
import {  getComments,
          //saveEdit,
          //cancelEdit,
          //getCategories,
          //getPosts,
          //deletePost,
          //changeVote,
          deleteComment,
          changeCommentVote,
          saveNewComment,
          //editPost,
          openModal,
          closeModal,
          updateEditCommentField,
          cancelEditCommentField
          } from '../actions'
import uniqid from 'uniqid'
import { FaChevronUp, FaChevronDown, FaCut, FaPencil} from 'react-icons/lib/fa'
import{
        //MenuItem,
        FormGroup,
        FormControl,
        //Form,
        ControlLabel,
        //SplitButton,
        Button,
        //ButtonToolbar,
        //ButtonGroup
        //ControlID
      } from 'react-bootstrap';
import Modal from 'react-modal';

let loaded=false;


class Comments extends Component {

  newComment() {
    this.props.openModal({modal:'comment'})
  }

  saveNewComment() {
    let comments = []
    const myuuid = uuid()
    console.log("in save new comment")
    comments = comments[myuuid] = {
      id: myuuid,
      timestamp: Math.floor(Date.now()),
      body: this.props.editingComment.body,
      author: this.props.editingComment.author,
      parentId: this.props.parentId,
      voteScore: 1,
      deleted: false,
      parentDeleted: false
    }
    console.log(comments)
    this.props.saveNewComment(comments)
    this.props.cancelEditCommentField()
    this.props.getComments(this.props.id)
    this.props.closeModal(false)
  }

  closeNewComment() {
    this.props.cancelEditCommentField()
    this.props.closeModal(false)

  }
  componentWillUnmount() {
    if (this.props.modalIsOpen.status === true) {
      this.props.cancelEditCommentField()
      this.closeNewComment()
      }
  }



  sendToConsole(e) {
    console.log(e)
  }


render(Comments) {

/*
  let editingBody = ""
  let editingAuthor = ""

  if (this.props.editingComment){
    editingBody = this.props.editingComment.body
    editingAuthor = this.props.editingComment.author
  }*/

  let comments = []

  if (this.props.comments){
    comments = this.props.comments[this.props.id]
  }
  let showComments = false
  showComments = (this.props.showComments) ? true: false

    let modalIsOpen = this.props.modalIsOpen.status
    let modal = (modalIsOpen) ? this.props.modalIsOpen.modal : null

return (
  <div>
{  (showComments === false &&
  <span>
  {


  (comments && Object.keys(comments)
  .filter((comment) =>
      comments[comment] !== null &&
      comments[comment].deleted !== true
    )
  .reduce((total,comment) => {
    total = (comments[comment] !== null) ? total+=1 : total;
    return total
  },0)
)
  }
{/*TODO: returns 1 when no comments so needs fixing*/}
    &nbsp;comments
   </span>
 )}
{
  (showComments && comments && Object.keys(comments)
  .filter((comment) =>
    comments[comment] !== null &&
    comments[comment].deleted !== true
  )
  .map((cur,val,arry) => {
  const {body,timestamp,author,voteScore,deleted,id} = comments[cur]
  return <div key={uniqid()}>
  <li className='comments'>
  <FaPencil/>
  {body}
  {timestamp} {author}{deleted}
  <a onClick={() => this.props.removeComment(id)}><FaCut /></a>

  <span className='spacer'>
  <a onClick={() => this.props.changeCommentVote([id,"upVote"])}><FaChevronUp/> </a>
      {voteScore}
      <a onClick={() => this.props.changeCommentVote([id,"downVote"])}><FaChevronDown/> </a>
  </span>
  </li>
  </div>
//
})
)
}

{showComments === true &&
  <Button bsStyle="primary" onClick={(e)=>this.newComment()}>Add Comment</Button>
}

<Modal
  isOpen={modalIsOpen && modal === 'comment'}
/*  onAfterOpen={aferOpenFn}
  closeTimeoutMS={n}
  style={customStyle}
  */
  //onRequestClose={this.closeNewComment()}
  contentLabel="Modal">

  <FormGroup>
  <ControlLabel>Comment</ControlLabel>
     <FormControl type="text"
       key={3}
       value={this.editingBody}
       onChange={(e) => this.updateCommentField('body',e.target.value,e)}
       placeholder="Enter body"
     //  onChange={updatePost({title: this.value})}
     />
  <br />
  <ControlLabel>Author</ControlLabel>
     <FormControl type="text"
       key={4}
       value={this.editingAuthor}
       onChange={(e) => this.updateCommentField('author',e.target.value,e)}
       placeholder="Author Name"
     //  onChange={updatePost({title: this.value})}
     />
   </FormGroup>
  <Button bsStyle="primary" onClick={(e)=>this.saveNewComment()}>Save</Button>
  <Button bsStyle="primary" onClick={(e)=>this.closeNewComment()}>Close</Button>

  </Modal>
  </div>
)}

updateCommentField(field, value,e){
  //uuid() to get new uuid for save
  //to get timestamp - Math.floor(Date.now()/1000)
   if (loaded) {
     if (this.props.editingComment) {
      // e.preventDefault()
       console.log("select changed " + field + " " + value)
       const {body,author} = this.props.editingComment
      switch (field) {
        case 'body' : this.props.updateEditCommentField(
            {
             body : value,
             author
            })
            break
        case 'author': this.props.updateEditCommentField(
            {
             body,
             author: value
            })
            break
        default: break;
      }
    }
  }
     else console.log("not changed")

}

componentDidMount() {
  this.props.getComments(this.props.id)
  console.log("componentdidmount comments")
  //this.props.getPosts()
  //this.props.getCategories()
  loaded = true;

  }

componentDidUpdate(prevProps, prevState) {
    // One possible fix...
//    console.log("Component did update Post")
   //this.props.getComments(this.props.id)
   console.log("we updated comments")
   if (this.props.id){
//     console.log("id for posts getComments " + this.props.id)
     //this.props.getComments(this.props.id)
   }
  }

  componentWillMount() {
    if (this.props.id){
  //    console.log("id for posts getComments " + this.props.id)
  //    this.props.getComments(this.props.id)
    }
  }


}




const mapStateToProps = ((state,ownProps) => (
  {
   posts: state.post,
   id: ownProps.id,
   editingComment: state.editingComment,
   categories: state.categories,
   comments: state.comments,
   showComments: ownProps.showComments,
   modalIsOpen: state.modalIsOpen,
   parentId: ownProps.parentId
}));

function mapDispatchToProps(dispatch) {
  return{
    removeComment: (data) => dispatch(deleteComment(data)),
    changeCommentVote: (data) => dispatch(changeCommentVote(data)),
    //getPosts: (data) => dispatch(getPosts(data)),
    //getCategories: (data) => dispatch(getCategories(data)),
    //editPost: (data) => dispatch(editPost(data)),
    updateEditCommentField: (data) => dispatch(updateEditCommentField(data)),
    cancelEditCommentField: (data) => dispatch(cancelEditCommentField(data)),
    //cancelEdit: (data) => dispatch(cancelEdit(data)),
    //saveEdit: (data) => dispatch(saveEdit(data)),
    saveNewComment: (data) => dispatch(saveNewComment(data)),
    getComments: (data) => dispatch(getComments(data)),
    openModal: (data) =>dispatch(openModal(data)),
    closeModal: (data) =>dispatch(closeModal(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Comments)
