import { get } from '../api/api.js';
import { html,repeat } from '../lib.js';
import { getUserData } from '../utils.js';
import { errorHandler } from './errorHandler.js';

let catalogTemplate=(data,isLogged)=>html`<section id="catalogPage">
<h1>All Albums</h1>
${data.length>0?repeat(data,(album)=>album._id,(album)=>html`<div class="card-box">
    <img src=${album.imgUrl}>
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.artist}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="price">Price: $${album.price}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
        ${isLogged?html`<div class="btn-group">
            <a href="/dashboard/${album._id}" id="details">Details</a>
        </div>
    </div>
</div>`:''}`):html`<p>No Albums in Catalog!</p>`}

</section>`

export async function showCatalog(ctx){
    try{
        let data=await get('/data/albums?sortBy=_createdOn%20desc&distinct=name');
        let isLogged=getUserData()?true:false
        console.log(data)
        ctx.renderView(catalogTemplate(data,isLogged));
    }catch(error){
        errorHandler(error);
    }

}