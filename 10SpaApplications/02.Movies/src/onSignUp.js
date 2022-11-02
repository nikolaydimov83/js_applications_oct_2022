import { loadFormData } from "./handleFormData.js";
import { onLoad } from "./onLoad.js";
import { errorHandler, sendDataToServer } from "./utils.js";

export async function onSignUp(ev){
try{
    ev.preventDefault();
    let data=loadFormData(ev.target);
    if(data['password']!==data['repeatPassword']){
        throw new Error('Passwords do not match!');
    }
    let serverResponseData=await sendDataToServer(data,'http://localhost:3030/users/register')
    localStorage.setItem('accessToken',serverResponseData.accessToken);
    localStorage.setItem('userId',serverResponseData._id);
    localStorage.setItem('email',serverResponseData.email);
    onLoad();
}catch(err){
    errorHandler(err)
}

} 