import { get } from '../api/api.js';
import { html,repeat } from '../lib.js';
import { getUserData } from '../utils.js';
import { errorHandler } from './errorHandler.js';

let profileTemplate=(userData,serverData)=>html`        <section id="profilePage">
<div class="userInfo">
    <div class="avatar">
        <img src="./images/profilePic.png">
    </div>
    <h2>${userData.email}</h2>
</div>
<div class="board">
    <!--If there are event-->
    ${serverData.length?repeat(serverData,(play)=>play._id,(play)=> html`<div class="eventBoard">
        <div class="event-info">
            <img src=${play.imageUrl}>
            <h2>${play.title}</h2>
            <h6>${play.date}</h6>
            <a href="/dashboard/${play._id}" class="details-button">Details</a>
        </div>
    </div>`):html`    <!--If there are no event-->
    <div class="no-events">
        <p>This user has no events yet!</p>
    </div>`}


</div>
</section>`

export async function showMyProfile(ctx){
    try{
        let userData=getUserData();
        let serverData=await get(`/data/theaters?where=_ownerId%3D%22${userData._id}%22&sortBy=_createdOn%20desc`);
        console.log(serverData)
        ctx.renderView(profileTemplate(userData,serverData));
    }catch(error){
        errorHandler(error);
        
    }

}