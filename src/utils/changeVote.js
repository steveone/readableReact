export const changeVoteFromAPI = (data) => //console.log("Asddddd")

{
  const [id, vote] = data
  console.log("update vote")
  console.log(id)
  console.log(vote)
  const headers = {
            Authorization: 'Bearer hello',
        //    Access-Control-Allow-Methods
            }
  const init = {
                  headers
              }
let url = 'http://localhost:5001/posts/' + id + '?' + vote
 return fetch(url, init)
     .then(res => res.json())
     .then (id => id)
/*     .then(( posts) => posts.reduce((ret, elem) =>  (
//       console.log(elem[index].name +  elem[index].path)
//        console.log(data)
      ret.concat(elem.id)
    ),[]))
    */
  //   .error(error => console.log("error"))

}


export default changeVoteFromAPI
