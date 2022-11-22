import { del, get, put } from '../api/api.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat,nothing } from '../lib.js';
import { getUserData } from '../utils.js';
import { errorHandler } from './errorHandler.js';

let memeEditTemplate=(data,submitEditForm)=>html`<section id="edit">
<div class="form">
  <h2>Edit Offer</h2>
  <form @submit=${submitEditForm} class="edit-form">
    <input
      type="text"
      name="title"
      id="job-title"
      placeholder="Title"
      .value=${data.title}
    />
    <input
      type="text"
      name="imageUrl"
      id="job-logo"
      placeholder="Company logo url"
      .value=${data.imageUrl}
    />
    <input
      type="text"
      name="category"
      id="job-category"
      placeholder="Category"
      .value=${data.category}
    />
    <textarea
      id="job-description"
      name="description"
      placeholder="Description"
      .value=${data.description}
      rows="4"
      cols="50"
    ></textarea>
    <textarea
      id="job-requirements"
      name="requirements"
      placeholder="Requirements"
      .value=${data.requirements}
      rows="4"
      cols="50"
    ></textarea>
    <input
      type="text"
      name="salary"
      id="job-salary"
      placeholder="Salary"
      .value=${data.salary}
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
        let data=await get(`/data/offers/${id}`);
        console.log(data);
        
        ctx.renderView(memeEditTemplate(data,submitEditForm));
    }catch(error){
        errorHandler(error);
    }

    async function submitEditForm(ev){
        ev.preventDefault();
        try {
            let data=loadFormData(ev.target);
            let serverResponseData=await put(`/data/offers/${outerCtx.params.shoesId}`,data);
            outerCtx.page.redirect(`/dashboard`)
            ev.target.reset();
        } catch (error) {
            errorHandler(error);
        }
    
    
    }

}