import React, { Component } from 'react';
import { Link} from 'react-router-dom'
import '../App.css';
import { connect } from 'react-redux'
import { saveEdit, cancelEdit, getCategories, getPosts, deletePost, changeVote, editPost, updateEditField } from '../actions'
import { FaChevronUp, FaChevronDown, FaCut, FaPencil} from 'react-icons/lib/fa'
import Comments from './Comments'
import{
        FormGroup,
        FormControl,
        ControlLabel,
        Button,
        ButtonToolbar,
      } from 'react-bootstrap';
let loaded=false;
class Post extends Component {

  sendToConsole(e) {
    console.log(e)
  }

  saveEditPost(){
    let post = []
    post = {
    //post[this.props.id] = {
      id:this.props.id,
      title:this.props.editing.title,
      body:this.props.editing.body,
      category:this.props.editing.category,
      author:this.props.editing.author,
      voteScore: 1,
      deleted: false,
    }
    this.props.saveEdit(post)
    this.props.getPosts()

  }

render(props) {
  let posts = []
  let currentlyEditing = []
  let editingTitle = ""
  let editingBody = ""
  let editingCategory = ""
  let editingAuthor = ""
  if (this.props.editing){
    currentlyEditing = this.props.editing.id
    editingTitle = this.props.editing.title
    editingBody = this.props.editing.body
    editingCategory = this.props.editing.category
    editingAuthor = this.props.editing.author
  }
  posts = (this.props.posts) ? this.props.posts : []
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
    const {author,body,category,id,title,voteScore,timestamp} = posts[cur]
  //  console.log(posts[cur])

//let timestamp = Math.floor(Date.now() / 1000)

    let date = new Date(timestamp)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = 0 + date.getSeconds()
    let formattedTime = hours + ':' + minutes + ':' + seconds
    let formattedDate = date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear()
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
                     <FormControl key={'selectingCategory'} id="select1" componentClass="select"
                     defaultValue={editingCategory}
                     onChange={(e) => this.updateField('category',e.target.value)}
                     //onChange={this.props.updatePost({author:'', title: '', category: ''})}
                     >
                     {categories && Object.keys(categories).map((cur,val,arry) => {
                       //console.log("in select cat")
                       //console.log(categories[cur])
                       const {name} = categories[cur]
                       return <option value={name} key={cur} >{name}</option>
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
                         <Button bsStyle="primary" key='savepostbtn' onClick={(e)=>this.saveEditPost()}>Save Post</Button>
                           {

                           /*{id,title:editingTitle,body:editingBody,category:editingCategory,author:editingAuthor})}>
                          */}

                         <Button bsStyle="primary" key='revertpostbutton' onClick={(e)=>this.props.cancelEditPost({id})}>Revert Post</Button>
                        </ButtonToolbar>
                       : <br />
                     }
                  </div>
                  {formattedDate + ' - ' + formattedTime}

                  {/*this.props.id && <Comments id = {this.props.id}/>*/}
                  {<Comments key={id} id = {id} parentId = {this.props.id} showComments={this.props.showComments}/>}
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

componentWillMount() {
 loaded = true;
  }

componentDidUpdate(prevProps, prevState) {
 }

  shouldComponentUpdate(prevProps, prevState){
    return true
  }

  componentWillReceiveProps(nextProps){
  }
}



const mapStateToProps = ((state,ownProps) => (
{
 posts: state.post,
 id: ownProps.id,
 editing: state.editing,
 categories: state.categories,
}));

function mapDispatchToProps(dispatch) {
  return{
    removePost: (data) => dispatch(deletePost(data)),
    changeVote: (data) => dispatch(changeVote(data)),
    getPosts: (data) => dispatch(getPosts(data)),
    getCategories: (data) => dispatch(getCategories(data)),
    editPost: (data) => dispatch(editPost(data)),
    updateEditField: (data) => dispatch(updateEditField(data)),
    cancelEditPost: () => dispatch(cancelEdit()),
    saveEdit: (data) => dispatch(saveEdit(data)),
    //getComments: (data) => dispatch(getComments(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Post)
