export const getCategoriesFromAPI = () => //console.log("Asddddd")

{
//  console.log("fetching categories")
  const headers = {
            'Authorization': 'Bearer hello',
            }
 return fetch('http://localhost:5001/categories', { headers })
     .then(res => res.json())
     //.then(categories => {console.log({categories})})
     .then (categories =>  categories.categories)
     //.then (categories =>  Object.assign({},categories))
     /*.then(({ categories }) => categories.reduce((ret, elem) =>  (
      ret.concat(elem.name)
    ),[]))*/


}


export default getCategoriesFromAPI
