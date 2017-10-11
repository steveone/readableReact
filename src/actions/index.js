import getCategoriesFromAPI from '../utils/getCategories'
import getPostsFromAPI from '../utils/getPosts'
import deletePostFromAPI from '../utils/deletePost'
import changeVoteFromAPI from '../utils/changeVote'
import changeCommentVoteFromAPI from '../utils/changeCommentVote'
import saveEditFromAPI from '../utils/saveEdit'
import getCommentsFromAPI from '../utils/getComments'
import saveNewCommentAPI from '../utils/saveNewComment'
import saveNewPostAPI from '../utils/saveNewPost'
import deleteCommentFromAPI from '../utils/deleteComment'
import saveEditCommentFromAPI from '../utils/saveEditComment'

import {
  ADD_ALL_POSTS ,
  REMOVE_POST ,
  ADD_CATEGORIES ,
  CHANGE_VOTE ,
  UPDATE_POST ,
  START_EDIT ,
  UPDATE_EDIT ,
  CANCEL_EDIT ,
  SAVE_EDIT ,
  SET_CATEGORY ,
  ADD_COMMENTS ,
  ADD_NEW_COMMENT ,
  REMOVE_COMMENT ,
  CHANGE_COMMENT_VOTE ,
  CLEAR_COMMENTS ,
  UPDATE_POST_COMMENT_COUNT ,
  MODAL_OPEN ,
  MODAL_CLOSE ,
  UPDATE_NEW_COMMENT ,
  CANCEL_NEW_COMMENT ,
  CANCEL_NEW_POST,
  CHANGE_SORT,
  UPDATE_NEW_POST ,
  START_EDIT_COMMENT ,
  CANCEL_EDIT_COMMENT ,
  UPDATE_EDIT_COMMENT ,
  ADD_NEW_POST,
  UPDATE_COMMENT,
} from './types';

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

export function changeSort({sortMethod}){
  return {
    type:CHANGE_SORT,
    sortMethod,
  }
}


export function openModal({modal}){
  return {
    type:MODAL_OPEN,
    modal,
  }
}

export function closeModal({modal}){
  return {
    type:MODAL_CLOSE,
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

export function updateWritingCommentField (body,author) {
    console.log("in updateditfield")
    console.log(body + " " + author)
      return {
        type: UPDATE_NEW_COMMENT,
        body,
        author
        }
}

export function cancelWritingCommentField (body,author) {
      return {
        type: CANCEL_NEW_COMMENT,
        body,
        author
        }
}

export function cancelNewPost () {
      return {
        type: CANCEL_NEW_POST,
        }
}


export function setEditComment (id,parentId,body,author) {
  return {
    type: START_EDIT_COMMENT,
    id,
    parentId,
    body,
    author,
    }
}

export function cancelEditComment (id,parentId,body,author) {
  return {
    type: CANCEL_EDIT_COMMENT,
    id,
    parentId,
    body,
    author,
    }
}
export function updateEditComment (id,parentId,body,author) {
  return {
    type: UPDATE_COMMENT,
    id,
    parentId,
    body,
    author,
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

export function endEditPost ({id,saveCancel}) {
  return {
    type: START_EDIT,
    id,
    saveCancel
    }
}


export function updatePost (data) {
  const {author, body, title, id,category,deleted, voteScore} = data
  return {
    type: UPDATE_POST,
    author,
    body,
    title,
    id,
    category,
    deleted,
    voteScore,
  }
}

export function updateNewPost (data) {
  const {author, body, title, id,category,deleted, voteScore} = data
  return {
    type: UPDATE_NEW_POST,
    author,
    body,
    title,
    id,
    category,
    deleted,
    voteScore,
  }
}


export function addPost ({ id, timestamp,title,body,author,category,voteScore,deleted,comments,totalComments }) {
  console.log("in add post function")
//  console.log(id)
  return {
    type: ADD_NEW_POST,
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

export function removeComment (comment ) {
//  console.log("Remove_Post " + id)
  return {
    type: REMOVE_COMMENT,
    comment,
    parentId:comment.parentId,
    id:comment.id
  }
}


export function removePost (id ) {
//  console.log("Remove_Post " + id)
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
    type: ADD_CATEGORIES,
    categories
  }
}

export function updateEditingCommentField(comments){
  return {
    type: UPDATE_EDIT_COMMENT,
    comments
  }
}

export function commentsReturned(comments) {
  return {
    type: ADD_COMMENTS,
    comments
  }
}

export function addNewComment(comments) {
  return {
    type: ADD_NEW_COMMENT,
    comments
  }
}

export function clearComments(comments) {
  return {
    type: CLEAR_COMMENTS,
    comments
  }
}

export function postsReturned(posts) {
  //console.log("in postsreturned posts are next");
  //console.log(posts)
  return {
    type: ADD_ALL_POSTS,
    posts
  }
}


export function changeCommentVotePost(comments) {
  //const [ id, vote ] = data
  console.log("in changecomment vote")
  console.log(comments.comments)
  return {
    type: CHANGE_COMMENT_VOTE,
    comments:comments.comments,
  }
}

export function changeVotePost (data) {
  const [ id, vote ] = data
  return {
    type: CHANGE_VOTE,
    id,
    vote,
  }
}

 export const editComment = (comment) => {
  const {id,parentId,author,body} = comment
  return setEditComment(id,parentId,author,body)
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

 export const addPostToServer = (post) => dispatch =>(
  saveNewPostAPI(post)
  .then(post => dispatch(addPost(post)
      )
    )
  )

  export const changeVote = (id) => dispatch =>(
    changeVoteFromAPI(id)
    //need to finish update post in state
    .then(posts => dispatch(changeVotePost(
      id
          )
        )
      )
    )

    export const changeCommentVote = (id) => dispatch =>(
      changeCommentVoteFromAPI(id)
      //need to finish update post in state
      .then(comments =>
        {
        console.log("about to return")
        console.log(comments)
        dispatch(changeCommentVotePost(
        comments
      )
    )}
        )
      )

      export const saveEditComment = (state) => dispatch =>(
        saveEditCommentFromAPI(state)
        .then(posts => dispatch(updateEditComment(state)))
        .then(posts => dispatch(cancelEditComment({id: "dd"})))
      )

    export const saveEdit = (state) => dispatch =>(
      saveEditFromAPI(state)
      .then(posts => dispatch(updatePost(state)))
      .then(posts => dispatch(cancelEdit({id: "dd"})))
      )


export const deletePost = (id) => dispatch =>(
  deletePostFromAPI(id)
  .then(posts => dispatch(removePost(
    id
        )
      )
    )
  )

  export const deleteComment = (id) => dispatch =>(
    deleteCommentFromAPI(id)
    .then(comment => dispatch(removeComment(
      comment
          )
        )
      )
    )


  export const saveNewComment = (comment) => dispatch =>(
    saveNewCommentAPI(comment)
    .then(comment => dispatch(addNewComment(comment)
        )
      )
    )


  export const getPosts = (posts) => dispatch =>(
    getPostsFromAPI(posts)
    .then(posts => dispatch(postsReturned(posts)
        )
      )
    )


    export const getComments = (comments) => dispatch =>(
      getCommentsFromAPI(comments)
    .then(comments => {
      console.log("in getcomments")
      dispatch(commentsReturned(
        comments
        //posts.reduce((ret,cur,index, array) => {return ret.concat(cur)},[])
            )
          )}
        )
      )

      export const getPostsAndComments  = (posts) => dispatch =>
          dispatch(getPosts(posts))




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
