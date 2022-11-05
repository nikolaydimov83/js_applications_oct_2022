import { html, render } from './node_modules/lit-html/lit-html.js';
import { repeat } from './node_modules/lit-	html/directives/repeat.js';

async function addItem() {
    let serverResponse=await fetch('http://localhost:3030/jsonstore/advanced/dropdown')
    let data =await serverResponse.json()
    let dataArr=Object.values(data)
    let templateFullList=(dataArr)=>html`${repeat(dataArr,(listInfo)=>listInfo._id,(listInfo,index)=>html`<option .value=${listInfo._id}>${listInfo.text}</option>`)}`
    let container=document.getElementById('menu');
    render(templateFullList(dataArr),container)
console.log(dataArr)
    let form =document.querySelector('form');
    form.addEventListener('submit',submitOption)
    async function submitOption(ev){
        ev.preventDefault();
        let formData=document.getElementById('itemText').value
        let sendData={}
        sendData['text']=formData;
        let dataStringified=JSON.stringify(sendData)
        let serverResponse=await fetch('http://localhost:3030/jsonstore/advanced/dropdown',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:dataStringified
        });
        if (!serverResponse.ok){
            throw new Error('Err')
        }
        let data1=await serverResponse.json()
        let serverResponse1=await fetch('http://localhost:3030/jsonstore/advanced/dropdown')
        let data =await serverResponse1.json()
        let dataArr=Object.values(data)
        console.log(dataArr)
        form.reset()
        render(templateFullList(dataArr),container)
    }
}


addItem()