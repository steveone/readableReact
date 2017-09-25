import React, { Component } from 'react';
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
          changeCommentVote,
          //editPost,
          openModal,
          closeModal,
          updateEditField
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
    this.props.openModal(true)
  }

  closeNewComment() {
    this.props.closeModal(false)
  }
  componentWillUnmount() {
    if (this.props.modalIsOpen.status === true) this.closeNewComment()
  }

  sendToConsole(e) {
    console.log(e)
  }


render(Comments) {

  let comments = []

  if (this.props.comments){
    comments = this.props.comments[this.props.id]
  }
  let showComments = false
  showComments = (this.props.showComments) ? true: false

  let modalIsOpen = this.props.modalIsOpen.status

return (
  <div>
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
  <FaCut/>

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
  isOpen={modalIsOpen}
/*  onAfterOpen={aferOpenFn}
  closeTimeoutMS={n}
  style={customStyle}
  */
  //onRequestClose={this.closeNewComment()}
  contentLabel="Modal">

  <FormGroup>
  <ControlLabel>Body</ControlLabel>
     <FormControl type="text"
       key={3}
       value="test"
       onChange={(e) => this.updateField('body',e.target.value,e)}
       placeholder="Enter body"
     //  onChange={updatePost({title: this.value})}
     />
   </FormGroup>
  <br />
  <Button bsStyle="primary" onClick={(e)=>this.closeNewComment()}>Close</Button>

  </Modal>
  </div>
)}

updateField(field, value,e){
   if (loaded) {
     if (this.props.editing) {
      // e.preventDefault()
       console.log("select changed " + field + " " + value)
       const {id,title,body,category,author} = this.props.editing
      switch (field) {
        case 'body' : this.props.updateEditField(
            {id,
             title,
             body : value,
             category,
             author
            })
            break
        case 'title': this.props.updateEditField(
            {id,
             title: value,
             body,
             category,
             author
            })
            break
        case 'category': this.props.updateEditField(
            {id,
             title,
             body,
             category: value,
             author
                })
            break
            case 'author': this.props.updateEditField(
                {id,
                 title,
                 body,
                 category,
                 author:value
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
   editing: state.editing,
   categories: state.categories,
   comments: state.comments,
   showComments: ownProps.showComments,
   modalIsOpen: state.modalIsOpen,
}));

function mapDispatchToProps(dispatch) {
  return{
    //removePost: (data) => dispatch(deletePost(data)),
    changeCommentVote: (data) => dispatch(changeCommentVote(data)),
    //getPosts: (data) => dispatch(getPosts(data)),
    //getCategories: (data) => dispatch(getCategories(data)),
    //editPost: (data) => dispatch(editPost(data)),
    updateEditField: (data) => dispatch(updateEditField(data)),
    //cancelEdit: (data) => dispatch(cancelEdit(data)),
    //saveEdit: (data) => dispatch(saveEdit(data)),
    getComments: (data) => dispatch(getComments(data)),
    openModal: (data) =>dispatch(openModal(data)),
    closeModal: (data) =>dispatch(closeModal(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Comments)
