import { get, post } from '../api/api.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat } from '../lib.js';
import { setUserData } from '../utils.js';
//import { errorHandler } from './errorHandler.js';

let createTemplate=()=>html`      <section id="create">
<div class="form">
  <h2>Add Album</h2>
  <form @submit=${submitCreateForm} class="create-form">
    <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
    <input type="text" name="album" id="album-album" placeholder="Album" />
    <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
    <input type="text" name="release" id="album-release" placeholder="Release date" />
    <input type="text" name="label" id="album-label" placeholder="Label" />
    <input type="text" name="sales" id="album-sales" placeholder="Sales" />

    <button type="submit">post</button>
  </form>
</div>
</section>`
let outerCtx=null;
export async function showCreate(ctx){
    outerCtx=ctx
    try{
        ctx.renderView(createTemplate());
    }catch(error){
        errorHandler(error);
    }

}

async function submitCreateForm(ev){
    ev.preventDefault();
    try {
        let data=loadFormData(ev.target);
        let serverResponseData=post('/data/albums',data)

        outerCtx.page.redirect('/dashboard')
        ev.target.reset();
    } catch (error) {
        errorHandler(error);
    }


}