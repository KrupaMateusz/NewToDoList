const taskSubmit = document.querySelector(".submit");
taskSubmit.addEventListener("click", (ev) => {
    ev.preventDefault();
    const nazwa = document.querySelector(".nazwa").value;
    const kategoria = document.querySelector(".kategoria").value;
    const data = document.querySelector(".data").value;
    const priorytet = document.querySelector(".priorytet").value;
    console.log(nazwa, kategoria, data, priorytet);
})