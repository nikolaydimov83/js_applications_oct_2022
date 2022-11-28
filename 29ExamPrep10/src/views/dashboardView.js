import { get } from '../api/api.js';
import { html,repeat } from '../lib.js';
import { errorHandler } from './errorHandler.js';

let catalogTemplate=(data)=>html`<section id="car-listings">
<h1>Car Listings</h1>
<div class="listings">
${data.length>0?repeat(data,(car)=>car._id,(car)=>html`    <div class="listing">
        <div class="preview">
            <img src=${car.imageUrl}>
        </div>
        <h2>${car.brand} ${car.model}</h2>
        <div class="info">
            <div class="data-info">
                <h3>Year: ${car.year}</h3>
                <h3>Price: ${car.price} $</h3>
            </div>
            <div class="data-buttons">
                <a href="/dashboard/${car._id}" class="button-carDetails">Details</a>
            </div>
        </div>
    </div>`):html`<p class="no-cars">No cars in database.</p>`}
    <!-- Display all records -->



    <!-- Display if there are no records -->
    
</div>
</section>`

export async function showCatalog(ctx){
    try{
        let data=await get('/data/cars?sortBy=_createdOn%20desc');
        console.log(data)
        ctx.renderView(catalogTemplate(data));
    }catch(error){
        errorHandler(error);
    }

}