async function attachEvents() {
    
    let btnLoad=document.getElementById('btnLoad');
    let phonebook=document.getElementById('phonebook')
    let person=document.getElementById('person');
    let phone=document.getElementById('phone');
    let btnCreate=document.getElementById('btnCreate');
    btnLoad.addEventListener('click',getData);
    btnCreate.addEventListener('click',async ()=>{await createData()})
    await getData();
    async function createData(){
        let data={
            person:person.value,
            phone:phone.value
        }
        if(!data.person||!data.phone){
            return
        }

        let response=await fetch(`http://localhost:3030/jsonstore/phonebook`,{
            method:'post',
            headers:{
                'content-type':'application-json'
            },
            body:JSON.stringify(data)
        });
        await checkResponse(response);
        let responseData=await response.json();
        console.log(responseData._id)
        await getData();
    }
    async function getData(){
        try{
            let response=await fetch('http://localhost:3030/jsonstore/phonebook');
            await checkResponse(response);
            let data=await response.json()
            drawPhoneBook(data)
        }catch(err){
            errorHandler(err);
        }


    }
    async function checkResponse(response){
        
        if(!response.ok){
            let error=await response.json();
            throw new Error(`Error`);
        }
    }
    function errorHandler(err){
        console.log(err.message);
    }
    function drawPhoneBook(data){
        phonebook.innerHTML=''
        Object.entries(data).forEach((phoneEntry)=>{
            let li = document.createElement('li');
            li.textContent=`${phoneEntry[1].person}: ${phoneEntry[1].phone}`;
            let deleteBtn=document.createElement('button');
            deleteBtn.id=phoneEntry[0];
            deleteBtn.textContent='Delete'
            li.appendChild(deleteBtn);
            phonebook.appendChild(li);
            
            deleteBtn.addEventListener('click',async (ev)=>{ 
                await deleteData(ev)});

        })
    }
    async function deleteData(ev){
        
        try{
            console.log(ev.target)
            let id=ev.target.id;
   
            let response=await fetch(`http://localhost:3030/jsonstore/phonebook/${id}`,{
                method:'delete'
            });
            
            await checkResponse(response);
            let data=await response.json()
            //console.log(`Deleted Data ${data._id}`)
            //ev.target.parentElement.remove();
            await getData();
        }catch(err){
            errorHandler(err)
        }


    }
}


attachEvents();