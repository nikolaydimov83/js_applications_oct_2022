import { get } from '../api/api.js';
import { html,repeat } from '../lib.js';
import { getUserData } from '../utils.js';
//import { errorHandler } from './errorHandler.js';

let myBooksTemplate=(data)=>html`<section id="my-books-page" class="dashboard">
<h1>My Books</h1>
<!-- Display ul: with list-items for All books (If any) -->
${data.length===0?html`<p class="no-books">No books in database!</p>`:repeat(data,(book)=>book._id,(book)=>html`
        <ul class="my-books-list">
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

export async function showMyBooks(ctx){
    try{
        let userId=getUserData()._id;
        let data=await get(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
        console.log(data);
        
        //console.log(isLogged)
        ctx.renderView(myBooksTemplate(data));
    }catch(error){
        //errorHandler(error);
        console.log(error)
    }

}

//${isLogged? html`<a class="button" href="dashboard/${book._id}">Details</a>`:''}