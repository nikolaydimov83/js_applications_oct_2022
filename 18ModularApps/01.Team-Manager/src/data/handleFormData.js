
const allowedTypes={
    "make":'make',
    "model":'make',
    'material':'material',
    'description':'description',
    'img':'img',
    'price':'price',
    'email':'email',
    'year':'year',
    'password':'password',
    'repass':'password',
    'username':'username',
    'name':'name',
    'logoUrl':'logoUrl'
}
export function loadFormData(form){
    
    let formDataObject={}
    let wrongFieldsObject={}
    let wrongData=false
    let formData=new FormData(form)
    for (const [key,value] of formData) {
        formDataObject[key]=value
    } 
    Object.entries(formDataObject).forEach((entry)=>{
        try{
            checkInputCorrect(entry[1],allowedTypes,entry[0])
            wrongFieldsObject[entry[0]]=false
        }catch(err){
            wrongFieldsObject[entry[0]]=true
            wrongData=true
        }
        
    })
    if (wrongData){
        wrongFieldsObject.message='Invalid input';
        throw wrongFieldsObject
    }
    return formDataObject

}

export function loadInputValuesOutsideForm(inputsWrapper){
    let data={}
    let wrongFieldsObject={}
    let wrongData=false
    Array.from(inputsWrapper.children)
        .filter((child)=>child.nodeName==='INPUT')
        .forEach((child)=>{
            try{
                checkInputCorrect(child.value,allowedTypes,child.name);
                data[child.name]=child.value; 
            }catch(err){
                wrongFieldsObject[child.name]=true
                wrongData=true
            }

        })
        if (wrongData){
            wrongFieldsObject.message='Invalid input';
            throw wrongFieldsObject
        }
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
        let regex=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
        let emailValid=regex.test(value)
        if (!emailValid){
            throw new Error('Wrong input')
        }  
    },
    'password':()=>{
        if ((value===''||value.length<3)){
            throw new Error('Wrong input')
        }
    },
    'username':()=>{
        if ((value===''||value.length<3)){
            throw new Error('Wrong input')
        }
    },

    'string':()=>{
        if ((value==='')){
            throw new Error('Wrong input')
        }
    },
    'logoUrl':()=>{
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
    'name':()=>{
        if ((value===''||value.length<=4)){
            throw new Error('Wrong input')
        }
    },
    'material':()=>console.log('material is optional')

   }   
    action[allowedTypes[type]]()
}

