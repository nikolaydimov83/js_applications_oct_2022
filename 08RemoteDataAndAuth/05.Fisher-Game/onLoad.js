import {createElement,errorHandler,getDataFromServer,deleteDataFromServer,editDataToServer,sendDataToServer, loadFormData} from "./utils.js";

export async function loadPageData(){
    let isLogged;
    if (localStorage.getItem('accessToken')){
        isLogged=true
    }
    displayHeader(isLogged);
    enableAddCatchButton(isLogged);
    let registerView=document.getElementById('register-view');
    registerView.style.display='none';

    let loginView=document.getElementById('login-view');
    loginView.style.display='none';

    document.getElementById('home-view').style.display='block';

    document.getElementById('catches').replaceChildren();
    let data =await getDataFromServer('http://localhost:3030/data/catches');
    console.log(data)
    data.forEach(element => {
        createFishCatch(element,isLogged)
    });
    }
function displayHeader(isLogged){
    if (isLogged){
        document.getElementById('guest').style.display='none'
        document.getElementById('user').style.display='inline-block'
    }else{
        document.getElementById('guest').style.display='inline-block'
        document.getElementById('user').style.display='none'
    }
    //console.log(await getDataFromServer()
}
function enableAddCatchButton(isLogged){
    let addForm=document.querySelector('aside form');
    let addFormButton=addForm.querySelector('button');
    addFormButton.disabled=!isLogged;
}
//18d883a6b5ce4281e25dfc8b7a8814f2a29add506d54f2f0c049952dceb29087 Access token
//c2a476c9-353b-43ca-a773-cdb5ae79bc9c

function createFishCatch(fishCatch){
    let isDisabled;
    
    if(fishCatch._ownerId!==localStorage.getItem('userId')){
         isDisabled=true
    }
    let divCatch=createElement('div',[],['catch'],{'_ownerId':fishCatch._ownerId},
        createElement('label',[],[],{},'Angler'),
        createElement('input',[],['angler'],{'type':"text",'disabled':isDisabled},fishCatch.angler),
        createElement('label',[],[],{},'Weight'),
        createElement('input',[],['weight'],{'type':"text",'disabled':isDisabled},fishCatch.weight),
        createElement('label',[],[],{},'Species'),
        createElement('input',[],['species'],{'type':"text",'disabled':isDisabled},fishCatch.species),
        createElement('label',[],[],{},'Location'),
        createElement('input',[],['location'],{'type':"text",'disabled':isDisabled},fishCatch.location),
        createElement('label',[],[],{},'Bait'),
        createElement('input',[],['bait'],{'type':"text",'disabled':isDisabled},fishCatch.bait),
        createElement('label',[],[],{},'Capture Time'),
        createElement('input',[],['captureTime'],{'type':"number",'disabled':isDisabled},fishCatch.captureTime),
        createElement('button',[],['update'],{'data-id':fishCatch._ownerId,'entry-id':fishCatch._id,'disabled':isDisabled},'Update'),
        createElement('button',[],['delete'],{'data-id':fishCatch._ownerId,'entry-id':fishCatch._id,'disabled':isDisabled},'Delete')
    
    )
    
    let buttons=divCatch.querySelectorAll('button');
    let updateBtn=buttons[0];
    updateBtn.addEventListener('click',(ev)=>{
        let data={}
        Array.from(ev.target.parentElement.children)
            .filter((child)=>child.nodeName==='INPUT')
            .forEach((child)=>{
                data[child.className]=child.value
            })
            
        let token=localStorage.getItem('accessToken');
        editDataToServer(data,'http://localhost:3030/data/catches)',ev.target['entry-id'],localStorage.getItem('accessToken'));
        loadPageData()
    })
    let deleteBtn=buttons[1];

document.getElementById('catches').appendChild(divCatch)
}

