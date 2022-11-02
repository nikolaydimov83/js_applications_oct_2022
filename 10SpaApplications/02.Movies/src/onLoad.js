import { renderFilmData } from "./renderFilmData.js";
import { checkIsRegistered } from "./utils.js";

let container=document.getElementById('container')


let homePage=document.getElementById('home-page');
let addMovieForm=document.getElementById('add-movie');
let addMovieBtnWrapper=document.getElementById('add-movie-button');
let addMovieBtn=addMovieBtnWrapper.children[0];
addMovieBtn.id='add-movie-anchor';
addMovieBtn.href='add-movie';


let movieDetails=document.getElementById('movie-example');
let editMovieForm=document.getElementById('edit-movie');
let loginForm=document.getElementById('form-login');
let signUpForm=document.getElementById('form-sign-up');
let applicationNav=document.querySelector('nav');
let footer=document.querySelector('footer');
let movieListWrapper=document.getElementById('movie');
let movieListMail=document.getElementById('movies-list')


export{container,loginForm,signUpForm,applicationNav,addMovieBtn,addMovieForm,footer,editMovieForm}
//let isRegistered=checkIsRegistered();

export async function onLoad(){
let isRegistered=checkIsRegistered();
container.querySelectorAll('nav a').forEach((anchor)=>{
    if(!anchor.id){
        anchor.id=anchor.textContent.toLowerCase();
    }
    anchor.href=`/${anchor.id}`
    showHideAnchors(isRegistered,anchor)
})
showHideViews(isRegistered);

container.appendChild(footer)
}

function showHideAnchors(isRegistered,anchor){
    anchor.style.display='';
    if (!isRegistered){
        if(anchor.id==='logout'||anchor.id==='welcome-msg'){
            anchor.style.display='none';
        }
    }else{
            if(anchor.id==='login'||anchor.id==='register'){
                anchor.style.display='none';
            }
            if (anchor.id==='welcome-msg'){
                anchor.textContent=`Welcome, ${localStorage.getItem('email')}`
            }
        }
}

function showHideViews(isRegistered){
    emptyContainer()
    container.appendChild(homePage)
        
    if (isRegistered){
        container.appendChild(addMovieBtnWrapper)
    }
    container.appendChild(movieListWrapper)
    renderFilmData(isRegistered,movieListMail)
    
    
}
export function emptyContainer(){

document.querySelectorAll('section').forEach((section)=>section.remove());
footer.remove();
container.appendChild(footer)
}