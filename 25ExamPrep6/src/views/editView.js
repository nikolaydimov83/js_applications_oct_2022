import { del, get, put } from '../api/api.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat,nothing } from '../lib.js';
import { getUserData } from '../utils.js';
import { errorHandler } from './errorHandler.js';

let memeEditTemplate=(data,submitEditForm)=>html`<section id="editPage">
<form @submit=${submitEditForm} class="editForm">
    <img src="./images/editpage-dog.jpg">
    <div>
        <h2>Edit PetPal</h2>
        <div class="name">
            <label for="name">Name:</label>
            <input .value=${data.name} name="name" id="name" type="text" value="Max">
        </div>
        <div class="breed">
            <label for="breed">Breed:</label>
            <input .value=${data.breed} name="breed" id="breed" type="text" value="Shiba Inu">
        </div>
        <div class="Age">
            <label for="age">Age:</label>
            <input .value=${data.age} name="age" id="age" type="text" value="2 years">
        </div>
        <div class="weight">
            <label for="weight">Weight:</label>
            <input .value=${data.weight} name="weight" id="weight" type="text" value="5kg">
        </div>
        <div class="image">
            <label for="image">Image:</label>
            <input .value=${data.image} name="image" id="image" type="text" value="./image/dog.jpeg">
        </div>
        <button class="btn" type="submit">Edit Pet</button>
    </div>
</form>
</section>`
let outerCtx=null;
export async function showMemeEdit(ctx){
    try{
        outerCtx=ctx
        let id=ctx.params.shoesId
        let data=await get(`/data/pets/${id}`);
        console.log(data);
        
        ctx.renderView(memeEditTemplate(data,submitEditForm));
    }catch(error){
        errorHandler(error);
    }

    async function submitEditForm(ev){
        ev.preventDefault();
        try {
            let data=loadFormData(ev.target);
            let serverResponseData=await put(`/data/pets/${outerCtx.params.shoesId}`,data);
            outerCtx.page.redirect(`/dashboard/${outerCtx.params.shoesId}`)
            ev.target.reset();
        } catch (error) {
            errorHandler(error);
        }
    
    
    }

}