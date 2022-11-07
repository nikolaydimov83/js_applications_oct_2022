
const allowedTypes={
    "make":'make',
    "model":'make',
    'username':'string',
    'description':'description',
    'img':'img',
    'price':'price',
    'email':'email',
    'password':'password',
    'year':'year',
    'repeatPassword':'password',
    'material':'material'
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
    'year':()=>{
        if ((isNaN(value)||value===''||value<1950||value>2050)){
        throw new Error('Wrong input')
    }  
},
'price':()=>{
    if ((isNaN(value)||value===''||value<=0)){
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
    'make':()=>{
        if ((value===''||value.length<4)){
            throw new Error('Wrong input')
        }
    },
    'img':()=>{
        if ((value==='')){
            throw new Error('Wrong input')
        }
    },
    'description':()=>{
        if ((value===''||value.length<=10)){
            throw new Error('Wrong input')
        }
    },
    'material':()=>console.log('material is optional')

   }   
    action[allowedTypes[type]]()
}

