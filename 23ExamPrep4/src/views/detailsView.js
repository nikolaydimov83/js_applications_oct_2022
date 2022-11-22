import { del, get, post } from '../api/api.js';
import { html,repeat,nothing } from '../lib.js';
import { getUserData } from '../utils.js';
import { errorHandler } from './errorHandler.js';

let shoesDetailsTemplate=(data,isOwner,deleteshoes,applications,applyForOffer)=>html`<section id="details">
<div id="details-wrapper">
  <img id="details-img" src=${data.imageUrl} alt="example1" />
  <p id="details-title">${data.title}</p>
  <p id="details-category">
    Category: <span id="categories">${data.category}</span>
  </p>
  <p id="details-salary">
    Salary: <span id="salary-number">${data.salary}</span>
  </p>
  <div id="info-wrapper">
    <div id="details-description">
      <h4>Description</h4>
      <span
        >${data.description}</span
      >
    </div>
    <div id="details-requirements">
      <h4>Requirements</h4>
      <span
        >${data.requirements}</span
      >
    </div>
  </div>
  <p>Applications: <strong id="applications">${applications}</strong></p>
<div id="action-buttons">
  <!--Edit and Delete are only for creator-->
  ${isOwner?html`    <a href="/edit/${data._id}" id="edit-btn">Edit</a>
    <a @click=${deleteshoes} href="javascript:void(0)" id="delete-btn">Delete</a>`:''}
    
    ${(getUserData()&&!isOwner)?html`
    <!--Bonus - Only for logged-in users ( not authors )-->
    <a @click=${applyForOffer} href="javascript:void(0)" id="apply-btn">Apply</a>
 `:``}
 </div>
</div>
</section>`
let outerCtx=null;
export async function showshoesDetails(ctx){
    try{
        outerCtx=ctx
        let id=ctx.params.shoesId
        let [data,applications]=await Promise.all([get(`/data/offers/${id}`),get(`/data/applications?where=offerId%3D%22${id}%22&distinct=_ownerId&count`)]) ;
        console.log(data);
        let isOwner=isUserOwner(data)
        ctx.renderView(shoesDetailsTemplate(data,isOwner,deleteshoes,applications,applyForOffer));
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
                del(`/data/offers/${ctx.params.shoesId}`);
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

