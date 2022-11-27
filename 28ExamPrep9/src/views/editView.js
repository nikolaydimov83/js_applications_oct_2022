import { del, get, put } from '../api/api.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat,nothing } from '../lib.js';
import { getUserData } from '../utils.js';
import { errorHandler } from './errorHandler.js';

let memeEditTemplate=(data,submitEditForm)=>html`<section class="editPage">
<form @submit=${submitEditForm}>
    <fieldset>
        <legend>Edit Album</legend>

        <div class="container">
            <label for="name" class="vhide">Album name</label>
            <input id="name" .value=${data.name} name="name" class="name" type="text">

            <label for="imgUrl" class="vhide">Image Url</label>
            <input id="imgUrl" .value=${data.imgUrl} name="imgUrl" class="imgUrl" type="text">

            <label for="price" class="vhide">Price</label>
            <input id="price" .value=${data.price} name="price" class="price" type="text">

            <label for="releaseDate" class="vhide">Release date</label>
            <input id="releaseDate" .value=${data.releaseDate} name="releaseDate" class="releaseDate" type="text">

            <label for="artist" class="vhide">Artist</label>
            <input id="artist" .value=${data.artist} name="artist" class="artist" type="text">

            <label for="genre" class="vhide">Genre</label>
            <input id="genre" .value=${data.genre} name="genre" class="genre" type="text">

            <label for="description" class="vhide">Description</label>
            <textarea .value=${data.description} name="description" class="description" rows="10"
                cols="10"></textarea>

            <button class="edit-album" type="submit">Edit Album</button>
        </div>
    </fieldset>
</form>
</section>`
let outerCtx=null;
export async function showMemeEdit(ctx){
    try{
        outerCtx=ctx
        let id=ctx.params.shoesId
        let data=await get(`/data/albums/${id}`);
        console.log(data);
        
        ctx.renderView(memeEditTemplate(data,submitEditForm));
    }catch(error){
        errorHandler(error);
    }

    async function submitEditForm(ev){
        ev.preventDefault();
        try {
            let data=loadFormData(ev.target);
            let serverResponseData=await put(`/data/albums/${outerCtx.params.shoesId}`,data);
            outerCtx.page.redirect(`/dashboard/${outerCtx.params.shoesId}`)
            ev.target.reset();
        } catch (error) {
            errorHandler(error);
        }
    
    
    }

}