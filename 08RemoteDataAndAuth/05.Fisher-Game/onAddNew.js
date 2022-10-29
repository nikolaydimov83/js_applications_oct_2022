import { loadPageData } from "./onLoad.js";
import { loadFormData, sendDataToServer } from "./utils.js";

export async function addNewCatch(ev){
    ev.preventDefault()
    let formData=loadFormData(ev.target);
    let token=localStorage.getItem('accessToken')
    await sendDataToServer(formData,`http://localhost:3030/data/catches`,token);
    await loadPageData()
}