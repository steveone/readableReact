export const saveEditFromAPI = (data) => //console.log("Asddddd")

{
  const {id,editingTitle,editingBody} = data
  const output = {id,title:editingTitle,body:editingBody}
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
let url = 'http://localhost:5001/posts/' + id
 return fetch(url, init)
     .then(res => res.json())
     .then (id => id)
  //   .error(error => console.log("error"))

}


export default saveEditFromAPI
