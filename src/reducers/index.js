import { combineReducers } from 'redux'

import {
  ADD_POST,
  REMOVE_POST,
  ADD_CATEGORIES,
} from '../actions'

const initialCategory = {
  category: null
}

function categories (state = {}, action) {
  switch (action.type) {
    case ADD_CATEGORIES :
      return [
        ...state,
        action.categories
            ]
    default :
      return initialCategory
  }
}


function post (state = {}, action) {
  switch (action.type) {
    case ADD_POST :
      return [
        ...state, {
          id: action.id,
          text: action.text,
          author:action.author,
          category:action.category
          }
        ]
    case REMOVE_POST :
      return [
        ...state.slice(action.id-1),
        ...state.slice(action.id+1)
      ]
    default :
      return state
  }
}



const initialPosts = {
    id: null,
    author: null,
    text: null,
    category:null,
    comments: {
      id: null,
      text: null,
      author:null
    }

}

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
    case REMOVE_POST :
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

export default combineReducers({
  post,
  postAction,
  categories,
})
