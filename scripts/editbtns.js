"use strict"

let currentNodes = new Array();
let completedNodes = new Array();

function getCurrentNode(id, title, text, date, priority){
    return `<li class="list-group-item d-flex w-100 mb-2" id="${id}">
                        <div class="w-100 mr-2">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">${title}</h5>
                                <div>
                                    <small class="mr-2">${priority}</small>
                                    <small>${date}</small>
                                </div>

                            </div>
                            <p class="mb-1 w-100">${text}</p>
                        </div>
                        <div class="dropdown m-2 dropleft">
                            <button class="btn btn-secondary h-100" type="button" id="dropdownMenuItem1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fas fa-ellipsis-v"></i>
                            </button>
                            <div class="dropdown-menu p-2 flex-column" aria-labelledby="dropdownMenuItem1">
                                <button type="button" class="btn btn-success w-100" onclick="complete(\`${id}\`, \`${title}\`, \`${text}\`, \`${date}\`, \`${priority}\`)">Complete</button>
                                <button type="button" class="btn btn-danger w-100" onclick="deleteNode(\`${id}\`)">Delete</button>
                            </div>
                        </div>
                    </li>`;
}

function getCompletedNode(id, title, text, date, priority){
    return `<li class="list-group-item d-flex w-100 mb-2" id="${id}">
                        <div class="w-100 mr-2">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">${title}</h5>
                                <div>
                                    <small class="mr-2">${priority}</small>
                                    <small>${date}</small>
                                </div>

                            </div>
                            <p class="mb-1 w-100">${text}</p>
                        </div>
                        <div class="dropdown m-2 dropleft">
                            <button class="btn btn-secondary h-100" type="button" id="dropdownMenuItem1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="fas fa-ellipsis-v"></i>
                            </button>
                            <div class="dropdown-menu p-2 flex-column" aria-labelledby="dropdownMenuItem1">
                                <button type="button" class="btn btn-danger w-100" onclick="deleteNode(\`${id}\`)">Delete</button>
                            </div>
                        </div>
                    </li>`;
}

function init(){
    let tmp = localStorage.getItem('currentNodes');
    if(tmp != null)
        currentNodes = JSON.parse(localStorage.getItem('currentNodes'));

    tmp = localStorage.getItem('completedNodes');
    if(tmp != null)
        completedNodes = JSON.parse(localStorage.getItem('completedNodes'));

    refresh();
}

function refresh(){
    let element
    for(let node of currentNodes){
        if(element = document.getElementById(node.id))
            element.remove();
    }
    for(let node of completedNodes){
        if(element = document.getElementById(node.id))
            element.remove();
    }
    for(let node of currentNodes){
        createCurrentNode(node.id, node.title, node.text, node.date, node.priority)
    }
    for(let node of completedNodes){
        createCompletedNode(node.id, node.title, node.text, node.date, node.priority)
    }

    document.getElementById("currentTitle").remove();
    document.getElementById("completedTitle").remove();
    document.getElementById("currentTasks").insertAdjacentHTML("beforebegin", `<h3 class="my-2" id="currentTitle">ToDo (${currentNodes.length})</h3>`);
    document.getElementById("completedTasks").insertAdjacentHTML("beforebegin", `<h3 class="my-2" id="completedTitle">Comleted (${completedNodes.length})</h3>`);
}

function save(){
    localStorage.clear();
    localStorage.setItem('currentNodes', JSON.stringify(currentNodes));
    localStorage.setItem('completedNodes', JSON.stringify(completedNodes));
}

function deleteNode(id){
    document.getElementById(id).remove();
    currentNodes = currentNodes.filter(item => item.id != id);
    completedNodes = completedNodes.filter(item => item.id != id);

    refresh();
    save();
}

function sort(){
    currentNodes.sort(function(a, b) { 
        if(a.title > b.title)
            return -1;
        else
            return 0;
    });
    completedNodes.sort(function(a, b) { 
        if(a.title > b.title)
            return -1;
        else
            return 0;
    });
    refresh();
}

function revsort(){
    currentNodes.sort(function(a, b) { 
        if(a.title < b.title)
            return -1;
        else
            return 0;
    });
    completedNodes.sort(function(a, b) { 
        if(a.title < b.title)
            return -1;
        else
            return 0;
    });
    refresh();
}

function create(){
    let id = Math.floor(Math.random() * Math.floor(1000000007));
    let title = (document.getElementById("inputTitle")).value;
    let text = (document.getElementById("inputText")).value;

    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    let priority;
    if (document.getElementById("High").checked)
        priority = "High priority";
    if (document.getElementById("Medium").checked)
        priority = "Medium priority";
    if (document.getElementById("Low").checked)
        priority = "Low priority";
    
    currentNodes.push(node(id, title, text, date, priority));
    save();

    refresh();
}

function createCurrentNode(id, title, text, date, priority){
    document.getElementById("currentTasks").insertAdjacentHTML("beforeend", getCurrentNode(id, title, text, date, priority));
}

function createCompletedNode(id, title, text, date, priority){
    document.getElementById("completedTasks").insertAdjacentHTML("beforeend", getCompletedNode(id, title, text, date, priority));
}

function node(id, title, text, date, priority){
    let node = {id, title, text, date, priority};
    node.id = id;
    node.title = title;
    node.text = text;
    node.date = date;
    node.priority = priority;

    return node;
}

function complete(id, title, text, date, priority){
    deleteNode(id);
    completedNodes.push(node(id, title, text, date, priority));

    refresh();
    save();
}

init();