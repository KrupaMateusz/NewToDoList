const taskSubmit = document.querySelector(".submit");
const checkboxes = document.querySelectorAll(".checkbox");
const main = document.querySelector(".mainContent");
const switchBar = document.querySelector(".bar");
const slider = document.querySelector(".slider");
let taskColor="#A0DA41";
let tasksTab = [];
let templatesTab = [];
let task= {};
let sortedTasks=[];
let taskIndex=0;
let checked = 0;

//funkcja na zmiane sortowania

switchBar.addEventListener("click", (ev) =>{
    ev.preventDefault();
    if(checked === 0){
        slider.style.left = "9.4rem";
        switchBar.style.backgroundColor = "#D042FA";
        checked = 1;
    }else{
        slider.style.left = "0.5rem";
        switchBar.style.backgroundColor = "#ccc";
        checked = 0;
    }
} )

//Sortowanie tablicy
//przelecieć tyle razy ile jest elementów jeśli jest wyższy priorytet splice i unshift
const pusher = (arr, ptab) =>{
    for(let a=0; a<arr.length; a++){
        ptab.push(arr[a]);
    }
}
const mySort = (tab)=>{
    let prior0 = [];
    let prior1 = [];
    let prior2 = [];
    let endTab=[];
    for(let i=0; i<tab.length; i++){
        if(tab[i].priorytet===0){
            prior0.push(tab[i]);
        }else if(tab[i].priorytet===1){
            prior1.push(tab[i]);
        }else{
            prior2.push(tab[i]);
        }
    }
    pusher(prior2, endTab);
    pusher(prior1, endTab);
    pusher(prior0, endTab);
    return endTab;
}

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

let taskTemplateCreate = ({name, kategoria, year, month, day, priorytet, color, desc, index}) =>{
    let art = document.createElement("article");
    art.classList.add("singleTask");
    let header = document.createElement("header");
    header.classList.add("taskHeader");
    header.style.background = color;
    let taskCategory = document.createElement("h3");
    let taskDate = document.createElement("h4");
    taskCategory.innerText=kategoria;
    taskDate.innerText= year +"-"+month+"-"+day;
    header.appendChild(taskCategory);
    header.appendChild(taskDate);
    let taskName = document.createElement("p")
    taskName.innerText=name;
    art.appendChild(header);
    art.appendChild(taskName);

    return art;
};

//Funkcja zaznaczająca błędy

const inputValidate = (inputElem) => {
    if(inputElem.value===""){
        inputElem.style.boxShadow = '0 0 1em rgb(255,59,59)';
    }
}

//Funkcja wybierjąca kolor nagłówka

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

//Funkcja wywoływana przy wciśnięciu formularza

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
            kategoria: kategoria.value,
            year: year,
            month: month,
            day: day,
            priorytet: prior,
            color: taskColor,
            index: taskIndex   
        };
        taskIndex++;
        console.log(task);
        sortedTasks.push(task);
        if(checked === 1){
            
            let newSort = mySort(sortedTasks);
            templatesTab = [];
            for(let i=0; i<newSort.length; i++){
                templatesTab.push(taskTemplateCreate(newSort[i]));
            }
            main.innerHTML="";
            templatesTab.forEach(article=>{main.appendChild(article)});
            
        }else{
            let dateSorted = dateSort(sortedTasks);
            templatesTab = [];
            for(let i=0; i<dateSorted.length; i++){
                templatesTab.push(taskTemplateCreate(dateSorted[i]));
            }
            main.innerHTML="";
            templatesTab.forEach(article=>{main.appendChild(article)});
            
        }

    }else{
        inputsTab.forEach(inputElem => inputValidate(inputElem));
    }
})