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
          //editPost,
          updateEditField
          } from '../actions'
//import uniqid from 'uniqid'
//import { FaChevronUp, FaChevronDown, FaCut, FaPencil} from 'react-icons/lib/fa'
import{
        //MenuItem,
        //FormGroup,
        //FormControl,
        //Form,
        //ControlLabel,
        //SplitButton,
        //Button,
        //ButtonToolbar,
        //ButtonGroup
        //ControlID
      } from 'react-bootstrap';

let loaded=false;


class Comments extends Component {



  sendToConsole(e) {
    console.log(e)
  }


render(Comments) {
  let comments = []
if (this.props.comments){
    comments = this.props.comments[this.props.id]
  }

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
}));

function mapDispatchToProps(dispatch) {
  return{
    //removePost: (data) => dispatch(deletePost(data)),
    //changeVote: (data) => dispatch(changeVote(data)),
    //getPosts: (data) => dispatch(getPosts(data)),
    //getCategories: (data) => dispatch(getCategories(data)),
    //editPost: (data) => dispatch(editPost(data)),
    updateEditField: (data) => dispatch(updateEditField(data)),
    //cancelEdit: (data) => dispatch(cancelEdit(data)),
    //saveEdit: (data) => dispatch(saveEdit(data)),
    getComments: (data) => dispatch(getComments(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Comments)
