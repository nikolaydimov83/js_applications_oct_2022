import { del, get, put } from '../api/api.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat,nothing } from '../lib.js';
import { getUserData } from '../utils.js';
import { errorHandler } from './errorHandler.js';

let memeEditTemplate=(data,submitEditForm)=>html`<section id="editPage">
<form @submit=${submitEditForm} class="theater-form">
    <h1>Edit Theater</h1>
    <div>
        <label for="title">Title:</label>
        <input id="title" name="title" type="text" placeholder="Theater name" .value=${data.title}>
    </div>
    <div>
        <label for="date">Date:</label>
        <input id="date"  name="date" type="text" placeholder="Month Day, Year" .value=${data.date}>
    </div>
    <div>
        <label for="author">Author:</label>
        <input id="author" name="author" type="text" placeholder="Author"
        .value=${data.author}>
    </div>
    <div>
        <label for="description">Theater Description:</label>
        <textarea id="description" name="description"
            .value=${data.description} ></textarea>
    </div>
    <div>
        <label for="imageUrl">Image url:</label>
        <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url"
        .value=${data.imageUrl}>
    </div>
    <button class="btn" type="submit">Submit</button>
</form>
</section>`
let outerCtx=null;
export async function showMemeEdit(ctx){
    try{
        outerCtx=ctx
        let id=ctx.params.shoesId
        let data=await get(`/data/theaters/${id}`);
        console.log(data);
        
        ctx.renderView(memeEditTemplate(data,submitEditForm));
    }catch(error){
        errorHandler(error);
    }

    async function submitEditForm(ev){
        ev.preventDefault();
        try {
            let data=loadFormData(ev.target);
            let serverResponseData=await put(`/data/theaters/${outerCtx.params.shoesId}`,data);
            outerCtx.page.redirect(`/dashboard/${outerCtx.params.shoesId}`)
            ev.target.reset();
        } catch (error) {
            errorHandler(error);
        }
    
    
    }

}