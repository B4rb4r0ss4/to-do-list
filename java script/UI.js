const DOMStrings = {
    addButton: '.add-button',
    doneBtn: '.ok-',
    doneItems: '.done-items',
    allItems: '.all-items',
    percentage: '.percentage',
    input: '.operator-input',
    bottom: '.bottom',
    toDo: '.to-do',
    done: '.done',
    dateLabel: '.day',
    hourLabel: '.operator-hour',
    howManyToDo: '.how-many-to-do',
    howManyDone: '.how-many-done'
};

const getInput = () => {
    return {
        value: document.querySelector(DOMStrings.input).value
    }
}

const displayToDoTasks = obj => {
    const html = `<li id="to-do-${obj.id}" class="li">${obj.value}<i class="demo-icon icon-ok done-button" id="ok-${obj.id}"></i><i class="demo-icon icon-cancel remove-button" id="delete-${obj.id}"></i></li>`;
   
    document.querySelector(DOMStrings.toDo).insertAdjacentHTML('beforeend', html);
}

const displayDoneItem = obj => {
    const html = `<li id="done-${obj.id}" class="li"><i class="demo-icon icon-left return-button" id="return-${obj.id}"></i>${obj.value}<i class="demo-icon icon-cancel remove-button" id="deleteDone-${obj.id}"></i></li>`;
    
    document.querySelector(DOMStrings.done).insertAdjacentHTML('beforeend', html);
}

const deleteListItem = (action, selectorID) => {
    let name;
    if (action === 'ok' || action === 'delete') name = `to-do-${selectorID}`;
    else if (action === 'return' || action === 'deleteDone') name = `done-${selectorID}`;

    const el = document.getElementById(name);
    el.parentNode.removeChild(el);
}

const displayProgress = progress => {
    if (!isNaN(progress.progress) === false) progress.progress = 100;
        document.querySelector(DOMStrings.doneItems).textContent = progress.doneLength;
        document.querySelector(DOMStrings.allItems).textContent = progress.totalLength;
        document.querySelector(DOMStrings.percentage).textContent = progress.progress + '%';
        document.querySelector(DOMStrings.howManyToDo).textContent = progress.toDoLength;
        document.querySelector(DOMStrings.howManyDone).textContent = progress.doneLength;
}

const displayDate = () => {

    const now = new Date();

    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const hour = now.getHours();
    const minute = now.getMinutes();
    
    const dateCorrector = number => {
        return (number < 10) ? `0${number}` : number
    }

    document.querySelector(DOMStrings.dateLabel).textContent = `${dateCorrector(day)}-${dateCorrector(month)}-${year}`;
    document.querySelector(DOMStrings.hourLabel).textContent = `${dateCorrector(hour)}.${dateCorrector(minute)}`;

}

export { DOMStrings, getInput, displayToDoTasks, displayDoneItem,  deleteListItem, displayProgress, displayDate};