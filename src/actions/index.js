import getCategoriesFromAPI from '../utils/getCategories'
import getPostsFromAPI from '../utils/getPosts'
import deletePostFromAPI from '../utils/deletePost'
import changeVoteFromAPI from '../utils/changeVote'


export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const ADD_CATEGORY = 'ADD_CATEGORY'
export const ADD_CATEGORIES = 'ADD_CATEGORIES'
export const CHANGE_VOTE = 'UPDATE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const SUBMIT_POST = 'SUBMIT_POST'
export const START_EDIT = 'START_EDIT'
export const END_EDIT = 'END_EDIT'


export function setEditPost ({id}) {
  console.log("in reducer set edit post")
  console.log(id)
  return {
    type: START_EDIT,
    id,
    }
}

//TODO: need to add save to server and update data
export function endEditPost ({id,saveCancel}) {
  return {
    type: START_EDIT,
    id,
    saveCancel
    }
}


export function updatePost ({author, body, title, id,category}) {
  return {
    type: UPDATE_POST,
    author,
    body,
    title,
    id,
    category
  }
}

export function addPost ({ id, timestamp,title,body,author,category,voteScore,deleted }) {
  return {
    type: ADD_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category,
    voteScore
    ,deleted
  }
}

export function removePost ( id ) {
  //console.log("Remove_Post " + id)
  return {
    type: REMOVE_POST,
    id,
  }
}



export function categoriesReturned(categories) {
  //console.log("in categories returned")
  //console.log(categories)
    return {
    type: 'ADD_CATEGORIES',
    categories
  }
}


export function postsReturned(posts) {
  //console.log("posts are next");
  //console.log(posts)
  return {
    type: 'ADD_POST',
    posts
  }
}

export function changeVotePost (data) {
  const [ id, vote ] = data
  return {
    type: UPDATE_POST,
    id,
    vote,
  }
}

  export const editPost = (id) => {
    console.log("Adfad")
    console.log(id)
    return setEditPost({id})
  }
  

  export const changeVote = (id) => dispatch =>(
    changeVoteFromAPI(id)
    //need to finish update post in state
    .then(posts => dispatch(changeVotePost(
      id
          )
        )
      )
    )


export const deletePost = (id) => dispatch =>(
  deletePostFromAPI(id)
  .then(posts => dispatch(removePost(
    id
        )
      )
    )
  )

  export const getPosts = (posts) => dispatch =>(
    getPostsFromAPI(posts)
    .then(posts => dispatch(postsReturned(
      posts
      //posts.reduce((ret,cur,index, array) => {return ret.concat(cur)},[])
          )
        )
      )
    )

//export const getCategories = () => getCategoriesFromAPI()

export const getCategories = () => dispatch =>(
  getCategoriesFromAPI()
  //.getCategories()
  //.then(categories => (console.log(categories)))
  .then(categories => dispatch(categoriesReturned(
    categories
    //categories.reduce((ret,cur,index, array) => {return ret.concat(cur)},[])
        )
      )
    )
  )
