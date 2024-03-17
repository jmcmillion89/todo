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


    // Gets the values from DOM and saves them to be used later
    function getValues() {

        title = titleValue.value;
        description = descriptionValue.value;
        priority = priorityValue.value;
        changeDateFormat(dateValue.value)
        createCard()
        removeTask()

    }


    // Creates the div with the information submitted
    function createCard() {
        const cardsDiv = document.querySelector('#cards');
        const newDiv = document.createElement('div');
        const newTitle = document.createElement('span');
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
        newPriority.innerText = `Priortiy: ${priority}`
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

    function removeTask() {
        const removeButtons = document.querySelectorAll('.removeButton')
        removeButtons.forEach((button) => {
            button.addEventListener('click', (e) => {
                e.currentTarget.parentNode.remove();
            })
        })
    }

    return {
        getValues
    }

})();

addTask.addEventListener('click', () => {
    newTask.getValues();
})