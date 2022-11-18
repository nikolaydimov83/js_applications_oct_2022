
import { del, get } from '../api/api.js';
import { html,repeat,nothing } from '../lib.js';
import { getUserData } from '../utils.js';
import { errorHandler } from './errorHandler.js';

let memeDetailsTemplate=(data,isOwner,deleteMeme)=>html`<section id="meme-details">
<h1>Meme Title: ${data.title}

</h1>
<div class="meme-details">
    <div class="meme-img">
        <img alt="meme-alt" src=${data.imageUrl}>
    </div>
    <div class="meme-description">
        <h2>Meme Description</h2>
        <p>
            ${data.description}
        </p>

        <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
        ${isOwner?html`<a class="button warning" href="/edit/${data._id}">Edit</a><button @click=${deleteMeme} class="button danger">Delete</button>`:nothing}
        
        
    </div>
</div>
</section>`
let outerCtx=null;
export async function showMemeDetails(ctx){
    try{
        outerCtx=ctx
        let id=ctx.params.memeId
        let data=await get(`/data/memes/${id}`);
        console.log(data);
        let isOwner=isUserOwner(data)
        ctx.renderView(memeDetailsTemplate(data,isOwner,deleteMeme));
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
    
    function deleteMeme(ev){
        try {
            const choice=confirm('Are you sure?')
            if (choice){
                del(`/data/memes/${ctx.params.memeId}`);
            ctx.page.redirect('/memes');
            }
        } catch (error) {
            errorHandler(error);
        }

      
    }
}

