const coffeeSlider = document.querySelector('.coffee__slider'),
      arrowLeft = document.querySelector('.arrow.left'),
      arrowRight = document.querySelector('.arrow.right'),
      controls = document.querySelectorAll('.control'),
      container = document.querySelector('.container__coffee'),
      widthOfSlide = window.getComputedStyle(container).width;
let widthOfSlideWithoutPx = Number(widthOfSlide.slice(0, -2)) + Number(window.getComputedStyle(coffeeSlider).gap.slice(0, -2));
let position = 0,
    controlIndex = 0,
    current = 0;

// Переменные для сенсорных устройств
let isDragging = false,
    startX,
    currentX;
// Переменные для мыши
let isMouseDragging = false,
    startXMouse,
    currentXMouse;

document.querySelectorAll('.coffee-image').forEach((image) => {
    image.addEventListener('mouseover', () => pauseProgressBar(true));
})
document.querySelectorAll('.coffee-image').forEach((image) => {
    image.addEventListener('mouseout', () => pauseProgressBar(false));
})

function pauseProgressBar(isPause = true){
    const currentControl = document.querySelector('.control__load');
    if(isPause){
        currentControl.style.animationPlayState = 'paused';
    }
    else{
        currentControl.style.animationPlayState = 'running';
    }
}

// auto slide when animation progress bar is finish
for (const control of controls) {
    control.addEventListener('animationend', function() {
        nextSlide();
    });
}

function nextSlide() {
    if (position < (controls.length - 1) * widthOfSlideWithoutPx) {
        position += widthOfSlideWithoutPx;
        controlIndex += 1;
    } else {
        position = 0;
        controlIndex = 0;
    }
    coffeeSlider.style.left  = -position + 'px';
    currentSlide(controlIndex);
}
function prevSlide() {
    if (position > 0) {
        position -= widthOfSlideWithoutPx;
        controlIndex -= 1;
    } else {
        position = (controls.length - 1) * widthOfSlideWithoutPx;
        controlIndex = controls.length - 1;
    }
    coffeeSlider.style.left  = -position + 'px';
    currentSlide(controlIndex);
}

function currentSlide(index) {
    if (controls[current].querySelector('.control__load')) {
        controls[current].querySelector('.control__load').remove();
    }
    current = index;

    const loadDiv = document.createElement('div');
    loadDiv.className = 'control__load load-animation';
    controls[current].appendChild(loadDiv);
}

// function switchControl() {
//     const nextIndex = (current + 1) % controls.length;
//     currentSlide(nextIndex);
// }

arrowRight.addEventListener('click', nextSlide);
arrowLeft.addEventListener('click', prevSlide);
controls.forEach((control, index) => {
    control.addEventListener('click', () => {
        position = widthOfSlideWithoutPx * index;
        coffeeSlider.style.left  = -position + 'px';
        currentSlide(index);
    })
})

// Функция для начала перетаскивания (для сенсорных устройств)
function startDrag(event) {
    isDragging = true;
    startX = event.touches[0].clientX;
    currentX = startX;
}

// Функция для перемещения (для сенсорных устройств)
function moveDrag(event){
    if (!isDragging) return;
    currentX = event.touches[0].clientX;
    const deltaX = currentX - startX;
    if (deltaX > 20) {
        prevSlide();
        isDragging = false;
    } else if (deltaX < -20) {
        nextSlide();
        isDragging = false;
    }
}

// Функция для завершения перетаскивания (для сенсорных устройств)
function endDrag(){
    isDragging = false;
}

// Добавляем обработчики событий сенсорных устройств
container.addEventListener('touchstart', startDrag);
container.addEventListener('touchmove', moveDrag);
container.addEventListener('touchend', endDrag);

function startMouseDrag(event) {
    isMouseDragging = true;
    startXMouse = event.clientX;
    currentXMouse = startXMouse;
}

function moveMouseDrag(event){
    if (!isMouseDragging) return;
    currentXMouse = event.clientX;
    const deltaX = currentXMouse - startXMouse;
    if (deltaX > 20) {
        prevSlide();
        isMouseDragging = false;
    } else if (deltaX < -20) {
        nextSlide();
        isMouseDragging = false;
    }
}

function endMouseDrag(){
    isMouseDragging = false;
}

container.addEventListener('mousedown', startMouseDrag);
container.addEventListener('mousemove', moveMouseDrag);
container.addEventListener('mouseup', endMouseDrag);
// Добавляем обработчик события mouseleave, чтобы завершить перетаскивание, если курсор покидает область слайдера
container.addEventListener('mouseleave', endMouseDrag);

window.addEventListener('resize', () => {
    const newWidthOfSlide = window.getComputedStyle(container).width;
    widthOfSlideWithoutPx = Number(widthOfSlide.slice(0, -2)) + Number(window.getComputedStyle(coffeeSlider).gap.slice(0, -2));
    const newIndex = Math.round(position / widthOfSlideWithoutPx);
    position = newIndex * widthOfSlideWithoutPx;

    coffeeSlider.style.left = -position + 'px';

    const newIndexControl = Math.min(Math.max(newIndex, 0), controls.length - 1);
    currentSlide(newIndexControl);
});

document.addEventListener("DOMContentLoaded", function() {
    // setInterval(nextSlide, 5000);
    currentSlide(0);
});
