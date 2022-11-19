
import { del, get, post } from '../api/api.js';
import { html,repeat,nothing } from '../lib.js';
import { getUserData } from '../utils.js';
//import { errorHandler } from './errorHandler.js';

let bookDetailsTemplate=(data,isOwner,deletebook,likeButtonRendered,likeBook,totalLikes)=>html`<section id="details-page" class="details">
<div class="book-information">
    <h3>${data.title}</h3>
    <p class="type">Type: ${data.type}</p>
    <p class="img"><img src=${data.imageUrl}></p>
    <div class="actions">
        <!-- Edit/Delete buttons ( Only for creator of this book )  -->
        ${(isOwner)?html`<a class="button" href="/edit/${data._id}">Edit</a>
        <a @click=${deletebook} class="button" href="javascript:void(0)">Delete</a>`:''}

        <!-- Bonus -->
        <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
        

        <!-- ( for Guests and Users )  -->
        ${!likeButtonRendered?'':html`<a @click=${likeBook} class="button" href="#">Like</a>`}
        <div class="likes">
            <img class="hearts" src="/images/heart.png">
            <span id="total-likes">Likes: ${totalLikes}</span>
        </div>
        <!-- Bonus -->
    </div>
</div>
<div class="book-description">
    <h3>Description:</h3>
    <p>${data.description}</p>
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
                ([get(`/data/books/${id}`),
                    get(`/data/likes?where=bookId%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22&count`),
                get(`/data/likes?where=bookId%3D%22${id}%22&distinct=_ownerId&count`)]);
        }else{
            [data,totalLikes]=await Promise.all([get(`/data/books/${id}`),get(`/data/likes?where=bookId%3D%22${id}%22&distinct=_ownerId&count`)]);
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
                del(`/data/books/${ctx.params.bookId}`);
            ctx.page.redirect('/dashboard');
            }
        } catch (error) {
            //errorHandler(error);
        }

      
    }
    async function likeBook(ev){
        let bookId=ctx.params.bookId;
        let serverData=await post(`/data/likes`,{bookId});
        ctx.page.redirect(`/dashboard/${bookId}`)
    }
}