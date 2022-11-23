import { get } from '../api/api.js';
import { html,repeat } from '../lib.js';
import { errorHandler } from './errorHandler.js';

let catalogTemplate=(data)=>html`        <section id="dashboard-page">
<h1 class="title">All Posts</h1>

<!-- Display a div with information about every post (if any)-->
${data.length>0?html`<div class="all-posts">
    ${repeat(data,(post)=>post._id,(post)=>html`<div class="post">
        <h2 class="post-title">${post.title}</h2>
        <img class="post-image" src=${post.imageUrl} alt="Material Image">
        <div class="btn-wrapper">
            <a href="/dashboard/${post._id}" class="details-btn btn">Details</a>
        </div>
    </div>`)}
</div>`:html`<h1 class="title no-posts-title">No posts yet!</h1>`}


<!-- Display an h1 if there are no posts -->

</section>`
/*{
  title,
  description,
  imageUrl,
  address,
  phone
}
*/
export async function showCatalog(ctx){
    try{
        let data=await get('/data/posts?sortBy=_createdOn%20desc');
        console.log(data)
        ctx.renderView(catalogTemplate(data));
    }catch(error){
        errorHandler(error);
    }

}