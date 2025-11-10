/**
 ******************************************************************************* 
 * JS List 02
 *******************************************************************************
 */

// -----------------------------------------------------------------------------
// Global variables
// -----------------------------------------------------------------------------
let listElemCounter = 0;

// -----------------------------------------------------------------------------
// Event listeners
// -----------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    addEventListenerToButton("addElem",           addElemLast);
    addEventListenerToButton("insertBeforeElem",  insertElemBefore);
    addEventListenerToButton("replaceFirstElem",  replaceElemFirst);
    addEventListenerToButton("removeLastElem",    removeElemLast);
    addEventListenerToButton("checkParentNode",   getParentNodeAlert);
    addEventListenerToButton("collectionChecker", getCollectionsSummary);

    addEventListenerToInput("bgColor",   changeBackgroundColor);
    addEventListenerToInput("textColor", changeFontColor);

    addEventListenerSpecifyType("change", "fontKind", changeFontFamily);
});

// -----------------------------------------------------------------------------
// Functions
// -----------------------------------------------------------------------------
/**
 * @description Adds numbered element to the list.
 *              Demonstrates usage of `appendChild()`.
 * @function addElemLast
 * @returns {void}
 */
function addElemLast() {
    const li = createListElement();
    const text = createCountedElementText();
    li.appendChild(text);
    document.getElementById("listDOM").appendChild(li);
}

/**
 * @description Inserts numbered element in the first place in the list.
 *              Demonstrates usage of `insertBefore()`.
 * @function insertElemBefore
 * @returns {void}
 */
function insertElemBefore() {
    const li   = createListElement();
    const text = createCountedElementText();
    const list = getDemoList();
    li.appendChild(text);
    list.insertBefore(li, list.firstChild);
}

/**
 * @description Replaces first element in the list with a new one.
 *              Demonstrates usage of `replaceChild()`.
 * @function replaceElemFirst
 * @returns {void}
 */
function replaceElemFirst() {
    const li   = createListElement();
    const text = createCountedElementText();
    const list = getDemoList();
    li.appendChild(text);
    list.replaceChild(li, list.firstChild);
}

/**
 * @description Removes last element in the list.
 *              Demonstrates usage of `removeChild()`.
 * @function removeElemLast
 * @returns {void}
 */
function removeElemLast() {
    const list = getDemoList();
    const last = list.lastElementChild;
    if (last) { list.removeChild(list.lastElementChild); }
}

/**
 * @description Informs about the parent node of the clicked element.
 *              Demonstrates usage of `.parentNode`.
 * @function getParentNodeAlert
 * @returns {void}
 */
function getParentNodeAlert() {
    window.alert(`Rodzicem tego elementu jest ${document.getElementById("checkParentNode").parentNode.nodeName}`);
}

/**
 * @description Returns summarized info about collections present in the document.
 *              Demonstrates usage of `.images`, `.links`, `.forms`, 
 *              `.anchors`, `item()` and `namedItem()`.
 * @function getCollectionsSummary
 * @returns {void}
 */
function getCollectionsSummary() {
    const imagesCount  = document.images.length;
    const linksCount   = document.links.length;
    const formsCount   = document.forms.length;
    const anchorsCount = document.anchors.length;

    const thirdLink    = document.links.item(2).href;
    const formByName   = document.forms.namedItem("simpleSubmitForm");

    document.getElementById("collectionsResult").innerHTML = `
        Obrazy: ${imagesCount}<br>
        Linki: ${linksCount}<br>
        Formularze: ${formsCount}<br>
        Zakotwiczenia: ${anchorsCount}<br>
        Trzeci link: ${thirdLink}<br>
        Nazwa formularza: ${formByName.name}
    `;
}

// -----------------------------------------------------------------------------
// Utility functions
// -----------------------------------------------------------------------------
/**
 * @description Adds an event listener of specified type to the element with given ID 
 *              and with given function to execute when the event occurs.
 * @function addEventListenerSpecifyType
 * @param {string} type Type of event to be listened.
 * @param {string} elementID Element's ID.
 * @param {function} eventFunction Function to be called when the event occurs.
 * @returns {void}
 */
function addEventListenerSpecifyType(type, elementId, eventFunction) {
    document.getElementById(elementId).addEventListener(type, eventFunction);
}

/**
 * @description Adds an event listener to a button with given ID and with given 
 *              function to execute when clicked.
 * @function addEventListenerToButton
 * @param {string} buttonId Button's ID.
 * @param {function} eventFunction Function to be called when button is clicked.
 * @returns {void}
 */
function addEventListenerToButton(buttonId, eventFunction) {
    addEventListenerSpecifyType("click", buttonId, eventFunction);
}

/**
 * @description Adds an event listener to an input with given ID and with given
 *              function to execute when input is sent.
 * @function addEventListenerToInput
 * @param {string} inputId Input's ID.
 * @param {function} eventFunction Function to be called when input is sent.
 * @returns {void}
 */
function addEventListenerToInput(inputId, eventFunction) {
    addEventListenerSpecifyType("input", inputId, eventFunction);
}

/**
 * @description Creates `<li>` element.
 *              Demonstrates usage of `createElement()`.
 * @function createListElement
 * @returns {HTMLLIElement} Newly created `<li>` element.
 */
function createListElement() {
    return document.createElement("li");
}

/**
 * @description Creates text element with content presented below.
 *              Demonstrates usage of `createTextNode()`.
 * @function createCountedElementText
 * @returns {HTMLLIElement} Newly created text node.
 */
function createCountedElementText() {
    return document.createTextNode(`Element ${++listElemCounter}`);
}

/**
 * @description Returns the demo list.
 * @function getDemoList
 * @returns {HTMLLIElement} List element found by ID `listDOM`.
 */
function getDemoList() {
    return document.getElementById("listDOM");
}

/**
 * @description Returns the body style.
 * @function getBodyStyle
 * @returns {void}
 */
function getBodyStyle() {
    return document.body.style;
}

/**
 * @description Changes background color based on the value specified by `Event` 
 *              object target.
 * @function changeBackgroundColor
 * @listens input
 * @param {Event} e Event object passed by the `EventListener`.
 * @returns {void}
 */
function changeBackgroundColor(e) {
    getBodyStyle().backgroundColor = e.target.value;
}

/**
 * @description Changes font color based on the value specified by `Event` 
 *              object target.
 * @function changeFontColor
 * @listens input
 * @param {Event} e Event object passed by the `EventListener`.
 * @returns {void}
 */
function changeFontColor(e) {
    getBodyStyle().color = e.target.value;
}

/**
 * @description Changes font family based on the value specified by `Event` 
 *              object target.
 * @function changeFontFamily
 * @param {Event} e Event object passed by the `EventListener`. 
 * @returns {void}
 */
function changeFontFamily(e) {
    getBodyStyle().fontFamily = e.target.value;
}
