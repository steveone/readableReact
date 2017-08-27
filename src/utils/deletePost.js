export const deletePostFromAPI = (id) => //console.log("Asddddd")

{
  console.log("deleting post")
  const headers = {
            Authorization: 'Bearer hello',
        //    Access-Control-Allow-Methods
            }
  const init = {  method: 'delete',
                  headers
              }
let url = 'http://localhost:5001/posts/' + id
 return fetch(url, init)
//     .then(res => res.json())
     .then (id => id)
/*     .then(( posts) => posts.reduce((ret, elem) =>  (
//       console.log(elem[index].name +  elem[index].path)
//        console.log(data)
      ret.concat(elem.id)
    ),[]))
    */
  //   .error(error => console.log("error"))

}


export default deletePostFromAPI
