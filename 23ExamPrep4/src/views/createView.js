import { get, post } from '../api/api.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat } from '../lib.js';
import { setUserData } from '../utils.js';
import { errorHandler } from './errorHandler.js';
//import { errorHandler } from './errorHandler.js';

let createTemplate=()=>html`<section id="create">
<div class="form">
  <h2>Create Offer</h2>
  <form @submit=${submitCreateForm} class="create-form">
    <input
      type="text"
      name="title"
      id="job-title"
      placeholder="Title"
    />
    <input
      type="text"
      name="imageUrl"
      id="job-logo"
      placeholder="Company logo url"
    />
    <input
      type="text"
      name="category"
      id="job-category"
      placeholder="Category"
    />
    <textarea
      id="job-description"
      name="description"
      placeholder="Description"
      rows="4"
      cols="50"
    ></textarea>
    <textarea
      id="job-requirements"
      name="requirements"
      placeholder="Requirements"
      rows="4"
      cols="50"
    ></textarea>
    <input
      type="text"
      name="salary"
      id="job-salary"
      placeholder="Salary"
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
        let serverResponseData=post('/data/offers',data)

        outerCtx.page.redirect('/dashboard')
        ev.target.reset();
    } catch (error) {
        errorHandler(error);
    }


}