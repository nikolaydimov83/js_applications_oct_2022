import { get, post } from '../api/api.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat } from '../lib.js';
import { getUserData, setUserData } from '../utils.js';
import { errorHandler } from './errorHandler.js';
//import { errorHandler } from './errorHandler.js';

let searchTemplate=(searchResult,callerIsForm,isLogged)=>html`<section id="search">
<h2>Search by Brand</h2>

<form @submit=${submitsearchForm} class="search-wrapper cf">
  <input
    id="#search-input"
    type="text"
    name="search"
    placeholder="Search here..."
    required
  />
  <button type="submit">Search</button>
</form>

<h3>Results:</h3>

${(callerIsForm)?html`
<div id="search-container">
  ${(searchResult.length>0)?repeat(searchResult,(shoes)=>shoes._id,(shoes)=>html`<ul class="card-wrapper">
    <!-- Display a li with information about every post (if any)-->
    <li class="card">
      <img src=${shoes.imageUrl} alt="travis" />
      <p>
        <strong>Brand: </strong><span class="brand">${shoes.brand}</span>
      </p>
      <p>
        <strong>Model: </strong
        ><span class="model">${shoes.model}</span>
      </p>
      <p><strong>Value:</strong><span class="value">${shoes.value}</span>$</p>
      ${isLogged?html`<a class="details-btn" href="/dashboard/${shoes._id}">Details</a>`:''}
    </li>
  </ul>`):html`<h2>There are no results found.</h2>`}

  <!-- Display an h2 if there are no posts -->
  <!-- <h2>There are no results found.</h2> -->
</div>`:``}

</section>`
let outerCtx=null;
export async function showsearch(ctx){
    outerCtx=ctx
    try{
        ctx.renderView(searchTemplate());
    }catch(error){
        errorHandler(error);
    }

}

async function submitsearchForm(ev){
    ev.preventDefault();
    let isLogged=getUserData();
    try {
        let data=loadFormData(ev.target);
        let serverResponseData=await get(`/data/shoes?where=brand%20LIKE%20%22${data.search}%22`)
        outerCtx.renderView(searchTemplate(serverResponseData,true,isLogged));
        
        ev.target.reset();
    } catch (error) {
        errorHandler(error);
    }


}