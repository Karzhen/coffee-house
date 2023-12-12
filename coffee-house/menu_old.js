const coffeeCollection = ['irish', 'kahlua', 'raf',
    'iceCappuccino', 'espresso', 'latte',
    'latteMacchiato', 'withCognac'];

const teaCollection = ['moroccan', 'ginger', 'cranberry', 'buckthorn'];

const dessertCollection = ['marbleCheesecake', 'redVelvet',
    'cheesecake', 'cremeBrule', 'pancake',
    'honeyCake', 'chocolateCake', 'blackForest'];

const coffeeNamings = {
    'irish': 'Irish coffee',
    'kahlua': 'Kahlua coffee',
    'raf': 'Honey raf',
    'iceCappuccino': 'Ice cappuccino',
    'espresso': 'Espresso',
    'latte': 'Latte',
    'latteMacchiato': 'Latte macchiato',
    'withCognac': 'Coffee with cognac',
}

const teaNamings = {
    'moroccan': 'Moroccan',
    'ginger': 'Ginger',
    'cranberry': 'Cranberry',
    'buckthorn': 'Sea buckthorn',
}

const dessertNamings = {
    'marbleCheesecake': 'Marble cheesecake',
    'redVelvet': 'Red velvet',
    'cheesecake': 'Cheesecakes',
    'cremeBrule': 'Creme brulee',
    'pancake': 'Pancakes',
    'honeyCake': 'Honey cake',
    'chocolateCake': 'Chocolate cake',
    'blackForest': 'Black forest',
}

const coffeePrices = {
    'irish': 7,
    'kahlua': 7,
    'raf': 5.5,
    'iceCappuccino': 5,
    'espresso': 4.5,
    'latte': 5.5,
    'latteMacchiato': 5.5,
    'withCognac': 6.5,
}

const teaPrices = {
    'moroccan': 4.5,
    'ginger': 5,
    'cranberry': 5,
    'buckthorn': 5.5,
}

const dessertPrices = {
    'marbleCheesecake': 3.5,
    'redVelvet': 4,
    'cheesecake': 4.5,
    'cremeBrule': 4,
    'pancake': 4.5,
    'honeyCake': 4.5,
    'chocolateCake': 5.5,
    'blackForest': 6.5,
}

const coffeeDescriptions = {
    'irish': 'Fragrant black coffee with Jameson Irish whiskey and whipped milk',
    'kahlua': 'Classic coffee with milk and Kahlua liqueur under a cap of frothed milk',
    'raf': 'Espresso with frothed milk, cream and aromatic honey',
    'iceCappuccino': 'Cappuccino with soft thick foam in summer version with ice',
    'espresso': 'Classic black coffee',
    'latte': 'Espresso coffee with the addition of steamed milk and dense milk foam',
    'latteMacchiato': 'Espresso with frothed milk and chocolate',
    'withCognac': 'Fragrant black coffee with cognac and whipped cream',
}

const teaDescriptions = {
    'moroccan': 'Fragrant black tea with the addition of tangerine, cinnamon, honey, lemon and mint',
    'ginger': 'Original black tea with fresh ginger, lemon and honey',
    'cranberry': 'Invigorating black tea with cranberry and honey',
    'buckthorn': 'Toning sweet black tea with sea buckthorn, fresh thyme and cinnamon',
}

const dessertDescriptions = {
    'marbleCheesecake': 'Philadelphia cheese with lemon zest on a light sponge cake and red currant jam',
    'redVelvet': 'Layer cake with cream cheese frosting',
    'cheesecake': 'Soft cottage cheese pancakes with sour cream and fresh berries and sprinkled with powdered sugar',
    'cremeBrule': 'Delicate creamy dessert in a caramel basket with wild berries',
    'pancake': 'Tender pancakes with strawberry jam and fresh strawberries',
    'honeyCake': 'Classic honey cake with delicate custard',
    'chocolateCake': 'Cake with hot chocolate filling and nuts with dried apricots',
    'blackForest': 'A combination of thin sponge cake with cherry jam and light chocolate mousse',
}

const coffeePaths = {
    'irish': './images/coffee/Irish coffee.jpeg',
    'kahlua': './images/coffee/Kahlua coffee.jpeg',
    'raf': './images/coffee/Honey raf.jpeg',
    'iceCappuccino': './images/coffee/Ice cappuccino.jpeg',
    'espresso': './images/coffee/Espresso.jpeg',
    'latte': './images/coffee/Latte.jpeg',
    'latteMacchiato': './images/coffee/Latte macchiato.jpeg',
    'withCognac': './images/coffee/Coffee with cognac.jpeg',
}

const teaPaths = {
    'moroccan': './images/tea/Moroccan.jpeg',
    'ginger': './images/tea/Ginger.jpeg',
    'cranberry': './images/tea/Cranberry.jpeg',
    'buckthorn': './images/tea/Sea buckthorn.jpeg',
}

const dessertPaths = {
    'marbleCheesecake': './images/dessert/Marble Cheesecakes.jpeg',
    'redVelvet': './images/dessert/Red velvet.jpeg',
    'cheesecake': './images/dessert/Cheesecakes.jpeg',
    'cremeBrule': './images/dessert/Creme brulee.jpeg',
    'pancake': './images/dessert/Pancakes.jpeg',
    'honeyCake': './images/dessert/Honey cake.jpeg',
    'chocolateCake': './images/dessert/Chocolate cake.jpeg',
    'blackForest': './images/dessert/Black forest.jpeg',
}

// ----------------------

function displayItems(category) {
    const itemsContainer = document.getElementById('menu-items');
    itemsContainer.innerHTML = ''; // Очищаем предыдущие элементы

    // Получаем все кнопки меню
    const buttons = document.querySelectorAll('#menu-filter .menu-button');
    buttons.forEach(button => {
        button.classList.remove('menu-active');
    });

    const activeButton = document.getElementById(`button-${category}`);
    activeButton.classList.add('menu-active');

    let collection, namings, descriptions, prices, paths;
    switch (category) {
        case 'coffee':
            collection = coffeeCollection;
            namings = coffeeNamings;
            descriptions = coffeeDescriptions;
            prices = coffeePrices;
            paths = coffeePaths;
            break;
        case 'tea':
            collection = teaCollection;
            namings = teaNamings;
            descriptions = teaDescriptions;
            prices = teaPrices;
            paths = teaPaths;
            break;
        case 'dessert':
            collection = dessertCollection;
            namings = dessertNamings;
            descriptions = dessertDescriptions;
            prices = dessertPrices;
            paths = dessertPaths;
            break;
    }

    collection.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.innerHTML = `
          <div class="item-box">
              <img src="${paths[item]}" alt="${namings[item]}" class="item-image">
          </div>
          <div class="item-text">
              <h3 class="item-name coffee-name">${namings[item]}</h3>
              <p class="item-description text">${descriptions[item]}</p>
              <p class="item-price coffee-price">$${prices[item].toFixed(2)}</p>
          </div>
        `;
        itemsContainer.appendChild(menuItem);
    });
}