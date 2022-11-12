
import { html, render } from '../../node_modules/lit-html/lit-html.js';

let errorTemplate=(err)=>html`<div class="modal">
<p>${err.message}</p>
<a @click=${hideOverlay} href="/" class="action">Ok</a>
</div>`

export function renderNonFormError(err){
    render(errorTemplate(err),document.querySelector('.overlay'));
    document.querySelector('.overlay').style.display='';
//document.querySelector('main').appendChild(errorTemplate(err));

}
function hideOverlay(){
    document.querySelector('.overlay').style.display='none';
}