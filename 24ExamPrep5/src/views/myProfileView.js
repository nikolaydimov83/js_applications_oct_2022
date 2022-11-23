import { get } from '../api/api.js';
import { html,repeat } from '../lib.js';
import { getUserData } from '../utils.js';
import { errorHandler } from './errorHandler.js';

let profileTemplate=(userData,serverData)=>html`<section id="user-profile-page" class="user-profile">
<article class="user-info">
    <img id="user-avatar-url" alt="user-profile" src=${userData.gender==='female'?"/images/female.png":"/images/male.png"}>
    <div class="user-content">
        <p>Username: ${userData.username}</p>
        <p>Email: ${userData.email}</p>
        <p>My memes count: ${serverData.length}</p>
    </div>
</article>
<h1 id="user-listings-title">User Memes</h1>
<div class="user-meme-listings">
    <!-- Display : All created memes by this user (If any) --> 
    ${serverData.length===0?html`<p class="no-memes">No memes in database.</p>`
    :repeat(serverData,(meme)=>meme._id,(meme)=>html`
        <div class="user-meme">
        <p class="user-meme-title">${meme.title}</p>
        <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
        <a class="button" href="/memes/${meme._id}">Details</a>
    </div>
    `)}


    <!-- Display : If user doesn't have own memes  --> 
   
</div>
</section>`

export async function showMyProfile(ctx){
    try{
        let userData=getUserData();
        let serverData=await get(`/data/memes?where=_ownerId%3D%22${userData._id}%22&sortBy=_createdOn%20desc`);
        console.log(serverData)
        ctx.renderView(profileTemplate(userData,serverData));
    }catch(error){
        errorHandler(error);
        
    }

}