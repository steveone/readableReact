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





export default combineReducers({
  post,
  writingPost,
  categories,
})
