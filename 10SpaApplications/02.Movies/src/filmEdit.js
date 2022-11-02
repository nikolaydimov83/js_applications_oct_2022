import { emptyFormData, loadFormData } from "./handleFormData.js";
import { editMovieForm,addMovieForm, container, emptyContainer,footer,onLoad } from "./onLoad.js";
import { editDataToServer, errorHandler, sendDataToServer } from "./utils.js";


export function showEditMovie(ev){
    ev.preventDefault();
    emptyContainer();
    editMovieForm.children[0].movieId=ev.target.movieId
    container.appendChild(editMovieForm);
    footer.remove();
    container.appendChild(footer)
    }

export async function onMovieEdit(ev,id){
    ev.preventDefault();
 
    try{
        ev.preventDefault();
        let data=loadFormData(ev.target)

        let serverResponseData=await editDataToServer(data,'http://localhost:3030/data/movies',ev.target.movieId, localStorage.getItem('accessToken'))
        console.log(serverResponseData)
        emptyFormData(ev.target)
        onLoad();
    }catch(err){
        errorHandler(err)
    } 
}