import {cats} from './catSeeder.js';
import { html, render } from './node_modules/lit-html/lit-html.js';
import { repeat } from './node_modules/lit-	html/directives/repeat.js';

const myCatTemplate = html`<ul>${repeat(cats, (i) => i.id, (i, index) => html`
    <li>
    <img .src="./images/${i.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
    <div class="info">
        <button @click=${handleClick} .id=btn${i.id} class="showBtn">Show status code</button>
        <div class="status" style="display: none" .id=${i.id}>
            <h4>Status Code: ${i.statusCode}</h4>
            <p>${i.statusMessage}</p>
        </div>
    </div>
</li>`)}
  </ul>
`;
function handleClick(ev,i){
    let hiddenDiv=ev.target.parentElement.children[1]
    if(ev.target.textContent==='Show status code'){
        hiddenDiv.style="display: ''";
        ev.target.textContent='Hide status code'
    }else{
        hiddenDiv.style="display:none";
        ev.target.textContent='Show status code'
    }
    
    render(myCatTemplate,container)
}
let container=document.getElementById('allCats')
render(myCatTemplate,container)

