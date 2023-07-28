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

    function shiftSlidesLeft() {
        const firstSlide = getSlideContainer().firstChild;
        getSlideContainer().removeChild(firstSlide);
        getSlideContainer().appendChild(firstSlide);
    }

    function shiftSlidesRight() {
        const firstSlide = getSlideContainer().firstChild;
        const lastSlide = getSlideContainer().lastChild;
        getSlideContainer().removeChild(lastSlide);
        getSlideContainer().insertBefore(lastSlide, firstSlide);
    }

    function slideSlidesLeft() {
        shiftSlidesLeft();
        containerStartLeft();
        setTimeout(containerMoveCenter, 1)
        removeClickedDecorationFromAll();
        setDecoratedCircleForSpecificSlide();
    }

    function slideSlidesRight() {
        shiftSlidesRight();
        containerStartRight();
        setTimeout(containerMoveCenter, 1);
        setDecoratedCircleForSpecificSlide();
    }

    function getCurrentSlide() {
        return getSlideContainer().childNodes[1];
    }

    function moveToSpecificSlide(index) {
        const currentSlideIndex = getCurrentSlide().dataset.index;
        let slidesToMove = Math.abs(currentSlideIndex - index);
        // if slide is in central position, don't change anything
        if (index == currentSlideIndex) {}

        else if (currentSlideIndex < index) {
            for (let i = 0; i < slidesToMove; i++) {
                shiftSlidesLeft();
                containerStartLeft();
            }
        }
        else if (currentSlideIndex > index) {
            for (let i = 0; i < slidesToMove; i++) {
                shiftSlidesRight();
                containerStartRight();
            }
        }
        setTimeout(containerMoveCenter, 1)
        setLoopingAnimation();
    }
    
    getMoveRight().addEventListener('click', ()=> {
        slideSlidesRight();
        setLoopingAnimation();
    });

    getMoveLeft().addEventListener('click', ()=>{
        slideSlidesLeft();
        setLoopingAnimation();
    });

    function getNavCircles() {
        return document.querySelectorAll('.nav-circle');
    }

    function removeClickedDecorationFromAll() {
        getNavCircles().forEach((navCircle) => {
            navCircle.classList.remove('clicked');
        })
    }
    function addClickedDecoration(el) {
        el.classList.add('clicked')
    }

    function setDecoratedCircleForSpecificSlide() {
        removeClickedDecorationFromAll();
        console.log()
        for (let i = 0; i < getNavCircles().length; i++) {
            const currentNav = getNavCircles()[i];
            if (currentNav.dataset.index == getCurrentSlide().dataset.index) {
                addClickedDecoration(getNavCircles()[i]);
            }
        }
    }

    getNavCircles().forEach((navCircle) => {
        navCircle.addEventListener('click', (e) => {
            removeClickedDecorationFromAll();
            addClickedDecoration(e.target);
            moveToSpecificSlide(navCircle.dataset.index);
        })
    })

    let myTimer = setInterval(slideSlidesRight, 5001);

    function setLoopingAnimation() {
        clearInterval(myTimer);
        myTimer = setInterval(slideSlidesRight, 5001);

        
    }

    setLoopingAnimation();

}
