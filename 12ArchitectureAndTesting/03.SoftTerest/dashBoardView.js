import { errorHandler, getDataFromServer } from "./api.js";

import { createElement } from "./utils.js";

let dashboard=document.getElementById('dashboard-holder');
let ctx=null
export async function gotoDashboard(innerCtx){
    try{
        ctx=innerCtx;
        innerCtx.renderView (dashboard)
        let data=await getDataFromServer('data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc');
        console.log(data)
        dashboard.replaceChildren();
        if(data.length===0){
            
            dashboard.appendChild(createElement('h1',[],[],{},'No ideas yet! Be the first one :)'))
        }else{
            data.forEach((idea)=>{
                let ideaElement=(ctx.renderIdea(idea))
                ideaElement.querySelector('a').addEventListener('click',(ev)=>{
                    ev.preventDefault();
                    ctx.id=idea._id
                    ctx.goTo('Details',idea._id)
                })
                dashboard.appendChild(ideaElement)
            })
        }
    }catch(err){
        errorHandler(err);
    }

}