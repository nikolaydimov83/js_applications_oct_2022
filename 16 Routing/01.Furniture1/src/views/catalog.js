import { html } from '../../node_modules/lit-html/lit-html.js'
import {repeat} from '../../node_modules/lit-html/directives/repeat.js'
import { errorHandler, getDataFromServer, sendDataToServer } from '../data/api.js'


let templateCatalog=(data,headingString)=>html`<div class="row space-top">
<div class="col-md-12">
    ${headingString}
</div>
</div>${repeat(data,(furniture)=>furniture._id,(furniture,index)=>html`<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                    <img src=${furniture.img} />
                    <p>${furniture.description}</p>
                    <footer>
                        <p>Price: <span>${furniture.price}$</span></p>
                    </footer>
                    <div>
                        <a href="/catalog/${furniture._id}" class="btn btn-info">Details</a>
                    </div>
            </div>
        </div>
    </div>
</div>`)}`
let headingStringFullCatalog=html`<h1>Welcome to Furniture System</h1>
<p>Select furniture from the catalog to view details.</p>`


export async function showCatalog(ctx){
try{
    let data=await getDataFromServer('data/catalog')
    console.log(data)
    if(ctx.page.myFurniture){
        if(ctx.isLogged()){
                    data=data.filter((furniture)=>furniture._ownerId===JSON.parse(sessionStorage.getItem('userData'))._id)

        }else{
            data=[]
        }
        headingStringFullCatalog=html`<div class="col-md-12">
<h1>My Furniture</h1>
<p>This is a list of your publications.</p>
</div>`
    }
    ctx.render(templateCatalog(data,headingStringFullCatalog));
    headingStringFullCatalog=html`<h1>Welcome to Furniture System</h1>
<p>Select furniture from the catalog to view details.</p>`
ctx.page.myFurniture=null
}catch(err){
    errorHandler(err)
}


}


