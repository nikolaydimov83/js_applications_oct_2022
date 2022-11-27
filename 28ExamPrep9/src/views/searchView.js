import { get, post } from '../api/api.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat } from '../lib.js';
import { getUserData, setUserData } from '../utils.js';
import { errorHandler } from './errorHandler.js';
//import { errorHandler } from './errorHandler.js';

let searchTemplate=(searchResult,callerIsForm,isLogged)=>html`<section id="searchPage">
<h1>Search by Name</h1>

<div class="search">
    <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
    <button @click=${submitsearchForm} class="button-list">Search</button>
</div>

<h2>Results:</h2>

<!--Show after click Search button-->
${callerIsForm?html`
<div class="search-result">
    <!--If have matches-->
    ${searchResult.length>0?repeat(searchResult,(album)=>album._id,(album)=>html`<div class="card-box">
        <img src=${album.imgUrl}>
        <div>
            <div class="text-center">
                <p class="name">Name: ${album.name}</p>
                <p class="artist">Artist: ${album.artist}</p>
                <p class="genre">Genre: ${album.genre}</p>
                <p class="price">Price: $${album.price}</p>
                <p class="date">Release Date: ${album.releaseDate}</p>
            </div>
            ${isLogged?html`<div class="btn-group">
                <a href="/dashboard/${album._id}" id="details">Details</a>
            </div>`:''}
        </div>
    </div>`):html`<p class="no-result">No result.</p>`}
    
    
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
    //ev.preventDefault();
    let isLogged=getUserData();
    try {
        let fieldValue=ev.target.parentElement.children[0].value;
        if (fieldValue===''){
          throw new Error('Wrong input');
        }
        let data={search:fieldValue}
        let serverResponseData=await get(`/data/albums?where=name%20LIKE%20%22${data.search}%22`)
        outerCtx.renderView(searchTemplate(serverResponseData,true,isLogged));
        
        //ev.target.reset();
    } catch (error) {
        errorHandler(error);
    }


}