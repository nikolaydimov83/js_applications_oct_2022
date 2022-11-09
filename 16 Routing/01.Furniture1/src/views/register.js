import { html } from '../../node_modules/lit-html/lit-html.js'
import { errorHandler, sendDataToServer } from '../data/api.js'
import { loadFormData } from '../data/handleFormData.js'

let templateRegister=(registerSubmit)=>html`<div class="row space-top">
<div class="col-md-12">
    <h1>Register New User</h1>
    <p>Please fill all fields.</p>
</div>
</div>
<form @submit=${registerSubmit}>
<div class="row space-top">
    <div class="col-md-4">
        <div class="form-group">
            <label class="form-control-label" for="email">Email</label>
            <input class="form-control" id="email" type="text" name="email">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="password">Password</label>
            <input class="form-control" id="password" type="password" name="password">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="rePass">Repeat</label>
            <input class="form-control" id="rePass" type="password" name="rePass">
        </div>
        <input type="submit" class="btn btn-primary" value="Register" />
    </div>
</div>
</form>`

export function showRegister(ctx){
    ctx.render(templateRegister(registerSubmit))

    async function registerSubmit(ev){
        ev.preventDefault()
         try{
        let data=loadFormData(ev.target)
            if(data.password.value!==data.rePass.value){
                throw new Error('Passwords do not match!')
            }
            let returnedData=await sendDataToServer(data,`users/register`);
            sessionStorage.setItem('userData',JSON.stringify(returnedData));
            ev.target.reset();
            ctx.renderNav()
            ctx.page.redirect('/catalog')
    
        }catch(err){
            errorHandler(err)
        }
    }
}

