import { get, post } from '../api/api.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat } from '../lib.js';
import { getUserData, setUserData } from '../utils.js';
import { errorHandler } from './errorHandler.js';
//import { errorHandler } from './errorHandler.js';

let searchTemplate=(searchResult,callerIsForm)=>html`<section id="search-cars">
<h1>Filter by year</h1>

<div class="container">
    <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
    <button @click=${submitsearchForm} class="button-list">Search</button>
</div>

${callerIsForm?html`<h2>Results:</h2>
<div class="listings">

    ${searchResult.length>0?repeat(searchResult,(car)=>car._id,(car)=>html`    <div class="listing">
        <div class="preview">
            <img src=${car.imageUrl}>
        </div>
        <h2>${car.brand} ${car.model}</h2>
        <div class="info">
            <div class="data-info">
                <h3>Year: ${car.year}</h3>
                <h3>Price: ${car.price} $</h3>
            </div>
            <div class="data-buttons">
                <a href="/dashboard/${car._id}" class="button-carDetails">Details</a>
            </div>
        </div>
    </div>`):html` <p class="no-cars"> No results.</p>`}
   
</div>`:``}

    <!-- Display if there are no matches -->

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
    //ev.preventDefault();
    let isLogged=getUserData();
    try {
        let fieldValue=ev.target.parentElement.children[0].value;
        if (fieldValue===''){
          throw new Error('Wrong input');
        }
        let data={search:fieldValue}
        let serverResponseData=await get(`/data/cars?where=year%3D${data.search}`)
        outerCtx.renderView(searchTemplate(serverResponseData,true));
        
        //ev.target.reset();
    } catch (error) {
        errorHandler(error);
    }


}