import { createElement } from "./utils.js";

let nav=document.querySelector('nav');
//let homeNav=nav.querySelector('img');
let dashBoardNav=nav.querySelectorAll('li')[0];
let createNav=nav.querySelectorAll('li')[1];
let logoutNav=nav.querySelectorAll('li')[2];
let loginNav=nav.querySelectorAll('li')[3];
let registerNav=nav.querySelectorAll('li')[4];

export function renderView(viewElement){
    renderNav()
    let footer=document.querySelector('footer');
    let body=document.querySelector('body');
    body.replaceChildren();
    body.appendChild(nav);
    body.appendChild(viewElement);
    body.appendChild(footer);  
}

export function renderNav(){
    let isLogged=localStorage.getItem('userData');
    
    if (isLogged){
      nav.querySelector('ul').replaceChildren(dashBoardNav,createNav,logoutNav);  
    }else{
        nav.querySelector('ul').replaceChildren(dashBoardNav,loginNav,registerNav);
    }
}

export function renderIdea(idea){
    let ideaElement=createElement('div',[],[`card`, 'overflow-hidden', `current-card`, `details`],{'style':`width: 20rem; height: 18rem;`},
        createElement('div',[],['card-body'],{},
            createElement('p',[],['card-text'],{},idea.title)),
        createElement('img',[],['card-image'],{'src':idea.img,'alt':'Card image cap'},''),
        createElement('a',[],['btn'],{'href':'','id':idea._id},'Details'));
        //ideaElement.querySelector('a').addEventListener('click',goTo)
        return ideaElement;
}
export function renderIdeaDetail(ideaDetail){
    let deleteAVisible='hidden'
    if(JSON.parse(localStorage.getItem('userData'))){
        deleteAVisible=ideaDetail._ownerId===JSON.parse(localStorage.getItem('userData'))._id?'':'hidden';
    }
    
    let ideaDetailElement=
    createElement('div',[],['container','home','some'],{},
        createElement('img',[],['det-img'],{src:ideaDetail.img}),
        createElement('div',[],['desc'],{},
            createElement('h2',[],['display-5'],{},ideaDetail.title),
            createElement('p',[],['infoType'],{},'Description:'),
            createElement('p',[],['idea-description'],{},ideaDetail.description)),
            createElement('div',[],['text-center'],{},
                createElement('a',[deleteAVisible],['btn','detb'],{href:'',ownerId:ideaDetail._ownerId,ideaId:ideaDetail._id},'Delete')));
    return ideaDetailElement
}