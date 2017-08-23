import getCategoriesFromAPI from '../utils/apiConnector'

export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const ADD_CATEGORY = 'ADD_CATEGORY'
export const ADD_CATEGORIES = 'ADD_CATEGORIES'
export const UPDATE_POST = 'UPDATE_POST'
export const SUBMIT_POST = 'SUBMIT_POST'


export function updatePost ({author, text, category}) {
  return {
    type: UPDATE_POST,
    author,
    text,
    category
  }
}

export function addPost ({ id, author, text,category }) {
  return {
    type: ADD_POST,
    id,
    author,
    text,
    category
  }
}

export function removePost ( id ) {
  console.log("Remove_Post " + id)
  return {
    type: REMOVE_POST,
    id,
  }
}



export function categoriesReturned(categories) {
  return {
    type: 'ADD_CATEGORIES',
    categories
  }
}

//export const getCategories = () => getCategoriesFromAPI()

export const getCategories = () => dispatch =>(
  getCategoriesFromAPI()
  //.getCategories()
  .then(categories => dispatch(categoriesReturned(
    categories.reduce((ret,cur,index, array) => {return ret.concat(cur)},[])
    )
  )
    //console.log(categories))
    //receiveCategories(categories))
  //dispatch(receiveCategories(categories)))
    )
  )
