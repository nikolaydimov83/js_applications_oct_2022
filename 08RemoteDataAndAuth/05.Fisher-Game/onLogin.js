import { errorHandler, getDataFromServer, loadFormData, sendDataToServer } from "./utils.js";
import { loadPageData } from "./onLoad.js";
export function onLogin(){
    document.getElementById('register-view').style.display='none';
    document.getElementById('login-view').style.display='block';
    document.getElementById('home-view').style.display='none';
    
    let loginForm=document.querySelector('#login-view form');
    loginForm.addEventListener('submit',submitForm)

}
async function submitForm(ev){
    try{
        ev.preventDefault();
        let data=loadFormData(ev.target)

        if(!data.password||!data.email){
            throw new Error('All fields must be populated!')
        }
        let serverResponseData=await sendDataToServer(data,'http://localhost:3030/users/login')
        localStorage.setItem('accessToken',serverResponseData.accessToken);
        localStorage.setItem('userId',serverResponseData._id)
        console.log(serverResponseData)
        loadPageData();
    }catch(err){
        errorHandler(err)
    }   
}

export async function onLogout(){
    await getDataFromServer('http://localhost:3030/users/logout')
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    loadPageData()
}