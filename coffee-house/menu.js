function displayMenu(category) {
    const itemsContainer = document.getElementById('menu-items');
    itemsContainer.innerHTML = ''; // Очищаем предыдущие элементы

    // Получаем все кнопки меню
    const buttons = document.querySelectorAll('#menu-filter .menu-button');
    buttons.forEach(button => {
        button.classList.remove('menu-active');
    });

    const activeButton = document.getElementById(`button-${category}`);
    activeButton.classList.add('menu-active');

    fetch('./products.json')
        .then(response => response.json())
        .then(data => {
            const foundProducts = data.filter(product => product.category === category)
            // console.clear();
            if (foundProducts.length > 0) {
                foundProducts.forEach(product => {
                    const menuItem = document.createElement('div');
                    menuItem.classList.add('menu-item');
                    menuItem.innerHTML = `
                      <div class="item-box">
                          <img src="./images/${category}/${product.name}.jpeg" alt="${product.name}" class="item-image">
                      </div>
                      <div class="item-text">
                          <h3 class="item-name">${product.name}</h3>
                          <p class="item-description text">${product.description}</p>
                          <p class="item-price">$${product.price}</p>
                      </div>
                    `;
                    itemsContainer.appendChild(menuItem);
                    menuItem.addEventListener('click', function () {
                        console.log(`Нажата карточка товара ${product.name}`);
                        openModal(product, category);
                    });

                });
            } else {
                alert('Товары в категории ${category} не найдены');
            }
        });
}

window.onload = function () { displayMenu('coffee') };

document.getElementById('button-coffee').addEventListener('click', () => displayMenu('coffee'));
document.getElementById('button-tea').addEventListener('click', () => displayMenu('tea'));
document.getElementById('button-dessert').addEventListener('click', () => displayMenu('dessert'));

