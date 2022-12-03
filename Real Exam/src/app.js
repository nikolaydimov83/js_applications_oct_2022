
import { logout } from "./api/users.js";
import { page,render } from "./lib.js";
import { getUserData } from "./utils.js";
import { showbookDetails } from "./views/bookDetailsView.js";
import { showCreate } from "./views/createView.js";
import { showdashBoard } from "./views/dashboardView.js";
import { showbookEdit } from "./views/editView.js";
import { showHome } from "./views/homeView.js";
import { showLogin } from "./views/loginView.js";
import { showMyBooks } from "./views/myBooksView.js";
import { showRegister } from "./views/registerView.js";


let main=document.querySelector('main');
let user=document.querySelector('.user');
let guest=document.querySelector('.guest');
let logoutA=user.querySelectorAll('a')[1];
logoutA.addEventListener('click',logoutUser);
//document.getElementById('notifications').style.display='none';
renderNav();

page(decorateCtx);
page('/dashboard',showdashBoard);
page('/dashBoard/:bookId',showbookDetails);
page('/create',showCreate);
/*page('/profile',showMyProfile);*/
page('/login',showLogin);
page('/register',showRegister);
page('/myBooks',showMyBooks);
page('/edit/:bookId',showbookEdit);
page('/',showHome);
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
    page.redirect('/dashboard')

}

function renderNav(){

if(getUserData()){
    user.style.display='';
    guest.style.display='none';
    //user.querySelector('span').textContent=`Welcome, ${getUserData().email}`;
}else{
    user.style.display='none';
    guest.style.display=''
}

}