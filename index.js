const taskSubmit = document.querySelector(".submit");
const checkboxes = document.querySelectorAll(".checkbox");
const main = document.querySelector(".mainContent");
let taskColor="#A0DA41";
let tasksTab = [];
let task= {};
let sortedTasks=[];
let taskIndex=0;
let taskTemplateCreate = ({name, kategoria, data, priorytet, color, desc, index}) =>{
    let art = document.createElement("article");
    art.classList.add("singleTask");
    let header = document.createElement("header");
    header.classList.add("taskHeader");
    header.style.background = color;
    let taskCategory = document.createElement("h3");
    let taskDate = document.createElement("h4");
    taskCategory.innerText=kategoria;
    taskDate.innerText=data;
    header.appendChild(taskCategory);
    header.appendChild(taskDate);
    let taskName = document.createElement("p")
    taskName.innerText=name;
    art.appendChild(header);
    art.appendChild(taskName);

    return art;
};


const inputValidate = (inputElem) => {
    if(inputElem.value===""){
        inputElem.style.boxShadow = '0 0 1em rgb(255,59,59)';
    }
}



checkboxes.forEach(box=>{
    box.addEventListener("click", (ev)=>{
        ev.preventDefault();
        if (box.classList.contains('red')) {
            taskColor="#E85555"
        }else if (box.classList.contains('green')) {
            taskColor="#A0DA41"
        }else if (box.classList.contains('blue')) {
            taskColor="#6EADE8"
        }else if (box.classList.contains('yellow')) {
            taskColor="#E7D856"
        }
        checkboxes.forEach(Boxes=>{
            if(Boxes.classList.contains('checkBoxShadow')){
                Boxes.classList.toggle('checkBoxShadow')
            }
        })
        box.classList.add('checkBoxShadow');
    })
})

taskSubmit.addEventListener("click", (ev) => {
    ev.preventDefault();
    const nazwa = document.querySelector(".nazwa");
    const kategoria = document.querySelector(".kategoria");
    const data = document.querySelector(".data");
    const priorytet = document.querySelector(".priorytet");

    const inputsTab = [nazwa, kategoria, data];
    inputsTab.forEach(inputElem => {
        inputElem.addEventListener("click", (ev)=>{
            ev.preventDefault();
            
            inputElem.style.boxShadow = "none";
        })
    });
    if(nazwa.value!=="" && kategoria.value!=="" && data.value!==""){
        let prior=0;
        if(priorytet.value==="important") 
            prior = 1;
        if(priorytet.value==="neededYesterday")
            prior = 2;
        task = {
            name: nazwa.value,
            kategoria: kategoria.value,
            data: data.value,
            priorytet: prior,
            color: taskColor,
            index: taskIndex   
        };
        taskIndex++;
        sortedTasks.push(task);
        tasksTab.push(taskTemplateCreate(task));
        sortedTasks.sort((a,b)=>{
            return a.priorytet - b.priorytet;
        })
        tasksTab.forEach(article=>{main.appendChild(article)});
        console.log(sortedTasks)
    }else{
        inputsTab.forEach(inputElem => inputValidate(inputElem));
    }
})