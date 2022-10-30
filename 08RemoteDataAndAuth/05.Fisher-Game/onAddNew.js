import { loadPageData } from "./onLoad.js";
import { sendDataToServer, errorHandler } from "./utils.js";
import {loadFormData} from './handleFormData.js';

export async function addNewCatch(ev){
    ev.preventDefault()
    try{

        let formData=loadFormData(ev.target);
        
        let token=localStorage.getItem('accessToken')
        await sendDataToServer(formData,`http://localhost:3030/data/catches`,token);
        await loadPageData()
    }catch(err){
        errorHandler(err)
    }

}

