import { get, post } from '../api/api.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat } from '../lib.js';
import { setUserData } from '../utils.js';
import { errorHandler } from './errorHandler.js';

let registerTemplate=()=>html`        <section id="register">
<div class="container">
    <form @submit=${submitRegisterForm} id="register-form">
        <h1>Register</h1>
        <p>Please fill in this form to create an account.</p>
        <hr>

        <p>Username</p>
        <input type="text" placeholder="Enter Username" name="username" required>

        <p>Password</p>
        <input type="password" placeholder="Enter Password" name="password" required>

        <p>Repeat Password</p>
        <input type="password" placeholder="Repeat Password" name="repeatPass" required>
        <hr>

        <input type="submit" class="registerbtn" value="Register">
    </form>
    <div class="signin">
        <p>Already have an account?
            <a href="/login">Sign in</a>.
        </p>
    </div>
</div>
</section>`

let outerCtx=null;
export async function showRegister(ctx){
    outerCtx=ctx
    try{
        ctx.renderView(registerTemplate());
    }catch(error){
        errorHandler(error);
    }

}

async function submitRegisterForm(ev){
    ev.preventDefault();
    try {
        let data=loadFormData(ev.target);
        if (data.password!=data[`repeatPass`]){
            throw new Error('Passwords do not match!');
        }
        let serverResponseData=await post('/users/register',data);
        setUserData(serverResponseData);
        ev.target.reset();
        outerCtx.renderNav();
        outerCtx.page.redirect('/dashboard')
    } catch (error) {
        errorHandler(error);
    }


}