import { render as litRender } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { showCatalog } from './views/catalog.js';
import { showCreateFurniture } from './views/create.js';
import { showDetails } from './views/details.js';
import { showEditFurniture } from './views/edit.js';

import { showLogin } from './views/login.js';
import { showMyFurniture } from './views/myFurniture.js';
import { isLogged, renderNav } from './views/navigation.js';
import { showRegister } from './views/register.js';

let container=document.querySelector('.container');

renderNav();
function render(templateResult){
    litRender(templateResult,container)
}

function decorateCtx(ctx,next){
ctx.render=render
ctx.renderNav=renderNav
ctx.showCatalog=showCatalog
ctx.isLogged=isLogged
next();
}

page(decorateCtx);
page('/login',showLogin);
page('/',showCatalog)
page('/catalog',showCatalog);
page('/catalog/:productId',showDetails);
page(`/create`,showCreateFurniture);
page(`/edit`,showEditFurniture);
page(`/my-furniture`,showMyFurniture);
page(`/register`,showRegister);

page.start();
