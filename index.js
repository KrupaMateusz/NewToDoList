const taskSubmit = document.querySelector(".submit");
const main = document.querySelector(".mainContent");
let taskColor="#A0DA41";
let tasksTab = [];
let templatesTab = [];
let task= {};
let sortedTasks=[];
let taskIndex=0;
let checked = 0;

//Funkcja wywoływana przy wciśnięciu formularza

taskSubmit.addEventListener("click", (ev) => {
    ev.preventDefault();
    const nazwa = document.querySelector(".nazwa");
    const opis = document.querySelector(".opis");
    const data = document.querySelector(".data");
    const priorytet = document.querySelector(".priorytet");

    const inputsTab = [nazwa, opis, data];
    inputsTab.forEach(inputElem => {
        inputElem.addEventListener("click", (ev)=>{
            ev.preventDefault();
            
            inputElem.style.boxShadow = "none";
        })
    });
    if(nazwa.value!=="" && opis.value!=="" && data.value!==""){
        let prior=0;
        if(priorytet.value==="important") 
            prior = 1;
        if(priorytet.value==="neededYesterday")
            prior = 2;
            let year = data.value.slice(0,4);
            let month = data.value.slice(5,7);
            if(month.length===1){
                month="0"+month;
            }
            let day = data.value.slice(data.value.length - 2);
            if(day.length===1){
                day="0"+day;
            }
        task = {
            name: nazwa.value,
            opis: opis.value,
            year: year,
            month: month,
            day: day,
            priorytet: prior,
            index: taskIndex   
        };
        taskIndex++;
        console.log(task);
        sortedTasks.push(task);

        templatesTab = [];
        for(let i=0; i<sortedTasks.length; i++){
            templatesTab.push(taskTemplateCreate(sortedTasks[i]));
            console.log(sortedTasks[i]);
        }
        main.innerHTML="";
        templatesTab.forEach(article=>{main.appendChild(article)});

    }else{
        inputsTab.forEach(inputElem => inputValidate(inputElem));
    }
})
//sortowanie po dacie wykonania

const dateSort = (tab) => {
    tab.sort((a, b) => {
        let aDate=`${a.year}${a.month}${a.day}`;
        let bDate=`${b.year}${b.month}${b.day}`;
        return aDate - bDate;
    });
    return tab;
}



//Tworzenie szablonu dla pojedynczego zadania

// let taskTemplateCreate = ({name, kategoria, year, month, day, priorytet, color, desc, index}) =>{
//     let art = document.createElement("article");
//     art.classList.add("singleTask");
//     let header = document.createElement("header");
//     header.classList.add("taskHeader");
//     header.style.background = color;
//     let taskCategory = document.createElement("h3");
//     let taskDate = document.createElement("h4");
//     taskCategory.innerText=kategoria;
//     taskDate.innerText= year +"-"+month+"-"+day;
//     header.appendChild(taskCategory);
//     header.appendChild(taskDate);
//     let taskName = document.createElement("p")
//     taskName.innerText=name;
//     art.appendChild(header);
//     art.appendChild(taskName);

//     return art;
// };

let taskTemplateCreate = ({name, opis, year, month, day, priorytet, index})=>{
    let taskTemp = document.createElement("article");
    taskTemp.classList.add("singleTask");
    let header = document.createElement("header");
    header.classList.add("taskHeader");
    header.style.background = "#A0DA41";
    let taskName = document.createElement("h3");
    let taskDate = document.createElement("h4");
    taskName.innerText=name;
    taskDate.innerText= year +"-"+month+"-"+day;
    header.appendChild(taskName);
    header.appendChild(taskDate);
    let taskDesc = document.createElement("p")
    taskDesc.innerText=opis;
    taskTemp.appendChild(header);
    taskTemp.appendChild(taskDesc);
    return taskTemp;
};

//Funkcja zaznaczająca błędy

const inputValidate = (inputElem) => {
    if(inputElem.value===""){
        inputElem.style.boxShadow = '0 0 1em rgb(255,59,59)';
    }
}
