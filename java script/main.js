import { DOMStrings, getInput, displayToDoTasks, displayDoneItem, deleteListItem, displayProgress, displayDate } from './UI.js';
import { addTask, updateData, exportProgress } from './Data.js';

const eventsController = function () {
        //Adding task when somebody click button
    document.querySelector(DOMStrings.addButton).addEventListener('click', addTasks);

        //Adding tasks when somebody click 'Enter'
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            addTasks();
        }
    });

        //Buttons controller (add, remove etc.)
    document.querySelector(DOMStrings.bottom).addEventListener('click', buttonController);
};

const addTasks = function () {
        // 1. get input value
    const input = getInput();

        // 2. check if input is empty
    if (input.value !== '') {
            // 1. Update data structur
        const newItem = addTask(input.value);

            // 2. Display in UI
        displayToDoTasks(newItem);

            // 3. Calculate progress
        const progress = exportProgress();

            // 4. Display progress
        displayProgress(progress);
    }

        // 3. clear input
    document.querySelector(DOMStrings.input).value = null;
};

const buttonController = function (event) {
        // 1. Getting item ID from DOM for example ok-0 delete-0;
    const itemID = event.target.id;

        // 2. Check if ID exists
    if (itemID) {
        const splitID = itemID.split('-');

        const ID = parseInt(splitID[1]); // 0 / 1 / 2 etc.
        const action = splitID[0]; // ok / return / delete / deleteDone

            // 1. Update Data
        const item = updateData(action, ID);
        
            // 2. display done / to-do-item if user click btn
        if (item) {
            if (item.displayType === 'toDo')
                displayToDoTasks(item.doneItem);
            else if (item.displayType === 'done')
                displayDoneItem(item.doneItem);
        }  
        // 1. delete item from UI
        deleteListItem(action, ID);

        // 2. Get progress
        const progress = exportProgress();

        // 3. Display progress
        displayProgress(progress);
    }
}

const init = function() {
    //console.log('Application has started.');
        eventsController();
        displayProgress({
            toDoLength: 0,
            doneLength: 0,
            totalLength: 0,
            progress: 100
        });
        window.setInterval(displayDate, 0);
}

init();
