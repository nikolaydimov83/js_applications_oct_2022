import { get, post } from '../api/api.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat } from '../lib.js';
import { setUserData } from '../utils.js';
import { errorHandler } from './errorHandler.js';

let loginTemplate=()=>html`        <section id="loginaPage">
<form @submit=${submitLoginForm} class="loginForm">
    <h2>Login</h2>
    <div>
        <label for="email">Email:</label>
        <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
    </div>
    <div>
        <label for="password">Password:</label>
        <input id="password" name="password" type="password" placeholder="********" value="">
    </div>

    <button class="btn" type="submit">Login</button>

    <p class="field">
        <span>If you don't have profile click <a href="/register">here</a></span>
    </p>
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
        outerCtx.page.redirect('/')
    } catch (error) {
        errorHandler(error);
    }


}