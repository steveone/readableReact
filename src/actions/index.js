import getCategoriesFromAPI from '../utils/getCategories'
import getPostsFromAPI from '../utils/getPosts'

export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const ADD_CATEGORY = 'ADD_CATEGORY'
export const ADD_CATEGORIES = 'ADD_CATEGORIES'
export const UPDATE_POST = 'UPDATE_POST'
export const SUBMIT_POST = 'SUBMIT_POST'


export function updatePost ({author, body, title, id}) {
  return {
    type: UPDATE_POST,
    author,
    body,
    title,
    id
  }
}

export function addPost ({ id, author, body, title }) {
  return {
    type: ADD_POST,
    author,
    id,
    body,
    title
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

export const getPosts = (posts) => dispatch =>(
  getPostsFromAPI(posts)
  //.getCategories()
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
