export const changeVoteFromAPI = (data) => //console.log("Asddddd")

{
  const [id, option] = data
  const headers = {
            Authorization: 'Bearer hello',
            "Content-Type": "application/json"
            }
  const init = {
                  headers,
                  method:'post',
                  body: JSON.stringify({option})
              }
              console.log(init)
let url = 'http://localhost:5001/posts/' + id
 return fetch(url, init)
     .then(res => res.json())
     .then (id => id)
  //   .error(error => console.log("error"))

}


export default changeVoteFromAPI
