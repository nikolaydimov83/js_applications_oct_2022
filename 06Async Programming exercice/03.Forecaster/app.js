function attachEvents() {
    let submitBtn=document.getElementById('submit');
    let inputLocation=document.getElementById('location');
    let forecastWrapper=document.getElementById('forecast');
    let divCurrentWrapper=document.getElementById('current');
    let divUpcommingWrapper=document.getElementById('upcoming');

    let symbolConditions={
        'Sunny': String.fromCharCode(9728),
        'Partly sunny':String.fromCharCode(9925),
        'Overcast': String.fromCharCode(9729),
        'Rain':String.fromCharCode(9748)
    }
  
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
        
        forecastWrapper.style.display='block';
        try{
        let locations=await getLocations();
        let townIndex=locations.findIndex((town)=>town.name===inputLocation.value);
        if (townIndex===-1){
            throw new Error('Error')
        }
        townId=locations[townIndex].code;
        let todayWheather=await getWheather('today',townId);
        let upcomingWheather=await getWheather('upcoming',townId);
        console.log(todayWheather)
        drawToDay(todayWheather)
        console.log(upcomingWheather)
        drawUpcoming(upcomingWheather);
        }catch(err){
            errorHandler()
        }
    }
    function checkResponseOk(response){
        if (!response.ok){
            throw new Error('Error');
        }
    }
    function drawToDay(todayWheather){
        let divClassForecasts=document.createElement('div');
        divClassForecasts.className='forecasts';
        let spanSymbol=document.createElement('span');
        spanSymbol.classList.add('condition','symbol')
        spanSymbol.textContent=symbolConditions[todayWheather.forecast.condition];
        divClassForecasts.appendChild(spanSymbol);

        let spanInformationWrapper=document.createElement('span');
        spanInformationWrapper.className="condition"

        let spanCity=document.createElement('span');
        spanCity.className='forecast-data';
        spanCity.textContent=todayWheather.name;
        spanInformationWrapper.appendChild(spanCity)

        let spanTemp=document.createElement('span');
        spanTemp.className='forecast-data';
        spanTemp.textContent=`${todayWheather.forecast.low}${String.fromCharCode(176)}/${todayWheather.forecast.high}${String.fromCharCode(176)}`;
        spanInformationWrapper.appendChild(spanTemp)

        let spanInfo=document.createElement('span');
        spanInfo.className='forecast-data';
        spanInfo.textContent=`${todayWheather.forecast.condition}`;
        spanInformationWrapper.appendChild(spanInfo)

        divClassForecasts.appendChild(spanInformationWrapper);
        divCurrentWrapper.appendChild(divClassForecasts);
    }

    function drawUpcoming(upcomingWheather){
        let divUpcomingForecastWrapper=document.createElement('div');
        divUpcomingForecastWrapper.className='forecast-info';
        upcomingWheather.forecast.forEach((forecastDay)=>{
            let spanUpcoming=document.createElement('span');
            spanUpcoming.className='upcoming';
            
            let spanSymbol=document.createElement('span');
            spanSymbol.className='symbol';
            spanSymbol.textContent=symbolConditions[forecastDay.condition];
            spanUpcoming.appendChild(spanSymbol);

            divUpcomingForecastWrapper.appendChild(spanUpcoming)

            let spanTemps=document.createElement('span');
            spanTemps.className='forecast-data';
            spanTemps.textContent=`${forecastDay.low}${String.fromCharCode(176)}/${forecastDay.high}${String.fromCharCode(176)}`;
            spanUpcoming.appendChild(spanTemps);

            let spanInfo=document.createElement('span');
            spanInfo.className='forecast-data';
            spanInfo.textContent=`${forecastDay.condition}`;
            spanUpcoming.appendChild(spanInfo);

            divUpcomingForecastWrapper.appendChild(spanUpcoming)

        })

        divUpcommingWrapper.appendChild(divUpcomingForecastWrapper)
    }
    function errorHandler(){
        forecastWrapper.textContent='Error'
    }
    
}

attachEvents();