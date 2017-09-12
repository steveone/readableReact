import getCategoriesFromAPI from '../utils/getCategories'
import getPostsFromAPI from '../utils/getPosts'
import deletePostFromAPI from '../utils/deletePost'
import changeVoteFromAPI from '../utils/changeVote'
import saveEditFromAPI from '../utils/saveEdit'
import getCommentsFromAPI from '../utils/getComments'


export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const ADD_CATEGORY = 'ADD_CATEGORY'
export const ADD_CATEGORIES = 'ADD_CATEGORIES'
export const CHANGE_VOTE = 'UPDATE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const SUBMIT_POST = 'SUBMIT_POST'
export const START_EDIT = 'START_EDIT'
export const END_EDIT = 'END_EDIT'
export const UPDATE_EDIT = 'UPDATE_EDIT'
export const CANCEL_EDIT = 'CANCEL_EDIT'
export const SAVE_EDIT = 'SAVE_EDIT'
export const SET_CATEGORY = 'SET_CATEGORY'
export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const CHANGE_COMMENT_VOTE = 'CHANGE_COMMENT_VOTE'
export const CLEAR_COMMENTS = 'CLEAR_COMMENTS'
export const UPDATE_POST_COMMENT_COUNT = 'UPDATE_POST_COMMENT_COUNT'

export function cancelEdit (id) {
    console.log("in canceled it")
    console.log(id)
      return {
        type: CANCEL_EDIT,
        id
        }
}

//TODO: this needs to update the server and the reducer needs fixing
export function saveEditReducer ({id}) {
      return {
        type: SAVE_EDIT,
        id
        }
}

export function updateEditField (id, title, body,category,author) {
    console.log("in updateditfield")
    console.log(id + " " + title + " " + body)
      return {
        type: UPDATE_EDIT,
        id,
        title,
        body,
        category,
        author
        }
}

export function setEditPost (id,title,body,category,author) {
  return {
    type: START_EDIT,
    id,
    title,
    body,
    category,
    author
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


export function addPost ({ id, timestamp,title,body,author,category,voteScore,deleted,comments,totalComments }) {
  console.log("in add post function")
//  console.log(id)
  return {
    type: ADD_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category,
    voteScore,
    deleted,
    comments,
    totalComments
  }
}


export function removePost ( id ) {
  //console.log("Remove_Post " + id)
  return {
    type: REMOVE_POST,
    id,
  }
}

export function addCommentCountToPost(id,count) {
  return {
    type: UPDATE_POST_COMMENT_COUNT,
    id,
    count
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


export function commentsReturned(comments) {
  return {
    type: 'ADD_COMMENT',
    comments
  }
}

export function clearComments(comments) {
  return {
    type: 'CLEAR_COMMENTS',
    comments
  }
}

export function postsReturned(posts) {
  //console.log("in postsreturned posts are next");
  //console.log(posts)
  return {
    type: ADD_POST,
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

  export const editPost = (id,title,body,category) => {
    return setEditPost(id,title,body,category)
  }

  export function setDisplayCategory (category) {
  return {
    type: SET_CATEGORY,
    category
    }
  }

  export const setCategory = (category) => {
    return setDisplayCategory(category)
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

    export const saveEdit = (state) => dispatch =>(
      //save state to server and get new state/posts
      saveEditFromAPI(state)
      //cancel edit now that we have saved to server
      .then(posts => dispatch(cancelEdit({id: "dd"})))
      //store new posts with updates in state
      .then(posts => dispatch(updatePost(state)))
      .then(posts => dispatch(getPosts(state)))
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
    /*.then(posts => {
         posts
      })*/
    .then(posts => dispatch(postsReturned(
      posts
      //posts.reduce((ret,cur,index, array) => {return ret.concat(cur)},[])
          )
        )
      )
    )

    export const getCommentsForAllPosts = (comments) => dispatch =>(
      getCommentsFromAPI(comments)
    .then(comments =>
        comments
        //posts.reduce((ret,cur,index, array) => {return ret.concat(cur)},[])

          
        )
      )

    export const getComments = (comments) => dispatch =>(
      getCommentsFromAPI(comments)
    .then(comments => dispatch(commentsReturned(
        comments
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
