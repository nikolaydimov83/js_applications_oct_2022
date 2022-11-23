import { get, post } from '../api/api.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat } from '../lib.js';
import { setUserData } from '../utils.js';
import { errorHandler } from './errorHandler.js';

let loginTemplate=()=>html`<section id="login-page" class="auth">
<form @submit=${submitLoginForm} id="login">
    <h1 class="title">Login</h1>

    <article class="input-group">
        <label for="login-email">Email: </label>
        <input type="email" id="login-email" name="email">
    </article>

    <article class="input-group">
        <label for="password">Password: </label>
        <input type="password" id="password" name="password">
    </article>

    <input type="submit" class="btn submit-btn" value="Log In">
</form>
</section>`

let outerCtx=null;
export async function showLogin(ctx){
    outerCtx=ctx
    try{
        ctx.renderView(loginTemplate());
    }catch(error){
        errorHandler(error);
    }

}

async function submitLoginForm(ev){
    ev.preventDefault();
    try {
        let data=loadFormData(ev.target);
        let serverResponseData=await post('/users/login',data);
        setUserData(serverResponseData);
        ev.target.reset();
        outerCtx.renderNav();
        outerCtx.page.redirect('/dashboard')
    } catch (error) {
        errorHandler(error);
    }


}