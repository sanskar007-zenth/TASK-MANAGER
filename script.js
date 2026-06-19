 let tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
 let addtask = document.querySelector(".btn-create");
let container = document.querySelector(".task-list");
let tdcount = document.querySelector(".column-count");

const taskModal = document.getElementById("taskModal");
const taskForm = document.getElementById("taskForm");
const btnCancel = document.getElementById("btnCancel");

const taskTitle = document.getElementById("taskTitle");
const taskDesc = document.getElementById("taskDesc");
const taskDate = document.getElementById("taskDate");
const taskDueDate = document.getElementById("taskDueDate");
const taskPlatform = document.getElementById("taskPlatform");

platformCounts = {
        Whatsapp:0,
        Reddit:0,
        GitHub:0,
        Messenger:0,
        Gmail:0,
        Discord:0
    };


function updateCounter() {

    let taskcount = document.querySelectorAll(".task-card");

    tdcount.textContent = `(${taskcount.length})`;

    const emptyState = document.querySelector(".empty-state");

    if(taskcount.length === 0){
        emptyState.style.display = "block";
    }
    else{
        emptyState.style.display = "none";
    }

}

addtask.addEventListener("click", function () {
taskModal.style.display = "flex";
});

btnCancel.addEventListener("click", function () {
taskModal.style.display = "none";
taskForm.reset();
});

taskForm.addEventListener("submit", function (e) {
e.preventDefault();

let titleVal = taskTitle.value;
let descVal = taskDesc.value;
let dateVal = taskDate.value;
let dueDateVal = taskDueDate.value;
let platformVal = taskPlatform.value;

if (titleVal === "") {
    alert("Task title is required");
    return;
}

const task = {
    title: titleVal,
    description: descVal,
    date: dateVal,
    dueDate: dueDateVal,
    platform: platformVal
};

tasks.push(task);

platformCounts[task.platform]++;

updatePlatformCounters();

localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
);

createTaskCard(task);



updateCounter();
updateDashboardStats();

taskForm.reset();
taskModal.style.display = "none";

});


function createTaskCard(task) {
const nayacard = document.createElement("div");
nayacard.classList.add("task-card");

const title = document.createElement("h4");
title.textContent = task.title;

const description = document.createElement("p");
description.textContent = task.description;
description.classList.add("card-body-text");

const date = document.createElement("span");
date.textContent = `${task.date} → ${task.dueDate}`;

const platform = document.createElement("div");
platform.textContent = `📌 ${task.platform}`;
platform.classList.add("integration-tag");

const deleteBtn = document.createElement("button");
deleteBtn.textContent = "✕";
deleteBtn.classList.add("delete-task-btn");

deleteBtn.addEventListener("click", function () {
    const index = tasks.indexOf(task);
    if (index !== -1) {
    tasks.splice(index, 1);
}
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
    updatePlatformCounters();
    nayacard.remove();
    updateCounter();
    updateDashboardStats();
});

nayacard.appendChild(title);
nayacard.appendChild(description);
nayacard.appendChild(date);
nayacard.appendChild(platform);
nayacard.appendChild(deleteBtn);

container.appendChild(nayacard);

}

tasks.forEach(function(task){
    createTaskCard(task);
});

updateCounter();


function updatePlatformCounters() {

    platformCounts = {
    Whatsapp:0,
    Reddit:0,
    GitHub:0,
    Messenger:0,
    Gmail:0,
    Discord:0
};

tasks.forEach(task=>{
    platformCounts[task.platform]++;
});

    const whatsapp = document.querySelector(".whatsapp-count");
const reddit = document.querySelector(".reddit-count");
const github = document.querySelector(".github-count");
const messenger = document.querySelector(".messenger-count");
const gmail = document.querySelector(".gmail-count");
const discord = document.querySelector(".discord-count");

if (whatsapp) whatsapp.textContent = platformCounts.Whatsapp || "";
if (reddit) reddit.textContent = platformCounts.Reddit || "";
if (github) github.textContent = platformCounts.GitHub || "";
if (messenger) messenger.textContent = platformCounts.Messenger || "";
if (gmail) gmail.textContent = platformCounts.Gmail || "";
if (discord) discord.textContent = platformCounts.Discord || "";


}


window.addEventListener("click", function(e){

    if(e.target === taskModal){
        taskModal.style.display = "none";
        taskForm.reset();
    }

});


const dashboardBtn = document.getElementById("dashboardBtn");
const tasksBtn = document.getElementById("tasksBtn");

const dashboardPage = document.getElementById("dashboardPage");
const tasksPage = document.getElementById("tasksPage");

dashboardBtn.addEventListener("click", function(e){

    e.preventDefault();
    localStorage.setItem("currentPage", "dashboard");
    dashboardPage.style.display = "block";
    tasksPage.style.display = "none";

    dashboardBtn.classList.add("active");
    tasksBtn.classList.remove("active");
});

tasksBtn.addEventListener("click", function(e){

    e.preventDefault();
   localStorage.setItem("currentPage", "tasks");
   dashboardPage.style.display = "none";
tasksPage.style.display = "block";

tasksBtn.classList.add("active");
dashboardBtn.classList.remove("active");
});

function updateDashboardStats(){
    const total = document.getElementById("totalTasks");

    if(total){
        total.textContent = tasks.length;
    }
}

updateDashboardStats();


const currentPage = localStorage.getItem("currentPage");

if(currentPage === "dashboard"){

    dashboardPage.style.display = "block";
    tasksPage.style.display = "none";

    dashboardBtn.classList.add("active");
    tasksBtn.classList.remove("active");

}
else{

    dashboardPage.style.display = "none";
    tasksPage.style.display = "block";

    tasksBtn.classList.add("active");
    dashboardBtn.classList.remove("active");

}