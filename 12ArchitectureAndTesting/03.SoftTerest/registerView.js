import { errorHandler, sendDataToServer } from "./api.js";
import { emptyFormData, loadFormData } from "./handleFormData.js";


let registerViewSection=document.querySelector('body').children[2];
let registerForm=registerViewSection.querySelector('form')
registerForm.addEventListener('submit',registerSubmit)

registerForm.querySelector('p a').addEventListener('click',(ev)=>{
    ev.preventDefault();
    ctx.goTo('Login')
})

let ctx=null;

export function gotoRegister(intCtx){
    ctx=intCtx;
    intCtx.renderView(registerViewSection);

}
async function registerSubmit(ev){
    ev.preventDefault();
    try{
        let formData=loadFormData(registerForm);
        if(formData['password']!==formData['repeatPassword']){
            throw new Error('Passwords do not match')
        }
        let serverData=await sendDataToServer(formData,'users/register');
        localStorage.setItem('userData',JSON.stringify(serverData));
        
        console.log(serverData);
        emptyFormData(registerForm)
        ctx.goTo('');
        
        
    }catch(err){
        errorHandler(err);
    }
    

}