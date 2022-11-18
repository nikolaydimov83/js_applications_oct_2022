
import { del, get, put } from '../api/api.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat,nothing } from '../lib.js';
import { getUserData } from '../utils.js';
import { errorHandler } from './errorHandler.js';

let memeEditTemplate=(data,submitEditForm)=>html`<section id="edit-meme">
<form @submit=${submitEditForm} id="edit-form">
    <h1>Edit Meme</h1>
    <div class="container">
        <label for="title">Title</label>
        <input .value=${data.title} id="title" type="text" placeholder="Enter Title" name="title">
        <label for="description">Description</label>
        <textarea .value=${data.description} id="description" placeholder="Enter Description" name="description">
                Programming is often touted as a smart and lucrative career path.
                It's a job that (sometimes) offers flexibility and great benefits.
                But it's far from sunshine and Nyan Cat rainbows. The hours are long.
                The mistakes are frustrating. And your eyesight is almost guaranteed to suffer.
                These memes cover most of the frustration (and funny moments) of programming.
                At least we can laugh through the pain. 
            </textarea>
        <label for="imageUrl">Image Url</label>
        <input .value=${data.imageUrl} id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl">
        <input type="submit" class="registerbtn button" value="Edit Meme">
    </div>
</form>
</section>`
let outerCtx=null;
export async function showMemeEdit(ctx){
    try{
        outerCtx=ctx
        let id=ctx.params.memeId
        let data=await get(`/data/memes/${id}`);
        console.log(data);
        
        ctx.renderView(memeEditTemplate(data,submitEditForm));
    }catch(error){
        errorHandler(error);
    }

    async function submitEditForm(ev){
        ev.preventDefault();
        try {
            let data=loadFormData(ev.target);
            let serverResponseData=put(`/data/memes/${outerCtx.params.memeId}`,data);
            outerCtx.page.redirect('/memes')
            ev.target.reset();
        } catch (error) {
            errorHandler(error);
        }
    
    
    }

}

