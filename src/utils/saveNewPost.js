export const saveNewPostAPI = (post) => //console.log("Asddddd")

{
  console.log("in saveNewPostAPI")
  console.log(post)
  let output = post
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
let url = 'http://localhost:5001/posts/'
 return fetch(url, init)
     .then(res => res.json())
     .then (post => post)
  //   .error(error => console.log("error"))

}


export default saveNewPostAPI
