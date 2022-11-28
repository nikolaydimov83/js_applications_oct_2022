import { del, get, post } from '../api/api.js';
import { html,repeat,nothing } from '../lib.js';
import { getUserData } from '../utils.js';
import { errorHandler } from './errorHandler.js';

let shoesDetailsTemplate=(data,isOwner,deleteshoes)=>html`<section id="listing-details">
<h1>Details</h1>
<div class="details-info">
    <img src=${data.imageUrl}>
    <hr>
    <ul class="listing-props">
        <li><span>Brand: ${data.brand}</span>Audi</li>
        <li><span>Model: ${data.model}</span>A3</li>
        <li><span>Year: ${data.year}</span>2018</li>
        <li><span>Price: ${data.price}</span>25000$</li>
    </ul>

    <p class="description-para">${data.description}</p>

    ${isOwner?html`<div class="listings-buttons">
        <a href="/edit/${data._id}" class="button-list">Edit</a>
        <a @click=${deleteshoes} href="javascript:void(0)" class="button-list">Delete</a>
    </div>`:''}
</div>
</section>`
let outerCtx=null;
export async function showshoesDetails(ctx){
    try{
        outerCtx=ctx
        let id=ctx.params.shoesId
        let data=await get(`/data/cars/${id}`);
        console.log(data);
        let isOwner=isUserOwner(data)
        ctx.renderView(shoesDetailsTemplate(data,isOwner,deleteshoes));
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
                del(`/data/cars/${ctx.params.shoesId}`);
            ctx.page.redirect('/dashboard');
            }
        } catch (error) {
            errorHandler(error);
        }

      
    }
    async function applyForOffer(ev){
      try {
        let offerId=ctx.params.shoesId
        let serverData=await post(`/data/applications`,{offerId});
        console.log(serverData);
        ctx.page.redirect(`/dashboard/${offerId}`);
        ev.target.style.display='none';
      
      } catch (error) {
        errorHandler(error);
      }
    }
}

