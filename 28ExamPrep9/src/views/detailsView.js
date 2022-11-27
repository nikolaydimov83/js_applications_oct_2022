
import { del, get, post } from '../api/api.js';
import { html,repeat,nothing } from '../lib.js';
import { getUserData } from '../utils.js';
//import { errorHandler } from './errorHandler.js';

let bookDetailsTemplate=(data,isOwner,deletebook)=>html`        <section id="detailsPage">
<div class="wrapper">
    <div class="albumCover">
        <img src="./images/Lorde.jpg">
    </div>
    <div class="albumInfo">
        <div class="albumText">

            <h1>Name: ${data.name}</h1>
            <h3>Artist: ${data.artist}</h3>
            <h4>Genre: ${data.genre}</h4>
            <h4>Price: $${data.price}</h4>
            <h4>Date: ${data.releaseDate}</h4>
            <p>Description: ${data.description}</p>
        </div>

        <!-- Only for registered user and creator of the album-->
        ${isOwner?html`<div class="actionBtn">
            <a href="/edit/${data._id}" class="edit">Edit</a>
            <a @click=${deletebook} href="javascript:void(0)" class="remove">Delete</a>
        </div>`:''}
    </div>
</div>
</section>`


let outerCtx=null;
export async function showshoesDetails(ctx){
    try{
        outerCtx=ctx
        let id=ctx.params.shoesId;
        let data = await get(`/data/albums/${id}`)
        let isOwner=isUserOwner(data);
        
        ctx.renderView(bookDetailsTemplate(data,isOwner,deletebook));
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
                del(`/data/albums/${ctx.params.shoesId}`);
            ctx.page.redirect('/dashboard');
            }
        } catch (error) {
            //errorHandler(error);
        }

      
    }

}