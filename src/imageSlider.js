export default function createImageSlider() {

    function createElement(elType, parentElement, ...classes) {
        const newEl = document.createElement(elType);
        classes.map(className => newEl.classList.add(className)); 
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

    createSlideContainer();
}
