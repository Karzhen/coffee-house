const coffeeSlider = document.querySelector('.coffee__slider'),
      arrowLeft = document.querySelector('.arrow.left'),
      arrowRight = document.querySelector('.arrow.right'),
      controls = document.querySelectorAll('.control'),
      container = document.querySelector('.container__coffee'),
      widthOfSlide = window.getComputedStyle(container).width;
let widthOfSlideWithoutPx = Number(widthOfSlide.slice(0, -2)) + 100;
let position = 0,
    controlIndex = 0;

//functions

const nextSlide = () => {
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
const prevSlide = () => {
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

const currentSlide = (index) => {
    for (let control of controls) {
        control.classList.remove('active-control');
    }
    controls[index].classList.add('active-control');
}

//event listeners

arrowRight.addEventListener('click', nextSlide);
arrowLeft.addEventListener('click', prevSlide);

controls.forEach((control, index) => {
    control.addEventListener('click', () => {
        position = widthOfSlideWithoutPx * index;
        console.log(position)
        coffeeSlider.style.left  = -position + 'px';
        currentSlide(index);
    })
})

let isDragging = false;
let startX;
let currentX;

// Функция для начала перетаскивания (для сенсорных устройств)
const startDrag = (event) => {
    isDragging = true;
    startX = event.touches[0].clientX;
    currentX = startX;
};

// Функция для перемещения при перетаскивании (для сенсорных устройств)
const moveDrag = (event) => {
    if (!isDragging) return;

    // Получаем текущую позицию касания
    currentX = event.touches[0].clientX;

    // Вычисляем смещение
    const deltaX = currentX - startX;

    // Если смещение достаточно большое, вызываем функцию nextSlide()
    if (deltaX > 20) {
        prevSlide();
        isDragging = false;
    } else if (deltaX < -20) {
        nextSlide();
        isDragging = false;
    }
};

// Функция для завершения перетаскивания (для сенсорных устройств)
const endDrag = () => {
    isDragging = false;
};

// Добавляем обработчики событий сенсорных устройств
container.addEventListener('touchstart', startDrag);
container.addEventListener('touchmove', moveDrag);
container.addEventListener('touchend', endDrag);
// Добавляем обработчик события mouseup
container.addEventListener('mouseup', endDrag);
// Добавляем обработчик события mouseleave, чтобы завершить перетаскивание, если курсор покидает область слайдера
container.addEventListener('mouseleave', endDrag);

window.addEventListener('resize', () => {
    const newWidthOfSlide = window.getComputedStyle(container).width;
    widthOfSlideWithoutPx = Number(newWidthOfSlide.slice(0, -2)) + 100;
    const newIndex = Math.round(position / widthOfSlideWithoutPx);
    position = newIndex * widthOfSlideWithoutPx;

    coffeeSlider.style.left = -position + 'px';

    const newIndexControl = Math.min(Math.max(newIndex, 0), controls.length - 1);
    currentSlide(newIndexControl);
});
