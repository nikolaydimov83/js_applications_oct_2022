import { get } from '../api/api.js';
import { html,repeat } from '../lib.js';
import { errorHandler } from './errorHandler.js';

let catalogTemplate=(data)=>html`<section id="catalog-page">
<h1>All Games</h1>
<!-- Display div: with information about every game (if any) -->
${data.length>0?repeat(data,(game)=>game._id,(game)=>html`<div class="allGames">
    <div class="allGames-info">
        <img src=${game.imageUrl}>
        <h6>${game.category}</h6>
        <h2>${game.title}</h2>
        <a href="/dashboard/${game._id}" class="details-button">Details</a>
    </div>

</div>`):html`<h3 class="no-articles">No articles yet</h3>`}


<!-- Display paragraph: If there is no games  -->

</section>`

export async function showCatalog(ctx){
    try{
        let data=await get('/data/games?sortBy=_createdOn%20desc');
        console.log(data)
        ctx.renderView(catalogTemplate(data));
    }catch(error){
        errorHandler(error);
    }

}