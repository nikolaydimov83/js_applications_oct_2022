import {loadPageData} from './onLoad.js'
function solve() {
  loadPageData()
  let nav=document.querySelector('nav')
nav.addEventListener('click',(ev)=>{
    let action={
        'catalog':loadPageData,
        'register':onRegister,
        'login':onLogin,
        'logout':onLogout,
        'create':onCreate
    }
    action[ev.target.id]()
})
}
solve()