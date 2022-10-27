
window.addEventListener('load',onLoad)
let url='http://localhost:3030/jsonstore/collections/books';
let loadBtn=document.getElementById('loadBooks')
loadBtn.addEventListener('click',onBookClick);
let form=document.querySelector('form');
form.addEventListener('submit',onBookClick)

async function onLoad(ev){
    let data=await getDataFromServer(url)
    renderTbody(data)
}

function renderTbody(data){
    document.querySelector('tbody').replaceChildren()
  let books=Object.entries(data);
 
  books.forEach((book)=>{
    let tr=createElement(`tr`,[],[],
        createElement(`td`,[],[],book[1].title),
        createElement(`td`,[],[],book[1].author),
        createElement('button',[],[],'Edit'),
        createElement('button',[],[],'Delete'));
        tr.id=book[0]

        tr.addEventListener('click',onBookClick);

  document.querySelector('tbody').appendChild(tr)
    });
  
}
async function sendDataToServer(data,url){
    let dataStringified=JSON.stringify(data);
    let response=await fetch(url,{
        method:'post',
        headers:{
            'content-type':'application/json'
        },
        body:dataStringified
    });
    await checkResponse(response)
    let responseData=await response.json();
    console.log(responseData);
}
async function getDataFromServer(url){
    let response=await fetch(url);
    await checkResponse(response);
    let data=await response.json()
    return data
}
async function checkResponse(response){
    if(!response.ok){
        let error=await response.json();
        throw new Error(error);
    }
}
function onBookClick(ev){
let action={
    "edit":onEdit,
    'delete':onDelete,
    'submit':onsubmit,
    'load all books':onLoad
}
if(action[ev.target.textContent.toLowerCase()]){

    action[ev.target.textContent.toLowerCase()](ev)
}

    


}
function onsubmit(ev){
    ev.preventDefault();
    let form=ev.target.parentElement
    let formData=new FormData(form);
    let data={
        'title':formData.get('title'),
        'author':formData.get('author')
    }
    try{
        sendDataToServer(data);
    }catch(err){
        
    }
    
}
function onEdit(){
console.log('edit');
}
function onDelete(){
console.log('delete');
}
function createElement(type,attributes,classes,...content){
    let element=document.createElement(type);
    attributes.forEach(attribute => {
        element[attribute]=true;
    });
    classes.forEach((className)=>{
        element.classList.add(className);
    })
    content.forEach((childElement)=>{

        if (typeof childElement==='number'||typeof childElement==='string'){
            childElement=document.createTextNode(childElement)
        }
        
        element.appendChild(childElement)
    })
    return element
}

