import { loadPageData } from "./onLoad.js";
import { loadFormData, sendDataToServer, errorHandler } from "./utils.js";

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

