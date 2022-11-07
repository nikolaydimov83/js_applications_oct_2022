import { html } from '../../node_modules/lit-html/lit-html.js'
import {repeat} from '../../node_modules/lit-html/directives/repeat.js'
import { errorHandler, getDataFromServer, sendDataToServer } from '../data/api.js'

let templateCatalog=(data)=>html`<div class="row space-top">
<div class="col-md-12">
    <h1>Welcome to Furniture System</h1>
    <p>Select furniture from the catalog to view details.</p>
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

export async function showCatalog(ctx){
try{
    let data=await getDataFromServer('data/catalog')
    console.log(data)
    ctx.render(templateCatalog(data))
}catch(err){
    errorHandler(err)
}


}


