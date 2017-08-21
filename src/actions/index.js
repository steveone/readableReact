import getCategoriesFromAPI from '../utils/apiConnector'

export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const ADD_CATEGORY = 'ADD_CATEGORY'
export const ADD_CATEGORIES = 'ADD_CATEGORIES'


export function addPost ({ id, author, text,category }) {
  return {
    type: ADD_POST,
    id,
    author,
    text,
    category
  }
}

export function removePost ({ id }) {
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
