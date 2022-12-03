
import { del, get, post } from '../api/api.js';
import { html,repeat,nothing } from '../lib.js';
import { getUserData } from '../utils.js';
//import { errorHandler } from './errorHandler.js';

let bookDetailsTemplate=(data,isOwner,deletebook,likeButtonRendered,likeBook,totalLikes)=>html`<section id="details">
<div id="details-wrapper">
  <p id="details-title">Album Details</p>
  <div id="img-wrapper">
    <img src=${data.imageUrl} alt="example1" />
  </div>
  <div id="info-wrapper">
    <p><strong>Band:</strong><span id="details-singer">${data.singer}</span></p>
    <p>
      <strong>Album name:</strong><span id="details-album">${data.album}</span>
    </p>
    <p><strong>Release date:</strong><span id="details-release">${data.release}</span></p>
    <p><strong>Label:</strong><span id="details-label">${data.label}</span></p>
    <p><strong>Sales:</strong><span id="details-sales">${data.sales}</span></p>
  </div>
  <div id="likes">Likes: <span id="likes-count">${totalLikes}</span></div>

  <!--Edit and Delete are only for creator-->
  <div id="action-buttons">
    ${likeButtonRendered?html`<a @click=${likeBook} href="javascript:void(0)" id="like-btn">Like</a>`:''}
    ${isOwner?html`<a href="/edit/${data._id}" id="edit-btn">Edit</a>
    <a @click=${deletebook} href="javascript:void(0)" id="delete-btn">Delete</a>`:''}
  </div>
</div>
</section>`


let outerCtx=null;
export async function showbookDetails(ctx){
    try{
        outerCtx=ctx
        let id=ctx.params.bookId
        let userId=getUserData()?._id
        let data=undefined;
        let userLiked=undefined
        let totalLikes=0;
        if (userId){
            [data,userLiked,totalLikes]=await Promise.all
                ([get(`/data/albums/${id}`),
                    get(`/data/likes?where=albumId%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22&count`),
                get(`/data/likes?where=albumId%3D%22${id}%22&distinct=_ownerId&count`)]);
        }else{
            [data,totalLikes]=await Promise.all([get(`/data/albums/${id}`),get(`/data/likes?where=albumId%3D%22${id}%22&distinct=_ownerId&count`)]);
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
                del(`/data/albums/${ctx.params.bookId}`);
            ctx.page.redirect('/dashboard');
            }
        } catch (error) {
            //errorHandler(error);
        }

      
    }
    async function likeBook(ev){
        let bookId=ctx.params.bookId;
        let serverData=await post(`/data/likes`,{albumId:bookId});
        ctx.page.redirect(`/dashboard/${bookId}`)
    }
}