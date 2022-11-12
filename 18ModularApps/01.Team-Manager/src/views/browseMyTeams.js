import { html } from '../../node_modules/lit-html/lit-html.js';
import { endPoints,getDataFromServer,sendDataToServer } from '../data/api.js';
import {repeat} from '../../node_modules/lit-html/directives/repeat.js';
import { until } from '../../node_modules/lit-html/directives/until.js';

let browseTemplate=(data,isLogged,countTeamMembers)=>html` <section id="browse">

<article class="pad-med">
    <h1>Team Browser</h1>
</article>

<article class="layout narrow">
    <div style=${isLogged?'':'display:none'} class="pad-small">
    <span style=${data.length===0?'display:""':'display:none'}>You are not a member of any team yet.<a href=${`/browse`}> Browse all teams</a>to join one or use the button bellow to create your own team</span>
    <a href="/create" class="action cta">Create Team</a>
    </div>
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




</section>`

export async function showBrowseMyTeams(ctx){
    try {
        let memberTeams=await getDataFromServer(endPoints.allMyTeams());
        let allteams=await getDataFromServer(endPoints.browse)
        let allMyTeams=allteams.filter((team)=>{
            let matchedTeam
            memberTeams.forEach((memberTeam)=>{
                if(memberTeam.teamId===team._id){
                    matchedTeam= team
                }
            })
            if(matchedTeam){
                return matchedTeam
            }
        })
        //await Promise.all(data.map(async (team)=>await countTeamMembers(team))) 
        let isLogged=ctx.isLogged()
        ctx.renderView(browseTemplate(allMyTeams,isLogged,countTeamMembers))
  
    } catch (error) {
        ctx.renderNonFormError(error)
        console.log(error)
    }

}

export async  function countTeamMembers(team){
  
    let teamId=`teamId IN (`+'"'+team._id+'"'+`) AND status="member"`;
    let encodedTeamIds='data/members?where='+encodeURIComponent (teamId);
    let finalTeamIds=await getDataFromServer(encodedTeamIds);

    console.log(finalTeamIds)
    
   return finalTeamIds.length;
    
}