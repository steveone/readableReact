import { combineReducers } from 'redux'

import {
  ADD_POST,
  REMOVE_POST,
  ADD_CATEGORIES,
  UPDATE_POST,
  SUBMIT_POST,
  CHANGE_VOTE,
  START_EDIT,
  END_EDIT,
  UPDATE_EDIT,
  CANCEL_EDIT,
  ADD_COMMENT,
  REMOVE_COMMENT,
  UPDATE_COMMENT,
  CHANGE_COMMENT_VOTE,
  CLEAR_COMMENTS,
  UPDATE_POST_COMMENT_COUNT,
//  SAVE_EDIT
} from '../actions'

/*const initialCategory = {
  category: null
}*/



const blankPost = {
  'title': "",
  'author': "",
  'category': "",
}




function writingPost (state = blankPost, action)
{
  const {author, category,body } = action
  switch(action.type){
    case UPDATE_POST:
        return{
        ...state,
        category,
        author,
        body
        }
    case SUBMIT_POST: return state;
    default: return state;
  }
}

const currentlyEditing = {
  }

function editing(state={},action){
  //const {id,title,body} = action
//  console.log("in editing reducer")
//  console.log(state)
  switch (action.type) {
    case START_EDIT:
       return {
        ...state,
        ...action.id
        }
    case UPDATE_EDIT:
          return {
        ...state,
        ...action.id
        }
    case CANCEL_EDIT:
              return {
            ...state,
            id:null,
            title:null,
            body:null,
            category:null,
            author:null,
            }

    case END_EDIT:
      return {
        ...[state],
        editing:""
      }
    default: return state
}
}

function categories (state = currentlyEditing, action) {
  //const {categories} = action
  switch (action.type) {
    case ADD_CATEGORIES :
      return {...[state],...action.categories
      }
    default :
      return state
  }
}

function post (state = {}, action) {
  let retVal = null
  switch (action.type) {
    case ADD_POST:
    console.log("Adding post")
      return {
      ...[state],...action.posts
        /*[id] : { id,
            author,
            body,
            title

          //[comments]: comments,
        }*/
      }
    case UPDATE_POST_COMMENT_COUNT :
    console.log ("update post comment count")
    console.log(action)
     retVal = Object.keys(state).map( (item, index) => {
         if(state[index].id === action.id) {
         // this one isn't changing so return it
           state[index].commentCount = action.count
           console.log(state)
           return state[index]
     }
     //we want to mark this one deleted = true
     else
       {
           return state[index]
     }
 });
   return {...[state],...retVal}

    case REMOVE_POST :
       console.log("remove post")
       console.log (state)
        retVal = Object.keys(state).map( (item, index) => {
            if(state[index].id !== action.id) {
            // this one isn't changing so return it
              return state[index];
        }
        //we want to mark this one deleted = true
        else
          {
            state[index].deleted = true
              return state[index]
        }
    });
      return {...[state],...retVal}


    case CHANGE_VOTE :
      const scoreChange = (action.vote === 'upVote') ? 1 : -1
        retVal = Object.keys(state).map( (item, index) => {
            if(state[index].id !== action.id) {
            // this one isn't changing so return it
              return state[index];
        }
        //vote Score changed on this one so update
        else
          {
              state[index].voteScore += scoreChange
              return state[index]
        }
    });
    return {...[state],...retVal}
    default :
      return state
  }
}

function comments (state = {}, action) {
  let retVal = state
  //console.log("in comments reducer")
  //console.log(action)
  switch (action.type) {
    case ADD_COMMENT:
      return {
      ...state,...action.comments
        /*[id] : { id,
            author,
            body,
            title

          //[comments]: comments,
        }*/
      }
    case UPDATE_COMMENT:
    const {id,body,author} = action
          return{
          ...state,
          id,
          body,
          author,
          }
    case REMOVE_COMMENT :
    //   console.log("remove comment")
    //   console.log (state)
        retVal = Object.keys(state).map( (item, index) => {
            if(state[index].id !== action.id) {
            // this one isn't changing so return it
              return state[index];
        }
        //we want to mark this one deleted = true
        else
          {
            state[index].deleted = true
              return state[index]
        }
    });
      return {...[state],...retVal}


    case CHANGE_COMMENT_VOTE :
      const scoreChange = (action.vote === 'upVote') ? 1 : -1
        retVal = Object.keys(state).map( (item, index) => {
            if(state[index].id !== action.id) {
            // this one isn't changing so return it
              return state[index];
        }
        //vote Score changed on this one so update
        else
          {
              state[index].voteScore += scoreChange
              return state[index]
        }
    });
    return {...[state],...retVal}

    case CLEAR_COMMENTS :
  //  console.log ("in clear comments, state is")
  //  console.log(state)
        return {
          ...[state],...[null]
        }
    default :
      return state
  }
}




export default combineReducers({
  post,
  writingPost,
  categories,
  editing,
  comments,
})
