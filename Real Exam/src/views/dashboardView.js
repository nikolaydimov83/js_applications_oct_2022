import { get } from '../api/api.js';
import { html,repeat } from '../lib.js';
import { getUserData } from '../utils.js';
//import { errorHandler } from './errorHandler.js';

let catalogTemplate=(data,isLogged)=>html`<section id="dashboard">
<h2>Albums</h2>
${data.length>0?html`<ul class="card-wrapper">${repeat(data,(album)=>album._id,(album)=>html`<li class="card">
    <img src=${album.imageUrl} />
    <p>
      <strong>Singer/Band: </strong><span class="singer">${album.singer}</span>
    </p>
    <p>
      <strong>Album name: </strong><span class="album">${album.album}</span>
    </p>
    <p><strong>Sales:</strong><span class="sales">${album.sales}</span></p>
    <a class="details-btn" href="/dashboard/${album._id}">Details</a>
  </li>`)}</ul>`:html`<h2>There are no albums added yet.</h2>`}
  <!-- Display a li with information about every post (if any)-->
  



<!-- Display an h2 if there are no posts -->

</section>`

export async function showdashBoard(ctx){
    try{
        let data=await get('/data/albums?sortBy=_createdOn%20desc');
        console.log(data);
        let isLogged=getUserData();
        console.log(isLogged)
        ctx.renderView(catalogTemplate(data,isLogged));
    }catch(error){
        errorHandler(error);
    }

}

//${isLogged? html`<a class="button" href="dashboard/${book._id}">Details</a>`:''}