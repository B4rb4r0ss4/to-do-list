class Task {
    constructor(value, id){
        this.value = value;
        this.id = id;
    }  
    
    calculatePercentage() {
        const toDoLength = data.totalTasks.toDo.length;
        const doneLength = data.totalTasks.done.length;
        const totalLength = toDoLength + doneLength;
        const progress = Math.round((doneLength / totalLength) * 100);
        data.percentage = progress;
    }
}

const data = {
    totalTasks: {
        toDo: [],
        done: []
    },

    percentage: -1
}

const addTask = function (newTask) {
        // 1. Create object ID
    const ID = data.totalTasks.toDo.length;

        // 2. Create object
    const newItem = new Task(newTask, ID);
    data.totalTasks.toDo.push(newItem);

        // 3. Calculate percenate
    newItem.calculatePercentage();

        // 4. return new object
    return newItem
}

const updateData = (action, ID) => {
        // 1. set new Type object
    let type, newType, doneItem;
    if (action === 'ok' || action === 'delete') { 
        type = data.totalTasks.toDo; 
        newType = data.totalTasks.done }
    else if (action === 'return' || action === 'deleteDone') { 
        type = data.totalTasks.done; 
        newType = data.totalTasks.toDo;
    }

        // 2. Find item in Data and create done Task
    if (action === 'ok' || action === 'return') {
        const findItem = (item) => item.id === ID;
        const newItem = type.find(findItem);
        //console.log(newItem);
        doneItem = new Task(newItem.value, newType.length);
        newType.push(doneItem);
    }

        // 3. Remove old Task
    const ids = type.map(cur => {
        return cur.id;
    });

    const index = ids.indexOf(ID);

    if (index !== -1) {
        type.splice(index, 1);
    }

        // 4. Calculage Percentage
    Task.prototype.calculatePercentage.call();

        // 5. set display type which will return
    let displayType;
    if (action === 'return') displayType = 'toDo';
    else if (action === 'ok') displayType = 'done';

       
    if (action === 'ok' || action === 'return') {
        return {
            doneItem,
            displayType
        }
    }
}

const exportProgress = () => {
    const toDoLength = data.totalTasks.toDo.length;
    const doneLength = data.totalTasks.done.length;
    const totalLength = toDoLength + doneLength;

    return {
        toDoLength,
        doneLength,
        totalLength,
        progress: data.percentage
    }
}

export {addTask, updateData ,exportProgress };