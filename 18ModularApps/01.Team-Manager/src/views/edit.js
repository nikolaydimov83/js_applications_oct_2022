import { html } from '../../node_modules/lit-html/lit-html.js';
import { editDataToServer, endPoints,sendDataToServer } from '../data/api.js';
import { loadFormData } from '../data/handleFormData.js';

let editFormTemplate=(submitEdit,err,teamInfo)=>html`            <section id="edit">
<article class="narrow">
    <header class="pad-med">
        <h1>Edit Team</h1>
    </header>
    <form @submit=${submitEdit} id="edit-form" class="main-form pad-large">
        <div style=${err?'':'display:none'} class="error">${err.message}</div>
        <label>Team name: <input .value=${teamInfo.name} type="text" name="name"></label>
        <label>Logo URL: <input .value=${teamInfo.logoUrl} type="text" name="logoUrl"></label>
        <label>Description: <textarea name="description">${teamInfo.description}</textarea></label>
        <input class="action cta" type="submit" value="Save Changes">
    </form>
</article>
</section>`

export function showEdit(ctx){
    ctx.renderView(editFormTemplate(submitEdit,false,ctx.page.teamInfo));

    async function submitEdit(ev){
        ev.preventDefault();
        try {
            let data=loadFormData(ev.target);
            let serverResponseData=await editDataToServer(data,endPoints.browse,ctx.page.teamInfo._id,endPoints.token())
            console.log(serverResponseData)

            ctx.page.redirect('/browse')
        } catch (error) {
            ctx.renderView(editFormTemplate(submitEdit,error,ctx.page.teamInfo));
        }
        
    }
}