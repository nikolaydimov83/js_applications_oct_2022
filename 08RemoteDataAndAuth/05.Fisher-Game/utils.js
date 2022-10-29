const allowedTypes={
    "angler":'string',
    'weight':'number',
    'species':'string',
    'location':'string',
    'bait':'string',
    'email':'string',
    'password':'string',
    'captureTime':'number',
    'rePass':'string'
}

export async function sendDataToServer(data,url,token){
    let dataStringified=JSON.stringify(data);
    try{
        let response;
        if (token){
         response=await fetch(url,{
        method:'post',
        headers:{
            'content-type':'application/json',
            'X-Authorization':token
        },
        body:dataStringified
    });
        }else{
            response=await fetch(url,{
                method:'post',
                headers:{
                    'content-type':'application/json'
                },
                body:dataStringified
            })
        }

    await checkResponse(response)
    let responseData=await response.json();
    
return responseData;
    }catch(err){
        errorHandler(err)
    }

}



export async function editDataToServer(data,url,id,token){
    let newUrl=url+'/'+id;
    let dataStringified=JSON.stringify(data);
    try{
            let response=await fetch(newUrl,{
        method:'put',
        headers:{
            'content-type':'application/json',
            'X-Authorization':token
        },
        body:dataStringified
    });
    await checkResponse(response)
    let responseData=await response.json();
   

    }catch(err){
        errorHandler(err)
    }

}

export async function deleteDataFromServer(id,url,token){
  let newUrl=url+'/'+id
    try{
        let headersContent={'content-type':'application/json'}
        if (token){
            headersContent['X-Authorization']=token
        }
        let response=await fetch(newUrl,{
        method:'delete',
        headers:headersContent
    });
    await checkResponse(response)
    let responseData=await response.json();


    }catch(err){
        errorHandler(err)
    }

}

export async function getDataFromServer(url,headers){
    try{
        let response
        if (headers){
            response=await fetch(url,{
                headers:headers
            });
        }else{
            response=await fetch(url);
        }

        await checkResponse(response);
        let data=await response.json()
        return data
    }catch(err){
        errorHandler(err)
    }

}

export function errorHandler(err){
    console.log(err.message);
    
}
async function checkResponse(response){
    if(!response.ok){
        let error=await response.json();
        throw new Error(error);
    }
}

export function createElement(type,attributes,classes,properties,...content){
    let element=document.createElement(type);
    attributes.forEach(attribute => {
        element[attribute]=true;
    });
    classes.forEach((className)=>{
        element.classList.add(className);
    })
    Object.entries(properties).forEach((property)=>{
        element[property[0]]=property[1]
    })
    content.forEach((childElement)=>{
    if (type!='input'){
        if (typeof childElement==='number'||typeof childElement==='string'){
            
            childElement=document.createTextNode(childElement)
        }
        
        element.appendChild(childElement)
    }else{
        element.value=childElement;
    }
    })
    return element
}

export function loadFormData(form){
    let formDataObject={}
    let formData=new FormData(form)
    for (const [key,value] of formData) {
        formDataObject[key]=value
    } 
    Object.entries(formDataObject).forEach((entry)=>{
        checkInputCorrect(entry[1],allowedTypes,entry[0])
    })
    return formDataObject

}

export function loadInputValuesOutsideForm(inputsWrapper){
    let data={}
    Array.from(inputsWrapper.children)
        .filter((child)=>child.nodeName==='INPUT')
        .forEach((child)=>{
                checkInputCorrect(child.value,allowedTypes,child.className);
                data[child.className]=child.value; 
        })

return data    
}
 function checkInputCorrect(value,allowedTypes,type){

   let action={
    'number':()=>{
        if ((isNaN(value)||value==='')){
        throw new Error('Wrong input')
    }  
},
    'string':()=>{
        if ((value==='')){
            throw new Error('Wrong input')
        }
    }
   }   
    action[allowedTypes[type]]()
}
