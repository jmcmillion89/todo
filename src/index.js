import './styles/main.scss'
const taskTitle = document.querySelector('#title')
const taskDescription = document.querySelector('#description')
const taskDate = document.querySelector('#date')
const taskPriority = document.querySelector('#priority')
const addTask = document.querySelector('#add')

let id=0

function createCard(title, description, date, priority) {
    const cardsDiv = document.querySelector('#cards')
    const newDiv = document.createElement('div');
    const newH3 = document.createElement('h3');
    const newBr1 = document.createElement('br')
    const newBr2 = document.createElement('br')
    const newTitle = document.createTextNode(`${title}`)
    const newDescription = document.createTextNode(`${description}`)
    const newDate = document.createTextNode(`${date}`)
    const newPriority = document.createTextNode(`${priority}`)
        return {
        title: title,
        description: description,
        date: date,
        priority: priority,
            addCard: function() {
                newH3.appendChild(newTitle)
                newDiv.appendChild(newH3)
                newDiv.appendChild(newDescription)
                newDiv.appendChild(newBr1)
                newDiv.appendChild(newDate)
                newDiv.appendChild(newBr2)
                newDiv.appendChild(newPriority)
                newDiv.setAttribute("id", `card${id}`)
                cardsDiv.appendChild(newDiv)
                id++
            }
        }
}

let card = [];

addTask.addEventListener('click', ()=> {
    card.push(createCard(taskTitle.value, taskDescription.value, taskDate.value, taskPriority.value));
    card[id].addCard()
})