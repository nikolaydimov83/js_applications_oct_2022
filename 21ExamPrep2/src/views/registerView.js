import { get, post } from '../api/api.js';
import { loadFormData } from '../api/handleFormData.js';
import { html,repeat } from '../lib.js';
import { setUserData } from '../utils.js';


let registerTemplate=()=>html`<section id="register-page" class="register">
<form @submit=${submitRegisterForm} id="register-form" action="" method="">
    <fieldset>
        <legend>Register Form</legend>
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
        <p class="field">
            <label for="repeat-pass">Repeat Password</label>
            <span class="input">
                <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
            </span>
        </p>
        <input class="button submit" type="submit" value="Register">
    </fieldset>
</form>
</section>
`

let outerCtx=null;
export async function showRegister(ctx){
    outerCtx=ctx
    try{
        ctx.renderView(registerTemplate());
    }catch(error){
        //errorHandler(error);
        alert(error.message)
    }

}

async function submitRegisterForm(ev){
    ev.preventDefault();
    try {
        let data=loadFormData(ev.target);
        if (data.password!=data['confirm-pass']){
            throw new Error('Passwords do not match!');
        }
        let serverResponseData=await post('/users/register',data);
        setUserData(serverResponseData);
        ev.target.reset();
        outerCtx.renderNav();
        outerCtx.page.redirect('/dashboard')
    } catch (error) {
        //errorHandler(error);
        alert(error.message)
    }


}