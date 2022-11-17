import { html } from '../../node_modules/lit-html/lit-html.js';
import { endPoints,getDataFromServer,sendDataToServer } from '../data/api.js';
import {repeat} from '../../node_modules/lit-html/directives/repeat.js';
import { until } from '../../node_modules/lit-html/directives/until.js';


let detailsTemplate=(currentUserRole,teamInfo,members,applicants,countTeamMembers,joinTeam,findCurrentUserId)=>html`<section id="team-home">
<article class="layout">
    <img src="${teamInfo.logoUrl}" class="team-logo left-col">
    <div class="tm-preview">
        <h2>${teamInfo.name}</h2>
        <p>${teamInfo.description}</p>
        <span class="details">${until(countTeamMembers(teamInfo),'Loading')} Members</span>
        <div>
            <a style=${currentUserRole==='owner'?'display:""':"display:none"} href="/edit" class="action">Edit team</a>
            <a @click=${joinTeam} style=${currentUserRole==='non-applicant'?'display:""':"display:none"} href="#" class="action">Join team</a>
            <a style=${currentUserRole==='member'?'display:""':"display:none"} href="/browse/${teamInfo._id}/removeMember/${findCurrentUserId()}" class="action invert">Leave team</a>
            <span style=${currentUserRole==='applicant'?'display:""':"display:none"}>Membership pending.</span>
            <a style=${currentUserRole==='applicant'?'display:""':"display:none"} href="/browse/${teamInfo._id}/removeMember/${findCurrentUserId()}">Cancel request</a>
        </div>
    </div>
    <div class="pad-large">
        <h3>Members</h3>
        <ul class="tm-members">
            ${repeat(members, (member)=>member['user']._id,(member,index)=>html`
            <li >${member.user.username}
            <a style=${(currentUserRole==='owner'&&member.user._id!==teamInfo._ownerId) ?'display:""':"display:none"} href="/browse/${teamInfo._id}/removeMember/${member.user._id}" class="tm-control action" >Remove from team</a>
        </li>`)}
        </ul>
    </div>
    <div style=${currentUserRole==='owner'?'display:""':"display:none"} class="pad-large">
        <h3>Membership Requests</h3>
        <ul class="tm-members">
${repeat(applicants, (member)=>member['user']._id,(member)=>html`
            <li >${member.user.username}
            <a href="/browse/${teamInfo._id}/approveMember/${member.user._id}" class="tm-control action">Approve</a>
            <a href="/browse/${teamInfo._id}/removeMember/${member.user._id}" class="tm-control action">Decline</a></li>
            </li>`)}
        </ul>
    </div>
</article>
</section>`

export async function showTeamDetails(ctx){
    let teamId=ctx.params.teamId;
    let isLogged=ctx.isLogged();
    let findCurrentUserId=()=>{
        if(!isLogged){
            return 'not-logged'
    }
return JSON.parse(sessionStorage.getItem('userData'))._id
}
    try {
    
    let [teamInfo,teamUsersInfo]=await Promise.all([getDataFromServer(`data/teams/${teamId}`),getDataFromServer(`data/members?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`)])
    ctx.page.teamInfo=teamInfo
    console.log(teamInfo);
    console.log(teamUsersInfo);
    let members=teamUsersInfo.filter((teamUser)=>teamUser.status==='member');
    let applicants=teamUsersInfo.filter((teamUser)=>teamUser.status==='pending');
    //let numberOfTeamMembers=await ctx.countTeamMembers(teamInfo)
    let currentUserRole=determineCurrentUserRole();
    ctx.renderView(detailsTemplate(currentUserRole,teamInfo,members,applicants,ctx.countTeamMembers,joinTeam,findCurrentUserId))

    async function joinTeam(){
        let token = endPoints.token()
        let requestedMembershipResponse=await sendDataToServer({teamId:teamId},endPoints.memberStatus,token);
        console.log(requestedMembershipResponse)
        ctx.page.redirect(`/browse/${teamId}`)
    }



    function findUserRequest(currentUserId){
        let currentUserPresentInTeam=teamUsersInfo.filter((membershipInfo)=>membershipInfo.user._id===currentUserId)
        return currentUserPresentInTeam
    }

    function determineCurrentUserRole(){
        if (!isLogged){
            return 'guest'
        }else if(teamInfo._ownerId===JSON.parse(sessionStorage.getItem('userData'))._id){
            return 'owner'
        }else{
            let currentUserId=JSON.parse(sessionStorage.getItem('userData'))._id
            let currentUserPresentInTeam=findUserRequest(currentUserId);
            if(currentUserPresentInTeam.length===0){
                return 'non-applicant'
            }else if(currentUserPresentInTeam[0].status==='pending'){
                return 'applicant'
            }else{
                return 'member'
            }
        }
    }
    
       
    } catch (error) {
        ctx.renderNonFormError(error)
        console.log(error)
    }
    
}