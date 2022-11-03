let homeViewSection=document.querySelector('body').children[1];
console.log(document.querySelector('body').children[3])


export function gotoHomepage(ctx){
    ctx.renderView(homeViewSection)
}