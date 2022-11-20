import { del, get } from '../api/api.js';
import { html,repeat,nothing } from '../lib.js';
import { getUserData } from '../utils.js';
import { errorHandler } from './errorHandler.js';

let shoesDetailsTemplate=(data,isOwner,deleteshoes)=>html`<section id="details">
<div id="details-wrapper">
  <p id="details-title">Shoe Details</p>
  <div id="img-wrapper">
    <img src=${data.imageUrl} alt="example1" />
  </div>
  <div id="info-wrapper">
    <p>Brand: <span id="details-brand">${data.brand}</span></p>
    <p>
      Model: <span id="details-model">${data.model}</span>
    </p>
    <p>Release date: <span id="details-release">${data.release}</span></p>
    <p>Designer: <span id="details-designer">${data.designer}</span></p>
    <p>Value: <span id="details-value">${data.value}</span></p>
  </div>

  <!--Edit and Delete are only for creator-->
  ${isOwner?html`  <div id="action-buttons">
    <a href="/edit/${data._id}" id="edit-btn">Edit</a>
    <a @click=${deleteshoes} href="javascript:void(0)" id="delete-btn">Delete</a>
  </div>`:''}

</div>
</section>`
let outerCtx=null;
export async function showshoesDetails(ctx){
    try{
        outerCtx=ctx
        let id=ctx.params.shoesId
        let data=await get(`/data/shoes/${id}`);
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
                del(`/data/shoes/${ctx.params.shoesId}`);
            ctx.page.redirect('/dashboard');
            }
        } catch (error) {
            errorHandler(error);
        }

      
    }
}

