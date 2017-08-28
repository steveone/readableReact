import React, { Component } from 'react';
//import { Link} from 'react-router-dom'
import '../App.css';
//import{ Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux'
import { addPost, getPosts, getCategories, deletePost, changeVote } from '../actions'
import uniqid from 'uniqid'
import { FaChevronUp, FaChevronDown, FaCut} from 'react-icons/lib/fa'

class ShowPosts extends Component {

  sendToConsole(e) {
    console.log(e)
  }

render(props) {
  let posts = []
  let categories = []
  if (this.props.posts){
    posts = this.props.posts
  }
  if (this.props.categories){
    categories = this.props.categories
    }

//console.log(this.props.posts)
//console.log(this.props.categories)

  return (

   <div className="showAll">
   Show Categories:
    <a key={uniqid()}> All, </a>
    {categories && Object.keys(categories).map((cur,val,arry) => {
         const {name} = categories[cur]
         return (<a key={uniqid()}
                id = {'c'+ cur}
                  onClick={() => this.props.removePost(cur)}
                >{name}, </a>)

     }
   )}


{
posts && Object.keys(posts)
.filter(post => posts[post].deleted !== true)
.sort((a,b)=> posts[a].voteScore < posts[b].voteScore)
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
                    <span className='title'> {title} </span>
                    <span className='smallDisplay'>Category: {category}</span>
                    <br/>
                    <span className='displayBody'>{body} <br />author: {author}</span>

                  </div>
                </div>

     })}
   </div>
   );}

componentDidMount() {
  console.log("componentdidmount")
  this.props.getPosts()
  this.props.getCategories()
  }

componentDidUpdate(prevProps, prevState) {
    // One possible fix...
    console.log("Component did update")
  }


}

/*function mapStateToProps(state,props){
  console.log("state is going to be")
  console.log(state)
  console.log(state.post)
  return {
    post:  posts,
    categories: state.categories[0]
//    state
  }
}
*/

const mapStateToProps = ((state) => (
  {
   posts: state.post,
   categories: state.categories,
}));

function mapDispatchToProps(dispatch) {
  return{
    addPost: (data) => dispatch(addPost(data)),
    getPosts: (data) => dispatch(getPosts(data)),
    getCategories: (data) => dispatch(getCategories(data)),
    removePost: (data) => dispatch(deletePost(data)),
    changeVote: (data) => dispatch(changeVote(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(ShowPosts)


//export default showAll
