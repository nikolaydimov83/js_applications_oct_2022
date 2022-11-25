import { get } from '../api/api.js';
import { html,repeat } from '../lib.js';
import { getUserData } from '../utils.js';
import { errorHandler } from './errorHandler.js';


let homeTemplate=(data)=>html`<section id="welcome-world">

<div class="welcome-message">
    <h2>ALL new games are</h2>
    <h3>Only in GamesPlay</h3>
</div>
<img src="./images/four_slider_img01.png" alt="hero">

<div id="home-page">
    <h1>Latest Games</h1>
${data.length>0?repeat(data,(game)=>game._id,(game)=>html`    <div class="game">
        <div class="image-wrap">
            <img src=${game.imageUrl}>
        </div>
        <h3>${game.title}</h3>
        <div class="rating">
            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
        </div>
        <div class="data-buttons">
            <a href="/dashboard/${game._id}" class="btn details-btn">Details</a>
        </div>
    </div>`):html`<p class="no-articles">No games yet</p>`}
     
</div>
</section>`
/*{
  title,
  category,
  maxLevel,
  imageUrl,
  summary
}
*/
export async function showHome(ctx){
    try{
        let data=await get('/data/games?sortBy=_createdOn%20desc&distinct=category');
        console.log(data)
        ctx.renderView(homeTemplate(data));
    }catch(error){
        errorHandler(error);
    }
    
}