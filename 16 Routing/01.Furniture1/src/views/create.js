import { html } from '../../node_modules/lit-html/lit-html.js';
import {classMap} from '../../node_modules/lit-html/directives/class-map.js'
import { errorHandler, sendDataToServer } from '../data/api.js';
import { loadFormData,loadInputValuesOutsideForm } from '../data/handleFormData.js';

function assignInputClasses(classListInputs,inputName){
    if (classListInputs[inputName]){
        return classMap(classListInputs[inputName])
    }
    else{
        return ''
    }
}
let classListInputs={}


 const createTemplate=(submitCreateForm,classListInputs,checkInputCorrect)=>html`<div class="row space-top">
 <div class="col-md-12">
     <h1>Create New Furniture</h1>
     <p>Please fill all fields.</p>
 </div>
</div>
<form @submit=${submitCreateForm}>
 <div class="row space-top">
     <div class="col-md-4">
         <div class="form-group">
             <label class="form-control-label" for="new-make">Make</label>
             <input @change=${checkInputCorrect} class="form-control  ${assignInputClasses(classListInputs,'make')}" id="new-make" type="text" name="make">
         </div>
         <div class="form-group has-success">
             <label class="form-control-label" for="new-model">Model</label>
             <input @change=${checkInputCorrect} class="form-control ${assignInputClasses(classListInputs,'model')}" id="new-model" type="text" name="model">
         </div>
         <div class="form-group has-danger">
             <label class="form-control-label" for="new-year">Year</label>
             <input @change=${checkInputCorrect} class="form-control ${assignInputClasses(classListInputs,'year')}" id="new-year" type="number" name="year">
         </div>
         <div class="form-group">
             <label class="form-control-label" for="new-description">Description</label>
             <input @change=${checkInputCorrect} class="form-control ${assignInputClasses(classListInputs,'description')}" id="new-description" type="text" name="description">
         </div>
     </div>
     <div class="col-md-4">
         <div class="form-group">
             <label class="form-control-label" for="new-price">Price</label>
             <input @change=${checkInputCorrect} class="form-control ${assignInputClasses(classListInputs,'price')}" id="new-price" type="number" name="price">
         </div>
         <div class="form-group">
             <label class="form-control-label" for="new-image">Image</label>
             <input @change=${checkInputCorrect} class="form-control ${assignInputClasses(classListInputs,'img')}" id="new-image" type="text" name="img">
         </div>
         <div class="form-group">
             <label class="form-control-label" for="new-material">Material (optional)</label>
             <input class="form-control" id="new-material" type="text" name="material">
         </div>
         <input type="submit" class="btn btn-primary" value="Create" />
     </div>
 </div>
</form>`

 export async function showCreateFurniture(ctx){
   
    ctx.render(createTemplate(submitCreateForm,classListInputs,checkInputCorrect));
    async function submitCreateForm(ev){
        ev.preventDefault();
        try{
            let formData=loadFormData(ev.target)
            let data=await sendDataToServer(formData,'data/catalog',JSON.parse(sessionStorage.getItem('userData')).accessToken);
            ev.target.reset();
            ctx.page.redirect('/catalog')
            
        }catch(err){
            errorHandler(err);
            if (err.message==='Invalid input'){
                let inputKeysIsWrong=Object.entries(err);
                inputKeysIsWrong.forEach((inputKeyWrong)=>{
                    classListInputs[inputKeyWrong[0]]={'is-valid':!inputKeyWrong[1],'is-invalid':inputKeyWrong[1]}
                })
                ctx.render(createTemplate(submitCreateForm,classListInputs,checkInputCorrect));    
            }
        }
    }
    function checkInputCorrect(ev){
    
        let input=ev.target;
        let wrapper=ev.target.parentElement;
        try{
            let data = loadInputValuesOutsideForm(wrapper)
            let inputKeysRight=Object.entries(data);
            inputKeysRight.forEach((inputKeyRight)=>{
                classListInputs[inputKeyRight[0]]={'is-valid':true,'is-invalid':false}
            })
            ctx.render(createTemplate(submitCreateForm,classListInputs,checkInputCorrect));   
        }catch(err){
            errorHandler(err);
                if (err.message==='Invalid input'){
                    delete err.message
                    let inputKeysIsWrong=Object.entries(err);
                    inputKeysIsWrong.forEach((inputKeyWrong)=>{
                        classListInputs[inputKeyWrong[0]]={'is-valid':false,'is-invalid':true}
                    })
                    ctx.render(createTemplate(submitCreateForm,classListInputs,checkInputCorrect));    
                }
        }
    }
 }