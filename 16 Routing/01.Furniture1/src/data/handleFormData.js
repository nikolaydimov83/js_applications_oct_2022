
const allowedTypes={
    "title":'title',
    'username':'string',
    'description':'description',
    'imageURL':'img',
    'bait':'string',
    'email':'email',
    'password':'password',
    'captureTime':'number',
    'repeatPassword':'password'
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

export function emptyFormData(inputsWrapper){
    
    Array.from(inputsWrapper.getElementsByTagName('input'))
        
        .forEach((child)=>{
            if (child.type==='text'||child.type==='number'||child.type=='textarea'||child.type=='password')
                child.value='';
        })
    Array.from(inputsWrapper.getElementsByTagName('textarea'))
        
        .forEach((child)=>{
            if (child.type==='text'||child.type==='number'||child.type=='textarea')
                child.value='';
        })


}

 function checkInputCorrect(value,allowedTypes,type){

   let action={
    'number':()=>{
        if ((isNaN(value)||value==='')){
        throw new Error('Wrong input')
    }  
},
    'email':()=>{
        if ((value===''||value.length<3)){
            throw new Error('Wrong input')
        }  
    },
    'password':()=>{
        if ((value===''||value.length<3)){
            throw new Error('Wrong input')
        }
    },

    'string':()=>{
        if ((value==='')){
            throw new Error('Wrong input')
        }
    },
    'title':()=>{
        if ((value===''||value.length<6)){
            throw new Error('Wrong input')
        }
    },
    'img':()=>{
        if ((value===''||value.length<5)){
            throw new Error('Wrong input')
        }
    },
    'description':()=>{
        if ((value===''||value.length<10)){
            throw new Error('Wrong input')
        }
    }

   }   
    action[allowedTypes[type]]()
}

