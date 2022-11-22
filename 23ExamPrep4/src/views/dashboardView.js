import { get } from '../api/api.js';
import { html,repeat } from '../lib.js';
import { errorHandler } from './errorHandler.js';

let catalogTemplate=(data)=>html`<section id="dashboard">
<h2>Job Offers</h2>
${data.length===0?html`<h2>No offers yet.</h2>`:repeat(data,(offer)=>offer._id,(offer)=>html`<div class="offer">
  <img src=${offer.imageUrl} alt="example1" />
  <p>
    <strong>Title: </strong><span class="title">${offer.title}</span>
  </p>
  <p><strong>Salary:</strong><span class="salary">${offer.salary}</span></p>
  <a class="details-btn" href="/dashboard/${offer._id}">Details</a>
</div>`)}
<!-- Display a div with information about every post (if any)-->



<!-- Display an h2 if there are no posts -->

</section>`

export async function showCatalog(ctx){
    try{
        let data=await get('/data/offers?sortBy=_createdOn%20desc');
        console.log(data)
        ctx.renderView(catalogTemplate(data));
    }catch(error){
        errorHandler(error);
    }

}