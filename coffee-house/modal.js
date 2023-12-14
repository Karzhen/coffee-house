const menuItems = document.querySelectorAll('.menu-item');
// const menuItem = document.querySelector('.menu-item');
const modal = document.getElementById('modal-card');

function openModal(productData, category) {
    document.body.classList.toggle('no-scroll');
    modal.innerHTML = `
    <div class="modal__container">
    <div class="container-left">
      <img src="images/${category}/${productData.name}.jpeg" alt="" class="container-image">
    </div>
    <div class="container-right">
      <h4 class="card-title">${productData.name}</h4>
      <div class="card-description">
        <p class="text">${productData.description}</p>
        <div class="card-group">
          <p class="text">Size</p>
          <div id="size-filter" class="card-filter">
            <div class="filter-button filter-active">
              <p class="filter-symbol">S</p>
              <p class="filter-text">${productData.sizes.s.size}</p>
            </div>
            <div class="filter-button">
              <p class="filter-symbol">M</p>
              <p class="filter-text">${productData.sizes.m.size}</p>
            </div>
            <div class="filter-button">
              <p class="filter-symbol">L</p>
              <p class="filter-text">${productData.sizes.l.size}</p>
            </div>
          </div>
        </div>
        <div class="card-group">
          <p class="text">Additives</p>
          <div id="additives-filter" class="card-filter">
            <div class="filter-button">
              <p class="filter-symbol">1</p>
              <p class="filter-text">${productData.additives[0].name}</p>
            </div>
            <div class="filter-button">
              <p class="filter-symbol">2</p>
              <p class="filter-text">${productData.additives[1].name}</p>
            </div>
            <div class="filter-button">
              <p class="filter-symbol">3</p>
              <p class="filter-text">${productData.additives[2].name}</p>
            </div>
          </div>
        </div>
        <div class="total">
          <div class="total-text">Total:</div>
          <div class="total-price">$${productData.price}</div>
        </div>
        <div class="info">
          <div class="info-img">
            <img src="images/info.svg" alt="">
          </div>
          <div class="info-div">
            <p class="info-text">The cost is not final.
              Download our mobile app to see the final price and place your order.
              Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</p>
          </div>
        </div>
        <div class="close__button">
          <p class="close__button-text">Close</p>
        </div>
      </div>
    </div>
  </div>
  `;
    modal.style.display = 'flex';

    // Подсчёт и отображение начальной цены в модальном окне
    let currentPrice = parseFloat(productData.price) + parseFloat(productData.sizes.s["add-price"]);
    updatePriceDisplay(currentPrice.toFixed(2));

    // Обработчик клика для кнопок размера порции
    const sizeButtons = document.querySelectorAll('#size-filter .filter-button');
    sizeButtons.forEach(currentSizeButton => {
        currentSizeButton.addEventListener('click', function() {
            sizeButtons.forEach(eachSizeButton => {
                eachSizeButton.classList.remove('filter-active');
            });
            currentSizeButton.classList.add('filter-active');

            // Обновляем отображение цены
            const totalPrice = calculateTotalPrice(productData);
            updatePriceDisplay(totalPrice.toFixed(2));
        });
    });

    // Обработчик клика для кнопок добавок
    const additivesButtons = document.querySelectorAll('#additives-filter .filter-button');
    additivesButtons.forEach(currentAdditiveButton => {
        currentAdditiveButton.addEventListener('click', function() {
            // Добавляем или удаляем активный класс
            currentAdditiveButton.classList.toggle('filter-active');

            // Обновляем отображение цены
            const totalPrice = calculateTotalPrice(productData);
            updatePriceDisplay(totalPrice.toFixed(2));
        });

    });

    function updatePriceDisplay(price) {
        document.querySelector('.total-price').textContent = `$${price/*.toFixed(2)*/}`;
    }

    function calculateAdditivesPrice(productData) {
        let additivesPrice = 0;
        document.querySelectorAll('#additives-filter .filter-button.filter-active').forEach(activeAdditive => {
            const index = activeAdditive.querySelector('.filter-symbol').textContent;
            additivesPrice += parseFloat(productData.additives[parseInt(index) - 1]["add-price"]);
        });
        return additivesPrice;
    }

    function calculateTotalPrice(productData) {
        let totalPrice = parseFloat(productData.price);

        // Добавляем цену за размер
        const activeSize = document.querySelector('#size-filter .filter-button.filter-active .filter-symbol');
        const letterSize = activeSize.textContent.toLowerCase();
        totalPrice += parseFloat(productData.sizes[letterSize]["add-price"]);
        totalPrice += calculateAdditivesPrice(productData);

        return totalPrice;
    }





    const closeButton = modal.querySelector('.close__button');
    closeButton.addEventListener('click', function() {
        closeModal();
    });

    function handleEscape(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    }
    document.addEventListener('keydown', handleEscape);

    modal.addEventListener('click', function(event) {
        const modalContent = modal.querySelector('.modal__container');
        if (!modalContent.contains(event.target)) {
            closeModal();
        }
    });

    function closeModal() {
        document.body.classList.remove('no-scroll');
        modal.style.display = 'none';
        document.removeEventListener('keydown', handleEscape);
    }
}