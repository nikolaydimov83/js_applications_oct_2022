
import { errorHandler, getDataFromServer, sendDataToServer } from "./utils.js";

export async function likeMovie(ev){
    ev.preventDefault();
    try{
        let data={movieId:ev.target.movieId }
        let serverResponseData=await sendDataToServer(data,`http://localhost:3030/data/likes`,localStorage.getItem('accessToken'))
        console.log(serverResponseData)
        let data1=await getDataFromServer(`http://localhost:3030/data/likes`)
        ev.target.hidden=true;
        let movie={_id:ev.target.movieId}
        ev.target.parentElement.children[5].textContent=`Liked ${await findNumberOfLikes(movie)}`
        ev.target.parentElement.children[5].hidden=false;
    }catch(err){
        errorHandler(err)
    }
    
}

export async function isMovieLikedByUsr(movie){
    //let currentUser=localStorage.getItem('userId');
    let serverResponse=await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movie._id}%22%20and%20_ownerId%3D%22${localStorage.getItem('userId')}%22`)
    let arrayOfLikesByUser=await serverResponse.json()
    if (arrayOfLikesByUser.length>0){
        return true
    }else{
        return false
    }
}
export async function findNumberOfLikes(movie){
let serverResponse=await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movie._id}%22&distinct=_ownerId&count`)
let data=await serverResponse.json();
return data
}