import { render as litRender } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';
import { showCatalog } from './views/catalog.js';
import { showCreateFurniture } from './views/create.js';
import { showDetails } from './views/details.js';

import { showLogin } from './views/login.js';

let container=document.querySelector('.container');


function render(templateResult){
    litRender(templateResult,container)
}

function decorateCtx(ctx,next){
ctx.render=render
next();
}

page(decorateCtx);
page('/login',showLogin);
page('/catalog',showCatalog);
page('/catalog/:productId',showDetails);
page(`/create`,showCreateFurniture);

page.start();
