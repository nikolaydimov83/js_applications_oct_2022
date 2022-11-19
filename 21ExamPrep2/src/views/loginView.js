import { get, post } from '../api/api.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat } from '../lib.js';
import { setUserData } from '../utils.js';

let loginTemplate=()=>html`<section id="login-page" class="login">
<form @submit=${submitLoginForm} id="login-form" action="" method="">
    <fieldset>
        <legend>Login Form</legend>
        <p class="field">
            <label for="email">Email</label>
            <span class="input">
                <input type="text" name="email" id="email" placeholder="Email">
            </span>
        </p>
        <p class="field">
            <label for="password">Password</label>
            <span class="input">
                <input type="password" name="password" id="password" placeholder="Password">
            </span>
        </p>
        <input class="button submit" type="submit" value="Login">
    </fieldset>
</form>
</section>`
let outerCtx=null;
export async function showLogin(ctx){
    outerCtx=ctx
    try{
        ctx.renderView(loginTemplate());
    }catch(error){
        alert(error.message);
        //errorHandler(error);
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
        alert(error.message)//errorHandler(error);
    }


}