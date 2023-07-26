const { doc } = require("prettier");

function createElement(elType, parentElement, ...classes) {
    const newEl = document.querySelector(elType);
    classes.map(className => elType.classList.add(className)); 
    parentElement.appendChild(newEl);
    return newEl;
}



function createSlideContainer() {
    const body = document.querySelector('body');
    const pictureFrame = createElement('div', body, 'picture-frame');
    const wideDiv = createElement('div', pictureFrame, 'wide-div');

    const slide1 = createElement('div', wideDiv, 'slide', 'slide1');
    const slide2 = createElement('div', wideDiv, 'slide', 'slide2');
    const slide3 = createElement('div', wideDiv, 'slide', 'slide3');
}