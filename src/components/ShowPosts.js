import React, { Component } from 'react';
//import { Link} from 'react-router-dom'
import '../App.css';
//import{ Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux'
import { addPost, getPosts, getCategories, deletePost, changeVote } from '../actions'
import uniqid from 'uniqid'
//import { FaChevronUp, FaChevronDown, FaCut} from 'react-icons/lib/fa'
import Post from './Post'
import { Link, withRouter} from 'react-router-dom'

class ShowPosts extends Component {

  sendToConsole(e) {
    console.log(e)
  }

render(props) {
  let posts = []
  let categories = []
  //let postId = []
  let showCategory = []
  let showPosts = []
  if (this.props.posts){
    posts = this.props.posts
  }
  if (this.props.categories){
    categories = this.props.categories
    }
  
  showPosts = (this.props.postId) ? this.props.postId : 'all'  
  showCategory = (this.props.showCategory) ? this.props.showCategory : 'all'
  console.log(showPosts)

//console.log(this.props.posts)
//console.log(this.props.categories)

  return (
   <div className="showAll">
   Show Categories:
    <Link to="/"> All, </Link>
    {categories && Object.keys(categories).map((cur,val,arry) => {
         const {name} = categories[cur]
         const link = `/${name}`
         return (
  <Link to={link} className="close-search" key={uniqid()}>{name}, </Link>
)
           /*<a key={uniqid()}
                id = {'c'+ cur}
                  onClick={() => this.props.removePost(cur)}
                >{name}, </a>)*/
     }
   )}


{
posts && Object.keys(posts)
.filter(post => posts[post].deleted !== true)
.filter(post => {return ((posts[post].category === showCategory) || (showCategory === 'all'))})
.filter(post => {return ((posts[post].id === showPosts) || (showPosts === 'all'))})
.sort((a,b)=> posts[a].voteScore < posts[b].voteScore)
.map((cur,val,arry) => {
  const {id} = posts[cur];
  return  <Post key={'p' + id} id={id}/>
   })
}
</div>
)}

componentDidMount() {
  console.log("componentdidmount Post")
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

const mapStateToProps = ((state,ownProps) => (
  {
   posts: state.post,
   categories: state.categories,
   showCategory: ownProps.match.params.category,
   postId: ownProps.match.params.postId
}));

function mapDispatchToProps(dispatch) {
  return{
    addPost: (data) => dispatch(addPost(data)),
    getPosts: (data) => dispatch(getPosts(data)),
    getCategories: (data) => dispatch(getCategories(data)),
    removePost: (data) => dispatch(deletePost(data)),
    changeVote: (data) => dispatch(changeVote(data))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps)(ShowPosts))


//export default showAll
