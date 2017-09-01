import React, { Component } from 'react';
import { Link} from 'react-router-dom'
import '../App.css';
//import{ Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux'
import {  saveEdit, cancelEdit, getCategories, getPosts, deletePost, changeVote, editPost, updateEditField } from '../actions'
//import uniqid from 'uniqid'
import { FaChevronUp, FaChevronDown, FaCut, FaPencil} from 'react-icons/lib/fa'
import{
        //MenuItem,
        //FormGroup,
        FormControl,
        //Form,
        //ControlLabel,
        //SplitButton,
        Button,
        ButtonToolbar,
        //ButtonGroup
        //ControlID
      } from 'react-bootstrap';

let loaded=false;


class Post extends Component {



  sendToConsole(e) {
    console.log(e)
  }


render(props) {
  let posts = []
  let currentlyEditing = []
  let editingTitle = ""
  let editingBody = ""
  if (this.props.posts){
    posts = this.props.posts
  }
  if (this.props.editing){
    currentlyEditing = this.props.editing.id
    editingTitle = this.props.editing.title
    editingBody = this.props.editing.body
  }

return (
  <div key='postDisplay'>
  {
  (posts && Object.keys(posts)
    .filter(post => posts[post].id === this.props.id)
    .map((cur,val,arry) => {
    const {id,title,body,author,category,voteScore } = posts[cur]
    const link = `/${category}/${id}`

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
                    <a onClick={() => this.props.editPost({id,title,body})}><FaPencil /></a>
                    <span className='title'>

                    {(id === currentlyEditing) ?
                      <FormControl type="text"
                        key='renderTitle'
                        value={editingTitle}
                        onChange={(e) => this.updateField('title',e.target.value)}
                        placeholder="Enter body"
                      /> : <Link to={link} className="close-search">{title}</Link>
                    }</span>
                    <span className='smallDisplay'>Category: {category}</span>
                    <span className="author">author: {author}</span>
                    <br/>
                    
                      {(id === currentlyEditing) ?
                        <FormControl componentClass="textarea"
                          key='renderBody'
                          value={editingBody}
                          onChange={(e) => this.updateField('body',e.target.value)}
                          placeholder="Enter body"
                          />
                        : body
                        }
                        
                        
                        
                      {(id === currentlyEditing) ?
                        <ButtonToolbar>
                         <Button bsStyle="primary" onClick={(e)=>this.props.saveEdit({id,editingTitle,editingBody})}>Save</Button>
                         <Button bsStyle="primary" onClick={(e)=>this.props.cancelEdit({id})}>Revert</Button>
                        </ButtonToolbar>
                       : <br />
                     }
                  </div>
                </div>

    })
  )
  }
  </div>
)}

updateField(field, value,e){
   if (loaded) {
     if (this.props.editing) {
      // e.preventDefault()
       console.log("select changed " + field + " " + value)
       const {id,title,body} = this.props.editing
      switch (field) {
        case 'body' : this.props.updateEditField(
            {id,
             title,
             body : value
            })
            break
        case 'title': this.props.updateEditField(
            {id,
             title: value,
             body
            })
            break
        default: break;
      }
    }
  }
     else console.log("not changed")

}

componentDidMount() {
  console.log("componentdidmount Posts")
  this.props.getPosts()
  this.props.getCategories()
  loaded = true;
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
   editing: state.editing
}));

function mapDispatchToProps(dispatch) {
  return{
    removePost: (data) => dispatch(deletePost(data)),
    changeVote: (data) => dispatch(changeVote(data)),
    getPosts: (data) => dispatch(getPosts(data)),
    getCategories: (data) => dispatch(getCategories(data)),
    editPost: (data) => dispatch(editPost(data)),
    updateEditField: (data) => dispatch(updateEditField(data)),
    cancelEdit: (data) => dispatch(cancelEdit(data)),
    saveEdit: (data) => dispatch(saveEdit(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Post)
