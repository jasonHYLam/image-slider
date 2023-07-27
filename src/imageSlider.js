import { doc } from "prettier";

export default function createImageSlider() {

    function createElement(elType, textContent, parentElement, ...classes) {
        const newEl = document.createElement(elType);
        newEl.textContent = textContent;
        classes.map(className => newEl.classList.add(className)); 
        parentElement.appendChild(newEl);
        return newEl;
    }

    function createSlideContainer() {
        const body = document.querySelector('body');
        const container = createElement('div', '', body, 'container') 
        const pictureFrame = createElement('div', '', container, 'picture-frame');
        const wideDiv = createElement('div', '', pictureFrame, 'wide-div', 'move-center');

        const slide1 = createElement('div', 'slide 1', wideDiv, 'slide', 'slide1');
        slide1.setAttribute('data-index', 1)
        const slide2 = createElement('div', 'slide 2', wideDiv, 'slide', 'slide2');
        slide2.setAttribute('data-index', 2)
        const slide3 = createElement('div', 'slide 3', wideDiv, 'slide', 'slide3');
        slide3.setAttribute('data-index', 3)

        const navContainer = createElement('div', '', container, 'nav-container');
        const nav1 = createElement('div', '', navContainer, 'nav-circle', 'nav-1');
        nav1.setAttribute('data-index', 1);

        const nav2 = createElement('div', '', navContainer, 'nav-circle', 'nav-2');
        nav2.setAttribute('data-index', 2);

        const nav3 = createElement('div', '', navContainer, 'nav-circle', 'nav-3');
        nav3.setAttribute('data-index', 3);

    }

    createSlideContainer();

    function getSlideContainer() {
        return document.querySelector('.wide-div');
    }

    function getMoveRight() {
        return document.querySelector('.move-right');
    }

    function getMoveLeft() {
        return document.querySelector('.move-left');
    }

    function checkExistingClass(el, className) {
        return (el.classList.contains(className))
    }

    function removeExistingClass(el, className) {
        el.classList.remove(className)
    }

    function checkAndRemoveExistingClass(el, className) {
        if (checkExistingClass(el, className)) removeExistingClass(el, className);
    }

    function containerStartLeft() {
        checkAndRemoveExistingClass(getSlideContainer(), 'start-right');
        checkAndRemoveExistingClass(getSlideContainer(), 'move-center');
        getSlideContainer().classList.add('start-left');
    }

    function containerStartRight() {
        checkAndRemoveExistingClass(getSlideContainer(), 'start-left');
        checkAndRemoveExistingClass(getSlideContainer(), 'move-center');
        getSlideContainer().classList.add('start-right');
    }

    function containerMoveCenter() {
        checkAndRemoveExistingClass(getSlideContainer(), 'start-left');
        checkAndRemoveExistingClass(getSlideContainer(), 'start-right');
        getSlideContainer().classList.add('move-center');
    }

    function moveLeft() {
        const firstSlide = getSlideContainer().firstChild;
        getSlideContainer().removeChild(firstSlide);
        getSlideContainer().appendChild(firstSlide);
    }

    function moveRight() {
        const firstSlide = getSlideContainer().firstChild;
        const lastSlide = getSlideContainer().lastChild;
        getSlideContainer().removeChild(lastSlide);
        getSlideContainer().insertBefore(lastSlide, firstSlide);
    }
    
    getMoveRight().addEventListener('click', ()=> {
        moveRight();
        containerStartRight();
        setTimeout(containerMoveCenter, 1)
    });
    getMoveLeft().addEventListener('click', ()=>{
        moveLeft();
        containerStartLeft();
        setTimeout(containerMoveCenter, 1)
    });

    function getNavCircles() {
        return document.querySelectorAll('nav-circle');
    }
}
