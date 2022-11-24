import { get } from '../api/api.js';
import { html,repeat } from '../lib.js';
import { errorHandler } from './errorHandler.js';

let catalogTemplate=(data)=>html`<section id="dashboard">
<h2 class="dashboard-title">Services for every animal</h2>
<div class="animals-dashboard">
${data.length>0?repeat(data,(pet)=>pet._id,(pet)=>html`
<div class="animals-board">
        <article class="service-img">
            <img class="animal-image-cover" src=${pet.image}>
        </article>
        <h2 class="name">${pet.name}</h2>
        <h3 class="breed">${pet.breed}</h3>
        <div class="action">
            <a class="btn" href="/dashboard/${pet._id}">Details</a>
        </div>
    </div>`):html`<div>
        <p class="no-pets">No pets in dashboard</p>
    </div>`}

    
    <!--If there is no pets in dashboard-->

</div>
</section>`
/*{
  name,
  breed,
  age,
  weight,
  image
}
*/
export async function showCatalog(ctx){
    try{
        let data=await get('/data/pets?sortBy=_createdOn%20desc&distinct=name');
        console.log(data)
        ctx.renderView(catalogTemplate(data));
    }catch(error){
        errorHandler(error);
    }

}