import { get } from '../api/api.js';
import { html,repeat } from '../lib.js';
import { getUserData } from '../utils.js';
//import { errorHandler } from './errorHandler.js';

let myBooksTemplate=(data)=>html`<section id="my-posts-page">
<h1 class="title">My Posts</h1>

<!-- Display a div with information about every post (if any)-->
${data.length>0?html`<div class="my-posts">${repeat(data,post=>post._id,(post)=>html`<div class="post">
        <h2 class="post-title">${post.title}</h2>
        <img class="post-image" src=${post.imageUrl} alt="Material Image">
        <div class="btn-wrapper">
            <a href="/dashboard/${post._id}" class="details-btn btn">Details</a>
        </div>
    </div>`)}</div>`:html`<h1 class="title no-posts-title">You have no posts yet!</h1>`}





<!-- Display an h1 if there are no posts -->

</section>`

export async function showMyPosts(ctx){
    try{
        let userId=getUserData()._id;
        let data=await get(`/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
        console.log(data);
        
        //console.log(isLogged)
        ctx.renderView(myBooksTemplate(data));
    }catch(error){
        //errorHandler(error);
        console.log(error)
    }

}

//${isLogged? html`<a class="button" href="dashboard/${book._id}">Details</a>`:''}