import { get, post } from '../api/api.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat } from '../lib.js';
import { setUserData } from '../utils.js';
import { errorHandler } from './errorHandler.js';
//import { errorHandler } from './errorHandler.js';

let createTemplate=()=>html`        <section id="createPage">
<form @submit=${submitCreateForm} class="create-form">
    <h1>Create Theater</h1>
    <div>
        <label for="title">Title:</label>
        <input id="title" name="title" type="text" placeholder="Theater name" value="">
    </div>
    <div>
        <label for="date">Date:</label>
        <input id="date" name="date" type="text" placeholder="Month Day, Year">
    </div>
    <div>
        <label for="author">Author:</label>
        <input id="author" name="author" type="text" placeholder="Author">
    </div>
    <div>
        <label for="description">Description:</label>
        <textarea id="description" name="description" placeholder="Description"></textarea>
    </div>
    <div>
        <label for="imageUrl">Image url:</label>
        <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url" value="">
    </div>
    <button class="btn" type="submit">Submit</button>
</form>
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
        let serverResponseData=post('/data/theaters',data)

        outerCtx.page.redirect('/')
        ev.target.reset();
    } catch (error) {
        errorHandler(error);
    }


}