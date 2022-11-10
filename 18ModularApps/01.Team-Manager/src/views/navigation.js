import { html,render } from '../../node_modules/lit-html/lit-html.js';
import { endPoints, errorHandler,getDataFromServer } from '../data/api.js';


let navigationTemplate=()=>html`<a href="/" class="site-logo">Team Manager</a>
<nav>
    <a href="/browse" class="action">Browse Teams</a>
    <a style=${isLogged()?'display:none':''} href="/login" class="action">Login</a>
    <a style=${isLogged()?'display:none':''} href="/register" class="action">Register</a>
    <a style=${isLogged()?'':'display:none'} href="myTeams" class="action">My Teams</a>
    <a @click=${logoutUser} style=${isLogged()?'':'display:none'} class="action">Logout</a>
</nav>`

export function isLogged(){
if (JSON.parse(sessionStorage.getItem('userData'))){
    return true
}else{
    return false
}

}

export function renderNav(){
render(navigationTemplate(),document.querySelector("#titlebar"))
}

async function logoutUser(ev){
    try {
        await getDataFromServer(endPoints.logout,JSON.parse(sessionStorage.getItem("userData")).accessToken)
        sessionStorage.removeItem("userData");
        renderNav();
    } catch (error) {
       errorHandler(error)
        sessionStorage.removeItem("userData");
        renderNav();
    }
}