import { emptyFormData, loadFormData } from "./handleFormData.js";
import { createElement, errorHandler, getDataFromServer, sendDataToServer } from "./utils.js";
import {loadCommnetPage} from './onLoadCommnets.js'
let urlPosts='http://localhost:3030/jsonstore/collections/myboard/posts';

let homeViewForm=document.querySelector('.new-topic-border');
let homeViewTitles=document.querySelector('.topic-title');
let main=document.querySelector('main');

export async function loadAllCommentsIndexPage(){

main.replaceChildren();
main.appendChild(homeViewForm);
main.appendChild(homeViewTitles);

    try{
        let data=await getDataFromServer(urlPosts);
        console.log(data)
        homeViewTitles.replaceChildren()
        Object.entries(data).forEach((entry)=>{
            let id=entry[0];
            let responseData=entry[1];
            let topicModule=createElement('div',[],['topic-container'],{},
                createElement('div',[],["topic-name-wrapper"],{'id':id},
                    createElement('div',[],["topic-name"],{},
                        createElement('a',[],["normal"],{'href':'#','id':id},
                            createElement('h2',[],[],{'id':id},`${responseData.topicName}`)),
                        createElement('div',[],["columns"],{},
                            createElement('div',[],[],{},
                                createElement('p',[],[],{},'Date: ',
                                    createElement('time',[],[],{},`${responseData.time}`)
                                    ),
                                createElement('div',[],["nick-name"],{},
                                    createElement('p',[],[],{},`Username: `,
                                        createElement('span',[],[],{},`${responseData['username']}`))))))));
            document.querySelector('.topic-title').appendChild(topicModule)
            let commentsA=topicModule.querySelector('a');
            commentsA.addEventListener('click',loadCommnetPage)
        })
    }catch(err){
        errorHandler(err)
    }


}


export function submitFormEvHandler(ev){
    ev.preventDefault();
    
    let submitFormActions={
        'public':async (ev)=>{
        
        try{
            let formDataObj=loadFormData(ev.target);
            formDataObj['time']=new Date()
            let responseData=await sendDataToServer(formDataObj,urlPosts);
            loadAllCommentsIndexPage();
            emptyFormData(ev.target);
        }catch(err){
            errorHandler(err)
        }

        },
        'cancel':(ev)=>emptyFormData(ev.target)

    }
    submitFormActions[ev.submitter.className](ev)
}
export async function createForumContent(ev){
    
    



}