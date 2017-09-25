export const changeCommentVoteFromAPI = (data) => //console.log("Asddddd")

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
  //            console.log(init)
  //            console.log(option)
let url = 'http://localhost:5001/comments/' + id
 return fetch(url, init)
     .then(res => res.json())
     //.then (id => id)
     .then (comments =>{
       //let response = {[comments.id]:comments}
        let response = {comments}
      console.log("we got a response in changecommentvote")
       console.log(response)
       return response
     })
  //   .error(error => console.log("error"))

}


export default changeCommentVoteFromAPI
