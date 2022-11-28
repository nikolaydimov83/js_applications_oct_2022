import { get } from '../api/api.js';
import { html,repeat } from '../lib.js';
import { getUserData } from '../utils.js';
import { errorHandler } from './errorHandler.js';

let catalogTemplate=(data)=>html`<section id="my-listings">
<h1>My car listings</h1>
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
    </div>`):html` <p class="no-cars"> You haven't listed any cars yet.</p>`}<!-- Display all records -->


    <!-- Display if there are no records -->
   
</div>
</section>`

export async function showMyCars(ctx){
    try{
        let userId=getUserData()._id
        let data=await get(`/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
        console.log(data)
        ctx.renderView(catalogTemplate(data));
    }catch(error){
        errorHandler(error);
    }

}