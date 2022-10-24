function getInfo() {
    let busStopId=document.getElementById('stopId').value;
    let busData =  getBusDataFromServer(busStopId)
    let stopNameDiv=document.getElementById(`stopName`);
    let busesUl=document.getElementById('buses');
    

    
    async function getBusDataFromServer(busStopId){
        try{
            let response=await fetch(`http://localhost:3030/jsonstore/bus/businfo/${busStopId}`);
            if (!response.ok||response.statusText==='No Content'){
                throw new Error(`Error`)
            }
            let data= await response.json();
            drawBusInfo(data);
            return data
        }catch(err){
            handleError(err)
        }

    }

    function drawBusInfo(busData){
        stopNameDiv.textContent=busData.name;
        Object.entries(busData.buses).forEach((bus)=>{
            let busLi=document.createElement(`li`);
            busLi.textContent=`Bus ${bus[0]} arrives in ${bus[1]} minutes`;
            busesUl.appendChild(busLi);
        })
    }
    function handleError(err){
        stopNameDiv.textContent='Error'
    }

}