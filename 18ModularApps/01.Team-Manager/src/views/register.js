import { html } from '../../node_modules/lit-html/lit-html.js';
import { endPoints,sendDataToServer } from '../data/api.js';
import { loadFormData } from '../data/handleFormData.js';

let registerTemplate=(submitRegister,err)=>html`<section id="register">
<article class="narrow">
    <header class="pad-med">
        <h1>Register</h1>
    </header>
    <form @submit=${submitRegister} id="register-form" class="main-form pad-large">
        <div style=${err?'':'display:none'} class="error">${err.message}</div>
        <label>E-mail: <input type="text" name="email"></label>
        <label>Username: <input type="text" name="username"></label>
        <label>Password: <input type="password" name="password"></label>
        <label>Repeat: <input type="password" name="repass"></label>
        <input class="action cta" type="submit" value="Create Account">
    </form>
    <footer class="pad-small">Already have an account? <a href="/login" class="invert">Sign in here</a>
    </footer>
</article>
</section>`

export async function showRegister(ctx){
    ctx.renderView(registerTemplate(submitRegister,false))
    
    async function submitRegister(ev){
        ev.preventDefault()
     
        try{
            let data = loadFormData(ev.target)
            if (data.password!==data.repass){
                throw new Error('Passwords do not match!')
            }
            let userData=await sendDataToServer(data,endPoints.register);
        
            sessionStorage.setItem('userData',JSON.stringify(userData));
            ev.target.reset();
            ctx.renderNav();
            ctx.page.redirect('/')
        }catch(err){
            ctx.renderView(registerTemplate(submitRegister,err))
        }
        
    }
}

