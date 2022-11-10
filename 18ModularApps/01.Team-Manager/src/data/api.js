let baseUrl='http://localhost:3030/'

let endPoints={
    token:()=>{
        if(JSON.parse(sessionStorage.getItem('userData'))){
            return JSON.parse(sessionStorage.getItem('userData')).accessToken
        }
        
    },
    register:`users/register`,
    login:`users/login`,
    logout:'users/logout',
    browse:`data/teams`,
    members:`data/members?where=status%3D%22member%22`,
    memberStatus:`data/members`,
    createTeam:`data/teams`
}
export async function sendDataToServer(data,url,token){
    let dataStringified=JSON.stringify(data);
    try{
        let response;
        if (token){
         response=await fetch(baseUrl+url,{
        method:'post',
        headers:{
            'content-type':'application/json',
            'X-Authorization':token
        },
        body:dataStringified
    });
        }else{
            response=await fetch(baseUrl+url,{
                method:'post',
                headers:{
                    'content-type':'application/json'
                },
                body:dataStringified
            })
        }

        await checkResponse(response)
        if (response.status!==204){
            let data=await response.json()
            return data
        }else{
           return response
        }
    }catch(err){
        errorHandler(err)
        throw err
    }

    

}



export async function editDataToServer(data,url,id,token){
    try{
        let newUrl=baseUrl+url+'/'+id;
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
        if (response.status!==204){
            let data=await response.json()
            return data
        }else{
           return response
        }
    }catch(err){
        errorHandler(err)
        throw err
    }




}

export async function deleteDataFromServer(id,url,token){
  try{
        let newUrl=baseUrl+url+'/'+id

        let headersContent={'content-type':'application/json'}
        if (token){
            headersContent['X-Authorization']=token
        }
        let response=await fetch(newUrl,{
        method:'delete',
        headers:headersContent
    });
    await checkResponse(response)
    if (response.status!==204){
        let data=await response.json()
        return data
    }else{
       return response
    }


  }catch(err){
    errorHandler(err)
    throw err
  }




}

export async function getDataFromServer(url,token){
    try{
        let response
        if (token){
            response=await fetch(baseUrl+url,{
                method:'get',
                headers:{
                    'content-type':'application/json',
                    'X-Authorization':token
                }
            });
        }else{
            response=await fetch(baseUrl+url);
        }

        await checkResponse(response);
            if (response.status!==204){
                let data=await response.json()
                return data
            }else{
                response
            } 
        
    }catch(err){
        errorHandler(err)
        throw err
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

export {endPoints}

