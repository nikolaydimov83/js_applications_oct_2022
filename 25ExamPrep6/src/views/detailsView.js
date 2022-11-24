import { del, get, post } from '../api/api.js';
import { html,repeat,nothing } from '../lib.js';
import { getUserData } from '../utils.js';
import { errorHandler } from './errorHandler.js';

let shoesDetailsTemplate=(data,isOwner,deleteshoes,applications,applyForOffer,hasUserDonated)=>html`<section id="detailsPage">
<div class="details">
    <div class="animalPic">
        <img src=${data.image}>
    </div>
    <div>
        <div class="animalInfo">
            <h1>Name: ${data.name}</h1>
            <h3>Breed: ${data.breed}</h3>
            <h4>Age: ${data.age}</h4>
            <h4>Weight: ${data.weight}</h4>
            <h4 class="donation">Donation: ${applications*100}$</h4>
        </div>
        <!-- if there is no registered user, do not display div-->
        <div class="actionBtn">
            <!-- Only for registered user and creator of the pets-->
            ${isOwner?html`<a href="/edit/${data._id}" class="edit">Edit</a>
            <a @click=${deleteshoes} href="javascript:void(0)" class="remove">Delete</a>`:''}
            <!--(Bonus Part) Only for no creator and user-->
            ${(getUserData()&&!isOwner&&!hasUserDonated)?html`<a @click=${applyForOffer} href="javascript:void(0)" class="donate">Donate</a>`:''}
            
        </div>
    </div>
</div>
</section>`
let outerCtx=null;
export async function showshoesDetails(ctx){
    try{
        outerCtx=ctx
        let id=ctx.params.shoesId
        let [data,applications,hasUserDonated]=await Promise.all([get(`/data/pets/${id}`),get(`/data/donation?where=petId%3D%22${id}%22&distinct=_ownerId&count`),checkUserHasDonated()]) ;
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
                del(`/data/pets/${ctx.params.shoesId}`);
            ctx.page.redirect('/');
            }
        } catch (error) {
            errorHandler(error);
        }

      
    }
    async function applyForOffer(ev){
      try {
        let offerId=ctx.params.shoesId
        let serverData=await post(`/data/donation`,{petId:offerId});
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
        let serverResponse=await get(`/data/donation?where=petId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
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

