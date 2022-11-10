import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { countTeamMembers, showBrowse } from './views/browse.js';
import { showCreate } from './views/create.js';
import { showTeamDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { showHome } from './views/home.js';
import { showLogin } from './views/login.js';
import { isLogged, renderNav } from './views/navigation.js';
import { showRegister } from './views/register.js';

renderNav();

let container=document.querySelector("main")
function renderView(template){
    render(template,container)
}

function decorateCtx(ctx,next){
ctx.renderNav=renderNav;
ctx.renderView=renderView;
ctx.isLogged=isLogged;
ctx.countTeamMembers=countTeamMembers
next();
}

page(decorateCtx)

page(`/register`,showRegister);
page('/login',showLogin);
page('/',showHome);
page('/browse',showBrowse);
page('/browse/:teamId',showTeamDetails)
page('/create',showCreate);
page(`/edit`,showEdit)



page.start()

page.redirect('/')