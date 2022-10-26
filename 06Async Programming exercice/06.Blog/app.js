async function attachEvents() {
    let loadAllPostsBtn=document.getElementById('btnLoadPosts');
    loadAllPostsBtn.addEventListener('click',loadAllPosts);
    let postsSelect=document.getElementById('posts');
    let btnViewPost=document.getElementById('btnViewPost');
    btnViewPost.addEventListener('click',loadPost)
    let postTitle=document.getElementById('post-title');
    let postBody=document.getElementById('post-body');
    await loadAllPosts();
    btnViewPost.click();

async function loadAllPosts(ev){
    let response=await fetch(`http://localhost:3030/jsonstore/blog/posts`)
    let posts=await response.json();
    drawAllPosts(posts)
}

async function loadPost(ev){
    let postId=postsSelect.value;
    let title=postsSelect.options[postsSelect.selectedIndex].text
    let response=await fetch(`http://localhost:3030/jsonstore/blog/posts`)
    let posts=await response.json();
    let selectedPost=Object.values(posts).filter((post)=>post.title===title)[0]

    let responseAllComments1=await fetch(`http://localhost:3030/jsonstore/blog/comments/`)
    let commentsAll=await responseAllComments1.json();
    let comments=Object.values(commentsAll).filter((comment)=>comment.postId===postId)

    drawPost(selectedPost,comments)

    

}
function drawAllPosts(posts){
    postsSelect.innerHTML='';
    Object.values(posts).forEach((post)=>{
        let postLi=document.createElement('option');
        postLi.textContent=post.title;
        postLi.value=post.id
        postsSelect.appendChild(postLi)
    })


}
function drawPost(selectedPost,comments){

    postTitle.textContent=selectedPost.title;
    postBody.textContent=selectedPost.body;
   
    let posCommentsUl=document.getElementById('post-comments');
    posCommentsUl.innerHTML=``;
    comments.forEach(element => {
        let li=document.createElement('li');
        li.textContent=element.text;
        posCommentsUl.appendChild(li);
    });
}
}

attachEvents();