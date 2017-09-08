import getComments from '../utils/getComments'

export const getPostsFromAPI = () => //console.log("Asddddd")

{
  console.log("getting posts")
  const headers = {
            'Authorization': 'Bearer hello',
            }
 return fetch('http://localhost:5001/posts', { headers })
     .then(res => res.json())
     .then (posts => posts)
     .then(posts => posts.map((data,index,item) => {
       console.log("in posts, thinking about getting comments for " + data.id)
       getComments(data.id).then(comments =>
         {data.comments = comments
          data.commentCount = comments.length
         })

       return data}))

}


export default getPostsFromAPI
