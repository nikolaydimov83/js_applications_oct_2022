
window.addEventListener('load',onLoad)
let url='http://localhost:3030/jsonstore/collections/books';
let loadBtn=document.getElementById('loadBooks')
loadBtn.addEventListener('click',onBookClick);
let form=document.querySelector('form');
form.addEventListener('submit',onSubmit)

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
        createElement(`td`,[],[],
            createElement('button',[],[],'Edit'),
            createElement('button',[],[],'Delete'))
        );
        tr.id=book[0]

        tr.addEventListener('click',onBookClick);

  document.querySelector('tbody').appendChild(tr)
    });
  
}
async function sendDataToServer(data,url){
    let dataStringified=JSON.stringify(data);
    try{
            let response=await fetch(url,{
        method:'post',
        headers:{
            'content-type':'application/json'
        },
        body:dataStringified
    });
    await checkResponse(response)
    let responseData=await response.json();
    onLoad()

    }catch(err){
        errorHandler(err)
    }

}

async function editDataToServer(data,url,id){
    let newUrl=url+'/'+id;
    let dataStringified=JSON.stringify(data);
    try{
            let response=await fetch(newUrl,{
        method:'put',
        headers:{
            'content-type':'application/json'
        },
        body:dataStringified
    });
    await checkResponse(response)
    let responseData=await response.json();
    onLoad()

    }catch(err){
        errorHandler(err)
    }

}

async function deleteDataFromServer(id,url){
  let newUrl=url+'/'+id
    try{
        let response=await fetch(newUrl,{
        method:'delete',
        headers:{
            'content-type':'application/json'
        }
    });
    await checkResponse(response)
    let responseData=await response.json();
    onLoad()

    }catch(err){
        errorHandler(err)
    }

}

async function getDataFromServer(url){
    try{
        let response=await fetch(url);
        await checkResponse(response);
        let data=await response.json()
        return data
    }catch(err){
        errorHandler(err)
    }

}

function errorHandler(err){
    console.log(err.message);
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
    //'submit':onSubmit,
    'load all books':onLoad
}
if(action[ev.target.textContent.toLowerCase()]){

    action[ev.target.textContent.toLowerCase()](ev)
}

    


}
function onSubmit(ev){
    ev.preventDefault();
    let form=ev.target;
    let formData=new FormData(form);
    let data={
        'title':formData.get('title'),
        'author':formData.get('author')
    }
    if(!data.author||!data.title){
        return
    }
    let id=form.querySelector('button').id
    let action={
        'save':editDataToServer,
        'submit':sendDataToServer
    }
    action[form.querySelector('button').textContent.toLowerCase()](data,url,id)
    form.querySelector('h3').textContent='FORM';
    let inputs=form.querySelectorAll('input');
    inputs[0].value='';
    inputs[1].value='';
    form.querySelector('button').textContent='Submit'

    
}
function onEdit(ev){
    let formBtn = form.querySelector('button');
    formBtn.textContent='Save'
    formBtn.id=ev.target.parentElement.parentElement.id;
   form.querySelector('h3').textContent='Edit FORM';
   let inputs=form.querySelectorAll('input');
   inputs[0].value=ev.target.parentElement.parentElement.children[0].textContent;
   inputs[1].value=ev.target.parentElement.parentElement.children[1].textContent;

}
function onDelete(ev){
    let id=ev.target.parentElement.parentElement.id;
    deleteDataFromServer(id,url)
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

