async function loadRepos() {

	let username=document.getElementById('username').value;
	let reposUl=document.getElementById('repos');
	reposUl.innerHTML='';

	/*fetch(`https://api.github.com/uers/${username}/repos`)
	.then(handleResponse).then(drawRepos).catch(handleError)

	function handleResponse(res){
		if (!res.ok){
			throw new Error(`${res.status} ${res.statusText}`)
		}
		return res.json()
	}
	function drawRepos(res){

		res.forEach(element => {
			let repoLi=document.createElement('li');
			let repoA=document.createElement('a');
			repoA.target='_blank',
			repoA.href=element.html_url;
			repoA.textContent=element.full_name;
			repoLi.appendChild(repoA);
			reposUl.appendChild(repoLi)
		});

	}
	function handleError(err){
		let repoLi=document.createElement('li');
		repoLi.textContent=err.message
		reposUl.appendChild(repoLi)
	}*/
try{

	let response =await fetch(`https://api.github.com/users/${username}/repos`);
	if (!response.ok){
		throw new Error(`${response.status} ${response.statusText}`) 
	}
	let data = await response.json();
	drawRepos(data)
}catch(err){
	handleError(err)
}



function drawRepos(res){

	res.forEach(element => {
		let repoLi=document.createElement('li');
		let repoA=document.createElement('a');
		repoA.target='_blank',
		repoA.href=element.html_url;
		repoA.textContent=element.full_name;
		repoLi.appendChild(repoA);
		reposUl.appendChild(repoLi)
	});

}

function handleError(err){
	let repoLi=document.createElement('li');
	repoLi.textContent=err.message
	reposUl.appendChild(repoLi)
}
}