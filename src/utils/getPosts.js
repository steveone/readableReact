//import getComments from '../utils/getComments'


export const getPostsFromAPI = () => //console.log("Asddddd")

{
//  console.log("getting posts")
  const headers = {
            'Authorization': 'Bearer hello',
            }
 //let expecting = 0
 //let received = 0
 return fetch('http://localhost:5001/posts', { headers })
     .then(res => res.json())
     .then(posts => {
       console.log("about to return posts")
       console.log(posts)
       return posts
     })
     //.then(posts => posts.map((data,index,item) => {
    //   console.log("in posts, thinking about getting comments for " + data.id)
    //   console.log(posts.length)
    //   expecting = posts.length
    //get comments and comment count below
/*
       getComments(data.id).then(comments =>
         {
          //add comments and totalComments to returned data
          data.comments = (comments) ? comments : []
          data.totalComments = (comments) ? comments.length : 0
          console.log("in getComments call ")
          received +=1
          console.log("expecting " + expecting + " received " + received)
        })
         .catch((error => {console.log("there was an error")
         return 'null'
       }))

       return data
})).then(data => {
     console.log("fff expecting " + expecting + " received " + received)

     console.log("about to return ")
*/
//this is returning before the getComments is finished returning for all comments
      //return data//
    //}
    //))
}


export default getPostsFromAPI
