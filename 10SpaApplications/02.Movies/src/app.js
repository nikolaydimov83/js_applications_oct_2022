import { onMovieEdit } from "./filmEdit.js";
import { showAddMovie,onMovieAddSubmit } from "./onAddMovie.js";
import { container, loginForm, onLoad,signUpForm,applicationNav,addMovieBtn,addMovieForm, emptyContainer,editMovieForm  } from "./onLoad.js";
import { onLogin, onLogout } from "./onLogin.js";
import { onSignUp } from "./onSignUp.js";


loginForm.addEventListener('submit',onLogin);
signUpForm.addEventListener('submit',onSignUp);
addMovieForm.addEventListener('submit',onMovieAddSubmit)
editMovieForm.addEventListener('submit',onMovieEdit)

onLoad();

applicationNav.addEventListener('click',manageNavViews);
addMovieBtn.addEventListener('click',manageNavViews)


function manageNavViews(ev){
    ev.preventDefault();
    
    
    
    let viewsManager={
        'movies':onLoad,
        'login':loadLogin,
        'register':loadRegister,
        'welcome-msg':onLoad,
        'logout':onLogout,
        'add-movie-anchor':showAddMovie
    }
    if(viewsManager[ev.target.id]){
        emptyContainer();
        viewsManager[ev.target.id](ev)
        
    }else{
        console.log(ev.target.id)
    }
    
}



function loadLogin(ev){
    container.appendChild(loginForm);

    

}

function loadRegister(ev){
    container.appendChild(signUpForm);
}


