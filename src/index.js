import './styles/main.scss'

const addTask = document.querySelector('#add');


// pulling data from input on page
const titleValue = document.querySelector('#title');
const descriptionValue = document.querySelector('#description');
const dateValue = document.querySelector('#date');
const priorityValue = document.querySelector('#priority');


const newTask = (function() {
    let title;
    let description;
    let date;
    let priority;
    let id = 0;
    let formComplete = false;


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
        createCard()
        removeTask()
        priorityBg()
        clearForm()
        formComplete = false;
    }
    }


    // Creates the div with the information submitted
    function createCard() {
        const cardsDiv = document.querySelector('#cards');
        const newDiv = document.createElement('div');
        const newTitle = document.createElement('h2');
        const newDescription = document.createElement('p')
        const newDate = document.createElement('span')
        const newPriority = document.createElement('span')
        const removeButton = document.createElement('button')
        newTitle.innerText = title
        newTitle.setAttribute('class', 'card-title')
        newDiv.appendChild(newTitle);
        newDescription.innerText = description
        newDescription.setAttribute('class', 'card-description')
        newDiv.appendChild(newDescription);
        newDate.innerText = `Date Due: ${date}`
        newDate.setAttribute('class', 'card-date')
        newDiv.appendChild(newDate);
        newPriority.innerText = `Priority: ${priority}`
        newPriority.setAttribute('class', 'card-priority')
        newDiv.appendChild(newPriority);
        removeButton.innerText = 'X'
        removeButton.setAttribute('class', 'removeButton')
        newDiv.appendChild(removeButton)
        newDiv.setAttribute('id', `card${id}`)
        cardsDiv.appendChild(newDiv);


    }

    // Changes the date to MM/DD/YYYY
    function changeDateFormat(value) {
        const myArray = value.split("-");

        let year = myArray[0];
        let month = myArray[1];
        let day = myArray[2];

        date = `${month}-${day}-${year}`
    }

    // Removes the div when button is clicked
    function removeTask() {
        const removeButtons = document.querySelectorAll('.removeButton')
        removeButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                e.currentTarget.parentNode.remove();
            })
        })
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