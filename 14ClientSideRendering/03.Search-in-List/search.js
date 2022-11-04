import { towns } from './towns.js';
import { html, render } from './node_modules/lit-html/lit-html.js';
import { repeat } from './node_modules/lit-	html/directives/repeat.js';

let btn=document.querySelector('button')
btn.addEventListener('click',search)
let container=document.getElementById('towns');

function findTowns() {
   let searchValue = document.querySelector('input').value;
   let newTowns = [];
  
      newTowns=towns.map((town,index,)=>{
      let className=''
      if(searchValue!==''&&town.toLowerCase().includes(searchValue.toLowerCase())){
         className='active'
      }
      return {town,className}
      })

   
   return newTowns;
}

let newTowns=findTowns()

let townsTemplate=()=>html`<ul>
${repeat(newTowns,(town)=>town.id,(town,index)=>html`<li class=${town.className}>${town.town}</li>`)}
</ul>`
render(townsTemplate(newTowns),container)
function search() {
newTowns=findTowns()

render(townsTemplate(),container)
let numberOfFoundTowns=newTowns.filter((town)=>town.className==='active')
document.getElementById('result').textContent=`${numberOfFoundTowns.length} matches found`

}
