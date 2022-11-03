import { deleteDataFromServer, errorHandler, getDataFromServer } from "./api.js";

let detailsWrapper=document.querySelector('div.some');
let ctx=null;

export async function gotoDetails(innerCtx){
    try{
            ctx=innerCtx;
    ctx.renderView(detailsWrapper);

    let data=await getDataFromServer(`data/ideas/${ctx.id}`);
    console.log(data)
    detailsWrapper.replaceChildren();
    let ideaDetailElement=ctx.renderIdeaDetail(data);
    detailsWrapper.appendChild(ideaDetailElement)
    let deleteBtn=ideaDetailElement.querySelector('a')
    deleteBtn.addEventListener('click',(ev)=>{
        ev.preventDefault();
        deleteDataFromServer(data._id,'data/ideas/',JSON.parse(localStorage.getItem('userData')).accessToken);
        ctx.goTo('Dashboard')
    })
   
    }catch(err){
        errorHandler(err)
    }

    
   
}

