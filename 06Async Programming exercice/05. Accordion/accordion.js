
async function solution() {
    let main=document.getElementById('main');
    let response=await fetch(`http://localhost:3030/jsonstore/advanced/articles/list`);
    let articles=await response.json();
    articles.forEach(article => {
        drawArticle(article);
    });
    /*async function compileAllArticlesData(){
        try{
            
            
            for (const article of articles) {
                article['content']=(await getData(`http://localhost:3030/jsonstore/advanced/articles/details/${article._id}`)).content
            }

        }catch(err){
            console.log(err)
        }

    }*/

    function drawArticle(article){
        let articleWrapperDiv=document.createElement('div');
        articleWrapperDiv.className='accordion';

        let headDiv=document.createElement('div');
        headDiv.className='head';

        let titleSpan=document.createElement('span');
        titleSpan.textContent=article.title;
        headDiv.appendChild(titleSpan);

        let btn=document.createElement('button');
        btn.className='button';
        btn.id=article._id;
        btn.textContent='More';
        headDiv.appendChild(btn);

        let extraDiv=document.createElement('div');
        extraDiv.className='extra';

        let p=document.createElement('p');
        
        extraDiv.appendChild(p)
        articleWrapperDiv.appendChild(headDiv);
        articleWrapperDiv.appendChild(extraDiv);
        btn.addEventListener('click',drawP);
        main.appendChild(articleWrapperDiv);
    }
    async function drawP(ev){
        let response=await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${ev.target.id}`)
        let data=await response.json();
        let btn=ev.target;
        let extraDiv=btn.parentElement.parentElement.children[1];
        let p=extraDiv.children[0];
        
        if(!p.textContent){
            p.textContent=data.content;
        }

        if (btn.textContent==='More'){
            btn.textContent='Less';
            extraDiv.style.display='block';
        }else{
            btn.textContent='More';
            extraDiv.style.display='none'
        }
    }
}

solution()