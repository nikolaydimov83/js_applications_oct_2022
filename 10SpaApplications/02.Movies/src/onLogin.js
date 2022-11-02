import { loadFormData } from "./handleFormData.js";
import { onLoad } from "./onLoad.js";
import { errorHandler, getDataFromServer, sendDataToServer } from "./utils.js";


export async function onLogin(ev){
    try{
        ev.preventDefault();
        let data=loadFormData(ev.target)

        let serverResponseData=await sendDataToServer(data,'http://localhost:3030/users/login')
        localStorage.setItem('accessToken',serverResponseData.accessToken);
        localStorage.setItem('userId',serverResponseData._id);
        localStorage.setItem('email',serverResponseData.email);
        console.log(serverResponseData)
        onLoad();
    }catch(err){
        errorHandler(err)
    }   
}

export async function onLogout(){
    try{
        await getDataFromServer('http://localhost:3030/users/logout',localStorage.getItem('accessToken'))
    }catch(err){
        errorHandler(err)
    }
    
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    onLoad()
}