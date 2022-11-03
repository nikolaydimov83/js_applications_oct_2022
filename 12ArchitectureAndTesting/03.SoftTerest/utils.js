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