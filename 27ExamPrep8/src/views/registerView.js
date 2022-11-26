import { get, post } from '../api/api.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat } from '../lib.js';
import { setUserData } from '../utils.js';
import { errorHandler } from './errorHandler.js';

let registerTemplate=()=>html`        <section id="registerPage">
<form @submit=${submitRegisterForm} class="registerForm">
    <h2>Register</h2>
    <div class="on-dark">
        <label for="email">Email:</label>
        <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
    </div>

    <div class="on-dark">
        <label for="password">Password:</label>
        <input id="password" name="password" type="password" placeholder="********" value="">
    </div>

    <div class="on-dark">
        <label for="repeatPassword">Repeat Password:</label>
        <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
    </div>

    <button class="btn" type="submit">Register</button>

    <p class="field">
        <span>If you have profile click <a href="/login">here</a></span>
    </p>
</form>
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
        if (data.password!=data[`repeatPassword`]){
            throw new Error('Passwords do not match!');
        }
        let serverResponseData=await post('/users/register',data);
        setUserData(serverResponseData);
        ev.target.reset();
        outerCtx.renderNav();
        outerCtx.page.redirect('/')
    } catch (error) {
        errorHandler(error);
    }


}