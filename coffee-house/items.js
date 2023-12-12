fetch('./products.json')
    .then(response => response.json())
    .then(data => {
        const foundProduct = data.find(product => product.name === 'Honey raf')
        if (foundProduct) {
            console.log(`Найден товар ${foundProduct.sizes.s.size}`);
        } else {
            console.log('Товар не найден');
        }
    })