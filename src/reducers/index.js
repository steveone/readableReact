import { combineReducers } from 'redux'

import {
  ADD_POST,
  REMOVE_POST,
  ADD_CATEGORIES,
  UPDATE_POST,
  SUBMIT_POST,
  CHANGE_VOTE
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


function categories (state = {}, action) {
  //const {categories} = action
  console.log("in categoires reducer")
  console.log(action)
  switch (action.type) {
    case ADD_CATEGORIES :
      return {...[state],...action.categories
      }
    default :
      return state
  }
}

function post (state = {}, action) {
  console.log("i reducer")
  //const { id, author, body, title} = action
  console.log(action.type)
  switch (action.type) {
    case ADD_POST:
      return {
      ...[state],...action.posts
        /*[id] : { id,
            author,
            body,
            title

          //[comments]: comments,
        }*/
      }
    case REMOVE_POST :
    console.log("in remove post reducer")
        let retVal = Object.keys(state).map( (item, index) => {
          console.log(state[index].id)
          console.log(action.id)
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
    console.log("retval is")
    console.log(retVal)
    return {...[state],...retVal}

  
    default :
      return state
  }
}



export default combineReducers({
  post,
  writingPost,
  categories,
})
