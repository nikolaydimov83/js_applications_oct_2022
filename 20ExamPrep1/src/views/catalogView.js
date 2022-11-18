import { get } from '../api/api.js';
import { html,repeat } from '../lib.js';
import { errorHandler } from './errorHandler.js';

let catalogTemplate=(data)=>html`<section id="meme-feed">
<h1>All Memes</h1>
<div id="memes">
    ${data.length>0?repeat(data,meme=>meme._id,(meme=>html`<div class="meme">
        <div class="card">
            <div class="info">
                <p class="meme-title">${meme.title}</p>
                <img class="meme-image"  alt="meme-img" src=${meme.imageUrl}>
            </div>
            <div id="data-buttons">
                <a class="button" href="/memes/${meme._id}">Details</a>
            </div>
        </div>
    </div>`)):html`<p class="no-memes">No memes in database.</p>`}


    <!-- Display : If there are no memes in database -->
    
</div>
</section>`

export async function showCatalog(ctx){
    try{
        let data=await get('/data/memes?sortBy=_createdOn%20desc');
        console.log(data)
        ctx.renderView(catalogTemplate(data));
    }catch(error){
        errorHandler(error);
    }

}