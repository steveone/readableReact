export const getCommentsFromAPI = (data) => //console.log("Asddddd")

{
  let id = data
//  console.log("data in getcomments")
//  console.log(data)
  //remove hard coded comment id and set {id} back to const
  //id = '8xf0y6ziyjabvozdd253nd'
//  const output = {id}
  console.log("getting comments in utils/getcomments for " + id)
  const headers = {
            Authorization: 'Bearer hello',
            "Content-Type": "application/json"
            }
  const init = {
                  headers,
              }
//              console.log(init)
let url = 'http://localhost:5001/posts/' + id + '/comments'
 return fetch(url, init)
     .then(res => res.json())
     .then (comments =>{
       let response = {[data]:comments}
       console.log(response)
       return response
     })
     .catch(error => console.log("error in getcomments"))

}



export default getCommentsFromAPI
