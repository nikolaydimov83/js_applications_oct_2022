export async function errorHandler(error){
    let notificationDiv=document.querySelector('.notification');
    notificationDiv.querySelector('span').textContent=error.message;
    notificationDiv.style.display='block';
    setTimeout(()=>notificationDiv.style.display='none',3000);

}