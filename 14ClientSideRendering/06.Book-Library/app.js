import { html, render } from './node_modules/lit-html/lit-html.js';
import { repeat } from './node_modules/lit-	html/directives/repeat.js';
import { deleteDataFromServer, editDataToServer, editDataToServer1, getDataFromServer, sendDataToServer } from './api.js';
import { loadFormData } from './handleFormData.js';
let loadUrl=`http://localhost:3030/jsonstore/collections/books`

let templateLoadBtn=(loadUrl)=>html`<button @click=${loadAllBooks} id="loadBooks">LOAD ALL BOOKS</button>`

async function loadAllBooks(ev){

    let response=await fetch(loadUrl)
    let data=await response.json()
    let data1=Object.entries(data);
    data1.forEach((book)=>book[1].id=book[0]);
    renderTable(data1)
   


}
let tempalteTable=(books,ev)=>html`<button @click=${loadAllBooks} id="loadBooks">LOAD ALL BOOKS</button>
<table>
<thead>
    <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Action</th>
    </tr>
</thead>
<tbody>${repeat(books,(book)=>book[1].id,(book,index)=>html`
        <tr>
        <td>${book[1].title}</td>
        <td>${book[1].author}</td>
        <td id=${book[1].id}>
            <button @click=${editBook}>Edit</button>
            <button @click=${deleteBook}>Delete</button>
        </td>
    </tr>

`)}

</tbody>
</table>
<form id="add-form" @submit=${submitAdd} style=${setAddFormStyle(ev)}>
<h3>Add book</h3>
<label>TITLE</label>
<input type="text" name="title" placeholder="Title...">
<label>AUTHOR</label>
<input type="text" name="author" placeholder="Author...">
<input type="submit" value="Submit">
</form>

<form @submit=${submitEdit} id="edit-form" style=${setEditFormStyle(ev)}>
<input type="hidden" name="id" .value=${setEditId(ev)}>
<h3>Edit book</h3>
<label>TITLE</label>
<input type="text" name="title" placeholder="Title...">
<label>AUTHOR</label>
<input type="text" name="author" placeholder="Author...">
<input type="submit" value="Save">
</form>`
async function deleteBook(ev){
    let id=ev.target.parentElement.id
    await deleteDataFromServer(id,'jsonstore/collections/books/');
    let data=await getDataFromServer('jsonstore/collections/books/');
        let data1=Object.entries(data);
    data1.forEach((book)=>book[1].id=book[0]);
    render(tempalteTable(data1),body)
}
function renderTable(data){

render(tempalteTable(data),body)

}

function setEditId(ev){
    if (ev){
        return ev.target.parentElement.id
    }
}

function setEditFormStyle(ev){
    if (ev){
       if(ev.target.textContent==='Edit'){
        return 'display:""'
       }else{
        return 'display:none';
       }
    }
    return 'display:none';
}

function setAddFormStyle(ev){
    if (ev){
       if((ev.target.textContent!=='Edit')){
        return 'display:""'
       }else{
        return 'display:none';
       }
    }
    return 'display:""';
}

async function editBook(ev){
    let data=await getDataFromServer('jsonstore/collections/books/')
    let data1=Object.entries(data);
        data1.forEach((book)=>book[1].id=book[0]);

    render(tempalteTable(data1,ev),body)

    /*et editform=body.querySelectorAll('form')[1];
    editform.style.display='';
    let deleteform=body.querySelectorAll('form')[0];
    deleteform.style.display='none';
    editform.querySelector('input').value=ev.target.parentElement.id;*/
}

async function submitEdit(ev){
try{
ev.preventDefault()
let formData=loadFormData(ev.target)
console.log(formData)
delete formData.id
console.log(formData)
editDataToServer1(formData,'jsonstore/collections/books',ev.target.querySelector('input').value);
let data=await getDataFromServer('jsonstore/collections/books/')
let data1=Object.entries(data);
    data1.forEach((book)=>book[1].id=book[0]);
    render(tempalteTable(data1),body)
    ev.target.reset()
}catch(err){
    let data=await getDataFromServer('jsonstore/collections/books/')
let data1=Object.entries(data);
    data1.forEach((book)=>book[1].id=book[0]);
    render(tempalteTable(data1),body)
}

}
async function submitAdd(ev){
    try{
    ev.preventDefault()
    let formData=loadFormData(ev.target)
    console.log(formData)

    await sendDataToServer(formData,'jsonstore/collections/books');
    let data=await getDataFromServer('jsonstore/collections/books/')
    let data1=Object.entries(data);
        data1.forEach((book)=>book[1].id=book[0]);
        render(tempalteTable(data1),body)
        ev.target.reset()
    }catch(err){
        let data=await getDataFromServer('jsonstore/collections/books/')
    let data1=Object.entries(data);
        data1.forEach((book)=>book[1].id=book[0]);
        render(tempalteTable(data1,ev),body)
    }
    
    }

let body=document.querySelector('body');
render(templateLoadBtn(loadUrl),body);