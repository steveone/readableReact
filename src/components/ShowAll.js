import React, { Component } from 'react';
//import { BrowserRouter, Route, Switch} from 'react-router-dom'
import '../App.css';
import{ Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux'
import { addPost, removePost, getCategories } from '../actions'



class ShowAll extends Component {

  sendToConsole(e) {
    console.log(e)
  }


render(props) {
  let categories = []
  if (this.props.categories) {
      categories = this.props.categories
    }
  let posts = []
  if (this.props.posts){
    posts = this.props.posts
    }
console.log(posts)
  return (
   <div className="showAll">
    <Button bsSize="small" bsStyle="primary">ShowAll</Button>
    <ButtonToolbar>
     <ButtonGroup vertical>
    {categories.map((cur,val,arry)=> {
      return <Button bsSize="small" bsStyle="primary" key={Date.now()}
      id = {val}
        onClick={() => this.sendToConsole({val})}
      >{cur}</Button>


    })}
     </ButtonGroup>
     </ButtonToolbar>
     {
Object.keys(posts).map((cur,val,arry) => {
        console.log(val);
        const stateKey = cur;
        console.log("stateKey " + stateKey)
        const {id,text,author,category} = posts[cur]
        console.log(id + text + author + category)
         return <div key={'d'+id}>
                {text} <br/> {author} <br/> {category} <br/>
                <Button bsSize="small" bsStyle="primary" key={Date.now()}
                id = {id}
                  onClick={() => this.props.removePost(stateKey)}
                >Delete</Button>
              </div>
     })}
   </div>
   );}

componentDidMount() {
//  console.log("componentdidmount")
  this.props.getCat()
  }

}

function mapStateToProps(state,props){
  return {
    posts: state.post,
    categories: state.categories[0]
//    state
  }
}



function mapDispatchToProps(dispatch) {
  return{
    addPost: (data) => dispatch(addPost(data)),
    removePost: (data) => dispatch(removePost(data)),
    getCat: (data) => dispatch(getCategories(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(ShowAll)


//export default showAll
