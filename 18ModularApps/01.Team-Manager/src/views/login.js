import { html } from '../../node_modules/lit-html/lit-html.js';
import { endPoints,sendDataToServer } from '../data/api.js';
import { loadFormData } from '../data/handleFormData.js';

let loginTemplate=(submitLogin,err)=>html`<section id="login">
<article class="narrow">
    <header class="pad-med">
        <h1>Login</h1>
    </header>
    <form @submit=${submitLogin} id="login-form" class="main-form pad-large">
        <div style=${err?'':'display:none'} class="error">${err.message}</div>
        <label>E-mail: <input type="text" name="email"></label>
        <label>Password: <input type="password" name="password"></label>
        <input class="action cta" type="submit" value="Sign In">
    </form>
    <footer class="pad-small">Don't have an account? <a href="/register" class="invert">Sign up here</a>
    </footer>
</article>
</section>`

export async function showLogin(ctx){
    ctx.renderView(loginTemplate(submitLogin,false))
    
    async function submitLogin(ev){
        ev.preventDefault()
     
        try{
            let data = loadFormData(ev.target)
            let userData=await sendDataToServer(data,endPoints.login);
            sessionStorage.setItem('userData',JSON.stringify(userData));
            ev.target.reset();
            ctx.renderNav();
            ctx.page.redirect('/')
        }catch(err){
            ctx.renderView(loginTemplate(submitLogin,err))
        }
        
    }
}