function attachEvents() {
let form={
messagesAll : document.getElementById('messages'),
author:document.getElementsByName('author')[0],
submitBtn:document.getElementById('submit'),
refreshBtn:document.getElementById('refresh'),
message:document.getElementsByName('content')[0]
}
form.refreshBtn.addEventListener('click',refreshData)
  
form.submitBtn.addEventListener('click',sendData)
   async function sendData(data){
    let postData={
      author: form.author.value,
      content: form.message.value
    }
    try{
    let response=await fetch('http://localhost:3030/jsonstore/messenger',{
        method:'post',
        headers:{
            'content-type':'application/json',

        },
        body:JSON.stringify(postData)
    });
    if (!response.ok){
      let errorData=await response.json()
      throw new Error(`Message was not successfully posted,${errorData}`)
    }
    let responseData=await response.json();
    refreshData()
    }catch(err){
    errorHamdler(err);
    }
   }
   async function refreshData(){
    try{
      let response=await fetch('http://localhost:3030/jsonstore/messenger');
      if (!response.ok){
        let errorData=await response.json();
        throw new Error(`Error in getting messages,${errorData}`);
      }
      let data=await response.json();
      drawRefreshedData(data)
    }catch(err){
      errorHamdler(err);
    }
    
    
   }
   function drawRefreshedData(data){
      form.messagesAll.value='';
      let str=''
      Object.values(data).forEach((message)=>{
        str+=`${message.author}: ${message.content}\n`
      })
      form.messagesAll.value=str.trim();
   }
   function errorHamdler(err){
    console.log(err.message)
   }
}

attachEvents();