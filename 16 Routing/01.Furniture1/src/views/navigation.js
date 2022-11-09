import { html,render } from '../../node_modules/lit-html/lit-html.js';
import { errorHandler, getDataFromServer } from '../data/api.js';


export function isLogged(){
    if (sessionStorage.getItem('userData')){
        return true
    }else{
        return false
    }
}



function setNavigationVisibility(){
    if (isLogged()){
    return {user:'display:""',guest:'display:none'}
}else{
    return {user:'display:none',guest:'display:""'}    
}
}


let navigationTemplate=()=>html`<h1><a href="/">Furniture Store</a></h1>
<nav><div>
    <a id="catalogLink" href="/catalog" class="active">Dashboard</a>
</div>
    
    <div id="user" style=${setNavigationVisibility().user}>
        <a id="createLink" href="/create" >Create Furniture</a>
        <a id="profileLink" href="/my-furniture" >My Publications</a>
        <a @click=${logoutUser} id="logoutBtn" href="javascript:void(0)">Logout</a>
    </div>
    <div id="guest" style=${setNavigationVisibility().guest}>
        <a id="loginLink" href="/login">Login</a>
        <a id="registerLink" href="/register">Register</a>
    </div>
</nav>`

export function renderNav(){
    render(navigationTemplate(),document.querySelector('header'));
}

async function logoutUser(){
    try {
        await getDataFromServer('users/logout',JSON.parse(sessionStorage.getItem("userData")).accessToken)
        sessionStorage.removeItem("userData");
        renderNav();
    } catch (error) {
        errorHandler(error)
    }
}
