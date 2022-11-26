import { get } from '../api/api.js';
import { html,repeat } from '../lib.js';
import { getUserData } from '../utils.js';
import { errorHandler } from './errorHandler.js';


let homeTemplate=(data)=>html`<section class="welcomePage">
<div id="welcomeMessage">
    <h1>My Theater</h1>
    <p>Since 1962 World Theatre Day has been celebrated by ITI Centres, ITI Cooperating Members, theatre
        professionals, theatre organizations, theatre universities and theatre lovers all over the world on
        the 27th of March. This day is a celebration for those who can see the value and importance of the
        art
        form “theatre”, and acts as a wake-up-call for governments, politicians and institutions which have
        not
        yet recognised its value to the people and to the individual and have not yet realised its potential
        for
        economic growth.</p>
</div>
<div id="events">
    <h1>Future Events</h1>
    ${data.length>0?html`<div class="theaters-container">
    ${repeat(data,(theaterEvent)=>theaterEvent._id,(theaterEvent)=>html`
            <div class="eventsInfo">
            <div class="home-image">
                <img src=${theaterEvent.imageUrl}>
            </div>
            <div class="info">
                <h4 class="title">${theaterEvent.title}</h4>
                <h6 class="date">${theaterEvent.date}</h6>
                <h6 class="author">${theaterEvent.author}</h6>
                <div class="info-buttons">
                    <a class="btn-details" href="/dashboard/${theaterEvent._id}">Details</a>
                </div>
            </div>
        </div>
    `)}</div>
    `:html`<!--No Theaters-->
        <h4 class="no-event">No Events Yet...</h4>`}
    

        <!--Created Events-->


    
</div>
</section>`

export async function showHome(ctx){
    try{
        let data=await get('/data/theaters?sortBy=_createdOn%20desc&distinct=title');
        console.log(data)
        ctx.renderView(homeTemplate(data));
    }catch(error){
        errorHandler(error);
    }
    
}