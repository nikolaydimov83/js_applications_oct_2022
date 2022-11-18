
import { logout } from "./api/users.js";
import { page,render } from "./lib.js";
import { getUserData } from "./utils.js";
import { showCatalog } from "./views/catalogView.js";
import { showCreate } from "./views/createView.js";
import { showHome } from "./views/homeView.js";
import { showLogin } from "./views/loginView.js";
import { showMemeDetails } from "./views/memeDetailsView.js";
import { showMemeEdit } from "./views/memeEditView.js";
import { showMyProfile } from "./views/myProfileView.js";
import { showRegister } from "./views/registerView.js";
let main=document.querySelector('main');
let user=document.querySelector('.user');
let guest=document.querySelector('.guest');
let logoutA=user.querySelectorAll('a')[2];
logoutA.addEventListener('click',logoutUser);
//document.getElementById('notifications').style.display='none';
renderNav();

page(decorateCtx);
page('/memes',showCatalog);
page('/memes/:memeId',showMemeDetails);
page('/create',showCreate);
page('/profile',showMyProfile);
page('/login',showLogin);
page('/register',showRegister);
page('/',showHome);
page('/edit/:memeId',showMemeEdit);
page.start();

function decorateCtx(ctx,next){
  
    ctx.renderView=renderView;
    ctx.renderNav=renderNav;
    next();
}

function renderView(template){
    render(template,main)
}

function logoutUser(ev){
    logout();
    renderNav();
    page.redirect('/')

}

function renderNav(){

if(getUserData()){
    user.style.display='';
    guest.style.display='none';
    user.querySelector('span').textContent=`Welcome, ${getUserData().email}`;
}else{
    user.style.display='none';
    guest.style.display=''
}

}