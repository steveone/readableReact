export const deleteCommentFromAPI = (id) => //console.log("Asddddd")

{
  console.log("deleting comment")
  const headers = {
            Authorization: 'Bearer hello',
        //    Access-Control-Allow-Methods
            }
  const init = {  method: 'delete',
                  headers
              }
let url = 'http://localhost:5001/comments/' + id
 return fetch(url, init)
     .then(res => res.json())
     .then (comment => comment)
/*     .then(( posts) => posts.reduce((ret, elem) =>  (
//       console.log(elem[index].name +  elem[index].path)
//        console.log(data)
      ret.concat(elem.id)
    ),[]))
    */
  //   .error(error => console.log("error"))

}


export default deleteCommentFromAPI
