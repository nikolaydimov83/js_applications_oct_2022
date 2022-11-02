
export async function sendDataToServer(data,url,token){
    let dataStringified=JSON.stringify(data);
    
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
    

}



export async function editDataToServer(data,url,id,token){
    let newUrl=url+'/'+id;
    let dataStringified=JSON.stringify(data);
   
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
   



}

export async function deleteDataFromServer(id,url,token){
  let newUrl=url+'/'+id

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




}

export async function getDataFromServer(url,token){

        let response
        if (token){
            response=await fetch(url,{
                method:'get',
                headers:{
                    'content-type':'application/json',
                    'X-Authorization':token
                }
            });
        }else{
            response=await fetch(url);
        }

        await checkResponse(response);
       
            let data=await response.json()
  
        
        return data

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

export function checkIsRegistered(){
    if (localStorage.getItem('accessToken')){
        return true
    }
    return false
}

