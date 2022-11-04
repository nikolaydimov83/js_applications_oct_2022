import { html,render } from './node_modules/lit-html/lit-html.js';
import { repeat } from './node_modules/lit-	html/directives/repeat.js';




let a=[5,6,7]
console.log([...a.entries()].forEach((entry)=>console.log(`${entry[0]}:${entry[1]}`)))



let form=document.querySelector('form');
let container=document.getElementById('root')
form.addEventListener('submit',(ev)=>{
    ev.preventDefault();
    let formData=[...(new FormData(form)).entries()]
    let towns=formData[0][1].split(', ')
    let listTempalte=html`<ul>${repeat(towns,(i)=>i.id,(i,index)=>html` <li>${i}</li>`)}</ul>`
    render(listTempalte,container)

     
})