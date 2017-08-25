import { combineReducers } from 'redux'

import {
  ADD_POST,
  REMOVE_POST,
  ADD_CATEGORIES,
  UPDATE_POST,
  SUBMIT_POST
} from '../actions'

/*const initialCategory = {
  category: null
}*/

function categories (state = {}, action) {
  switch (action.type) {
    case ADD_CATEGORIES :
      return [
        action.categories
            ]
    default :
      return state
  }
}

const blankPost = {
  'title': "",
  'author': "",
  'category': "",
}

function writingPost (state = blankPost, action)
{
  const {author, text, category} = action
  switch(action.type){
    case UPDATE_POST:
        return{
        ...state,
        category,
        author,
        text
        }
    case SUBMIT_POST: return state;
    default: return state;
  }
}

function post (state = {}, action) {
  const { id, author, text,category} = action
  console.log(action)
  switch (action.type) {
    case ADD_POST :
      return {
        ...state,
        [id] : { id,
            author,
            text,
            category

          //[comments]: comments,
        }
      }
    case REMOVE_POST :
        return Object.keys(state)
    .filter(key => key !== action.id)
    .reduce((result, current) => {
      result[current] = state[current];
      return result;
  }, {});
    default :
      return state
  }
}



/*const initialPosts = {
    /*id: null,
    author: null,
    text: null,
    category:null,
    comments: {
      id: null,
      text: null,
      author:null
    }

}*/
/*
function postAction (state = initialPosts, action) {
  const { id, author, text,category} = action
  switch (action.type) {
    case ADD_POST :
      return {
        ...state,
        [post]: {
          ...state, post: {
            id,
            author,
            text,
            category
          }
          //[comments]: comments,
        }
      }
  /* case REMOVE_POST :
      return {
        state,
        [post.id]: {
          ...state[post],
          [post.id]: null,
        }
      }
    default :
      return state
  }
}
*/
export default combineReducers({
  post,
  writingPost,
  categories,
})
