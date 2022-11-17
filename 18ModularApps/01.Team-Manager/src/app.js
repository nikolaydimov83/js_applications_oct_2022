import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { parseQueryString } from './data/utils.js';
import { countTeamMembers, showBrowse } from './views/browse.js';
import { showBrowseMyTeams } from './views/browseMyTeams.js';
import { showCreate } from './views/create.js';
import { showTeamDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { renderNonFormError } from './views/errors.js';
import { showHome } from './views/home.js';
import { showLogin } from './views/login.js';
import { isLogged, renderNav } from './views/navigation.js';
import { showRegister } from './views/register.js';
import { approveMember, removeMember } from './views/teamOperations.js';

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
ctx.renderNonFormError=renderNonFormError
next();
}

page(decorateCtx)
page(parseQueryString)

page(`/register`,showRegister);
page('/login',showLogin);
page('/',showHome);
page('/browse',showBrowse);
page('/browse/:teamId',showTeamDetails);
page(`/browse/:teamId/removeMember/:userId`,removeMember);
page(`/browse/:teamId/approveMember/:userId`,approveMember);
page('/create',showCreate);
page(`/edit`,showEdit)
page(`/myTeams`,showBrowseMyTeams)



page.start()

page.redirect('/')