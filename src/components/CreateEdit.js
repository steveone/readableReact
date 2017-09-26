import React, { Component } from 'react';
//import { BrowserRouter, Route, Switch} from 'react-router-dom'
import '../App.css';
import{
        //MenuItem,
        FormGroup,
        FormControl,
        Form,
        ControlLabel,
        //SplitButton,
        Button,
        //ButtonToolbar,
        //ButtonGroup
        //ControlID
      } from 'react-bootstrap';
import { connect } from 'react-redux'
import { updatePost,
  addPost,
  removePost, getCategories, getPosts } from '../actions'
import uniqid from 'uniqid'

let loaded=false;

class CreateEdit extends Component {

  sendToConsole(e) {
    console.log(e)
  }

  updateField(field, value,e){
       if (loaded) {
         //e.preventDefault()
         console.log("select changed " + field + " " + value)
         const {category, body,author,title} = this.props.writingPost
        switch (field) {
          case 'select' : this.props.updatePost(
              {category: value,
               body,
               author,
               title
              })
              break
          case 'body': this.props.updatePost(
              {category,
               body: value,
               author,
               title
              })
              break
          case 'author': this.props.updatePost(
              {category,
               body,
               author: value,
               title
              })
              break
          case 'title': this.props.updatePost(
              {category,
               body,
               author,
               title: value
              })
              break
          default: break;
        }
      }
       else console.log("not changed")
     }


render(props) {
  let categories = []
  if (this.props.categories) {
      categories = this.props.categories
    }

//console.log(posts)
  return (
   <div className="showAll">
   <Form>
   <FormGroup key={1}>
   <ControlLabel key={uniqid()}>New Post</ControlLabel>
   <FormGroup key={uniqid()}>
   <ControlLabel>Select Category</ControlLabel>
    <FormControl key={2} id="select1" componentClass="select"
    value={this.props.writingPost.category}
    onChange={(e) => this.updateField('select',e.target.value)}
    //onChange={this.props.updatePost({author:'', title: '', category: ''})}
    >
    <option value="" key={uniqid()}></option>
    {categories && Object.keys(categories).map((cur,val,arry) => {
      console.log("in select cat")
      console.log(categories[cur])
      const {name} = categories[cur]
      return <option value={name} key={cur}>{name}</option>
    })}


     </FormControl>
     </FormGroup>
     <ControlLabel>Title</ControlLabel>
        <FormControl type="text"
          key={2}
          value={this.props.writingPost.title}
          onChange={(e) => this.updateField('title',e.target.value,e)}
          placeholder="Enter Title"
        //  onChange={updatePost({title: this.value})}
        />
     <ControlLabel>Body</ControlLabel>
        <FormControl type="text"
          key={3}
          value={this.props.writingPost.text}
          onChange={(e) => this.updateField('body',e.target.value,e)}
          placeholder="Enter body"
        //  onChange={updatePost({title: this.value})}
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Author</ControlLabel>
        <FormControl type="text"
          key={uniqid}
          placeholder="Authors Name"
          value={this.props.writingPost.author}
          onChange={(e) => this.updateField('author',e.target.value,e)}
        />
      </FormGroup>
      {/*
      <Button bsSize="small" bsStyle="primary" key={uniqid()}
        onClick={() => console.log("submit button hit")}//this.props.removePost(stateKey)}
      >Submit Post</Button>
      */
    }
     </Form>

   </div>
   );}



componentDidMount() {
//  console.log("componentdidmount")
  this.props.getCat()
  console.log("got cats")
  loaded = true;
  }

componentDidUpdate(prevProps, prevState) {
    // One possible fix...
    console.log("Component did update")
  }

}

function mapStateToProps(state,props){
  return {
    posts: state.post,
    categories: state.categories,
    writingPost: state.writingPost,

//    state
  }
}




function mapDispatchToProps(dispatch) {
  return{
    addPost: (data) => dispatch(addPost(data)),
    removePost: (data) => dispatch(removePost(data)),
    getCat: (data) => dispatch(getCategories(data)),
    updatePost: (data) => dispatch(updatePost(data)),
    getPosts: (data) => {dispatch(getPosts(data))},
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(CreateEdit)


//export default showAll
