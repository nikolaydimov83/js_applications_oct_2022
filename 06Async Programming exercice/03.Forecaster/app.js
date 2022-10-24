function attachEvents() {
    let submitBtn=document.getElementById('submit');
    let inputLocation=document.getElementById('location');
  
    submitBtn.addEventListener('click',wheatherReport)

    async function getLocations(){
        let response=await fetch('http://localhost:3030/jsonstore/forecaster/locations');
        checkResponseOk(response)
        let locations=await response.json();
        return locations;
        
    }
    async function getWheather(type,code){
        let response=await fetch(`http://localhost:3030/jsonstore/forecaster/${type}/${code}`);
        checkResponseOk(response)
        let wheather=await response.json();
        return wheather;
    }
    async function wheatherReport(ev){
        let locations=await getLocations();
        let townIndex=locations.findIndex((town)=>town.name===inputLocation.value);
        if (townIndex===-1){
            throw new Error('Error')
        }
        townId=locations[townIndex].code;
        let todayWheather=await getWheather('today',townId);
        let upcomingWheather=await getWheather('upcoming',townId);
        console.log(todayWheather)
        console.log(upcomingWheather)
        
    }
    function checkResponseOk(response){
        if (!response.ok){
            throw new Error('Error');
        }
    }
    function drawToDay(todayWheather){

    }

    function drawUpcoming(upcomingWheather){

    }
    
}

attachEvents();