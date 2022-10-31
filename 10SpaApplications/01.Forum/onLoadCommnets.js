import { loadFormData } from "./handleFormData.js";
import { createElement, errorHandler, getDataFromServer, sendDataToServer } from "./utils.js";
//document.querySelector(`.theme-content`)

let homeViewForm=document.querySelector('.new-topic-border');
let homeViewTitles=document.querySelector('.topic-title');
let main=document.querySelector('main');


export async function loadCommnetPage(ev,id){
if (ev instanceof PointerEvent){
    ev.preventDefault();
}
if (!id){
    id=this.id
}
let mainPostData=await getDataFromServer(`http://localhost:3030/jsonstore/collections/myboard/posts/${/*this.*/id}`)
mainPostData.titleId=/*this.*/id;
let mainPost=renderMainPost(mainPostData);

let allCommnetsData=await getDataFromServer('http://localhost:3030/jsonstore/collections/myboard/comments');

let commentsForThisPost=Object.entries(allCommnetsData).filter((entry)=>entry[1].titleId===/*this.*/id)
renderAllCommnets(commentsForThisPost,mainPost)
main.replaceChildren()
main.appendChild(mainPost)
document.querySelector('.theme-content').appendChild(renderSendCommentForm())
} 

function renderMainPost(data){
    let mainPostElement=createElement('div',[],['theme-content'],{'titleId':data.titleId},
        createElement('div',[],['comment'],{},
            createElement('div',[],['header'],{},
                createElement('img',[],[],{'src':'./static/profile.png','alt':'avatar'},''),
                createElement('p',[],[],{},
                    createElement('span',[],[],{},data.username),' posted on ',
                    createElement('time',[],[],{},data.time)),
                createElement('p',[],['post-content'],{},data.postText))))
    return mainPostElement
}
function renderAllCommnets(commentsForThisPost,elementToAppendTo){
    
    commentsForThisPost.forEach((comment)=>{
        let commentElement=
        createElement('div',[],[],{'id':'user-comment'},
            createElement('div',[],['topic-name-wrapper'],{},
                createElement('div',[],['topic-name'],{},
                    createElement('p',[],[],{},
                        createElement('strong',[],[],{},`${comment[1].username}`),' commented on ',
                        createElement('time',[],[],{},`${comment[1].time}`)),
                    createElement('div',[],['post-content'],{},
                    createElement('p',[],[],{},`${comment[1].postText}`)))));
        elementToAppendTo.appendChild(commentElement)
    })
}
function renderSendCommentForm(){
let wrappedFormEllement=
    createElement('div',[],['answer-comment'],{},
        createElement('p',[],[],{},
            createElement('span',[],[],{},'currentUser'),' comment:'),
            createElement('div',[],['answer'],{},
                createElement('form',[],[],{},
                    createElement('textarea',[],[],{'name':'postText','id':'comment','cols':30,'rows':10},''),
                    createElement('div',[],[],{},
                        createElement('label',[],[],{'for':'username'},'Username',
                            createElement('span',[],['red'],{},'*')),
                        createElement('input',[],[],{'type':'text','name':'username','id':'username'},'')),
                    createElement('button',[],[],{},'Post'))));
wrappedFormEllement.addEventListener('submit',submitCommentForm);
return wrappedFormEllement
}
async function submitCommentForm(ev){
    ev.preventDefault();
    try{
        let objectToSend=loadFormData(ev.target);
        objectToSend.time=new Date();
        objectToSend.titleId=document.querySelector('.theme-content').titleId
        let data=await sendDataToServer(objectToSend,'http://localhost:3030/jsonstore/collections/myboard/comments')
        console.log(data)
        let event1=document.querySelector('.theme-content').titleId
        loadCommnetPage(event1,event1)
        
    }catch(err){
        errorHandler(err)
    }
}

