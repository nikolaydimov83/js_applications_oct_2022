import { html } from '../../node_modules/lit-html/lit-html.js';
import { endPoints,getDataFromServer,sendDataToServer } from '../data/api.js';
import {repeat} from '../../node_modules/lit-html/directives/repeat.js';
import { until } from '../../node_modules/lit-html/directives/until.js';

let browseTemplate=(data,isLogged,countTeamMembers,currentPage,size)=>html` <section id="browse">

<article class="pad-med">
    <h1>Team Browser</h1>
</article>

<article class="layout narrow">
    <div style=${isLogged?'':'display:none'} class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
</article>
${repeat(data,(team)=>team._id,(team)=>html`<article class="layout">
    <img src=${team.logoUrl} class="team-logo left-col">
    <div class="tm-preview">
        <h2>${team.name}</h2>
        <p>${team.description}</p>
        <span class="details">${until(countTeamMembers(team),'Loading...')} Members</span>
        <div><a href="/browse/${team._id}" class="action">See details</a></div>
    </div>

</article>`)}
    <a href=${endPoints.paginationQuery(currentPage-1)}>Previous</a>
    ${size>=currentPage+1 ? html`<a href=${endPoints.paginationQuery(currentPage+1)}>Next</a>`:html`<a>Next</a>`}



</section>`

export async function showBrowse(ctx){
    try {
        let currentPage=((ctx.query.offset/ctx.query.pageSize)+1)||1
        
        let [data,size]=await Promise.all([getDataFromServer(endPoints.browse+endPoints.paginationQuery(currentPage)),getDataFromServer(endPoints.size)]);
        //await Promise.all(data.map(async (team)=>await countTeamMembers(team))) 
        let isLogged=ctx.isLogged()
        ctx.renderView(browseTemplate(data,isLogged,countTeamMembers,currentPage,size))
  
    } catch (error) {
        ctx.renderNonFormError(error);
        console.log(error)
    }

}

export async  function countTeamMembers(team){
  
    let teamId=`teamId IN (`+'"'+team._id+'"'+`) AND status="member"`;
    let encodedTeamIds='data/members?where='+encodeURIComponent (teamId);
    let finalTeamIds=await getDataFromServer(encodedTeamIds);
    
   return finalTeamIds.length;
    
}