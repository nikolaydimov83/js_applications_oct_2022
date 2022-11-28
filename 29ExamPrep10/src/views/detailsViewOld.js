import { del, get, post } from '../api/api.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat,nothing } from '../lib.js';
import { getUserData } from '../utils.js';
import { errorHandler } from './errorHandler.js';

let shoesDetailsTemplate=(data,isOwner,deleteshoes,comments,submitCommentForm,isLogged)=>html`<section id="game-details">
<h1>Game Details</h1>
<div class="info-section">

    <div class="game-header">
        <img class="game-img" src=${data.imageUrl} />
        <h1>${data.title}</h1>
        <span class="levels">MaxLevel: ${data.maxLevel}</span>
        <p class="type">${data.category}</p>
    </div>

    <p class="text">
        ${data.summary}
    </p>

    <!-- Bonus ( for Guests and Users ) -->
    <div class="details-comments">
        <h2>Comments:</h2>
        <ul>
            <!-- list all comments for current game (If any) -->
            ${comments.length>0?repeat(comments,(comment)=>comment._id,(comment)=>html`<li class="comment">
                <p>Content: ${comment.comment}</p>
            </li>`):html`<p class="no-comment">No comments.</p>`}

        </ul>
        <!-- Display paragraph: If there are no games in the database -->
        
    </div>

    <!-- Edit/Delete buttons ( Only for creator of this game )  -->
   ${isOwner?html`<div class="buttons">
        <a href="/edit/${data._id}" class="button">Edit</a>
        <a @click=${deleteshoes} href="javascript:void(0)" class="button">Delete</a>
    </div>`:''} 
</div>

<!-- Bonus -->
<!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
${(isOwner||!isLogged)?'':html`<article class="create-comment">
    <label>Add new comment:</label>
    <form @submit=${submitCommentForm} class="form">
        <textarea name="comment" placeholder="Comment......"></textarea>
        <input class="btn submit" type="submit" value="Add Comment">
    </form>
</article>`}

</section>`
let outerCtx=null;
export async function showshoesDetails(ctx){
    try{
        outerCtx=ctx
        let id=ctx.params.shoesId
        let [data,comments]=await Promise.all([get(`/data/games/${id}`),get(`/data/comments?where=gameId%3D%22${id}%22`)]) ;
      
        console.log(data);
        let isOwner=isUserOwner(data);
        let isLogged=getUserData()
        ctx.renderView(shoesDetailsTemplate(data,isOwner,deleteshoes,comments,submitCommentForm,isLogged));
    }catch(error){
        alert(error.message)
    }

    function isUserOwner(data){
        if(getUserData()?._id===data._ownerId){
            return true
        }else{
            return false
        }
    }
    
    function deleteshoes(ev){
        try {
            const choice=confirm('Are you sure?')
            if (choice){
                del(`/data/games/${ctx.params.shoesId}`);
            ctx.page.redirect('/');
            }
        } catch (error) {
            errorHandler(error);
        }

      
    }
    async function submitCommentForm(ev){
        ev.preventDefault();
        try {
            let data=loadFormData(ev.target);
            data.gameId=outerCtx.params.shoesId;
            let serverResponseData=await post(`/data/comments`,data);
            outerCtx.page.redirect(`/dashboard/${ctx.params.shoesId}`)
            ev.target.reset();
        } catch (error) {
            errorHandler(error);
        }
    
    
    }
}

