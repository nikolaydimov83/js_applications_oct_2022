import { del, get, post } from '../api/api.js';
import { html,repeat,nothing } from '../lib.js';
import { getUserData } from '../utils.js';
import { errorHandler } from './errorHandler.js';

let shoesDetailsTemplate=(data,isOwner,deleteshoes,applications,applyForOffer,hasUserDonated)=>html`        <section id="details-page">
<h1 class="title">Post Details</h1>
<div id="container">
    <div id="details">
        <div class="image-wrapper">
            <img src=${data.imageUrl} alt="Material Image" class="post-image">
        </div>
        <div class="info">
            <h2 class="title post-title">${data.title}</h2>
            <p class="post-description">Description: ${data.description}</p>
            <p class="post-address">Address: ${data.address}</p>
            <p class="post-number">Phone number: ${data.phone}</p>
            <p class="donate-Item">Donate Materials: ${applications}</p>

            <!--Edit and Delete are only for creator-->
            <div class="btns">
            ${isOwner?html`<a href="/edit/${data._id}" class="edit-btn btn">Edit</a>
                <a @click=${deleteshoes} href="javascript:void(0)" class="delete-btn btn">Delete</a>`:''}
                

                <!--Bonus - Only for logged-in users ( not authors )-->
                ${(getUserData()&&!isOwner&&!hasUserDonated)?html`<a @click=${applyForOffer} href="javascript:void(0)" class="donate-btn btn">Donate</a>`:''}
            </div>

        </div>
    </div>
</div>
</section>`
let outerCtx=null;
export async function showshoesDetails(ctx){
    try{
        outerCtx=ctx
        let id=ctx.params.shoesId
        let [data,applications,hasUserDonated]=await Promise.all([get(`/data/posts/${id}`),get(`/data/donations?where=postId%3D%22${id}%22&distinct=_ownerId&count`),checkUserHasDonated()]) ;
        //let data= await get(`/data/posts/${id}`);
        console.log(data);
        let isOwner=isUserOwner(data);
        
        ctx.renderView(shoesDetailsTemplate(data,isOwner,deleteshoes,applications,applyForOffer,hasUserDonated));
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
                del(`/data/posts/${ctx.params.shoesId}`);
            ctx.page.redirect('/dashboard');
            }
        } catch (error) {
            errorHandler(error);
        }

      
    }
    async function applyForOffer(ev){
      try {
        let offerId=ctx.params.shoesId
        let serverData=await post(`/data/donations`,{postId:offerId});
        console.log(serverData);
        ctx.page.redirect(`/dashboard/${offerId}`);
        ev.target.style.display='none';
      
      } catch (error) {
        errorHandler(error);
      }
    }
    async function checkUserHasDonated(){
      let postId=ctx.params.shoesId
      let userId=getUserData()?._id
      if(!userId){
        return true
      }
      try {
        let serverResponse=await get(`/data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
        if (serverResponse){
          return true
        }else{
          return false
        }
        
      } catch (error) {
        errorHandler(error);
      }
    }
}

