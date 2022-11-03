import { errorHandler, sendDataToServer } from "./api.js";
import { loadFormData,emptyFormData } from "./handleFormData.js";


let createFormWrapper=document.querySelector('body').children[6];
let ctx=null

let createNewIdeaForm=createFormWrapper.querySelector('form')
createNewIdeaForm.addEventListener('submit',createSubmit)

export function gotoCreate(innerCtx){
    ctx=innerCtx
    ctx.renderView(createFormWrapper);
}

export async function createSubmit(ev){
    ev.preventDefault();
    try{
        let formData=loadFormData(createNewIdeaForm)
        let serverData = await sendDataToServer(formData,'data/ideas',JSON.parse(localStorage.getItem('userData')).accessToken);
        console.log(serverData);
        emptyFormData(createNewIdeaForm)
        ctx.goTo('Dashboard');
        
        
    }catch(err){
        errorHandler(err)
    }
}

