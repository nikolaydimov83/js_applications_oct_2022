function solve() {
   
    let currentStop={name:'Depot', next:'depot',id:'depot'};
    let infoSpan=document.querySelector('.info');
    let departBtn=document.getElementById('depart');
    let arriveBtn=document.getElementById('arrive')

    async function depart() {
        try{
            currentStop= await getData(currentStop.next);
            drawDeparting()
        }catch(err){
            errorHandler()
        }
    }

     function arrive() {
        drawArriving();
    }

    return {
        depart,
        arrive
    };
async function getData(currentStopId){
    let response=await fetch(`http://localhost:3030/jsonstore/bus/schedule/${currentStopId}`) 
    let data=await response.json()
    return data
}
function errorHandler(){
    departBtn.disabled=true;
    departBtn.disabled=true;
    infoSpan.textContent=`Error`
}


function drawDeparting(){
    infoSpan.textContent=`Next stop ${currentStop.name}`;
    departBtn.disabled=true;
    arriveBtn.disabled=false;

}
function drawArriving(){
    infoSpan.textContent=`Arriving at ${currentStop.name}`
    departBtn.disabled=false;
    arriveBtn.disabled=true;
}
}

let result = solve();