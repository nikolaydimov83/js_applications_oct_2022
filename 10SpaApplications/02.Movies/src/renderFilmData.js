import { deleteMovie } from "./filmDelete.js";
import { showEditMovie } from "./filmEdit.js";
import { findNumberOfLikes, isMovieLikedByUsr, likeMovie } from "./filmLike.js";
import { createElement, errorHandler, getDataFromServer } from "./utils.js";

 export async function renderFilmData(isRegistered,movieWrapper){
try{
    let data=await getDataFromServer(`http://localhost:3030/data/movies`)
    console.log(data)
    data.forEach(async (movie)=>{
        let movieLiked=await isMovieLikedByUsr(movie)
        let numberOfLikes=await findNumberOfLikes(movie)
        movieWrapper.appendChild(renderSingleMovie(movie,isRegistered,movieLiked,numberOfLikes))
    })


}catch(err){
    errorHandler(err)
}
    
}



function renderSingleMovie(movie,isRegistered,movieLiked,numberOfLikes){
    let display='';
    if (!isRegistered){
        display='hidden'
    }
    let isOwnMovie=movie._ownerId===localStorage.getItem('userId')?'':'hidden';
    let likeBtnHidden=movie._ownerId===localStorage.getItem('userId')?'hidden':'';
    if (movieLiked){
        likeBtnHidden='hidden'
    }

    let spanHidden='hidden';
    if(movieLiked){
        spanHidden=''
    }
    
    let movieElement
    =createElement('section',[],['view-section'],{'ownerId':movie._ownerId,'movieId':movie._id},
                        createElement('div',[],['container'],{},
                            createElement('div',[],["row", "bg-light", "text-dark"],{},
                                createElement('h1',[],[],{},`Movie title: ${movie.title}`),
                                createElement('div',[],["col-md-8"],{},
                                    createElement('img',[],["img-thumbnail"],{'src':movie.img,'alt':"Movie"}),
                                createElement('a',[display],["btn","btn-primary"],{'href':'/details'},'Details')),
                                createElement('div',['hidden'],["col-md-4","text-center"],{/*'style':'display:none'*/},
                                createElement('h3',[],["my-3"],{},'Movie Description'),
                                createElement('p',[],[],{},movie.description),
                                createElement('a',[isOwnMovie],["btn","btn-danger"],{'href':"#",'movieId':movie._id,'ownerId':movie._ownerId},'Delete'),
                                createElement('a',[isOwnMovie],["btn","btn-warning"],{'href':"/edit",'movieId':movie._id,'ownerId':movie._ownerId},'Edit'),
                                createElement('a',[likeBtnHidden],["btn","btn-primary"],{'href':"#",'movieId':movie._id},'Like'),
                                createElement('span',[spanHidden],["enrolled-span"],{},`Liked ${numberOfLikes}`)))));
    movieElement.querySelector('a').addEventListener('click',(ev)=>{
        ev.preventDefault();
        movieElement.querySelector('div.col-md-4').hidden=false;
        ev.target.remove()
    })
    let deleteBtn=movieElement.querySelectorAll('a')[1];
    deleteBtn.addEventListener('click',deleteMovie)
    
    let editBtn=movieElement.querySelectorAll('a')[2];
    editBtn.addEventListener('click',showEditMovie)

    let likeBtn=movieElement.querySelectorAll('a')[3];
    likeBtn.addEventListener('click',likeMovie)


    return movieElement
}