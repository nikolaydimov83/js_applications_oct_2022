import { submitFormEvHandler, loadAllCommentsIndexPage } from "./onCreateTopic.js";
let newTopicForm=document.querySelector('.new-topic-border form');
newTopicForm.addEventListener('submit',submitFormEvHandler)
loadAllCommentsIndexPage()
document.querySelector('a').addEventListener('click',loadAllCommentsIndexPage);
