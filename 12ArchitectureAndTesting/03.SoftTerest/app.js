import { gotoCreate } from "./createView.js";
import { gotoDashboard } from "./dashBoardView.js";
import { gotoDetails } from "./detailsView.js";
import { renderNav,renderView,renderIdea,renderIdeaDetail } from "./dom.js";
import { gotoHomepage } from "./homeView.js";
import { gotoLogin, gotoLogout } from "./loginView.js";
import { gotoRegister } from "./registerView.js";

let navBar=document.querySelector('.container');
navBar.addEventListener('click',navBarClicked)
let services={
    '':gotoHomepage,
    'Dashboard':gotoDashboard,
    'Create':gotoCreate,
    'Logout':gotoLogout,
    'Login':gotoLogin,
    'Register':gotoRegister,
    'Details':gotoDetails


}

renderNav();
goTo('');

function navBarClicked(ev){
let viewName=ev.target.textContent;
if (ev.target.tagName==='A'||ev.target.tagName==='IMG'){
    if(goTo(viewName)){
        ev.preventDefault()
    }
}
}

function goTo(viewName,id){
const view=services[viewName]
if(typeof view==`function`){
    view({renderView,goTo,renderNav,renderIdea,id:id,renderIdeaDetail})
return true
}else{
    return false
}
}