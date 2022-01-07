const scrapping = require('./scrapping');

async function start(tags) {
    let item = {
        imgs: 'img_prod*->image',
        name: '<h1 class="product-name">',
        description: '<div class="board_htm description"><p>',
        specification: '<div class="board"><div><ul><li>',
        price: '<span data-app="product.price" id="variacaoPreco" data-tray-tst="price_product">'
    }
    
    const baseUrl = 'https://www.skatedosonhos.com.br/skate/truck/nacional';
    const products = await scrapping(baseUrl, '<div class="showcase-catalog">', {links: '/truck/nacional*->link'})
    
    const response = await Promise.all(products.links.map(async (link) => {
        const product = await scrapping(link, '<div class="box-col-product flex align-center">', item)
        
        return {...product, points: Math.floor(Math.random() * 5), tags}
    }))

    return response
}
start(['truck', 'nacional']).then(console.log)