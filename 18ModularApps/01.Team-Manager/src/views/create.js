import { html } from '../../node_modules/lit-html/lit-html.js';
import { editDataToServer, endPoints,sendDataToServer } from '../data/api.js';
import { loadFormData } from '../data/handleFormData.js';

let creteFormTemplate=(submitCreate,err)=>html`<section id="create">
<article class="narrow">
    <header class="pad-med">
        <h1>New Team</h1>
    </header>
    <form @submit=${submitCreate} id="create-form" class="main-form pad-large">
    <div style=${err?'':'display:none'} class="error">${err.message}</div>
        <label>Team name: <input type="text" name="name"></label>
        <label>Logo URL: <input type="text" name="logoUrl"></label>
        <label>Description: <textarea name="description"></textarea></label>
        <input class="action cta" type="submit" value="Create Team">
    </form>
</article>
</section>`

export function showCreate(ctx){
    ctx.renderView(creteFormTemplate(submitCreate,false));

    async function submitCreate(ev){
        ev.preventDefault();
        try {
            let data=loadFormData(ev.target);
            let serverResponseData=await sendDataToServer(data,endPoints.browse,endPoints.token());
            console.log(serverResponseData)
            let requestedMembershipResponse=await sendDataToServer({teamId:serverResponseData._id},endPoints.memberStatus,endPoints.token());
            console.log(requestedMembershipResponse)
            let finalData=await editDataToServer({status:'member'},endPoints.memberStatus,requestedMembershipResponse._id,endPoints.token())
            console.log(finalData)
            ctx.page.redirect('/browse')
        } catch (error) {
            ctx.renderView(creteFormTemplate(submitCreate,error));
        }
        
    }
}