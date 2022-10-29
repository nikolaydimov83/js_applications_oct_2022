import { addNewCatch } from "./onAddNew.js";
import { loadPageData } from "./onLoad.js";
import {onRegister} from './onRegister.js'
import {onLogin, onLogout} from './onLogin.js'

loadPageData();
let nav=document.querySelector('nav')
nav.addEventListener('click',(ev)=>{
    let action={
        'home':loadPageData,
        'register':onRegister,
        'login':onLogin,
        'logout':onLogout
    }
    action[ev.target.id]()
})
let addForm=document.querySelector('aside form');
addForm.addEventListener('submit',addNewCatch);




