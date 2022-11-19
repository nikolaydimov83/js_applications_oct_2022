import { get } from '../api/api.js';
import { html,repeat } from '../lib.js';
import { getUserData } from '../utils.js';
//import { errorHandler } from './errorHandler.js';

let catalogTemplate=(data,isLogged)=>html`<section id="dashboard-page" class="dashboard">
<h1>Dashboard</h1>
<!-- Display ul: with list-items for All books (If any) -->
${data.length===0?html`<p class="no-books">No books in database!</p>`:repeat(data,(book)=>book._id,(book)=>html`
        <ul class="other-books-list">
            <li class="otherBooks">
                <h3>${book.title}</h3>
                <p>Type: ${book.type}</p>
                <p class="img"><img src=${book.imageUrl}></p>
                <a class="button" href="dashboard/${book._id}">Details</a>
            </li>
        </ul>
`)}

<!-- Display paragraph: If there are no books in the database -->

</section>`

export async function showdashBoard(ctx){
    try{
        let data=await get('/data/books?sortBy=_createdOn%20desc');
        console.log(data);
        let isLogged=getUserData();
        console.log(isLogged)
        ctx.renderView(catalogTemplate(data,isLogged));
    }catch(error){
        errorHandler(error);
    }

}

//${isLogged? html`<a class="button" href="dashboard/${book._id}">Details</a>`:''}