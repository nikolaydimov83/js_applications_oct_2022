import { html, render } from './node_modules/lit-html/lit-html.js';
import { repeat } from './node_modules/lit-	html/directives/repeat.js';
async function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);
   let response=await fetch('http://localhost:3030/jsonstore/advanced/table');
   let data=await response.json()
   console.log(data)
   let data1=Object.values(data)
   let template=(students)=>html`${repeat(students,(student)=>student._id,(student,index)=>html`<tr class=${addClassToRow(student)}>
   <td>${student.firstName} ${student.lastName}</td>
   <td>${student.email}</td>
   <td>${student.course}</td>
</tr>`)}`;
let container=document.querySelector('tbody')
render(template(data1),container);
function addClassToRow(student){
   let searchField=document.querySelector('#searchField');
   if(searchField.value!==''){
      if(`${student.firstName} ${student.lastName}`.toLowerCase().includes(searchField.value.toLowerCase())||student.email.toLowerCase().includes(searchField.value.toLowerCase())||student.course.toLowerCase().includes(searchField.value.toLowerCase())){
         return 'select'
      }else{
         return ''
      }
   }
}

   function onClick() {
     render(template(data1),container)
     let searchField=document.querySelector('#searchField');
     searchField.value=''

   }
}

solve()