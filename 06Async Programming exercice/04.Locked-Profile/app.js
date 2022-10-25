function lockedProfile() {
    let main=document.getElementById('main');
    drawUsers()
    async function getUsers(){
        let response=await fetch(`http://localhost:3030/jsonstore/advanced/profiles`);
        checkResponse(response);
        let users=await response.json();
        return users
    }
    async function drawUsers(){
        main.innerHTML=''
        let users=await getUsers();
        Object.values(users).forEach((user,userIndex)=>{
            let profileDiv=document.createElement('div');
            profileDiv.className=`profile`;

            let img=document.createElement('img');
            img.src=`./iconProfile2.png`;
            img.className='userIcon';
            profileDiv.appendChild(img);
            
            let lockLabel=createLabel('Lock');
            profileDiv.appendChild(lockLabel);

            let lockRadio=createInput('radio',lockLabel,['checked']);
            profileDiv.appendChild(lockRadio);

            let unlockLabel=createLabel('Unlock');
            profileDiv.appendChild(unlockLabel);

            let unlockRadio=createInput('radio',unlockLabel);
            profileDiv.appendChild(unlockRadio);

            let br=document.createElement('br');
            profileDiv.appendChild(br);

            let hr=document.createElement('hr');
            profileDiv.appendChild(hr);

            let usernameLabel=createLabel('Username');
            profileDiv.appendChild(usernameLabel);

            let usenameInput=createInput('text',usernameLabel,['disabled','readOnly']);
            profileDiv.appendChild(usenameInput);

            let hiddenInputsWrapper=document.createElement('div')
            hiddenInputsWrapper.id=`user${userIndex+1}HiddenFields`;
            hiddenInputsWrapper.hidden=true;
            
            profileDiv.appendChild(hiddenInputsWrapper);
            hiddenInputsWrapper.appendChild(document.createElement('hr'));

            let emailLabel=createLabel('Email:');
            hiddenInputsWrapper.appendChild(emailLabel);
            let emailInput=createInput("email",emailLabel,['disabled','readOnly'])
            hiddenInputsWrapper.appendChild(emailInput);

            let ageLabel=createLabel('Age:');
            hiddenInputsWrapper.appendChild(ageLabel);
            let ageInput=createInput("email",ageLabel,['disabled','readOnly'])
            hiddenInputsWrapper.appendChild(ageInput);

            let btn=document.createElement('button');
            btn.addEventListener('click',()=>{
                let radioValue=document.querySelector(`input[name = "user${userIndex+1}Locked"]:checked`).value
                if(radioValue==='unlock'){
                hiddenInputsWrapper.hidden=!hiddenInputsWrapper.hidden
                }
            })
            btn.textContent='Show more';
            profileDiv.appendChild(btn)
            main.appendChild(profileDiv);
            
            function createInput(type,label,params){
                let input=document.createElement('input');
                input.type=type;
                let value=label.textContent.toLowerCase()
                let name=`user${userIndex+1}`;
                if(value==='lock'||value==='unlock'){
                        name+='Locked'
                }else{
                    let str=''
                    str+=label.textContent.replace(':','');
                    name+=str
                }
                input.name=name
                if(type===`radio`){
                    input.value=label.textContent.toLowerCase();
                }else{
                    let index=label.textContent.toLowerCase();
                    if(index[index.length-1]===':'){
                        index=index.substring(0,index.length-1);
                    }
                    input.value=user[index]
                }
                
                if (params&&params.length>0){
                    params.forEach((param)=>{
                        input[param]=true
                    })
                }
            return input
        }
        function createLabel(textContent){
            let label=document.createElement('label');
            label.textContent=textContent;
            return label
        }
        })

    }

    function checkResponse(response){
        if(!response.ok){
            throw new Error('Error')
        }
    }
    

}