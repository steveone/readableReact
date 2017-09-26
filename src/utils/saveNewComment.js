export const saveNewCommentAPI = (comment) => //console.log("Asddddd")

{
  console.log("in saveNewCommentAPI")
  console.log(comment)
  let output = comment
  //const {id,title,body,category,author} = data
  //const output = {id,title,body,category,author}
  const headers = {
            Authorization: 'Bearer hello',
            "Content-Type": "application/json"
            }
  const init = {
                  headers,
                  method:'post',
                  body: JSON.stringify(output)
              }
              console.log(init)
let url = 'http://localhost:5001/comments/'
 return fetch(url, init)
     .then(res => res.json())
     .then (id => id)
  //   .error(error => console.log("error"))

}


export default saveNewCommentAPI
