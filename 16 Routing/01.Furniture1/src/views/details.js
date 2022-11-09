
import { html } from '../../node_modules/lit-html/lit-html.js'
import { deleteDataFromServer, errorHandler, getDataFromServer } from "../data/api.js";
let ctxOuter=null;
export async function showDetails(ctx){
    const productId = ctx.params.productId;
    

    try{
            
            let data=await getDataFromServer(`data/catalog/${productId}`);
            ctx.page.focusedFurniture=data;
            ctx.render(detailsTemplate(data));   
            ctxOuter=ctx
            alert('Are you sure you want to Delete');


    }catch(err){
        errorHandler(err);
   
    }
    
}

async function deleteFurniture(ev){
try{
    
if(JSON.parse(sessionStorage.getItem('userData')).accessToken){
    await deleteDataFromServer(ctxOuter.page.focusedFurniture._id,'data/catalog',JSON.parse(sessionStorage.getItem('userData')).accessToken)
    ctxOuter.page.redirect('/')
}

}catch(err){
errorHandler(err);

}
}
const detailsTemplate=(data)=>html`<div class="row space-top">
<div class="col-md-12">
    <h1>Furniture Details</h1>
</div>
</div>
<div class="row space-top">
<div class="col-md-4">
    <div class="card text-white bg-primary">
        <div class="card-body">
            <img src=${data.img} />
        </div>
    </div>
</div>
<div class="col-md-4">
    <p>Make: <span>${data.make}</span></p>
    <p>Model: <span>${data.model}</span></p>
    <p>Year: <span>${data.year}</span></p>
    <p>Description: <span>${data.description}</span></p>
    <p>Price: <span>${data.price}</span></p>
    <p>Material: <span>${data.material}</span></p>
    <div>
        <a style=${checkIfOwnFurniture(data._ownerId)} href="/edit" class="btn btn-info">Edit</a>
        <a @click=${deleteFurniture} href="javascript:void(0)" style=${checkIfOwnFurniture(data._ownerId)} class="btn btn-red">Delete</a>
    </div>
</div>
</div>`

function checkIfOwnFurniture(ownerId){
    if(!JSON.parse(sessionStorage.getItem('userData'))){
        return 'display:none'
    }
    let userId=JSON.parse(sessionStorage.getItem('userData'))._id
    if(userId===ownerId){
        return ''
    }else{
        return 'display:none'
    }
}

