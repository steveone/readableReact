export const saveEditCommentFromAPI = (data) => //console.log("Asddddd")
//TODO: test and ensure it really works
{
  const {id,parentId,body,author} = data
  console.log("data is ")
  console.log(data)
  const output = {id,body,parentId,author}
//  console.log("output")
//  console.log(output)
  const headers = {
            Authorization: 'Bearer hello',
            "Content-Type": "application/json"
            }
  const init = {
                  headers,
                  method:'put',
                  body: JSON.stringify(output)
              }
              console.log(init)
let url = 'http://localhost:5001/comments/' + id
 return fetch(url, init)
     .then(res => res.json())
//     .then (id => {console.log("returned data here");console.log(id)})
     .then(id =>id)
  //   .error(error => console.log("error"))

}


export default saveEditCommentFromAPI
