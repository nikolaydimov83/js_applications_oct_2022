import { userData } from "./userData.js";
import { getDataFromServer,errorHandler, createElement } from "./utils.js";
const url='http://localhost:3030/data/furniture'
export async function loadPageData(){
    let isLogged;
    if (userData().token){
        isLogged=true
    }
    displayHeader(isLogged);

    try{
    let data =await getDataFromServer(url);
    console.log(data)
    data.forEach(element => {
        renderFurnitureRaw(element,isLogged)
    });
    }catch(err){
        errorHandler(err)
    }

    }


function displayHeader(isLogged){
    if (isLogged){
        document.getElementById('guest').style.display='none'
        document.getElementById('user').style.display='inline-block'
        //document.querySelector('span').textContent=localStorage.getItem('email')
    }else{
        document.getElementById('guest').style.display='inline-block'
        document.getElementById('user').style.display='none'
        //document.querySelector('span').textContent='guest'
    }
    //console.log(await getDataFromServer()
}
function renderFurnitureRaw(furniture){
    createElement('tr',[],[],{},
        createElement('td',[],[],{},
            createElement('img',[],[],{'src':furniture.src},''),),
        createElement('td',[],[],{},
            createElement('p',[],[],{},furniture.name)),
        createElement('td',[],[],{},
            createElement('p',[],[],{},furniture.price)),
        createElement('td',[],[],{},
            createElement('p',[],[],{},furniture.decFactor)));
}