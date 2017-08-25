export const getPostsFromAPI = () => //console.log("Asddddd")

{
  console.log("getting posts")
  const headers = {
            'Authorization': 'Bearer hello',
            }
 return fetch('http://localhost:5001/posts', { headers })
     .then(res => res.json())
     .then (posts => posts)
/*     .then(( posts) => posts.reduce((ret, elem) =>  (
//       console.log(elem[index].name +  elem[index].path)
//        console.log(data)
      ret.concat(elem.id)
    ),[]))
    */
  //   .error(error => console.log("error"))

}


export default getPostsFromAPI
