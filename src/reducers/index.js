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
  MODAL_OPEN,
  MODAL_CLOSE,
  UPDATE_EDIT_COMMENT,
  START_EDIT_COMMENT,
  CANCEL_EDIT_COMMENT,
  END_EDIT_COMMENT,
  CANCEL_NEW_POST,
  CHANGE_SORT,
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


function sortMethod (state = {sortMethod: 'voteScore'}, action)
{
  const {sortMethod} = action
  switch(action.type){
    case CHANGE_SORT:
      return {
        ...state,
        ...{sortMethod}
      }
      default:
        return state
    }
  }

function modalIsOpen (state = {status: false}, action)
{
  const {modal} = action
  switch(action.type){
    case MODAL_OPEN:
      return {
      ...state,
      ...{status:true,modal}
      }
    case MODAL_CLOSE:
      return {
        ...state,
        ...{status:false,modal:false}
      }
    default:
      return state
  }
}

function writingPost (state = blankPost, action)
{
  const {author, category,body,title } = action
  switch(action.type){
    case UPDATE_POST:
        return{
        ...state,
        category,
        author,
        body,
        title
        }
    case SUBMIT_POST: return state;
    case CANCEL_NEW_POST:
      return {
        ...state,
        id:null,
        body:null,
        author:null,
        category:null,
        title:null
      }
    default: return state;
  }
}



  function editingComment(state={},action){
    //const {id,title,body} = action
    console.log("in editing reducer")
    console.log(action)
  //  console.log(state)
    switch (action.type) {
      case START_EDIT_COMMENT:
         return {
          ...state,
          ...action.body
          }
      case UPDATE_EDIT_COMMENT:
            return {
          ...state,
          ...action.body
          }
      case CANCEL_EDIT_COMMENT:
                return {
              ...state,
              body:null,
              author:null,
              }
      case END_EDIT_COMMENT:
        return {
          ...[state],
          editingComment: ""
        }
      default: return state
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
  let retVal = []
  const posts = action.posts
  //console.log("in posts")
  //console.log(posts)
  switch (action.type) {
    case ADD_POST:
  //  console.log("Adding post")
  //  console.log(action.posts)
      return {
      ...[state],...posts
        /*[id] : { id,
            author,
            body,
            title

          //[comments]: comments,
        }*/
      }
    case UPDATE_POST_COMMENT_COUNT :
  //  console.log ("update post comment count")
  //  console.log(action)
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
    console.log("change vote")
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
    console.log("retval")
    console.log(retVal)
    return {...[state],...retVal}
    default :
      //console.log("Default")
      return state
  }
}



function comments (state = {}, action) {
  let retVal = state
  const {id,body,author} = action
  switch (action.type) {
    case ADD_COMMENT:
      return {
      ...state,...action.comments
      }
    case UPDATE_COMMENT:
    //const {id,body,author} = action
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
    console.log("Aas")
    let comments = action.comments
    let {parentId, id} = comments
    console.log(parentId + " "  + id )
  //  const scoreChange = (action.vote === 'upVote') ? 1 : -1
        retVal = Object.keys(state).map( (currentValue, index, arry) => {
            console.log("ss " + currentValue + " " + parentId + " " + id)
            if (currentValue === parentId) {
                state[currentValue].map((currValue, index, arry) => {
                  if (state[currentValue][index].id === id) {
                    //state[currentValue][index].voteScore += scoreChange
                    state[currentValue][index] = action.comments
                    }
                  console.log("about to show changed state[index]")
                  console.log(state[currentValue][index])
                  //return state[currentValue]
                  //return action.comments[0]
              })
              }

             //else return state[currentValue]
          });
      console.log("about to reeeeturn")
//      retVal= retVal
//      retVal = {[parentId]:retVal}
//      console.log(...retVal)
    return {...state,...retVal}

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
  modalIsOpen,
  editingComment,
  sortMethod,
})
