import { html } from '../../node_modules/lit-html/lit-html.js'
import { errorHandler, sendDataToServer } from '../data/api.js'
import { loadFormData } from '../data/handleFormData.js'


const tempalteLogin=(loginSubmit)=>html`<div class="row space-top">
    <div class="col-md-12">
        <h1>Login User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${loginSubmit}>
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
            <input type="submit" class="btn btn-primary" value="Login" />
        </div>
    </div>
</form>`
export function showLogin(ctx){
ctx.render(tempalteLogin(loginSubmit))

async function loginSubmit(ev){
    ev.preventDefault()
    let data=loadFormData(ev.target)
    try{
        let returnedData=await sendDataToServer(data,`users/login`);
        sessionStorage.setItem('userData',JSON.stringify(returnedData));
        ev.target.reset();
        ctx.page.redirect('/catalog')

    }catch(err){
        errorHandler(err)
    }
    
}
}