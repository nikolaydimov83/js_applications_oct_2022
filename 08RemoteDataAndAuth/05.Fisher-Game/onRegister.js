import { errorHandler, loadFormData, sendDataToServer } from "./utils.js";
import { loadPageData } from "./onLoad.js";
export function onRegister(){
    document.getElementById('register-view').style.display='block';
    document.getElementById('login-view').style.display='none';
    document.getElementById('home-view').style.display='none';
    
    let registerForm=document.querySelector('#register-view form');
    registerForm.addEventListener('submit',submitForm)

}
async function submitForm(ev){
    try{
        ev.preventDefault();
        let data=loadFormData(ev.target)
        if (data.password!==data.rePass){
            throw new Error('Passwords do not match!');
        }
        if(!data.password||!data.email){
            throw new Error('All fields must be populated!')
        }
        let serverResponseData=await sendDataToServer(data,'http://localhost:3030/users/register')
        localStorage.setItem('accessToken',serverResponseData.accessToken);
        localStorage.setItem('userId',serverResponseData._id);
        localStorage.setItem('email',serverResponseData.email);
        console.log(serverResponseData)
        loadPageData();
    }catch(err){
        errorHandler(err)
    }   
}
