import { del, get, put } from '../api/api.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat,nothing } from '../lib.js';
import { getUserData } from '../utils.js';
import { errorHandler } from './errorHandler.js';

let memeEditTemplate=(data,submitEditForm)=>html`<section id="edit-page" class="auth">
<form @submit=${submitEditForm} id="edit">
    <div class="container">

        <h1>Edit Game</h1>
        <label for="leg-title">Legendary title:</label>
        <input type="text" id="title" .value=${data.title} name="title" value="">

        <label for="category">Category:</label>
        <input type="text" id="category" .value=${data.category} name="category" value="">

        <label for="levels">MaxLevel:</label>
        <input type="number" id="maxLevel" .value=${data.maxLevel} name="maxLevel" min="1" value="">

        <label for="game-img">Image:</label>
        <input type="text" id="imageUrl" .value=${data.imageUrl} name="imageUrl" value="">

        <label for="summary">Summary:</label>
        <textarea .value=${data.summary} name="summary" id="summary"></textarea>
        <input class="btn submit" type="submit" value="Edit Game">

    </div>
</form>
</section>`
let outerCtx=null;
export async function showMemeEdit(ctx){
    try{
        outerCtx=ctx
        let id=ctx.params.shoesId
        let data=await get(`/data/games/${id}`);
        console.log(data);
        
        ctx.renderView(memeEditTemplate(data,submitEditForm));
    }catch(error){
        errorHandler(error);
    }

    async function submitEditForm(ev){
        ev.preventDefault();
        try {
            let data=loadFormData(ev.target);
            let serverResponseData=await put(`/data/games/${outerCtx.params.shoesId}`,data);
            outerCtx.page.redirect(`/dashboard/${data._id}`)
            ev.target.reset();
        } catch (error) {
            errorHandler(error);
        }
    
    
    }

}