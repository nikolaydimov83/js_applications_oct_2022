import { html } from '../../node_modules/lit-html/lit-html.js';
import {classMap} from '../../node_modules/lit-html/directives/class-map.js'
import { editDataToServer, errorHandler, getDataFromServer, sendDataToServer } from '../data/api.js';
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

let editTemplate=(data,submitEditForm,classListInputs,checkInputCorrect)=>html`<div class="row space-top">
<div class="col-md-12">
    <h1>Edit Furniture</h1>
    <p>Please fill all fields.</p>
</div>
</div>
<form @submit=${submitEditForm}>
<div class="row space-top">
    <div class="col-md-4">
        <div class="form-group">
            <label class="form-control-label" for="new-make">Make</label>
            <input .value=${data.make} @change=${checkInputCorrect} class="form-control  ${assignInputClasses(classListInputs,'make')}" id="new-make" type="text" name="make">
        </div>
        <div class="form-group has-success">
            <label class="form-control-label" for="new-model">Model</label>
            <input .value=${data.model} @change=${checkInputCorrect} class="form-control ${assignInputClasses(classListInputs,'model')}" id="new-model" type="text" name="model">
        </div>
        <div class="form-group has-danger">
            <label class="form-control-label" for="new-year">Year</label>
            <input .value=${data.year} @change=${checkInputCorrect} class="form-control ${assignInputClasses(classListInputs,'year')}" id="new-year" type="number" name="year">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="new-description">Description</label>
            <input .value=${data.description} @change=${checkInputCorrect} class="form-control ${assignInputClasses(classListInputs,'description')}" id="new-description" type="text" name="description">
        </div>
    </div>
    <div class="col-md-4">
        <div class="form-group">
            <label class="form-control-label" for="new-price">Price</label>
            <input .value=${data.price} @change=${checkInputCorrect} class="form-control ${assignInputClasses(classListInputs,'price')}" id="new-price" type="number" name="price">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="new-image">Image</label>
            <input .value=${data.img} @change=${checkInputCorrect} class="form-control ${assignInputClasses(classListInputs,'img')}" id="new-image" type="text" name="img">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="new-material">Material (optional)</label>
            <input .value=${data.material} class="form-control" id="new-material" type="text" name="material">
        </div>
        <input type="submit" class="btn btn-primary" value="Edit" />
    </div>
</div>
</form>`

export async function showEditFurniture(ctx){
  console.log(ctx)
  let data=ctx.page.focusedFurniture;
  try{
  
    ctx.render(editTemplate(data,submitEditForm,classListInputs,checkInputCorrect));
  }catch(err){
    errorHandler(err)
  }
  
   
   async function submitEditForm(ev){
       ev.preventDefault();
       try{
           let formData=loadFormData(ev.target)
           let data=await editDataToServer(formData,'data/catalog',ctx.page.focusedFurniture._id,JSON.parse(sessionStorage.getItem('userData')).accessToken);
           ev.target.reset();
           ctx.page.redirect('/catalog')
           
       }catch(err){
           errorHandler(err);
           if (err.message==='Invalid input'){
               let inputKeysIsWrong=Object.entries(err);
               inputKeysIsWrong.forEach((inputKeyWrong)=>{
                   classListInputs[inputKeyWrong[0]]={'is-valid':!inputKeyWrong[1],'is-invalid':inputKeyWrong[1]}
               })
               ctx.render(editTemplate(ctx.page.focusedFurniture, submitEditForm,classListInputs,checkInputCorrect));    
           }
       }
   }
   function checkInputCorrect(ev){

       let wrapper=ev.target.parentElement;
       try{
           let data = loadInputValuesOutsideForm(wrapper)
           let inputKeysRight=Object.entries(data);
           inputKeysRight.forEach((inputKeyRight)=>{
               classListInputs[inputKeyRight[0]]={'is-valid':true,'is-invalid':false}
           })
           ctx.render(editTemplate(ctx.page.focusedFurniture,submitEditForm,classListInputs,checkInputCorrect));   
       }catch(err){
           errorHandler(err);
               if (err.message==='Invalid input'){
                   delete err.message
                   let inputKeysIsWrong=Object.entries(err);
                   inputKeysIsWrong.forEach((inputKeyWrong)=>{
                       classListInputs[inputKeyWrong[0]]={'is-valid':false,'is-invalid':true}
                   })
                   ctx.render(editTemplate(ctx.page.focusedFurniture,submitEditForm,classListInputs,checkInputCorrect));    
               }
       }
   }
}