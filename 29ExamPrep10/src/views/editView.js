import { del, get, put } from '../api/api.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat,nothing } from '../lib.js';
import { getUserData } from '../utils.js';
import { errorHandler } from './errorHandler.js';

let memeEditTemplate=(data,submitEditForm)=>html`<section id="edit-listing">
<div class="container">

    <form @submit=${submitEditForm} id="edit-form">
        <h1>Edit Car Listing</h1>
        <p>Please fill in this form to edit an listing.</p>
        <hr>

        <p>Car Brand</p>
        <input type="text" placeholder="Enter Car Brand" name="brand" .value=${data.brand}>

        <p>Car Model</p>
        <input type="text" placeholder="Enter Car Model" name="model" .value=${data.model}>

        <p>Description</p>
        <input type="text" placeholder="Enter Description" name="description" .value=${data.description}>

        <p>Car Year</p>
        <input type="number" placeholder="Enter Car Year" name="year" .value=${data.year}>

        <p>Car Image</p>
        <input type="text" placeholder="Enter Car Image" name="imageUrl" .value=${data.imageUrl}>

        <p>Car Price</p>
        <input type="number" placeholder="Enter Car Price" name="price" .value=${data.price}>

        <hr>
        <input type="submit" class="registerbtn" value="Edit Listing">
    </form>
</div>
</section>`
let outerCtx=null;
export async function showMemeEdit(ctx){
    try{
        outerCtx=ctx
        let id=ctx.params.shoesId
        let data=await get(`/data/cars/${id}`);
        console.log(data);
        
        ctx.renderView(memeEditTemplate(data,submitEditForm));
    }catch(error){
        errorHandler(error);
    }

    async function submitEditForm(ev){
        ev.preventDefault();
        try {
            let data=loadFormData(ev.target);
            data.year=Number(data.year);
            data.price=Number(data.price)
            let serverResponseData=await put(`/data/cars/${outerCtx.params.shoesId}`,data);

            outerCtx.page.redirect(`/dashboard`)
            ev.target.reset();
        } catch (error) {
            errorHandler(error);
        }
    
    
    }

}