import './styles/main.scss'

const addTask = document.querySelector('#add');




// pulling data from input on page
const titleValue = document.querySelector('#title');
const descriptionValue = document.querySelector('#description');
const dateValue = document.querySelector('#date');
const priorityValue = document.querySelector('#priority');


const newTask = (function() {
    const LOCAL_STORAGE_LIST_KEY = 'task.list'
    let list = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []
    let title;
    let description;
    let date;
    let priority;
    let formComplete = false;
    
    render()

    // Gets the values from DOM and saves them to be used later
    function getValues() {
        validateForm()
        if (formComplete  === false) {
            return;
        }
        else {
        title = titleValue.value;
        description = descriptionValue.value;
        priority = priorityValue.value;
        changeDateFormat(dateValue.value)
        addToList()
        formComplete = false;
    }
    }

    function addToList() {
        list.push([title, description, date, priority]);
        saveList()
        render()
    }

    function saveList () {
        localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(list));
        render()
    }

    // Creates the div with the information submitted
    function render() {
        clearTasks()
        for (let index = 0; index < list.length; index++) {
        const cardsDiv = document.querySelector('#cards');
        const newDiv = document.createElement('div');
        const newTitle = document.createElement('h2');
        const newDescription = document.createElement('p')
        const newDate = document.createElement('span')
        const newPriority = document.createElement('span')
        const removeButton = document.createElement('button')
        newTitle.innerText = list[index][0]
        newTitle.setAttribute('class', 'card-title')
        newDiv.appendChild(newTitle);
        newDescription.innerText = list[index][1]
        newDescription.setAttribute('class', 'card-description')
        newDiv.appendChild(newDescription);
        newDate.innerText = `Date Due: ${list[index][2]}`
        newDate.setAttribute('class', 'card-date')
        newDiv.appendChild(newDate);
        newPriority.innerText = `Priority: ${list[index][3]}`
        newPriority.setAttribute('class', 'card-priority')
        newDiv.appendChild(newPriority);
        removeButton.innerText = 'X'
        removeButton.setAttribute('class', 'removeButton')
        removeButton.setAttribute('id', `remove-${index}`)
        newDiv.appendChild(removeButton)
        newDiv.setAttribute('id', `card${index}`)
        cardsDiv.appendChild(newDiv);
        priorityBg()
        removeButton.addEventListener('click', () => {
            list = list.toSpliced(index, 1)
            saveList()
        })
    }
    clearForm()
    }

    function clearTasks() {
        const cardsDiv = document.querySelector('#cards');
        cardsDiv.innerHTML = ''
    }

    // Changes the date to MM/DD/YYYY
    function changeDateFormat(value) {
        const myArray = value.split("-");

        let year = myArray[0];
        let month = myArray[1];
        let day = myArray[2];

        date = `${month}-${day}-${year}`
    }

    // Changes the background of div based on priority
    function priorityBg() {
        const cards = document.querySelectorAll('.card-priority')
        cards.forEach((card) => {
            if (card.innerText === "Priority: Low") {
                card.parentNode.style.backgroundColor = "#95FF94";
            }
            if (card.innerText === "Priority: Medium") {
                card.parentNode.style.backgroundColor = "#FFC8B3";
            }
            if (card.innerText === "Priority: High") {
                card.parentNode.style.backgroundColor = "#FF7575";
            }
        })
    }

    // Checks if form is empty
    function validateForm() {
        if (titleValue.value === '') {
            titleValue.style.borderColor = 'red'
        }
        if (descriptionValue.value === '') {
            descriptionValue.style.borderColor ='red'
        }
        if (dateValue.value === '') {
            dateValue.style.borderColor = 'red'
        }
        else {
            titleValue.style.borderColor = ''
            descriptionValue.style.borderColor =''
            dateValue.style.borderColor = ''
            formComplete = true;
        }
    }

    // Clears form after submitting
    function clearForm() {
        titleValue.value = ''
        descriptionValue.value = ''
        dateValue.value = ''
        priorityValue.value = 'Low'
    }

    return {
        getValues
    }

})();

addTask.addEventListener('click', () => {
    newTask.getValues();
})