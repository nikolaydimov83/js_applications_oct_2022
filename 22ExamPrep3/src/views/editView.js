import { del, get, put } from '../api/api.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat,nothing } from '../lib.js';
import { getUserData } from '../utils.js';
import { errorHandler } from './errorHandler.js';

let memeEditTemplate=(data,submitEditForm)=>html`<section id="edit">
<div class="form">
  <h2>Edit item</h2>
  <form @submit=${submitEditForm} class="edit-form">
    <input
      type="text"
      name="brand"
      id="shoe-brand"
      placeholder="Brand"
      .value=${data.brand}
    />
    <input
      type="text"
      name="model"
      id="shoe-model"
      placeholder="Model"
      .value=${data.model}
    />
    <input
      type="text"
      name="imageUrl"
      id="shoe-img"
      placeholder="Image url"
      .value=${data.imageUrl}
    />
    <input
      type="text"
      name="release"
      id="shoe-release"
      placeholder="Release date"
      .value=${data.release}
    />
    <input
      type="text"
      name="designer"
      id="shoe-designer"
      placeholder="Designer"
      .value=${data.designer}
    />
    <input
      type="text"
      name="value"
      id="shoe-value"
      placeholder="Value"
      .value=${data.value}

    />

    <button type="submit">post</button>
  </form>
</div>
</section>`
let outerCtx=null;
export async function showMemeEdit(ctx){
    try{
        outerCtx=ctx
        let id=ctx.params.shoesId
        let data=await get(`/data/shoes/${id}`);
        console.log(data);
        
        ctx.renderView(memeEditTemplate(data,submitEditForm));
    }catch(error){
        errorHandler(error);
    }

    async function submitEditForm(ev){
        ev.preventDefault();
        try {
            let data=loadFormData(ev.target);
            let serverResponseData=await put(`/data/shoes/${outerCtx.params.shoesId}`,data);
            outerCtx.page.redirect(`/dashboard/${outerCtx.params.shoesId}`)
            ev.target.reset();
        } catch (error) {
            errorHandler(error);
        }
    
    
    }

}