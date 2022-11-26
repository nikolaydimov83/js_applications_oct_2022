
import { del, get, post } from '../api/api.js';
import { html,repeat,nothing } from '../lib.js';
import { getUserData } from '../utils.js';
//import { errorHandler } from './errorHandler.js';

let bookDetailsTemplate=(data,isOwner,deletebook,likeButtonRendered,likeBook,totalLikes)=>html`        <section id="detailsPage">
<div id="detailsBox">
    <div class="detailsInfo">
        <h1>Title: ${data.title}</h1>
        <div>
            <img src=${data.imageUrl} />
        </div>
    </div>

    <div class="details">
        <h3>Theater Description</h3>
        <p>${data.description}</p>
        <h4>Date: ${data.date}</h4>
        <h4>Author: ${data.author}</h4>
        <div class="buttons">
            ${isOwner?html`<a @click=${deletebook} class="btn-delete" href="javascript:void(0)">Delete</a>
            <a class="btn-edit" href="/edit/${data._id}">Edit</a>`:``}
            
            ${likeButtonRendered?html`<a @click=${likeBook} class="btn-like" href="javascript:void(0)">Like</a>`:``}
        </div>
        <p class="likes">Likes: ${totalLikes}</p>
    </div>
</div>
</section>`


let outerCtx=null;
export async function showshoesDetails(ctx){
    try{
        outerCtx=ctx
        let id=ctx.params.shoesId;
        let userId=getUserData()?._id;
        let data=undefined;
        let userLiked=undefined;
        let totalLikes=0;
        if (userId){
            [data,userLiked,totalLikes]=await Promise.all
                ([get(`/data/theaters/${id}`),
                    get(`/data/likes?where=theaterId%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22&count`),
                get(`/data/likes?where=theaterId%3D%22${id}%22&distinct=_ownerId&count`)]);
        }else{
            [data,totalLikes]=await Promise.all([get(`/data/theaters/${id}`),get(`/data/likes?where=theaterId%3D%22${id}%22&distinct=_ownerId&count`)]);
            userLiked=1;
        }
        
        console.log(data);
        console.log(userLiked);
        let isOwner=isUserOwner(data);
        let likeButtonRendered=false
        if (userLiked===0&&isOwner===false){
            likeButtonRendered=true
        }
        
        ctx.renderView(bookDetailsTemplate(data,isOwner,deletebook,likeButtonRendered,likeBook,totalLikes));
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
    
    function deletebook(ev){
        try {
            const choice=confirm('Are you sure?')
            if (choice){
                del(`/data/theaters/${ctx.params.shoesId}`);
            ctx.page.redirect('/');
            }
        } catch (error) {
            //errorHandler(error);
        }

      
    }
    async function likeBook(ev){
        let theaterId=ctx.params.shoesId;
        try {
            let serverData=await post(`/data/likes`,{theaterId});
        ctx.page.redirect(`/dashboard/${theaterId}`)
        } catch (error) {
            ctx.page.redirect(`/dashboard/${theaterId}`)
        }
        
    }
}