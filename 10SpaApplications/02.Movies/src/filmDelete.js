import { onLoad } from "./onLoad.js";
import { deleteDataFromServer } from "./utils.js";

export async function deleteMovie(ev){
    let data=await deleteDataFromServer(ev.target.movieId,'http://localhost:3030/data/movies',localStorage.getItem('accessToken'))
    onLoad();
}