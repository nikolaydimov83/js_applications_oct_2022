import { get, post } from '../api/api.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat } from '../lib.js';
import { setUserData } from '../utils.js';
import { errorHandler } from './errorHandler.js';
//import { errorHandler } from './errorHandler.js';

let createTemplate=()=>html`<section id="create">
<div class="form">
  <h2>Add item</h2>
  <form @submit=${submitCreateForm} class="create-form">
    <input
      type="text"
      name="brand"
      id="shoe-brand"
      placeholder="Brand"
    />
    <input
      type="text"
      name="model"
      id="shoe-model"
      placeholder="Model"
    />
    <input
      type="text"
      name="imageUrl"
      id="shoe-img"
      placeholder="Image url"
    />
    <input
      type="text"
      name="release"
      id="shoe-release"
      placeholder="Release date"
    />
    <input
      type="text"
      name="designer"
      id="shoe-designer"
      placeholder="Designer"
    />
    <input
      type="text"
      name="value"
      id="shoe-value"
      placeholder="Value"
    />

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
        let serverResponseData=post('/data/shoes',data)

        outerCtx.page.redirect('/dashboard')
        ev.target.reset();
    } catch (error) {
        errorHandler(error);
    }


}