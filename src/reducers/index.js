import { combineReducers } from 'redux'

import {
  ADD_POST,
  REMOVE_POST,
  ADD_CATEGORIES,
  UPDATE_NEW_POST,
  SUBMIT_NEW_POST,
  UPDATE_POST,
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
  MODAL_OPEN,
  MODAL_CLOSE,
  UPDATE_NEW_COMMENT,
  START_NEW_COMMENT,
  CANCEL_NEW_COMMENT,
  END_NEW_COMMENT,
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
    case UPDATE_NEW_POST:
        return{
        ...state,
        category,
        author,
        body,
        title
        }
    case SUBMIT_NEW_POST: return state;
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



  function writingComment(state={},action){
    //const {id,title,body} = action
    console.log("in editing reducer")
    console.log(action)
  //  console.log(state)
    switch (action.type) {
      case START_NEW_COMMENT:
         return {
          ...state,
          ...action.body
          }
      case UPDATE_NEW_COMMENT:
            return {
          ...state,
          ...action.body
          }
      case CANCEL_NEW_COMMENT:
                return {
              ...state,
              body:null,
              author:null,
              }
      case END_NEW_COMMENT:
        return {
          ...[state],
          writingComment: ""
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
  let retVal = {}
  const posts = action.posts
  switch (action.type) {
    case ADD_POST:
      return {
      ...[state],...posts
      }
    case UPDATE_POST:
       console.log("in update post")
       console.log(action)
       const {category,author,body,title} = action
       //TODO: need to fix update_post so it works
       retVal = Object.assign({},state)
       Object.keys(retVal).forEach( (index) => {
           if(retVal[index].id !== action.id) {
           // this one isn't changing so return it
             return retVal[index];
       }
       //we want to mark this one deleted = true
       else
         {
            return Object.assign({},retVal[index],{
              category,
              author,
              body,
              title,
         })
       }
       });
       return {...[state],...retVal}

//   return {...[state],...retVal}

    case REMOVE_POST :
       retVal = Object.assign({},state)
       Object.keys(retVal).forEach( (index) => {
            if(retVal[index].id !== action.id) {
            // this one isn't changing so return it
              return state[index];
        }
        //we want to mark this one deleted = true
        else
          {
            retVal[index].deleted = true
        }
    });
    return {...state,...retVal}


    case CHANGE_VOTE:
    console.log("change vote")
      const scoreChange = (action.vote === 'upVote') ? 1 : -1
      retVal = Object.assign({},state)
        Object.keys(retVal).map( (item, index) => {
            if(retVal[index].id !== action.id) {
            // this one isn't changing so return it
              return retVal[index];
        }
        //vote Score changed on this one so update
        else
          {
              retVal[index].voteScore += scoreChange
              return retVal[index]
        }
    });
    return {...[state],...retVal}
    default :
      //console.log("Default")
      return {...state}
  }
}



function comments (state = {}, action) {
  let retVal = state
  let parentId = null
  let id = null

//  const {body,author} = action
  switch (action.type) {
    case ADD_COMMENT:
    return {
      ...state,...action.comments
    }
    case UPDATE_COMMENT:
    const {body,author} = action
          return{
          ...state,
          id:action.id,
          body,
          author,
          }
    case REMOVE_COMMENT :
    //   console.log("remove comment")
    //   console.log (state)
        //retVal = Object.assign({},state)
        console.log(action)
    parentId = action.parentId
    id = action.id
    retVal = Object.assign({},state)
      Object.keys(retVal).map( (currentValue, index, arry) => {
          if (currentValue === parentId) {
              retVal[currentValue].map((currValue, index, arry) => {
                if (retVal[currentValue][index].id === id) {
                  console.log("dleted with id " + id)
                  retVal[currentValue][index].deleted = true
                  }
                  return retVal[currentValue][index]
            })
            }
            return retVal[index];
        });
        console.log("returned after deleted")
      return {...state,...retVal}


    case CHANGE_COMMENT_VOTE :
    console.log("Aas")
    //let {parentId, id} = action.comments
    parentId = action.comments.parentId
    id = action.comments.id
    console.log(action)
    console.log(parentId + " "  + id )
      retVal = Object.assign({},state)
        Object.keys(retVal).map( (currentValue, index, arry) => {
            if (currentValue === parentId) {
                retVal[currentValue].map((currValue, index, arry) => {
                  if (retVal[currentValue][index].id === id) {
                    retVal[currentValue][index] = action.comments
                    }
                    return retVal[currentValue]
              })
              }
              return retVal[index];
          });
      console.log("about to reeeeturn")
    return {...state,...retVal}

    case CLEAR_COMMENTS :
        return {
          ...[state],...[null]
        }
    default :
      return {...state}
  }
}



export default combineReducers({
  post,
  writingPost,
  categories,
  editing,
  comments,
  modalIsOpen,
  writingComment,
  sortMethod,
})
