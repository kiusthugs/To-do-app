/*
    Nodes
*/
let list = document.querySelector('.list');
let addButton = document.querySelector('button#add');
let addInput = document.querySelector('input#add');
let changeButton = document.querySelector('button#change');
let changeInput = document.querySelector('input#change');

/*
    Change list description
    Create Enter key functionality
*/

changeButton.addEventListener('click', changeDesc);
changeInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        changeDesc();
    }
})

function changeDesc() {
    let input = changeInput.value;
    console.log(input);
    let desc = document.querySelector('#desc');

    desc.textContent = `${input}:`;

    changeInput.value = '';
}

/*
    Add items to list
    Attach up, down and remove buttons
*/

addButton.addEventListener('click', createItem);
addInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        createItem();
    }
})

function createItem() {

    /*
        Add items
        - grab input field input, create a list element, put text into new list, append list item to list, clear input field
    */
    let input = addInput.value;
    let item = document.createElement('li');
    item.textContent = input;
    list.appendChild(item);
    addInput.value = '';

    /* 
        Create Up button
        - create a button, select the newly created list elements (listItem), loop through list and append button every time add button is pressed, make variables after add items variables
        - attach an id to grab it for the DOM
    */
    let listItem = document.querySelectorAll('.list li');

    let upButton = document.createElement('button');
    upButton.setAttribute('id', 'up'); 
    upButton.textContent = 'Up';
    listButton(upButton);

    /*
        Create down button
    */
    let downButton = document.createElement('button');
    downButton.setAttribute('id', 'down');
    downButton.textContent = 'Down';
    listButton(downButton);

    /*
        Create remove button
    */

    let removeButton = document.createElement('button');
    removeButton.setAttribute('id', 'remove');
    removeButton.textContent = 'Remove';
    listButton(removeButton);


    /*
        Function that contains the loop to attach the corresponding buttons to lists
    */
    function listButton(type) {
        for (let i = 0; i < listItem.length; i++) {
            listItem[i].appendChild(type);
        }
    }

   
}

/* 
    List Button Functionality 
- Since the list isn't existent at first, we apply the listeners to the list items from the parent container
- Event delegation?
*/

list.addEventListener('click', (e) => {

    /* UP */

    if (e.target.id === 'up') {
        let button = e.target;
        let currentItem = button.parentElement;
        let prevItem = currentItem.previousElementSibling;
        
        /*
        Check if there is a previous element available
            - If there is no previous element available, prevItem returns null, therefore the top list item will not wrap around to the bottom of the list, it will stay at the top
            - If there is a previous element existent, move current list item before its previous sibling
        */
        if ( prevItem !== null ) {
        list.insertBefore(currentItem, prevItem);
        }
    }

    /* Down */

    if (e.target.id === 'down') {
        let button = e.target;
        let currentItem = button.parentElement;
        let nextItem = currentItem.nextElementSibling;

        // check if there is a next element available
        // change order of insertBefore() arguments so that nextElementSibling is inserted before the currentItem so that currentItem moves "down"
        if ( nextItem !== null ) {
        list.insertBefore(nextItem, currentItem);
        }
    }

    /* Remove */

    if (e.target.id === 'remove') {
        let button = e.target;
        let currentItem = button.parentElement;
        currentItem.remove();
    }
})