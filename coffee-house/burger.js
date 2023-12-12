const burgerBtn = document.querySelector('.burger-icon'),
    burgerNav = document.querySelector('.burger-nav'),
    coffeeMenu = document.querySelector('.coffee-menu');

burgerBtn.addEventListener('click', () => {
    openBurgerMenu();
});

const openBurgerMenu = () => {
    burgerNav.classList.toggle('burger-nav-open');
    coffeeMenu.classList.toggle('coffee-menu-open');
    burgerBtn.classList.toggle('burger-icon-close');
}