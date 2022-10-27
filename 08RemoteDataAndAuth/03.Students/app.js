
    let form = document.getElementById('form');
    let tbody=document.querySelector('tbody');
    form.addEventListener('submit',onSubmit)
    window.addEventListener('load',async ()=>{
        let url='http://localhost:3030/jsonstore/collections/students';
        let data=await getDataFromServer(url);
        renderTbody(tbody,data);
    })

    async function onSubmit(ev){
        ev.preventDefault();
        try{
            let formData = new FormData(ev.target);
            let formEntries=[...formData.entries()];
            let student={};

            
            formEntries.forEach((entry)=>{
                if (!entry[1]||((entry[0]==='grade')&&isNaN(entry[1]))){
                    throw new Error('Wrong input');
                }
                student[entry[0]]=entry[1];

            });


            let url='http://localhost:3030/jsonstore/collections/students';
            await sendDataToServer(student,url);
            let data=await getDataFromServer(url);
            renderTbody(tbody,data);
        }catch(err){
            handleError(err)
        }

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
function renderTbody(tbody, data){

tbody.innerHTML=''
let values=Object.values(data);
values.forEach((value)=>{
    delete value._id;
    let tr=document.createElement('tr');
    let valuesOfProperties=Object.values(value);
    
    valuesOfProperties.forEach((studentProperty)=>{
       
            createTd(studentProperty,tr)
        
        
    })
tbody.appendChild(tr);
})


function createTd(value,tr,lastIndex){
    
    let td =document.createElement('td');
    td.textContent=value;
    tr.appendChild(td)
}


}
function handleError(err){
    console.log(err.message)
}


