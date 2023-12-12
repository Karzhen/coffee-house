const burgerBtn = document.querySelector('.burger-icon'),
    burgerNav = document.querySelector('.burger-nav'),
    coffeeMenu = document.querySelector('.coffee-menu');
    burgerMenuLink = document.querySelector('.burger-menu-link');
let computedRight;

function openBurgerMenu() {
    document.body.classList.toggle('no-scroll');
    burgerNav.classList.toggle('burger-nav-open');
    burgerMenuLink.classList.toggle('burger-menu-link-open');
    burgerBtn.classList.toggle('burger-icon-close');
}

function closeBurgerMenu() {
    document.body.classList.remove('no-scroll');
    burgerNav.classList.remove('burger-nav-open');
    burgerMenuLink.classList.remove('burger-menu-link-open');
    burgerBtn.classList.remove('burger-icon-close');
}

window.addEventListener('load', () => {
    if (window.innerWidth >= 768) {
        closeBurgerMenu();
    }
});

window.addEventListener('resize', () => {
    const screenWidth = window.innerWidth;

    // Если ширина экрана становится больше или равна 768px, закройте бургер-меню
    if (screenWidth >= 768) {
        closeBurgerMenu();
    }
})

burgerBtn.addEventListener('click', () => {
    openBurgerMenu();
});