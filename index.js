const scrapping = require('./scrapping');
const api = require('./api');

//Params
const siteURL = 'https://www.skatedosonhos.com.br/skate/roda/importada';
const listLinks = siteURL.split('/').reverse().slice(0,2).reverse().join('/')+"*->link"
const tags = ['street', 'roda', 'importada']
const apiURL = 'https://fir-kate-default-rtdb.firebaseio.com/Products/Rodas.json';

let item = {
    imgs: 'img_prod*->image',
    name: '<h1 class="product-name">',
    description: '<div class="board_htm description"><p>',
    specification: '<div class="board"><div><ul><li>',
    price: '<span data-app="product.price" id="variacaoPreco" data-tray-tst="price_product">'
}

// CODIGO
async function start(tags) {
    
    const products = await scrapping(siteURL, '<div class="showcase-catalog">', {links: listLinks})
    
    const response = await Promise.all(products.links.map(async (link) => {
        const product = await scrapping(link, '<div class="box-col-product flex align-center">', item)
        
        return {...product, points: Math.floor(Math.random() * 5), tags}
    }))

    return response
}

start(tags).then((response)=>{
    response.forEach((product) => {
        api(apiURL, product)
    })
})