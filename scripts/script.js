const list = document.getElementById("list");
const input = document.getElementById("input");
const clear = document.getElementById("clear");

const check = "fa-check-circle";
const uncheck = "fa-circle";
const lineTrough = "line-through";

let LIST, id;

let data = localStorage.getItem("TODO");

if (data) {
    LIST = JSON.parse(data);
    id = LIST.length; 
    loadList(LIST); 
} else {
    LIST = [];
    id = 0;
}

function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

function addToDo(toDo, id, done, trash){
    
    if (trash) { 
        return; 
    };
    
    const made = done ? check : uncheck;
    const line = done ? lineTrough : "";
    
    const item = `<li class="item">
                    <i class="сheckbox far ${made}" job="complete" id="${id}"></i>
                    <p class="text ${line}">${toDo}</p>
                    <i class="trash far fa-trash-alt" job="delete" id="${id}"></i>
                  </li>
                `;
    
    list.insertAdjacentHTML("beforeend", item);
}

document.addEventListener("keyup", function(event){
    if(event.keyCode == 13){
        const toDo = input.value;
        
        if(toDo){
            addToDo(toDo, id, false, false);
            
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });
            
            localStorage.setItem("TODO", JSON.stringify(LIST));
            
            id++;
        }
        input.value = "";
    }
});

function completeToDo(element){
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector(".text").classList.toggle(lineTrough);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    LIST[element.id].trash = true;
}

list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;
    
    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete") {
        removeToDo(element);
    }
    
    localStorage.setItem("TODO", JSON.stringify(LIST));
})

clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});
