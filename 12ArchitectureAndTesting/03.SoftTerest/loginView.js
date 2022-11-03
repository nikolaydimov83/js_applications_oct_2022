import { errorHandler, getDataFromServer, sendDataToServer } from "./api.js";
import { loadFormData,emptyFormData } from "./handleFormData.js";

let loginViewSection=document.querySelector('body').children[3];
let loginForm=loginViewSection.querySelector('form');
loginForm.addEventListener('submit',loginSubmit);
loginForm.querySelector('p a').addEventListener('click',(ev)=>{
    ev.preventDefault();
    ctx.goTo('Register')
})

let ctx=null;
export function gotoLogin(innerCtx){
    ctx=innerCtx
    innerCtx.renderView(loginViewSection);
}

async function loginSubmit(ev){
    ev.preventDefault();
    try{
        let formData=loadFormData(loginForm);
        let serverData = await sendDataToServer(formData,'users/login')
        localStorage.setItem('userData',JSON.stringify(serverData));
        
        
        console.log(serverData);
        ctx.goTo('');
        
        emptyFormData(loginForm)
    }catch(err){
        errorHandler(err)
    }
}

export async function gotoLogout(innerCtx){
    try{
    let accessToken=JSON.parse(localStorage.getItem('userData')).accessToken
    let serverData=await getDataFromServer('users/logout',accessToken);
    console.log(serverData);
    localStorage.removeItem('userData')
    innerCtx.goTo('')
    }catch(err){
        localStorage.removeItem('userData');
        innerCtx.goTo('');
        errorHandler(err)
    }
}