const taskSubmit = document.querySelector(".submit");
const checkboxes = document.querySelectorAll(".checkbox");
let taskColor="#A0DA41";
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
    // const priorytet = document.querySelector(".priorytet").value;
    const inputsTab = [nazwa, kategoria, data];
    inputsTab.forEach(inputElem => {
        inputElem.addEventListener("click", (ev)=>{
            ev.preventDefault();
            
            inputElem.style.boxShadow = "none";
        })
    });
    if(nazwa.value!=="" && kategoria.value!=="" && data.value!==""){
        console.log("dane Poprawne");
    }else{
        inputsTab.forEach(inputElem => inputValidate(inputElem));
    }
})