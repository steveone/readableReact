import React, { Component } from 'react';
import { Link} from 'react-router-dom'
import '../App.css';
//import{ Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux'
import {  getComments, saveEdit, cancelEdit, getCategories, getPosts, deletePost, changeVote, editPost, updateEditField } from '../actions'
//import uniqid from 'uniqid'
import { FaChevronUp, FaChevronDown, FaCut, FaPencil} from 'react-icons/lib/fa'
import Comments from './Comments'
import{
        //MenuItem,
        FormGroup,
        FormControl,
        //Form,
        ControlLabel,
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
  let editingCategory = ""
  let editingAuthor = ""
  if (this.props.posts){
    posts = this.props.posts
  }
  if (this.props.editing){
    currentlyEditing = this.props.editing.id
    editingTitle = this.props.editing.title
    editingBody = this.props.editing.body
    editingCategory = this.props.editing.category
    editingAuthor = this.props.editing.author
  }

  let categories = []
  if (this.props.categories){
    categories = this.props.categories
    }

return (
  <div key='postDisplay'>
  {
  (posts && Object.keys(posts)
    .filter(post => posts[post].id === this.props.id)
    .map((cur,val,arry) => {
    const {id,title,body,author,category,voteScore,commentCount} = posts[cur]
    console.log(posts[cur])
    console.log("comment count is " + commentCount)
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
                    <a onClick={() => this.props.editPost({id,title,body,category,author})}><FaPencil /></a>
                    <span className='title'>

                    {(id === currentlyEditing) ?
                      <FormControl type="text"
                        key='renderTitle'
                        value={editingTitle}
                        onChange={(e) => this.updateField('title',e.target.value)}
                        placeholder="Enter body"
                      /> : <Link to={link} className="close-search">{title}</Link>
                    }</span>
                    <span className='smallDisplay'>Category:

                    {(id === currentlyEditing) ?
                      <FormGroup>
                    <ControlLabel>Select Category</ControlLabel>
                     <FormControl key={2} id="select1" componentClass="select"
                     onChange={(e) => this.updateField('category',e.target.value)}
                     //onChange={this.props.updatePost({author:'', title: '', category: ''})}
                     >
                     {categories && Object.keys(categories).map((cur,val,arry) => {
                       console.log("in select cat")
                       console.log(categories[cur])
                       const {name} = categories[cur]
                       return <option value={name} key={cur}>{name}</option>
                     })}

                          </FormControl>
                          </FormGroup>
                      :   category
                    }

                    </span>
                    <span className="author">author:

                    {(id === currentlyEditing) ?
                      <FormControl componentClass="textarea"
                        key='renderBody'
                        value={editingAuthor}
                        onChange={(e) => this.updateField('author',e.target.value)}
                        placeholder="Enter author"
                        />
                      : author
                      }
                    </span>
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
                         <Button bsStyle="primary" onClick={(e)=>this.props.saveEdit({id,title:editingTitle,body:editingBody,category:editingCategory,author:editingAuthor})}>Save</Button>
                         <Button bsStyle="primary" onClick={(e)=>this.props.cancelEdit({id})}>Revert</Button>
                        </ButtonToolbar>
                       : <br />
                     }
                  </div>
                  {/*this.props.id && <Comments id = {this.props.id}/>*/}
                  {<Comments id = {id}/>} {id}
                  <br />
                  There are {commentCount} comments
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
    //    console.log("select changed " + field + " " + value)
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
//  console.log("componentdidmount Posts")
/*  this.props.getPosts()
  this.props.getCategories()
  if (this.props.id){
    console.log("id for posts getComments " + this.props.id)
     this.props.getComments(this.props.id)
     }
*/  loaded = true;

  }

componentDidUpdate(prevProps, prevState) {
    // One possible fix...
//    console.log("Component did update Post")
if (this.props.id){
  console.log("id for posts getComments " + this.props.id)
  //this.props.getComments(this.props.id)
   }
  }
}


const mapStateToProps = ((state,ownProps) => (
  {
   posts: state.post,
   id: ownProps.id,
   editing: state.editing,
   categories: state.categories,
   //comments: state.comments,
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
    getComments: (data) => dispatch(getComments(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Post)
