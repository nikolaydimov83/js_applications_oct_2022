import { loadFormData,emptyFormData } from "./handleFormData.js";
import { addMovieForm, container, emptyContainer,footer,onLoad } from "./onLoad.js";
import { errorHandler, sendDataToServer } from "./utils.js";

export function showAddMovie(){
emptyContainer();
container.appendChild(addMovieForm);
footer.remove();
container.appendChild(footer)
}

export async function onMovieAddSubmit(ev){
    ev.preventDefault();
    try{
        ev.preventDefault();
        let data=loadFormData(ev.target)

        let serverResponseData=await sendDataToServer(data,'http://localhost:3030/data/movies',localStorage.getItem('accessToken'))
        console.log(serverResponseData)
        emptyFormData(ev.target)
        onLoad();
    }catch(err){
        errorHandler(err)
    } 
}