export const getCategoriesFromAPI = () => //console.log("Asddddd")

{
  console.log("Adsfasdf")
  const headers = {
            'Authorization': 'Bearer hello',
            }
 return fetch('http://localhost:5001/categories', { headers })
     .then(res => res.json())
     .then(({ categories }) => categories.reduce((ret, elem) =>  (
//       console.log(elem[index].name +  elem[index].path)
//        console.log(data)
      ret.concat(elem.name)
    ),[]))
  //   .error(error => console.log("error"))

}


export default getCategoriesFromAPI
