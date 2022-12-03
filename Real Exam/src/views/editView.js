import { del, get, put } from '../api/api.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat,nothing } from '../lib.js';
import { getUserData } from '../utils.js';
//import { errorHandler } from './errorHandler.js';

let bookEditTemplate=(data,submitEditForm)=>html`      <section id="edit">
<div class="form">
  <h2>Edit Album</h2>
  <form @submit=${submitEditForm} class="edit-form">
    <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" .value=${data.singer} />
    <input type="text" name="album" id="album-album" placeholder="Album" .value=${data.album} />
    <input type="text" name="imageUrl" id="album-img" placeholder="Image url" .value=${data.imageUrl} />
    <input type="text" name="release" id="album-release" placeholder="Release date" .value=${data.release} />
    <input type="text" name="label" id="album-label" placeholder="Label" .value=${data.label} />
    <input type="text" name="sales" id="album-sales" placeholder="Sales" .value=${data.sales} />

    <button type="submit">post</button>
  </form>
</div>
</section>`
let outerCtx=null;
export async function showbookEdit(ctx){
    try{
        outerCtx=ctx
        let id=ctx.params.bookId
        let data=await get(`/data/albums/${id}`);
        console.log(data);
        
        ctx.renderView(bookEditTemplate(data,submitEditForm));
    }catch(error){
        errorHandler(error);
    }

    async function submitEditForm(ev){
        ev.preventDefault();
        try {
            let data=loadFormData(ev.target);
            let serverResponseData=put(`/data/albums/${outerCtx.params.bookId}`,data);
            outerCtx.page.redirect('/dashboard')
            ev.target.reset();
        } catch (error) {
            //errorHandler(error);
        }
    
    
    }

}

